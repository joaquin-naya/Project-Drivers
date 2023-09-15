import { NavLink } from "react-router-dom";
import style from "./navBar.module.css"

export const NavBar = () => {
    return (
        <div className={style.container}>
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/create">FORM</NavLink>
        </div>
    )
}

