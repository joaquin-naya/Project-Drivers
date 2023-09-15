import style from "./card.module.css"
import { Link } from "react-router-dom"


export const Card = ({id, image, name, teams}) => {
    return (
        <div className={style.card}>
            <Link to={`/home/${id}`}>
                <img src={image}/>
            </Link>
            <p>Nombre: {name}</p>
            <p>Escuderías: {teams}</p>
        </div>
    )
}

