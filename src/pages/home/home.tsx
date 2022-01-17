import React, {FC} from 'react';
import CryptoAssetsTable from "./components/crypto-assets-table/crypto-assets-table";

interface IHomeProps {
}

const Home: FC<IHomeProps> = () => {
  return (
    <div>
      <CryptoAssetsTable/>
    </div>
  );
};

export default Home;
