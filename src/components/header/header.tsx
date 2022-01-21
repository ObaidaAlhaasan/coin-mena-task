import {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
import "./header.scss";

import RoutesPathsConstants from "../../navigation/routes-paths-constants";
import LoginModal from "../modals/login/login";
import {useStore} from "../../store/store";
import Logo from "../logo/logo";
import UserInfo from "./components/user-info/user-info";

const navLinkClassName = (props: { isActive: boolean }) => props.isActive ? 'nav-link-active' : 'has-hover-affect';

const Header: FC = () => {
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [navbarExpand, setNavbarExpand] = useState<string>('');
  const {currentUser, logout} = useStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top container-fluid navbar-inner">
      <Logo/>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded={!!navbarExpand} aria-label="Toggle navigation"
              onClick={() => setNavbarExpand(navbarExpand ? '' : 'show')}
      >
        <span className="navbar-toggler-icon"/>
      </button>

      <div className={`collapse navbar-collapse ${navbarExpand}`} id="navbarSupportedContent">
        <ul className="navbar-nav has-text-secondary">
          <li className="nav-item active">
            <NavLink to={RoutesPathsConstants.Root} className={navLinkClassName}>Home</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to={RoutesPathsConstants.Trade} className={navLinkClassName}>Trade</NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">

          <li className="nav-item d-flex">
            {currentUser ?
              <UserInfo/>
              :
              <span className="has-hover has-hover-affect has-text-secondary has-hover-underline"
                    onClick={() => setLoginIsOpen(true)}>Sign In <i className="fas fa-sign-in-alt"></i></span>
            }
          </li>

          <li className="nav-item d-flex align-items-center has-text-secondary">
            <span className="has-hover">
              {currentUser &&
                <span onClick={logout} className="has-hover has-hover-affect">
                 Sign out <i className="fas fa-sign-out-alt"/>
                </span>
              }
            </span>
          </li>
        </ul>
      </div>

      {loginIsOpen && <LoginModal onClose={() => setLoginIsOpen(false)} show={loginIsOpen}/>}
    </nav>
  );
};

export default Header;
