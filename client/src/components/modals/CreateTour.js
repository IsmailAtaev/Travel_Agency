import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import {createTour} from "../../http/index.js";
import {sentCreateTour, getTours} from "../../store/tourStore/tourSlice";

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


const CreateTour = ({ show, onHide }) => {


  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [linkPhoto, setLinkPhoto] = useState("");

  const addBrand = () => {
    onHide();
    //createTour({ name, type, date, country, city, price, duration});
    dispatch(sentCreateTour({ name, type, date, country, city, price, duration, linkPhoto}));
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
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{textAlign: "center"}} id="contained-modal-title-center">Добавить тур</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
    

          <Form.Control className="mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={"Название тура"} />
          <Form.Control className="mb-2" value={country} onChange={(e) => setCountry(e.target.value)} placeholder={"Страны"} />
          <Form.Control className="mb-2" value={city} onChange={(e) => setCity(e.target.value)} placeholder={"Города"} />
          <Form.Control className="mb-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={"Цена"} />
          <Form.Control className="mb-2" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder={"Длительность"} />
          <Form.Control className="mb-2" value={linkPhoto} onChange={(e) => setLinkPhoto(e.target.value)} placeholder={"Сылка на фото"} />
          


            <div style={{textAlign: "center"}}>
              <div className="row">
                  <div className="col-md-3">
                      <Form.Group controlId="duedate">
                          <Form.Control 
                            type="date"
                            name="duedate"
                            placeholder="Due date"
                            onChange={(e) => setDate(e.target.value)}
                            />
                      </Form.Group>
                  </div>
              </div>
            </div> 
        




            <Dropdown style={{textAlign: "center"}} className="mt-2 mb-2">
            <Dropdown.Toggle>{type || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.map((type) => (
                <Dropdown.Item onClick={() => setType(type.name)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>


        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTour;
