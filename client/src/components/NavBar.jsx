import React, { useState, useEffect } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Button,
  Container,
  Form,
  ModalTitle,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { login, registration } from "../store/user/userStore";
import { setUser } from "../store/user/userStore";
import { setBookingUser } from "../store/customerStore/customerSlice";
import { checkEmail } from "../check/checkEmail";

const Styles = styled.div`
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #adb1b8;

    &:hover {
      color: white;
    }
  }
`;

const NavBar = ({ setTrigger, isAuth, trigger, eee, user, setIsAuth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("USER");
  const userStore = useSelector((state) => state);
  const [flagValidEmail, setFlagValidEmail] = useState({});
  const [flagLength, setFlagLength] = useState({});
  const [flagPass, setFlagPass] = useState({});

  const checkInputEmail = () => {
    console.log("e ", checkEmail(email));
    const emailFlag = checkEmail(email);
    const nick = nickName.length > 0;
    const pass = password.length > 0;

    if (emailFlag) {
      setFlagValidEmail({ border: "2px solid #17F800" });
    } else {
      setFlagValidEmail({ border: "2px solid  #FF0000" });
      setEmail("");
    }
    if (nick) {
      setFlagLength({ border: "2px solid #17F800" });
    } else {
      setFlagLength({ border: "2px solid #FF0000" });
      setNickName("");
    }
    if (pass) {
      setFlagPass({ border: "2px solid #17F800" });
    } else {
      setFlagPass({ border: "2px solid #FF0000" });
      setPassword("");
    }
    if (emailFlag === true && pass === true && nick === true) {
      console.log("vse norm vveli");
      loginRegistration();
      setFlagValidEmail({ border: "1px solid #DADADA" });
      setFlagLength({ border: "1px solid #DADADA" });
      setFlagPass({ border: "1px solid #DADADA" });
    }
  };

  const loginRegistration = () => {
    setShow(false);
    if (!flag) {
      dispatch(registration({ email, password, role, nickName }));
    } else {
      dispatch(login({ email, password, nickName }));
    }
    setNickName("");
    setEmail("");
    setPassword("");
    setTrigger((trigger) => trigger + 1);
  };

  const handleClickLogout = () => {
    setIsAuth(false);
    dispatch(setUser({}));
    dispatch(setBookingUser({}));
    //navigate('/');
  };

  return (
    <>
      <Styles>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Link className="text-decoration-none" to="/">
              <Navbar.Brand>
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top me-2 text-decoration-none"
                  alt="logo"
                />
                Travel
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav variant="dark" className="me-auto gap-2">
                <Link
                  id="RouterNavLink"
                  to="/"
                  className="text-decoration-none"
                >
                  Главная
                </Link>
                <Link
                  id="RouterNavLink"
                  to="/tours"
                  className="text-decoration-none"
                >
                  Туры
                </Link>
                <Link
                  id="RouterNavLink"
                  to="/about"
                  className="text-decoration-none"
                >
                  О нас
                </Link>
              </Nav>
              <Nav>
                {isAuth === true ? (
                  <div className="dropdown open">
                    <a
                      className="bg-dark text-decoration-none text-white p-1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      id="triggerId"
                    >
                      <i className="bi bi-person-circle"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        {user.nickName}
                      </span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                      <Link
                        id="RouterNavLink"
                        to="/account"
                        className="text-decoration-none"
                        state={{ user }}
                      >
                        <a className="dropdown-item text-dark" href="#">
                          <i className="bi bi-person"></i>
                          <span className="ms-2 d-none d-sm-inline">
                            Профиль
                          </span>
                        </a>
                      </Link>
                      {user.role !== "ADMIN" ? (
                        <>
                          <Link
                            id="RouterNavLink"
                            to="/booking/basket"
                            className="text-decoration-none"
                          >
                            <a className="dropdown-item text-dark" href="#">
                              <i className="bi bi-clipboard2-data-fill"></i>
                              <span className="ms-2 d-none d-sm-inline">
                                Бронь
                              </span>
                            </a>
                          </Link>
                          <Link
                            id="RouterNavLink"
                            to="/ticket/user"
                            className="text-decoration-none"
                          >
                            <a className="dropdown-item text-dark" href="#">
                              <i className="bi bi-ticket-detailed-fill"></i>
                              <span className="ms-2">Билеты</span>
                            </a>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}

                      <Link
                        id="RouterNavLink"
                        to="/"
                        className="text-decoration-none"
                      >
                        <a
                          className="dropdown-item text-dark"
                          href="#"
                          onClick={handleClickLogout}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span className="ms-2 d-none d-sm-inline">Выйти</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => {
                        setShow(true);
                        setFlag(true);
                      }}
                    >
                      Войти
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShow(true);
                        setFlag(false);
                      }}
                    >
                      Регистрация
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Styles>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <ModalTitle>{flag === true ? "Войти" : "Регистрация"}</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicNickName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                style={flagLength}
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Введите имя"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                style={flagValidEmail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите почту"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                style={flagPass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </Form.Group>
            <Button
              className="mt-2 ml-5"
              variant="primary"
              onClick={checkInputEmail}
            >
              Отправить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;

//ismaissy2001@gmail.com
