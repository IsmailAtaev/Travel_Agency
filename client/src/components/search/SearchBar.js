import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Button, Col, Form, Container } from "react-bootstrap";
import TourItem from "../../components/tour/tourItem";

const stl = {
  boxSizing: "border-box",
  border: "1px solid black",
  display: "inline-block",
  width: "300px",
  margin: "auto",
  textAlign: "center",
  padding: "10px",
};

const footer = {
  backgroundColor: "#f1f1f1",
  borderRadius: "35px",
  boxShadow: "10px 10px 40px #E2E0EE",
  text: "center",
};

const SearchBar = () => {
  const tours = useSelector((state) => state.tour.tours);
  //const t = useSelector((state) => state.tour.tours);
  const [from, setFrom] = useState("");
  const [where, setWhere] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [arrTour, setArrTour] = useState({});
  const [flagSearch, setFlagSearch] = useState(false);
  const [flag, setFlag] = useState(false);
  const arr = [];

  const handleSubmitSearch = () => {
    if (JSON.stringify(arrTour) === "{}") {
      if (where.length > 1) {
        tours.map((elem) => {
          if (
            where === elem.city &&
            duration === JSON.stringify(elem.duration) &&
            date === elem.date
          ) {
            setArrTour(elem);
            setFlagSearch(true);
            setFlag(false);
          }
        });
      } else {
        setFlagSearch(false);
        setFlag(true);
      }
    } else {
      let count = 0;
      console.log("dd ", arrTour);
      tours.map((v) => {
        if (
          arrTour.city === v.city &&
          where === v.city &&
          JSON.stringify(arrTour.duration) === JSON.stringify(v.duration) &&
          duration === JSON.stringify(v.duration) &&
          arrTour.date === v.date &&
          date === v.date
        ) {
          count++;
          return;
          // setArrTour(v);
          // setFlagSearch(true);
          // setFlag(false);
        }
        //console.log(v);
      });

      if (count === 0) {
        // setArrTour({});
        setFlagSearch(false);
        setFlag(true);
      } else {
        setFlagSearch(true);
        setFlag(false);
      }
      //console.log(tours);
    }
  };

  return (
    <>
      <div className="container my-3 rounded text-dark" style={footer}>
        <Container className="pt-3 justify-content-md-center">
          <Col xs={8} md={12}>
            <Form>
              <Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control
                    type="text"
                    placeholder="Откуда"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control
                    type="text"
                    placeholder="Куда"
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                  />
                </Form.Group>
                <div className="col-md-3 row">
                  <Form.Group className="mb-3" controlId="duedate">
                    <Form.Control
                      type="date"
                      name="duedate"
                      placeholder="Когда"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Form.Group as={Col} controlId="formSearchDuration">
                  <Form.Control
                    type="text"
                    placeholder="Длительность"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Form.Group>
                <Button
                  as={Col}
                  className="mb-3"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitSearch}
                >
                  Поиск тура
                </Button>
              </Row>
            </Form>
          </Col>
        </Container>
      </div>
      <div
        className="container my-2 rounded text-dark"
        style={{ marginLeft: "35%" }}
      >
        {flagSearch === true ? (
          <TourItem key={arrTour._id} tour={arrTour} />
        ) : (
          ""
        )}
        {flag === true ? "нету такого тура " : ""}
      </div>
    </>
  );
};

export default SearchBar;
{
  /* 
        {flagSearch === true ? (
          <div>
            {JSON.stringify(arrTour) === "{}" ? (
              <div>
                <div>Нету такого тура</div>
              </div>
            ) : (
            
            )}
          </div>
        ) : (
          ""
        )} */
}
