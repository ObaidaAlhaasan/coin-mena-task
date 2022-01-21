import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import "./trade-form.scss";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import LoadingError from "../../../../components/loading-error/loading-error";
import {CryptoIcon} from "../../../../components/crypto-icon/crypto-icon";
import {
  CryptoCurrency, exchangeSrc,
  ICryptoAsset, strOrNum,
} from "../../../../types/cryptos";
import {Dropdown} from "../../../../components/drop-down/drop-down";
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

  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

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

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const onSelectCrypto = (d: ICryptoAsset) => {
    setIsDropDownOpen(!isDropDownOpen);
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
      <div className="input-group input-group-prepend show">
        <input type="number" className="form-control" aria-label="Text input with dropdown button"
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
