import styles from "./cardsContainer.module.css"
import { Card } from "../components"

export const CardsContainer = ({drivers}) => {
    const arrDrivers = drivers

  return (
    <div className={styles.container}>
      {arrDrivers?.map((driver, index) => (<Card key={index} driver={driver} />))} 
    </div>
  );
    
    // return (
    //     <div className={style.container}>
    //         {
    //             currentDrivers.map((driver) => {
    //                 return (
    //                     <Card key={driver?.id}
    //                         id={driver?.id}
    //                         image={driver?.image}
    //                         teams={driver?.teams}
    //                         name={driver?.driverNameSum}>
    //                     </Card>
    //                 )
    //             })
    //         }
    //     </div>
    // )
}

