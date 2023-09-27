import styles from "./cardsContainer.module.css"
import { Card } from "../components"

export const CardsContainer = ({drivers}) => {
  const arrDrivers = drivers
  return (
    <div className={styles.container}>
      {arrDrivers?.map((driver, index) => (<Card key={index} driver={driver} />))} 
    </div>
  );
}

