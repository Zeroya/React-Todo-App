import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../hooks/auth";
import s from "./NavBar.module.scss";

const NavBar: FC = () => {
  const { logout } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className={s.navBar}>
      <Container className={s.navBar__container}>
        <div className={s.user}>
          <div className={s.avatar}>
            <div className={s.avatar__img}>
              <img alt="my face" />
            </div>
            <span className={s.avatar__isOnline}></span>
          </div>
          <p className={`${s.user__name} ${s.rainbow__animated}`}>{userData.userName}</p>
        </div>
        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      </Container>
    </nav>
  );
};

export default NavBar;
