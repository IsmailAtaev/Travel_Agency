import React from "react";
import {Button, Container, Form, ModalTitle, Modal, Nav, Navbar, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {removeTour} from "../../http/index"
import {useDispatch} from "react-redux";
import egyp from "../../assets/Egypt3.jpg";
import {deleteTourItem, getTours} from "../../store/tourStore/tourSlice";


const ADMIN = "ADMIN";
const USER = "USER";
const isAuth = USER;

const TourItem = ({ tour }) => {
  const dispatch = useDispatch();
 //style={{ boxShadow: "10px 10px 40px #E2E0EE" }}
  return (
    <Card className="mt-4" style={{ width: "18rem", height: "30rem", alignContent: "center", boxShadow: "10px 10px 40px #E2E0EE" }}>
      <Card.Img variant="top" src={tour.linkPhoto} style={{ width: "100%", height: "190px" }}/>
      <Card.Body> 
        <Card.Title style={{textAlign: "center"}}>{tour.name}</Card.Title>
          <Card.Text>
            <div className="d-flex" style={{gap: "5%", marginBottom: "2%"}}><h6>Страна:</h6>{tour.country}</div>
            <div className="d-flex" style={{gap: "5%", marginBottom: "2%"}}><h6>город:</h6>{tour.city}</div>
            <div className="d-flex" style={{gap: "5%", marginBottom: "2%"}}><h6>Длительность:</h6>{tour.duration}</div>
            <div className="d-flex" style={{gap: "5%", marginBottom: "2%"}}><h6>Тип:</h6>{tour.type}</div>
            <div className="d-flex" style={{gap: "5%", marginBottom: "2%"}}><h6>Цена:</h6>{tour.price}</div>
          </Card.Text>
        
        <div className="d-flex">  
             {isAuth === ADMIN ? 
             (<Button variant="primary" className="m-1"  >Редоктировать</Button>) :
             (<Navbar>
                <Container>
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav variant="dark" className="me-auto gap-2">
                      <Link id="RouterNavLink" to='/tour/details' className='text-decoration-none' state={{tour}}>
                        <Button variant="primary" className="m-1">Подробнее</Button>
                      </Link>
                  </Nav>
                  </Navbar.Collapse>
                </Container>  
              </Navbar>)}

          {isAuth === ADMIN ? 
            <Button variant="primary" className="m-4" onClick={() => { 
                      dispatch(deleteTourItem({id: tour._id}));
                      dispatch(getTours());}}
            >Удалить</Button> : ""}
        </div>

      </Card.Body>
    </Card>
  );
};

export default TourItem;
// onClick={() => removeTour({id: tour._id})}


/*


 <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav variant="dark" className="me-auto gap-2">
                            <Link id="RouterNavLink" to='/tours' className='text-decoration-none'>Туры</Link>
                        </Nav>
</Navbar.Collapse>


*/