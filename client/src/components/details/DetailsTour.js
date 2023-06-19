import React from "react";
import {Button, Container, Card, Col, Row, Nav, Navbar} from "react-bootstrap";
import { useSelector} from "react-redux";
import { useLocation, Link } from "react-router-dom";

const DetailsTour = ({isAuth, user}) => {
  const location = useLocation();
  const { tour } = location.state;
  console.log("dcdcdcdcd ", tour)
  const { name, type, date, country, city, price, duration, linkPhoto } = Object.assign({}, tour);
  //style={{boxShadow: '10px 10px 40px #E2E0EE'}}
  return (<>
    <Container >

      <Row className="justify-content-md-center mt-3" style={{textAlign: "center"}}>
        <Col md="auto">
          <div style={{ width: '30rem', display: "flex", boxShadow: '10px 10px 40px #959595',borderRadius: "25px", }} >
            <Card.Img variant="top" src={linkPhoto} style={{ width: "200px", height: "220px", borderRadius: "25px 0px 0px 25px", }}/>
            <Card.Body>
              <br/>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
              <Card.Text>
                <br/>{date}<br/>{country}<br/>{city}<br/>{price}<br/>{duration}
              </Card.Text>
            </Card.Body>
          </div> 

        </Col>
      </Row>
      
      {/* <Row className="justify-content-md-center mt-3" style={{textAlign: "center"}}>
        <Col md="auto">Отели</Col>
      </Row> */}


      <Navbar>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="dark" className="me-auto gap-2" style={{marginLeft: "auto", marginRight: "auto"}}>
              {(user.role === "USER" ) ?
                  (<>
                      <Link id="RouterNavLink" to='/booking/user' className='text-decoration-none' state={{tour}}>
                        <Button variant="primary" className="mt-5">Бронировать</Button>
                      </Link>
                  
                      <Link id="RouterNavLink" to='/tour/details/buy' className='text-decoration-none' state={{tour}}>
                        <Button variant="success" className="mt-5">Купить</Button>
                      </Link>
                    </>
                  ) : ("")}
                 {user.role === undefined ?  
                  <Link id="RouterNavLink" to='/tour/details/buy' className='text-decoration-none' state={{tour}}>
                     <Button variant="success" className="m-5"
                      style={{boxShadow: '10px 10px 40px #E2E0EE'}}>Купить</Button>
                  </Link> : ""
                } 
            </Nav>
          </Navbar.Collapse>
        </Container>  
      </Navbar>
    </Container>

    </>
  );
};

export default DetailsTour;
