import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './home.module.css';

import { BiSearch } from 'react-icons/bi';

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[]
}

export const Home = () => {

  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch('https://sujeitoprogramador.com/api-cripto/?key=18b67b6c08b36420')
        .then(response => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 20);
          
          let price = Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          });

          const formatedResult = coinsData.map(item => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              delta_24h: item.delta_24h.replace(',','.')
            }

            return formated;
          })

          setCoins(formatedResult);
        })
        .catch(err => {
          console.log(err)
        })
    }

    getData();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if(inputValue === '') return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input placeholder="Digite o simbolo da moeda: BTC..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type='submit'>
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor de mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>

        <tbody id='tbody'>

          {
            coins.map((item) => (
              <tr className={styles.tr} key={item.symbol}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <Link to={`detail/${item.symbol}`} className={styles.link}>
                    <span>{item.name}</span> | {item.symbol}
                  </Link>
                </td>
                <td className={styles.tdLabel} data-label="Mercado">
                  {item.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label="Preço">
                  {item.formatedPrice}
                </td>
                <td className={Number(item?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss }  data-label="Volume">
                  <span>{item.delta_24h}</span>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </main>
  )
}