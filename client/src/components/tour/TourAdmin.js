import { React, useState } from "react";
import {
  Button,
  Container,
  Form,
  ModalTitle,
  Modal,
  Alert,
  Nav,
  Navbar,
  Card,
  Table,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeTour } from "../../http/index";
import { useDispatch } from "react-redux";
import egyp from "../../assets/Egypt3.jpg";
import { deleteTourItem, getTours } from "../../store/tourStore/tourSlice";

const ADMIN = "ADMIN";
const USER = "USER";
const isAuth = USER;

const device = [
  {
    id: 1,
    name: "Туризм",
  },
  {
    id: 2,
    name: "Круиз",
  },
];

const TourAdmin = ({ tour, index }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [name, setName] = useState(tour.name);
  const [type, setType] = useState(tour.type);
  const [date, setDate] = useState(tour.date);
  const [country, setCountry] = useState(tour.country);
  const [city, setCity] = useState(tour.city);
  const [price, setPrice] = useState(tour.price);
  const [duration, setDuration] = useState(tour.duration);
  const [linkPhoto, setLinkPhoto] = useState(tour.linkPhoto);

  const update = () => {
    // dispatch(sentCreateTour({ name, type, date, country, city, price, duration, linkPhoto}));
    console.log({
      name,
      type,
      date,
      country,
      city,
      price,
      duration,
      linkPhoto,
    });
    setName("");
    setType("");
    setDate("");
    setCountry("");
    setCity("");
    setPrice("");
    setDuration("");
    setLinkPhoto("");
    dispatch(getTours());
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{tour.name}</td>
        <td>{tour.type}</td>
        <td>{tour.city}</td>
        <td>{tour.country}</td>
        <td>{tour.date}</td>
        <td style={{ alignItems: "center" }}>{tour.duration}</td>
        <td>{tour.price}</td>
        <td>
          <Button
            variant="success"
            className="m-1"
            onClick={() => setShow(true)}
          >
            Редоктировать
          </Button>
        </td>
        <td>
          <Button
            variant="danger"
            className="m-2"
            onClick={() => {
              dispatch(deleteTourItem({ id: tour._id }));
              dispatch(getTours());
            }}
          >
            Удалить
          </Button>
        </td>
      </tr>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <ModalTitle>Редоктировать</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTourName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                className="mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Название тура"}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCountry">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                className="mb-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={"Страны"}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>Города</Form.Label>
              <Form.Control
                className="mb-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={"Города"}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                className="mb-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={"Цена"}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDuration">
              <Form.Label>Длительность</Form.Label>
              <Form.Control
                className="mb-2"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder={"Длительность"}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhoto">
              <Form.Label>Сылка на фото</Form.Label>
              <Form.Control
                className="mb-2"
                value={linkPhoto}
                onChange={(e) => setLinkPhoto(e.target.value)}
                placeholder={"Сылка на фото"}
              />
            </Form.Group>

            <div style={{ display: "flex", gap: "10%" }}>
              <div style={{ textAlign: "center" }}>
                <div>
                  <div>
                    <Form.Group controlId="duedate">
                      <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>

              <Dropdown>
                <Dropdown.Toggle>{type || "Выберите тип"}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {device.map((type) => (
                    <Dropdown.Item
                      onClick={() => setType(type.name)}
                      key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Button
              style={{ marginLeft: "80%", marginTop: "10%" }}
              className="mt-2 ml-5"
              variant="success"
              onClick={update}
            >
              Отправить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TourAdmin;
// <Card className="mt-4" style={{ width: "18rem", height: "27rem", alignContent: "center" }}>
//   <Card.Img variant="top" src={egyp} />
//   <Card.Body>
//     <Card.Title>{tour.country + " - " + tour.type}</Card.Title>
//       <Card.Text>
//         {tour._id}
//         <br/>
//         {tour.name}
//         <br/>
//         {tour.city}
//         <br/>
//         {tour.duration}
//       </Card.Text>
//     <Card.Text>{tour.price}</Card.Text>
//     <div className="d-flex">
//          {isAuth === ADMIN ?
//          (<Button variant="primary" className="m-1"  >Редоктировать</Button>) :
//          (<Navbar>
//             <Container>
//               <Navbar.Collapse id="responsive-navbar-nav">
//               <Nav variant="dark" className="me-auto gap-2">
//                   <Link id="RouterNavLink" to='/tour/details' className='text-decoration-none' state={{tour}}>
//                     <Button variant="primary" className="m-1">Подробнее</Button>
//                   </Link>
//               </Nav>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>)}
//         <Button variant="primary" className="m-2" onClick={() => {
//                   dispatch(deleteTourItem({id: tour._id}));
//                   dispatch(getTours());}}
//         >Удалить</Button>
//     </div>
//   </Card.Body>
// </Card>
