import {FC} from 'react';
import {Link} from "react-router-dom";
import RoutesPathsConstants from "../../navigation/routes-paths-constants";

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = () => {
  return (
    <nav>
      <div className="logo">
        logo
      </div>

      <Link to={RoutesPathsConstants.Root}> Home</Link>
      <Link to={RoutesPathsConstants.Trade}> Trade </Link>
    </nav>
  );
};

export default Header;
