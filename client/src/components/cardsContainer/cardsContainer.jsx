import style from "./cardsContainer.module.css"
import { Card } from "../components"

export const CardsContainer = ({currentDrivers}) => {
    return (
        <div className={style.container}>
            {
                currentDrivers.map((driver) => {
                    return (
                        <Card key={driver?.id}
                            id={driver?.id}
                            image={driver?.image}
                            teams={driver?.teams}
                            name={driver?.driverNameSum}>
                        </Card>
                    )
                })
            }
        </div>
    )
}

