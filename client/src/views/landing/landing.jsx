import { NavLink } from "react-router-dom"

export const Landing = () => {
    return (
        <>
            <h1>Esta es la vista de Landing...</h1>
            <h2><NavLink to="/home">Entrar al sitio</NavLink></h2>
        </>
    )
}
