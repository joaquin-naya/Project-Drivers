import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Detail = () => {
    const {id} = useParams()

    const dispatch = useDispatch()
    const drvId = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <>
            <h1>Esta es la vista de Detail...</h1>
            <ul>
                <li>Nombre: {typeof drvId.name === "object" ? drvId.name.forename : drvId.name || "N/A"}</li>
                <li>Apellido: {drvId.surname || (drvId.name && drvId.name.surname) || "N/A"}</li>
                <li>Nationality: {drvId.nationality}</li>
                <li>Description: {drvId.description || "No hay contenido para este corredor..."}</li>
                <li>Birthdate: {drvId.dob}</li>
                <li>Escuderías: {drvId.teams}</li>
                <img src={typeof drvId.image === "object" ? drvId.image.url : drvId.image}></img>
            </ul>
        </>
    )
}

{/* {
    !drvId.image
    ? <img src={noImage}></img>
    : <img src={drvId.image}></img>
}
<p>Id: {drvId.id}</p>
<p>Nombre: {drvId.forename}</p>
<p>Apellido: {drvId.surname}</p>
<p>Nationality: {drvId.nationality}</p>
<p>Fecha de Nacimiento: {drvId.dob}</p>
<p>Escuderías: {drvId.teams}</p>
{drvId.description && <p>Descripción: {drvId.description}</p>} */}