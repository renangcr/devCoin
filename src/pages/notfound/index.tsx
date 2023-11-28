
import { Link } from 'react-router-dom';
import styles from './notfound.module.css';

export const Notfound = () => {
  return (
    <div className={styles.container}>
      <h1>A página que você está buscando não existe!</h1>
      <Link to="/">Acessar cripto moedas</Link>
    </div>
  )
}