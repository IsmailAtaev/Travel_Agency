import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../../store/customerStore/customerSlice";
import { Row, Col, Form } from "react-bootstrap";
import { arrCountries } from "../../../utils/countries";

const CustomerBooking = ({ trigger }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState({ sex: "" });
  const [birthDate, setBirthDate] = useState(new Date());
  const [citizenship, setCitizenship] = useState("");
  const [passportSeriesAndNumber, setPassportSeriesAndNumber] = useState("");
  const [dateOfPassport, setDateOfPassport] = useState(new Date());
  const [validityPeriod, setValidityPeriod] = useState(new Date());

  useEffect(() => {
    if (trigger) {
      dispatch(
        addCustomer({
          firstName,
          lastName ,
          gender: gender.sex,
          birthDate,
          citizenship,
          passportSeriesAndNumber,
          dateOfPassport,
          validityPeriod,
        })
      );
      // setFirstName("");
      // setLastName("");
      // setGender("");
      // setBirthDate(new Date());
      // setCitizenship("");
      // setPassportSeriesAndNumber("");
      // setDateOfPassport(new Date());
      // setValidityPeriod(new Date());
    }
  }, [trigger]);

  const { sex } = gender;
  const handleChange = (e) => {
    e.persist();
    setGender((prevState) => ({
      ...prevState,
      sex: e.target.value,
    }));
  };

  return (
    <Row className="border rounded justify-content-md-center mt-5 ml-5 p-3 mb-2 bg-light text-dark ">
      <Col xs={12} md={8}>
        <Form>
          <h4>Клиент</h4>
          <hr className="text-secondary d-none d-sm-block" />
          <Row className="mb-3 mt-3">
            <Form.Group
              as={Col}
              controlId="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            >
              <Form.Label>Имя латиницей</Form.Label>
              <Form.Control type="text" placeholder="Ведите имя" />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            >
              <Form.Label>Фамилия латиницей</Form.Label>
              <Form.Control type="text" placeholder="Ведите фамилию" />
            </Form.Group>

            <Form.Group as={Col} controlId="RadioButton">
              <Form.Label>Пол</Form.Label>
              <br />
              <Form.Check
                inline
                type="radio"
                value="Женский"
                aria-label="radio 1"
                label="Женский"
                id="inline-radio-1"
                onChange={handleChange}
                checked={sex === "Женский"}
              />

              <Form.Check
                inline
                type="radio"
                value="Мужской"
                label="Мужской"
                id="inline-radio-2"
                onChange={handleChange}
                checked={sex === "Мужской"}
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
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Form.Group>
            </div>

            <Form.Group as={Col} controlId="AllCountries">
              <Form.Label>Гражданство</Form.Label>
              <Form.Select onChange={(e) => setCitizenship(e.target.value)}>
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
              controlId="PasportNumber"
              value={passportSeriesAndNumber}
              onChange={(e) => setPassportSeriesAndNumber(e.target.value)}
            >
              <Form.Label>Серия и Номер паспорта</Form.Label>
              <Form.Control type="text" placeholder="Ведите имя" />
            </Form.Group>

            <div className="col-md-3 row">
              <Form.Group className="mb-3" controlId="duedate">
                <Form.Label>Дата выдачи</Form.Label>
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  onChange={(e) => setDateOfPassport(e.target.value)}
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
                  onChange={(e) => setValidityPeriod(e.target.value)}
                />
              </Form.Group>
            </div>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CustomerBooking;
