import { useEffect, useState } from 'react';
import styles from './detail.module.css';
import { useParams, Link } from 'react-router-dom';

interface CoinProps {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  error?: string;
}

export const Detail = () => {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getData(){
      fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=18b67b6c08b36420&symbol=${cripto}`)
      .then(response => response.json())
      .then((data: CoinProps) => {

        let price = Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const resultData = {
          ...data,
          formatedPrice: price.format(Number(data.price)),
          formatedMarket: price.format(Number(data.market_cap)),
          formatedLowPrice: price.format(Number(data.low_24h)),
          formatedHighPrice: price.format(Number(data.high_24h)),
          delta_24h: data.delta_24h.replace(',','.')
        }

        setDetail(resultData);
        setLoading(false);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
    }

    getData();
  }, []);

  if(loading){
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    )
  } else {
    return (
      detail ? (
        <div className={styles.container}>
        <h1 className={styles.center}>{detail?.name}</h1>
        <p className={styles.center}>{detail?.symbol}</p>

        <section className={styles.content}>
          <p>
            <strong>Preço: </strong> {detail?.formatedHighPrice}
          </p>
          <p>
            <strong>Maior preço 24h: </strong> {detail?.formatedHighPrice}
          </p>
          <p>
            <strong>Menor preço 24h: </strong> {detail?.formatedLowPrice}
          </p>
          <p>
            <strong>Valor de mercado: </strong> {detail?.formatedMarket}
          </p>
          <p>
            <strong>Delta 24h: </strong> <span className={Number(detail?.delta_24h) >= 0 ? styles.profit : styles.loss}>{detail?.delta_24h}</span>
          </p>
        </section>
      </div>
      ) : (
        <div className={styles.container}>
        <h1 className={styles.center}>Cripto que você está buscando não encontrada</h1>
        <Link to="/">Ir para home</Link>
      </div>
      )
    )
  }
  
}