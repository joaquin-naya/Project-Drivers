import React, { useState, useEffect } from "react";
import styles from "./paginado.module.css";

export default function Paginado({ driversPerPage, allDrivers, paginado, currentPage }) {
  
  const [displayPages, setDisplayPages] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(allDrivers / driversPerPage);
    const maxDisplayPages = 12; //numero de paginas visibles
    let startPage = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
    let endPage = Math.min(startPage + maxDisplayPages - 1, totalPages);

    if (endPage - startPage < maxDisplayPages - 1) {
      startPage = Math.max(endPage - maxDisplayPages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setDisplayPages(pages);
  }, [currentPage, allDrivers, driversPerPage]);

  const [inputPage, setInputPage] = useState(""); //igresa el numero de pagina
  const [errorInput, setErrorInput] = useState("");

  const handleInputChange = (event) => { 
    setInputPage(event.target.value); //ingresa
    setErrorInput(""); //borra
  };

  const handleGoToPage = () => { //rango 
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(allDrivers / driversPerPage)) {
      paginado(pageNumber);
      setInputPage("");
    } else {
      setErrorInput("Only numbers within the range");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <nav>
      <ul className={styles.paginado} style={{ display: "flex", alignItems: "center" }}>
        <li className={currentPage === 1 ? styles.disabled : ""}>
          <button onClick={() => paginado(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
        </li>
        {displayPages.map((number) => (
          <li
            className={currentPage === number ? `${styles.number} ${styles.active}` : styles.number}
            key={number}
          >
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
        <li className={currentPage === Math.ceil(allDrivers / driversPerPage) ? styles.disabled : ""}>
          <button onClick={() => paginado(currentPage + 1)} disabled={currentPage === Math.ceil(allDrivers / driversPerPage)}>
            {">"}
          </button>
        </li>
        <li>
          <p className={styles.inicioFin}>
            {currentPage} / {Math.ceil(allDrivers / driversPerPage)}
          </p>
        </li>
        <li>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            placeholder=""
            style={{ width: "20px" }}
            onKeyDown={handleKeyDown}
          />
          <button style={{ cursor: "pointer" }} onClick={handleGoToPage}>
            Go
          </button>
        </li>
        <p style={{ color: "red", marginTop: "5px", height: "8px", marginLeft: "10px" }} disabled={!errorInput}>
          {errorInput && errorInput}
        </p>
      </ul>
    </nav>
  );
}

// import React from "react"

// export const Paginado = ({driversPerPage, allDrv, pages}) => {
//     const pageNumbers = []
//     for ( let i=1; i<=Math.ceil(allDrv/driversPerPage); i++) {
//         pageNumbers.push(i)
//     }
//     return (
//         <nav>
//             <ul>
//                 {
//                     pageNumbers?.map(number => (
//                         <li key={number}>
//                             <p onClick={() => pages(number)}>{number}</p>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </nav>
//     )
// }