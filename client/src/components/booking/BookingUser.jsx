import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore, useDispatch, useSelector } from "react-redux";
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
import CustomerBooking from "./customerBooking/CustomerBooking";
import {
  addMainClient,
  addTour,
  bookingTourSlice,
  getValidateCard,
  getBookingUser,
} from "../../store/customerStore/customerSlice";
import { decrypted, encrypted } from "../../cryptoInfo/encrypt";
import { checkNum } from "../../check/checkNum";
import { checkLatinString } from "../../check/checkLatinString";
import { checkLuhn } from "../../check/checkLuhn";

const BookingUser = () => {
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const store = useStore();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [mm, setMm] = useState("");
  const [gg, setGg] = useState("");
  const [cvvCvc, setCvvCvc] = useState("");
  const [codeId, setCodeId] = useState("");

  const [flagInputFirstName, setFlagInputFirstName] = useState({});
  const [flagInputLastName, setFlagInputLastName] = useState({});
  const [flagInputNumber, setFlagInputNumber] = useState({});

  const [flagInputCardNumber, setFlagInputCardNumber] = useState({});
  const [flagInputCvC, setFlagInputCvC] = useState({});
  const [flagInputCardValid, setFlagInputCardValid] = useState({});

  const checkClientInfo = () => {
    const flagNum = checkNum(phoneNumber);
    const flagFirstName = checkLatinString(firstName);
    const flagLastName = checkLatinString(lastName);

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
      flagNum &&
      flagFirstName &&
      flagLastName &&
      phoneNumber.length > 8 &&
      firstName.length > 3 &&
      lastName.length > 3
    ) {
      setFlagInputNumber({ border: "2px solid  #DADADA" });
      setFlagInputFirstName({ border: "2px solid  #DADADA" });
      setFlagInputLastName({ border: "2px solid  #DADADA" });
      handleSubmit();
    }
  };

  const { tour } = location.state;

  const countCustomer = [1];

  /** */
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

  const handleSubmit = (e) => {
    dispatch(getValidateCard({ email: user.email }));
    dispatch(
      addMainClient({
        mainClient: {
          firstName,
          lastName,
          phoneNumber,
          email: user.email,
          id: user.id,
          isActivated: user.isActivated,
          role: user.role,
          nickName: user.nickName,
        },
      })
    );
    dispatch(addTour({ tour: tour }));
    //setTrigger((trigger) => trigger + 1);
    setShow(true);
  };

  const checkCard = (e) => {
    const validCardNumber = checkLuhn(cardNumber);
    const validNumCvC = checkNum(cvvCvc);

    if (validCardNumber) {
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

    if (validCardNumber && validNumCvC && codeId.length === 4) {
      setFlagInputCardNumber({ border: "2px solid  #DADADA" });
      setFlagInputCvC({ border: "2px solid  #DADADA" });
      setFlagInputCardValid({ border: "2px solid  #DADADA" });
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setCardNumber("");
      setCardHolder("");
      setMm("");
      setGg("");
      setCvvCvc("");
      setCodeId("");
      handleSubmitCard();
    }
  };

  const handleSubmitCard = (e) => {
    const card = { cardNumber, cardHolder, mm, gg, cvvCvc, codeId };
    const obj = store.getState();
    let objectClient = { ...obj.customer, card: card };
    objectClient.customers = [...info];
    console.log("info: ", info);
    console.log("card: ", card);
    console.log("objectClient: ", objectClient);
    dispatch(bookingTourSlice(encrypted(JSON.stringify(objectClient))));
    // dispatch(getBookingUser(user));
    setShow(false);
    console.log("user sikim ", user);
    dispatch(getBookingUser(user));
    dispatch(addTour({}));
  };
  //style={{boxShadow: '10px 10px 40px #E2E0EE'}}
  return (
    <div>
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

      <Container>
        {info.map((i, index) => (
          <Row
            className="border rounded justify-content-md-center mt-3 ml-5 p-3 mb-2 bg-light text-dark "
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
                <Col>
                  {index === 0 ? (
                    ""
                  ) : (
                    <Button
                      variant={"outline-danger"}
                      onClick={() => removeInfo(i.number)}
                    >
                      Удалить
                    </Button>
                  )}
                </Col>
              </Form>
            </Col>
          </Row>
        ))}

        <Row
          className="border rounded justify-content-md-center mt-4 ml-5 p-3 mb-2 bg-light text-dark"
          style={{ boxShadow: "10px 10px 40px #E2E0EE" }}
        >
          <Col xs={12} md={8}>
            <Form>
              <h4>Контактные данные</h4>
              <hr className="text-secondary d-none d-sm-block" />
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridPhoneNumber">
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ведите номер телефона"
                    value={phoneNumber}
                    style={flagInputNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите фамилию"
                    controlId="formFirstName"
                    value={firstName}
                    style={flagInputFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ведите имя"
                    controlId="formGridLastNameClient"
                    value={lastName}
                    style={flagInputLastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ marginLeft: "44%" }}>
        <Button
          style={{ boxShadow: "10px 10px 40px #E2E0EE" }}
          className="mt-4 mb-2"
          variant="primary"
          type="submit"
          size="lg"
          onClick={checkClientInfo}
        >
          Бронировать тур
        </Button>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <ModalTitle>Оплата тура</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCardNumber">
              <Form.Control
                type="text"
                value={cardNumber}
                style={flagInputCardNumber}
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
                type="text"
                style={flagInputCvC}
                value={cvvCvc}
                onChange={(e) => setCvvCvc(e.target.value)}
                placeholder="CVV/CVC2"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCardCVV">
              <Form.Label>Код потверждения отправлен на почту</Form.Label>
              <Form.Control
                type="text"
                style={flagInputCardValid}
                value={codeId}
                onChange={(e) => setCodeId(e.target.value)}
                placeholder="4 символа"
              />
            </Form.Group>

            <Button className="mt-2 ml-5" variant="primary" onClick={checkCard}>
              Оплатить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingUser;
