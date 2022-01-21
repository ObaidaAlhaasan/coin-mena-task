import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import "./trade-form.scss";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import {CryptoIcon} from "../../../../components/crypto-icon/crypto-icon";
import {
  CryptoCurrency, exchangeSrc,
  ICryptoAsset, strOrNum,
} from "../../../../types/cryptos";
import {useDebounce} from "../../../../hooks/useDebounce";
import {useCryptoAssets} from "../../../../hooks/useCryptoAssets";
import {useRate} from "../../../../hooks/useRate";
import {isNullOrEmpty} from "../../../../utils/string-utils";


const DelayEventInMilliSecond = 500;
const TradeForm: FC = () => {
  const [crypto, setCrypto] = useState<ICryptoAsset>();
  const [cryptoAmt, setCryptoAmt] = useState<strOrNum>('');
  const [currency, setCurrency] = useState<strOrNum>('');
  const [exchangeSrc, setExchangeSrc] = useState<exchangeSrc>('Crypto');

  const debouncedCurrency = useDebounce<strOrNum>(currency, DelayEventInMilliSecond);
  const debouncedCryptoAmt = useDebounce<strOrNum>(cryptoAmt, DelayEventInMilliSecond);

  const {data: response, status} = useCryptoAssets();
  const cryptos = response?.data ?? [];

  const {refetch: refetchCryptoRate} = useRate(crypto, CryptoCurrency.USD);

  useEffect(() => {
    setCrypto(cryptos[0]);
  }, [cryptos]);

  const fetchCryptoRate = useCallback(()=> {
    refetchCryptoRate().then(({data, status}) => {
      if(status !== "success" || !data?.rate) return;

      const value = (Number(debouncedCryptoAmt) * data?.rate) ?? '';
      setCurrency(value);
    })
  }, [debouncedCryptoAmt])

  const fetchCurrencyRate = useCallback(()=> {
    refetchCryptoRate().then(({data, status}) => {
      if(status !== "success" || !data?.rate) return;

      const value = (Number(currency) / data?.rate) ?? '';
      setCryptoAmt(value);
    })
  }, [debouncedCryptoAmt])

  useEffect(() => {
    if (exchangeSrc === "Currency" || isNullOrEmpty(debouncedCryptoAmt))
      return;
    fetchCryptoRate()
  }, [debouncedCryptoAmt, exchangeSrc]);

  useEffect(() => {
    if (exchangeSrc === "Crypto" || isNullOrEmpty(debouncedCurrency))
      return;

    fetchCurrencyRate();
  }, [debouncedCurrency, exchangeSrc]);

  if (status === "loading")
    return <LoadingSpinner/>

  if (status === "error")
    return <LoadingError title="Crypto Assets"/>

  const onSelectCrypto = (d: ICryptoAsset) => {
    setCrypto(d);
    setExchangeSrc('Crypto')
  }

  const onChangeAmtChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCryptoAmt(e.target.value);
    setExchangeSrc('Crypto');
  }

  const onCurrencyChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
    setExchangeSrc('Currency');
  }

  return (
    <div className="trade-from">
      <div className="input-group input-group-prepend">
        <input type="number" className="form-control" aria-label="Text input with dropdown button"
               onChange={onChangeAmtChange}
               value={cryptoAmt}
        />
        <div className="input-group-append">

          <div className="dropdown">
            <button className="btn btn-sm dropdown-toggle btn-outline-secondary" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
              <CryptoIcon iconName={crypto?.symbol ?? ""}/>
              <span>{crypto?.symbol ?? ""}</span>
            </button>
            <ul className="dropdown-menu small overflow-auto" aria-labelledby="dropdownMenuButton1">
              {cryptos.map((c: ICryptoAsset, i) =>(
                <li>
                  <button className="dropdown-item btn-sm d-flex align-items-center gap-2"   onClick={() => onSelectCrypto(c)}>
                    <CryptoIcon iconName={c?.symbol ?? ""}/>
                    <span>{c.symbol}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="crypto-form-separator text-center my-3">
        <span className="crypto-form-separator--line">
         <i className="fas fa-sync"></i>
        </span>
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="h-100 input-group-text bg-light">
            $
          </span>
        </div>
        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={currency}
               onChange={onCurrencyChange}/>
      </div>

    </div>
  );
};

export default TradeForm;
