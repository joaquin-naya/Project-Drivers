import React from "react"

export const Paginado = ({driversPerPage, allDrv, pages}) => {
    const pageNumbers = []
    for ( let i=1; i<=Math.ceil(allDrv/driversPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <p onClick={() => pages(number)}>{number}</p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}