import { CardsContainer, Paginado, NavBar } from "../../components/components"
import { useDispatch, useSelector } from "react-redux"
import { getAll, orderDrivers, getTeams, filterTeams, reset, filterOrigin, searchDrivers, } from "../../redux/actions"
import React, { useEffect, useState } from "react"
import styles from "./home.module.css";

export const Home = () => {
    const filteredDrivers = useSelector((state) => state.filteredDrivers);
    const teams = useSelector((state) => state.teams);
    const error = useSelector((state) => state.error);
    let dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(
      parseInt(localStorage.getItem("currentPage")) || 1
    );
    const driversPerPage = 9;
    const lastDriver = currentPage * driversPerPage
    const firstDriver = lastDriver - driversPerPage
    const currentDrivers = filteredDrivers.slice(firstDriver, lastDriver)

    
    const [selectedOrder, setSelectedOrder] = useState(
      localStorage.getItem("selectedOrder") || ""
      );
      const [selectedTeam, setSelectedTeam] = useState(
        localStorage.getItem("selectedTeam") || ""
        );
        const [selectedOrigin, setSelectedOrigin] = useState(
          localStorage.getItem("selectedOrigin") || ""
          );
          const [checkedSearch, setCheckedSearch] = useState(
            localStorage.getItem("checkedSearch") === "true"
            );
            
            useEffect(() => { //maneja la eliminacion de mensaje de error 
              setTimeout(() => {
                dispatch(setError(""));
              }, 10000);
      }, [dispatch, error])

      useEffect(() => { //maneja si la matriz esta vacia 
        if (!filteredDrivers.length) {
          dispatch(getAll());
        }
      }, [dispatch, filteredDrivers]);
      
      useEffect(() => { //maneja si teams esta vacia 
        if (!teams.length) {
          dispatch(getTeams());
        }
      }, [dispatch, teams]);
      
      useEffect(() => {
        const storedCurrentPage = localStorage.getItem("currentPage");
        if (storedCurrentPage) {
          setCurrentPage(parseInt(storedCurrentPage));
          localStorage.removeItem("currentPage");
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
      }, [currentPage]);
      
      const paginado = (pageNumber) => {
          setCurrentPage(pageNumber);
        };

      const handleOrder = (event) => {
        const orderType = event.target.value;
        setSelectedOrder(orderType);
        localStorage.setItem("selectedOrder", orderType);
        dispatch(orderDrivers(orderType));
      };

      const handlerFilterTeam = (event) => {
        const team = event.target.value;
        setSelectedTeam(team);
        localStorage.setItem("selectedTeam", team);
        dispatch(filterTeams(team));
        setCurrentPage(1);
      };

      const handleSearch = (name, isChecked) => {
        setCheckedSearch(isChecked);
        localStorage.setItem("checkedSearch", isChecked.toString());
        dispatch(searchDrivers(name, isChecked));
        setCurrentPage(1);
      };

      const resetHandler = () => {
        setCurrentPage(1);
        setSelectedOrder("");
        setSelectedTeam("");
        setSelectedOrigin("");
        setCheckedSearch(false);
        localStorage.removeItem("selectedOrder");
        localStorage.removeItem("selectedTeam");
        localStorage.removeItem("selectedOrigin");
        localStorage.removeItem("checkedSearch");
        dispatch(reset());
      };

      const handlerFilterOrigin = (event) => {
        const origin = event.target.value;
        setSelectedOrigin(origin);
        localStorage.setItem("selectedOrigin", origin);
        dispatch(filterOrigin(origin));
      };

    return (
        <div className={styles.home}>
            <h1>Esta es la vista de Home...</h1>
            <div className={styles.navBar}>
                <NavBar
                onSearch={handleSearch}
                handleOrder={handleOrder}
                teams={teams}
                handlerFilterTeam={handlerFilterTeam}
                resetHandler={resetHandler}
                handlerFilterOrigin={handlerFilterOrigin}
                selectedOrder={selectedOrder}
                selectedTeam={selectedTeam}
                selectedOrigin={selectedOrigin}
                checkedSearch={checkedSearch}
                />
                {error && <p className={styles.errores}>{error}</p>}
            </div>
            <CardsContainer drivers={currentDrivers}/>
            <div className={styles.paginadoContainer}>
                <Paginado driversPerPage={driversPerPage} paginado={paginado} allDrivers={filteredDrivers.length} currentPage={currentPage}/>
            </div>
        </div>
    )
}
