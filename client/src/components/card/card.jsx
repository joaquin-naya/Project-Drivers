import { NavLink } from "react-router-dom"
import styles from "./card.module.css"

export const Card = ({driver}) => {
    const { forename,surname,image,teams,dob,id } = driver; 
    
    const formatTeams = (teams) => {
        if (typeof teams === 'string') {
          return teams;
        } else if (Array.isArray(driver.Teams)) {
          return driver.Teams.map(team => team.name).join(', '); //mapea sobre la driver.teams recupera la name prop de cada team
        } else {
          return ''; //si no es ninguna devuelve una cadena vacia 
        }
    
      };
      return (
        <div className={styles.card_container} title={`Click aqui para ver mas detalles de ${driver.forename} ${driver.surname}`}>
          <NavLink
            to={`/home/${id}`}
            style={{ textDecoration: "none"}}//eliminar el subrayado
          >
            <h3 className={styles.nombre}>{`${forename} ${surname}`}</h3>
            <img src={image} alt="Driver" className={styles.image} />
            <div>
            <h5 className={styles.teams}>{formatTeams(teams)}</h5>
            <h5 className={styles.fecha}>{dob}</h5>
            </div>
            
          </NavLink>
        </div>
      );
}

