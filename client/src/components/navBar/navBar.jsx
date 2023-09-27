import React, { useState, useEffect } from "react";
import { SearchBar } from "../searchBar/searchBar";
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export const NavBar = ({ 
  handleOrder,
  selectedOrder, 
  selectedTeam, 
  selectedOrigin,
  teams, 
  handlerFilterTeam, 
  resetHandler, 
  handlerFilterOrigin,
  onSearch 
}) => {
  const [isChecked, setIsChecked] = useState(localStorage.getItem("checkedSearch") === "true"); 
  const [resetSelectOrder, setResetSelectOrder] = useState(false);

  useEffect(() => { //restablece el estado cuando resetSelectOrder cambia 
    setResetSelectOrder(false);
  }, [resetHandler]);

  const handleReset = () => { 
    setIsChecked(false); 
    localStorage.setItem("checkedSearch", false); // Actualiza el estado de la casilla de verificacion y borra localstorage
    setResetSelectOrder(true);
    resetHandler();
  };

  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);// Actualiza el estado isChecked
    localStorage.setItem("checkedSearch", updatedValue); // Almacena el valor actualizado de forma local
  };

  return (
    <div className={styles.container}>
      <NavLink to="/home" className={styles.buttonHome}>
        Home
      </NavLink>
      <NavLink to="/create" className={styles.buttonNew}>
        New Driver
      </NavLink>
      
      <label className={styles.labelraya}> | </label>
      <div className={styles.searchContainer}>
        
        <SearchBar onSearch={onSearch} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} /> 

      <button className={styles.buttonLink} onClick={handleReset} title='All filters and sorts will be initialized, showing all drivers.'>
        Reset
      </button>

      <select onChange={handleOrder} value={selectedOrder} className={styles.select} title='It may be sorted Ascending or Descending by forename, in addition to being able to sort by dob'>
        <option value="">Order</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendiente</option>
        <option value="nacA">Dob(Asc)</option>
        <option value="nacD">Dob(Desc)</option>
      </select>

      <select onChange={handlerFilterTeam} value={selectedTeam} className={styles.selectTeam} title='You can filter the drivers according to the team they belong to.'>
        <option value="">Team</option>
        {teams &&
          teams.map((team) => {
            return (
              <option key={team} value={team}>
                {team}
              </option>
            );
          })}
      </select>

      <select onChange={handlerFilterOrigin} value={selectedOrigin} className={styles.selectOrigin} title='You can filter according to the origin of the data, if they come from the DB or from the API.'>
        <option value="all">ALL</option>
        <option value="api">API</option>
        <option value="db">DB</option>
      </select>
    </div>
  </div>
  );
}
