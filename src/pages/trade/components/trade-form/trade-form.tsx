import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import "./trade-form.scss";
import {useQuery} from "react-query";
import {fetchCryptoToCurrency, fetchCryptos, fetchCurrencyToCrypto} from "../../../../services/api-service";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import {CryptoIcon} from "../../../../components/crypto-icon/crypto-icon";
import {ICryptoAsset, ICryptoAssetResponse, ICryptoToCurrencyResponse} from "../../../../types/cryptos";
import {Dropdown} from "../../../../components/drop-down/drop-down";

const useCryptoToCurrency = (crypto: ICryptoAsset | undefined, cryptoAmt: string) => {
  console.log(crypto?.symbol, cryptoAmt);

  return useQuery<ICryptoToCurrencyResponse>(["crypto-to-currency", crypto, cryptoAmt], () => fetchCryptoToCurrency(crypto, cryptoAmt), {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 1
  })
}

const useCurrencyToCrypto = (crypto: ICryptoAsset | undefined, currency: string) => {
  return useQuery<ICryptoToCurrencyResponse>(["currency-to-crypto", crypto, currency], () => fetchCurrencyToCrypto(crypto, currency), {
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 1
  });
}

const useCryptoAssets = () => {
  return useQuery<ICryptoAssetResponse>(["crypto-assets"], () => fetchCryptos(1, 200), {
    keepPreviousData: true,
    refetchOnMount: false,
  })
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

const TradeForm: FC = () => {
  const [crypto, setCrypto] = useState<ICryptoAsset>();
  const [cryptoAmt, setCryptoAmt] = useState<string>('');
  const debouncedCryptoAmt = useDebounce<string>(cryptoAmt, 500);

  const [currency, setCurrency] = useState<string>('');
  const debouncedCurrency = useDebounce<string>(currency, 500);

  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const {data: response, status} = useCryptoAssets();
  const cryptos = response?.data ?? [];

  const {refetch: refetchCryptoToCurrency} = useCryptoToCurrency(crypto, debouncedCryptoAmt);

  const {refetch: refetchCurrencyToCrypto} = useCurrencyToCrypto(crypto, debouncedCurrency);

  const prefDebouncedRef = useRef({debouncedCurrency, debouncedCryptoAmt});

  useEffect(() => {
    setCrypto(cryptos[0]);
  }, [cryptos]);


  useEffect(() => {
    if (prefDebouncedRef.current.debouncedCryptoAmt !== debouncedCryptoAmt) {
      refetchCryptoToCurrency().then(({data, status}) => {
        if (status === "success") {
          const value = data?.result.toString() ?? '';
          setCurrency(value);
          prefDebouncedRef.current.debouncedCurrency = value;
        }
      })
    }
  }, [debouncedCryptoAmt]);

  useEffect(() => {
    if (prefDebouncedRef.current.debouncedCurrency !== debouncedCurrency) {
      refetchCurrencyToCrypto().then(({data, status}) => {
        if (status === "success") {
          const value = data?.result?.toString() ?? '';
          setCryptoAmt(value);
          prefDebouncedRef.current.debouncedCryptoAmt = value;
        }
      });
    }
  }, [debouncedCurrency]);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const onSelectCrypto = (d: ICryptoAsset) => {
    setIsDropDownOpen(!isDropDownOpen);
    setCrypto(d);
  }

  const onChangeAmtChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCryptoAmt(e.target.value);
    setCurrency('');
  }

  const onCurrencyChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
    setCryptoAmt('');
  }

  return (
    <div className="trade-from">
      <div className="input-group input-group-prepend show">
        <input type="text" className="form-control" aria-label="Text input with dropdown button"
               onChange={onChangeAmtChange}
               value={cryptoAmt}
        />
        <div className="input-group-append">
          <button className={`btn btn-light dropdown-toggle ${isDropDownOpen && 'show'}`}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={toggleDropDown}
          >
            <CryptoIcon iconName={crypto?.symbol ?? ""}/>
          </button>

          <Dropdown className={`${isDropDownOpen && 'show'}`}>
            {cryptos.map((c: ICryptoAsset, i) => <span key={i} className="dropdown-item"
                                                       onClick={() => onSelectCrypto(c)}>
              <CryptoIcon iconName={c?.symbol ?? ""}/>
              <span>{c.symbol}</span>
            </span>)}
          </Dropdown>
        </div>

      </div>
      <div className="crypto-form-separator text-center my-3">
        <span className="crypto-form-separator--line">
          <i className="fas fa-arrow-alt-circle-down has-hover-text-primary has-hover"/>
        </span>
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text bg-light">
            $
          </span>
        </div>
        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" value={currency}
               onChange={onCurrencyChange}/>
        <div className="input-group-append">
          <span className="input-group-text bg-light">.00</span>
        </div>
      </div>

    </div>
  );
};

export default TradeForm;
