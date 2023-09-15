import { CardsContainer, Paginado } from "../../components/components"
import { useDispatch, useSelector } from "react-redux"
import { getAll } from "../../redux/actions"
import { useEffect, useState } from "react"

export const Home = () => {
    let dispatch = useDispatch()
    let allDrv = useSelector(state => state.allDrivers)

    const [currentPage, setCurrentPage] = useState(1)
    const driversPerPage = 9;
    const lastDriver = currentPage * driversPerPage
    const firstDriver = lastDriver - driversPerPage
    const currentDrivers = allDrv.slice(firstDriver, lastDriver)

    const pages = (pageNum) => {
        setCurrentPage(pageNum)
    }

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch])

    return (
        <>
            <h1>Esta es la vista de Home...</h1>
            <CardsContainer currentDrivers={currentDrivers}/>
            <Paginado driversPerPage={driversPerPage} allDrv={allDrv.length} pages={pages}/>
        </>
    )
}
