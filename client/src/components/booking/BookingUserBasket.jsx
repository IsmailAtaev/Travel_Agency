import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Nav,
  Navbar,
  Table,
  Button,
  Dropdown,
  Form,
  Modal,
  ModalTitle,
} from "react-bootstrap";
import { buyTourValidationUser } from "../../store/user/userStore";
import { decrypted, encrypted } from "../../cryptoInfo/encrypt";
import { buyTourValidUser } from "../../http/index";
import {
  getValidateCard,
  cancelBookingTour,
  getBookingUser,
} from "../../store/customerStore/customerSlice";

function BookingUserBasket() {
  const [bookingUser, setBookingUser] = useState([]);
  const [show, setShow] = useState(false);
  const [buyBookingTour, setBuyBookingTour] = useState({});

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [mm, setMm] = useState("");
  const [gg, setGg] = useState("");
  const [cvvCvc, setCvvCvc] = useState("");
  const [codeId, setCodeId] = useState("");

  const bookings = useSelector((state) => state.customer.booking);
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(true);

  const handleSubmitCard = async (bookingInfoUser) => {
    setBuyBookingTour(bookingInfoUser);
    dispatch(getValidateCard({ email: bookingInfoUser.userInfo.email }));
    setShow(true);
  };

  const buyTourUser = async () => {
    const card = { cardNumber, cardHolder, mm, gg, cvvCvc, codeId };
    const sentInfo = {
      ...buyBookingTour,
      card: { ...card },
    };
    dispatch(buyTourValidationUser(encrypted(JSON.stringify(sentInfo))));
    setShow(false);
    setTimeout(setTrigger, 100, true);
  };

  const cancelSubmit = async (cancelTourObj) => {
    const cancelBooking = {
      userId: cancelTourObj.userInfo._id,
      tourId: cancelTourObj.tourInfo._id,
      bookingId: cancelTourObj.bookingInfo._id,
    };
    dispatch(cancelBookingTour(cancelBooking));
    dispatch(getBookingUser(user));
    // const user = {
    //   email: cancelTourObj.userInfo.email,
    //   id: cancelTourObj.userInfo._id,
    //   isActivated: cancelTourObj.userInfo.isActivated,
    //   nickName: cancelTourObj.userInfo.nickName,
    //   role: cancelTourObj.userInfo.role,
    // };
  };

  useEffect(() => {
    setBookingUser(bookings);
    if (trigger) {
      dispatch(getBookingUser(user));
      setTrigger(false);
    }
  }, [bookings, trigger]);

  return (
    <div style={{ margin: "0% 2%" }}>
      <h4 style={{ marginLeft: "40%", marginTop: "1%" }}>
        Забронированные туры
      </h4>
      <div className="d-flex justify-content-center row gy-3 m-lg-2 gap-2 m-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Тур</th>
              <th>Кто едит</th>
              <th>Цена</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((elem, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Название тура:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.name}
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Страна:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.country}
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Город:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.city}
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Длительность:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.duration}
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Туп тура:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.type}
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Цена одного тура:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourInfo.price}
                      </div>
                    </div>
                  </td>

                  <td>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Фамилия</th>
                          <th>Имя</th>
                          <th>Дата рождения</th>
                          <th>Пол</th>
                        </tr>
                      </thead>

                      <tbody>
                        {elem.bookingInfo.customers.map((value) => {
                          return (
                            <tr>
                              <td style={{ marginLeft: "10%" }}>
                                {value.firstName}
                              </td>
                              <td style={{ marginLeft: "20%" }}>
                                {value.lastName}
                              </td>
                              <td style={{ marginLeft: "30%" }}>
                                {value.birthDate}
                              </td>
                              <td style={{ marginLeft: "40%" }}>
                                {value.gender}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </td>
                  <td>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Общая стоимость:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.bookingInfo.price}
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Оплачено:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.bookingInfo.pay}
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Нужно оплатить:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.bookingInfo.needToPay}
                      </div>
                    </div>
                  </td>
                  <td>
                    <br />
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={(e) => handleSubmitCard(elem)}
                    >
                      Оплатить
                    </Button>

                    <br />
                    <br />
                    <Button
                      variant="danger"
                      className="mt-2"
                      onClick={(e) => cancelSubmit(elem)}
                    >
                      Отменить
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
                value={cvvCvc}
                onChange={(e) => setCvvCvc(e.target.value)}
                placeholder="CVV/CVC2"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCardCVV">
              <Form.Label>Код потверждения отправлен на почту</Form.Label>
              <Form.Control
                type="text"
                value={codeId}
                onChange={(e) => setCodeId(e.target.value)}
                placeholder="4 символа"
              />
            </Form.Group>

            <Button
              className="mt-2 ml-5"
              variant="primary"
              onClick={buyTourUser}
            >
              Оплатить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* {bookings.map((elem) => {
        return (
          <div>
            {elem.customers.map((i) => {
              return <div>{i.firstName}</div>;
            })}
          </div>
        );
      })} */}
    </div>
  );
}

export default BookingUserBasket;
