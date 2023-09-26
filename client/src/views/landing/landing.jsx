import { Link } from "react-router-dom"
import styles from "./landing.module.css"

export const Landing = () => {
    return (
        <div>
        <div className={styles.linkContainer}>
          <h1>DRIVERS PROJECT</h1>
          <Link to="/home" className={styles.link}>
            Entrar...
          </Link>
        </div>
      </div>
    )
}
