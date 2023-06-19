import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore, useDispatch } from "react-redux";
import {
  Row,
  Button,
  Col,
  Form,
  Container,
  ModalTitle,
  Modal,
  Nav,
  Navbar,
  Card,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { arrCountries } from "../../utils/countries";
import Customer from "./сustomer/Customer";
import {
  addMainClient,
  addTour,
  buyTour,
  getValidateCard,
} from "../../store/customerStore/customerSlice";
import { decrypted, encrypted } from "../../cryptoInfo/encrypt";
import { checkLatinString } from "../../check/checkLatinString";
import { checkEmail } from "../../check/checkEmail";
import { checkNum } from "../../check/checkNum";
import { checkLuhn } from "../../check/checkLuhn";

/**
    last name - фамилия 
    first name - имя 
    patronymic - отчество
    Citizenship - Гражданство
    Passport series and number - Серия и Номер паспорта
    Date of passport - Дата выдачи паспорта
    Validity period - Срок действия
    Passport issued by - Паспорт, выданный
 */

const ClientInfo = () => {
  const location = useLocation();
  const { tour } = location.state;

  const store = useStore();
  const [trigger, setTrigger] = useState(0);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const countCustomer = [1, 2];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [mm, setMm] = useState("");
  const [gg, setGg] = useState("");
  const [cvvCvc, setCvvCvc] = useState("");
  const [codeId, setCodeId] = useState("");

  const [flagInputFirstName, setFlagInputFirstName] = useState({});
  const [flagInputEmail, setFlagInputEmail] = useState({});
  const [flagInputNumber, setFlagInputNumber] = useState({});
  const [flagInputLastName, setFlagInputLastName] = useState({});

  const [flagInputCardNumber, setFlagInputCardNumber] = useState({});
  const [flagInputCvC, setFlagInputCvC] = useState({});
  const [flagInputCardValid, setFlagInputCardValid] = useState({});

  /** for add customers fly */
  const [info, setInfo] = useState([
    {
      firstName: "",
      lastName: "",
      sex: "",
      citizenship: "",
      birthDate: "",
      passportSeriesAndNumber: "",
      dateOfPassport: "",
      validityPeriod: "",
      number: Date.now(),
    },
  ]);

  const addInfo = () => {
    setInfo([
      ...info,
      {
        firstName: "",
        lastName: "",
        sex: "",
        citizenship: "",
        birthDate: "",
        passportSeriesAndNumber: "",
        dateOfPassport: "",
        validityPeriod: "",
        number: Date.now(),
      },
    ]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const checkClientInfo = () => {
    const flagEmail = checkEmail(email);
    const flagNum = checkNum(phoneNumber);
    const flagFirstName = checkLatinString(firstName);
    const flagLastName = checkLatinString(lastName);

    if (email.length > 5 && flagEmail) {
      setFlagInputEmail({ border: "2px solid  #17F800" });
    } else {
      setFlagInputEmail({ border: "2px solid  #FF0000" });
      setEmail("");
    }

    if (phoneNumber.length > 8 && flagNum) {
      setFlagInputNumber({ border: "2px solid  #17F800" });
    } else {
      setFlagInputNumber({ border: "2px solid  #FF0000" });
      setPhoneNumber("");
    }

    if (firstName.length > 3 && flagFirstName) {
      setFlagInputFirstName({ border: "2px solid  #17F800" });
    } else {
      setFlagInputFirstName({ border: "2px solid  #FF0000" });
      setFirstName("");
    }

    if (lastName.length > 3 && flagLastName) {
      setFlagInputLastName({ border: "2px solid  #17F800" });
    } else {
      setFlagInputLastName({ border: "2px solid  #FF0000" });
      setLastName("");
    }

    if (
      flagEmail &&
      flagNum &&
      flagFirstName &&
      flagLastName &&
      email.length > 5 &&
      phoneNumber.length > 8 &&
      firstName.length > 3 &&
      lastName.length > 3
    ) {
      setFlagInputEmail({ border: "2px solid  #DADADA" });
      setFlagInputNumber({ border: "2px solid  #DADADA" });
      setFlagInputFirstName({ border: "2px solid  #DADADA" });
      setFlagInputLastName({ border: "2px solid  #DADADA" });
      handleSubmit();
    }
  };

  const checkCard = (e) => {
    const validCardNumber = checkLuhn(cardNumber);
    const validNumCvC = checkNum(cvvCvc);

    if (validCardNumber && cardNumber.length > 5) {
      setFlagInputCardNumber({ border: "2px solid  #17F800" });
    } else {
      setFlagInputCardNumber({ border: "2px solid  #FF0000" });
    }
    if (validNumCvC) {
      setFlagInputCvC({ border: "2px solid  #17F800" });
    } else {
      setFlagInputCvC({ border: "2px solid  #FF0000" });
    }
    if (codeId.length === 4) {
      setFlagInputCardValid({ border: "2px solid  #17F800" });
    } else {
      setFlagInputCardValid({ border: "2px solid  #FF0000" });
    }

    if (
      validCardNumber &&
      validNumCvC &&
      codeId.length === 4 &&
      cardNumber.length > 5
    ) {
      setFlagInputCardNumber({ border: "2px solid  #DADADA" });
      setFlagInputCvC({ border: "2px solid  #DADADA" });
      setFlagInputCardValid({ border: "2px solid  #DADADA" });
      handleSubmitCard();
    }
  };

  const handleSubmit = () => {
    dispatch(getValidateCard({ email }));
    dispatch(
      addMainClient({
        mainClient: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      })
    );
    dispatch(addTour({ tour: tour }));
    setTrigger((trigger) => trigger + 1);
    setShow(true);
  };

  const handleSubmitCard = () => {
    const card = { cardNumber, cardHolder, mm, gg, cvvCvc, codeId };
    const obj = store.getState();
    console.log("obj: ", obj);
    let objectClient = { ...obj.customer, customers: [...info] };
    console.log("objectClient1: ", objectClient);
    objectClient.mainClient = {
      ...objectClient.mainClient,
      ...card,
    };
    console.log("objectClient2: ", objectClient);
    dispatch(buyTour(encrypted(JSON.stringify(objectClient))));
    setShow(false);
    setCardNumber("");
    setCardHolder("");
    setMm("");
    setGg("");
    setCvvCvc("");
    setCodeId("");
  };

  // useEffect(() => {
  //   if (trigger) {
  //     const obj = store.getState();
  //        dispatch(buyTour(encrypted(JSON.stringify(obj.customer))));
  //   }
  //   // const obj = store.getState();
  //   // const d = obj.customer;

  //   // console.log("obj : ", d);

  //   //console.log("info: ", customers);
  //   // let jj = JSON.stringify(d);
  //   // console.log("json: ", jj);
  //   // console.log("json: ", typeof jj);

  //   // let ff = JSON.parse(decrypted(encrypted(jj)));
  //   // console.log("parse: ");

  //   // console.log("parse: ", ff);
  //   // console.log("parse: ", typeof ff);
  //   console.log("parse: not trigger ");
  // }, [trigger]);

  return (
    <div>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Button
          style={{
            marginLeft: "70%",
            marginRight: "auto",
            boxShadow: "10px 10px 40px #E2E0EE",
          }}
          className="mt-4"
          variant="primary"
          onClick={addInfo}
        >
          Кто поедет
        </Button>
      </div>
      <Container>
        {info.map((i, index) => (
          <Row
            className="border rounded justify-content-md-center mt-5 ml-5 p-3 mb-2 bg-light text-dark"
            style={{ boxShadow: "10px 10px 40px #E2E0EE" }}
          >
            <Col xs={12} md={8}>
              <Form>
                <h4>Клиент {index + 1}</h4>
                <hr className="text-secondary d-none d-sm-block" />

                <Row className="mb-3 mt-3" key={i.number}>
                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    value={i.firstName}
                    onChange={(e) =>
                      changeInfo("firstName", e.target.value, i.number)
                    }
                  >
                    <Form.Label>Имя латиницей</Form.Label>
                    <Form.Control type="text" placeholder="Ведите имя" />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    value={i.lastName}
                    onChange={(e) =>
                      changeInfo("lastName", e.target.value, i.number)
                    }
                  >
                    <Form.Label>Фамилия латиницей</Form.Label>
                    <Form.Control type="text" placeholder="Ведите фамилию" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridRadioButton">
                    <Form.Label>Пол</Form.Label>
                    <br />
                    <Form.Check
                      inline
                      type="radio"
                      value="Женский"
                      aria-label="radio 1"
                      label="Женский"
                      id="inline-radio-1"
                      onChange={(e) => changeInfo("sex", "Женский", i.number)}
                      checked={i.sex === "Женский"}
                    />

                    <Form.Check
                      inline
                      type="radio"
                      value="Мужской"
                      label="Мужской"
                      id="inline-radio-2"
                      onChange={(e) => changeInfo("sex", "Мужской", i.number)}
                      checked={i.sex === "Мужской"}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3 mt-3">
                  <div className="col-md-3 row">
                    <Form.Group className="mb-3" controlId="duedate">
                      <Form.Label>Дата рождения</Form.Label>
                      <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        onChange={(e) =>
                          changeInfo("birthDate", e.target.value, i.number)
                        }
                      />
                    </Form.Group>
                  </div>

                  <Form.Group as={Col} controlId={i.number}>
                    <Form.Label>Гражданство</Form.Label>
                    <Form.Select
                      onChange={(e) =>
                        changeInfo("citizenship", e.target.value, i.number)
                      }
                    >
                      {arrCountries.map((country) => (
                        <option
                          className="p-3 mb-2 bg-secondary text-white"
                          value={country}
                          key={country._id}
                        >
                          {country}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridPasportNumber"
                    value={i.passportSeriesAndNumber}
                    onChange={(e) =>
                      changeInfo(
                        "passportSeriesAndNumber",
                        e.target.value,
                        i.number
                      )
                    }
                  >
                    <Form.Label>Серия и Номер паспорта</Form.Label>
                    <Form.Control type="text" placeholder="Ведите паспорт" />
                  </Form.Group>

                  <div className="col-md-3 row">
                    <Form.Group className="mb-3" controlId="duedate">
                      <Form.Label>Дата выдачи</Form.Label>
                      <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        onChange={(e) =>
                          changeInfo("dateOfPassport", e.target.value, i.number)
                        }
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-3 row">
                    <Form.Group className="mb-3" controlId="duedate">
                      <Form.Label>Срок действия</Form.Label>
                      <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        onChange={(e) =>
                          changeInfo("validityPeriod", e.target.value, i.number)
                        }
                      />
                    </Form.Group>
                  </div>
                </Row>

                {index === 0 ? (
                  ""
                ) : (
                  <Col>
                    <br />
                    <Button
                      variant={"outline-danger"}
                      onClick={() => removeInfo(i.number)}
                    >
                      Удалить
                    </Button>
                  </Col>
                )}
              </Form>
            </Col>
          </Row>
        ))}

        <Row
          style={{ boxShadow: "10px 10px 40px #E2E0EE" }}
          className="border rounded justify-content-md-center mt-4 ml-5 p-3 mb-2 bg-light text-dark"
        >
          <Col xs={12} md={7}>
            <Form>
              <h4>Контактные данные</h4>
              <hr className="text-secondary d-none d-sm-block" />
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Электронная почта</Form.Label>
                  <Form.Control
                    style={flagInputEmail}
                    type="text"
                    placeholder="Ведите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    style={flagInputNumber}
                    type="text"
                    placeholder="Ведите номер телефона"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form>Фамилия латиницей</Form>
                  <Form.Control
                    style={flagInputFirstName}
                    type="text"
                    placeholder="Введите фамилию"
                    controlId="formFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form>Имя латиницей</Form>
                  <Form.Control
                    style={flagInputLastName}
                    type="text"
                    placeholder="Ведите имя"
                    controlId="formGridLastNameClient"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
        <Button
          style={{ boxShadow: "10px 10px 40px #E2E0EE", marginLeft: "44%" }}
          className="mt-4 mb-2"
          variant="primary"
          type="submit"
          size="lg"
          // onClick={handleSubmit}
          onClick={checkClientInfo}
        >
          Далее
        </Button>
      </Container>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <ModalTitle>Оплата тура</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCardNumber">
              <Form.Control
                style={flagInputCardNumber}
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Номер карты"
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCardHolder">
              <Form.Control
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Держатель карты"
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicMM">
              <Form.Control
                type="text"
                value={mm}
                onChange={(e) => setMm(e.target.value)}
                placeholder="mm"
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCardGG">
              <Form.Control
                type="text"
                value={gg}
                onChange={(e) => setGg(e.target.value)}
                placeholder="gg"
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCardCVV">
              <Form.Control
                style={flagInputCvC}
                type="text"
                value={cvvCvc}
                onChange={(e) => setCvvCvc(e.target.value)}
                placeholder="CVV/CVC2"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCardCVV">
              <Form.Label>Код потверждения отправлен на почту</Form.Label>
              <Form.Control
                style={flagInputCardValid}
                type="text"
                value={codeId}
                onChange={(e) => setCodeId(e.target.value)}
                placeholder="4 символа"
              />
            </Form.Group>

            <Button
              className="mt-2 ml-5"
              variant="primary"
              // onClick={handleSubmitCard}
              onClick={checkCard}
            >
              Оплатить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientInfo;
