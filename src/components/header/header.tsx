import {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
import "./header.scss";

import RoutesPathsConstants from "../../navigation/routes-paths-constants";
import LoginModal from "../modals/login/login";
import {AppThemes} from "../../types/UI/AppThemes";
import {useStore} from "../../store/store";

const navLinkClassName = (props: { isActive: boolean }) => props.isActive ? 'nav-link-active' : 'has-hover-affect';

const UserInfo: FC = () => {
  const {currentUser} = useStore();

  return <div>
    Welcome <strong className="has-text-primary">{currentUser?.username}</strong>
  </div>
}

const Header: FC = () => {
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppThemes>(AppThemes.Light);
  const {currentUser, logout} = useStore();

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
            {currentUser ?
              <>
                <UserInfo/>
                <span onClick={logout} className="ms-3 has-hover has-hover-affect">logout</span>
              </>
              :
              <span className="has-hover has-hover-affect has-text-primary has-hover-underline"
                    onClick={() => setLoginIsOpen(true)}>Sign In</span>
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
