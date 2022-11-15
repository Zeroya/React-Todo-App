import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../hooks/auth";
import s from "./NavBar.module.scss";

const NavBar: FC = () => {
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className={s.navBar}>
      <Container className={s.navBar__container}>
        <Button variant="danger" onClick={logoutHandler}>
          Logout
        </Button>
      </Container>
    </nav>
  );
};

export default NavBar;
