import {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
import "./header.scss";

import RoutesPathsConstants from "../../navigation/routes-paths-constants";
import LoginModal from "../modals/login/login";
import {AppThemes} from "../../types/UI/AppThemes";

interface IHeaderProps {
}

const navLinkClassName = (props: { isActive: boolean }) => props.isActive ? 'nav-link-active' : 'has-hover-affect';
const userSignIn = false;

interface ILoggedInUser {
  username: string;
  email: string;
  profilePic?: string;
  loggedInDate?: Date;
}

const useUser = (): ILoggedInUser => {
  return {
    username: "Sokania",
    email: "so@so.com",
    loggedInDate: new Date()
  }
}

const UserInfo: FC = () => {
  const user = useUser();
  return <div>
    Welcome {user.username}
  </div>
}


const Header: FC<IHeaderProps> = () => {
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppThemes>(AppThemes.Light);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-md-top">
      <img src="assets/svgs/bitcoin.svg" alt="logo" className="logo navbar-brand"/>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink to={RoutesPathsConstants.Root} className={navLinkClassName}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={RoutesPathsConstants.Trade} className={navLinkClassName}>Trade</NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            {userSignIn ?
              <UserInfo/>
              :
              <span className="has-hover has-hover-affect has-text-primary has-hover-underline" onClick={() => setLoginIsOpen(true)}>Sign In</span>
            }
          </li>
          <li className="nav-item">
            <span className="has-hover">
              {theme === "Light"
                ? <i className="fas fa-sun has-text-primary" onClick={() => setTheme(AppThemes.Dark)}/>
                : <i className="fas fa-moon has-text-primary" onClick={() => setTheme(AppThemes.Light)}/>
              }
            </span>
          </li>
        </ul>
      </div>

      <LoginModal onClose={() => setLoginIsOpen(false)} show={loginIsOpen}/>
    </nav>
  );
};

export default Header;
