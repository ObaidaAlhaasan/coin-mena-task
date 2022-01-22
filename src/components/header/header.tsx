import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

import RoutesPathsConstants from "../../routes/routes-paths-constants";
import LoginModal from "../modals/login/login";
import { useStore } from "../../store/store";
import Logo from "../logo/logo";
import UserInfo from "./components/user-info/user-info";
import ModalPortal from "../modal-portal/modal-portal";

const navLinkClassName = (props: { isActive: boolean }) =>
  props.isActive ? "nav-link-active" : "has-hover-affect";

const Header: FC = () => {
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [navbarExpand, setNavbarExpand] = useState<string>("");
  const { currentUser, logout } = useStore();
  const [navBarColor, setNavBarColor] = useState<string>("text-white");

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (window.scrollY < 700 && navBarColor !== "text-white")
        return setNavBarColor("text-white");

      if (window.scrollY > 700 && navBarColor !== "text-secondary")
        return setNavBarColor("text-secondary");
    };

    window.addEventListener("scroll", onScroll);

    return function cleanup() {
      window.removeEventListener("scroll", onScroll);
    };
  }, [navBarColor]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top container-fluid navbar-inner position-fixed">
      <Logo />
      <button
        className={`navbar-toggler ${navBarColor} has-border-color-white`}
        type="button"
        data-toggle="collapse"
        data-target="/navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={!!navbarExpand}
        aria-label="Toggle navigation"
        onClick={() => setNavbarExpand(navbarExpand ? "" : "show")}
      >
        <i className="fas fa-bars" />
      </button>

      <div
        className={`collapse navbar-collapse ${navbarExpand} ${navBarColor}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ">
          <li className="nav-item active">
            <NavLink
              to={RoutesPathsConstants.Root}
              className={navLinkClassName}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink
              to={RoutesPathsConstants.Trade}
              className={navLinkClassName}
            >
              Trade
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item d-flex">
            {currentUser ? (
              <UserInfo />
            ) : (
              <span
                className="has-hover has-hover-affect  has-hover-underline"
                onClick={() => setLoginIsOpen(true)}
              >
                Sign In <i className="fas fa-sign-in-alt"></i>
              </span>
            )}
          </li>

          <li className="nav-item d-flex align-items-center ">
            <span className="has-hover">
              {currentUser && (
                <span onClick={logout} className="has-hover has-hover-affect">
                  Sign out <i className="fas fa-sign-out-alt" />
                </span>
              )}
            </span>
          </li>
        </ul>
      </div>

      {loginIsOpen && (
        <ModalPortal>
          <LoginModal
            onClose={() => setLoginIsOpen(false)}
            show={loginIsOpen}
          />
        </ModalPortal>
      )}
    </nav>
  );
};

export default Header;
