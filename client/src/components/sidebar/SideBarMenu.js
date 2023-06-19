import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/js/dist/dropdown"
import "./sidebar.css";
import {Container, Nav, Navbar,} from "react-bootstrap";
import Admin from "../admin/Admin";
import BookingAdmin from "../booking/BookingAdmin";
import TicketAdmin from "../ticket/TicketAdmin";
import Users from "../users/Users";
import { useDispatch, useSelector } from "react-redux";
import { getTours, getUsers } from "../../store/tourStore/tourSlice";


const SideBarMenu = () => {
    const dispatch = useDispatch();

    const tours = useSelector((state) => state.tour.tours);

    const [tourFlag, setTourFlag] = useState(false);
    const [bookingFlag, setBookingFlag] = useState(true);
    const [ticketFlag, setTicketFlag] = useState(false);
    const [userFlag, setUserFlag] = useState(false);
 
    function setTour() {
        setTourFlag(true);    
        setBookingFlag(false);
        setTicketFlag(false);
        setUserFlag(false);    
    }
   
    function setBookIng() {
        setTourFlag(false);    
        setBookingFlag(true);
        setTicketFlag(false);
        setUserFlag(false);    
    }
   
    function setTicket() {
        setTourFlag(false);    
        setBookingFlag(false);
        setTicketFlag(true);
        setUserFlag(false);    
    }

    function setUsers() {
        setTourFlag(false);    
        setBookingFlag(false);
        setTicketFlag(false);
        setUserFlag(true);    
    }

    

    


  return (<>
        <div className="d-flex">
            <div className="container-fluid" style={{width: "250px",  
                                                     margin: "0px -10px", 
                                                     float: "right"
                                                     }}>    
                <div className="row">
                    <div className="bg-dark col-auto col-md-1.5 min-vh-100 d-flex justify-content-between flex-column">
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Nav variant="dark" className="me-auto gap-2">
                                    <div>
                                        <hr className="text-secondary d-none d-sm-block"/>
                                        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
    
                                                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0" onClick={setTour}>                    
                                                    <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                                        <i className="bi bi-airplane-fill"></i>
                                                        <span className="ms-3 d-none d-sm-inline">Туры</span>
                                                    </a>
                                                </li>
                                          
                                                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0" onClick={ setBookIng}>
                                                    <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                                        <i className="bi bi-clipboard2-data-fill"></i>
                                                        <span className="ms-3 d-none d-sm-inline">Брони</span>
                                                    </a>
                                                </li>
                                        
                                                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0" onClick={setTicket}>
                                                    <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                                        <i className="bi bi-ticket-detailed-fill"></i>
                                                        <span className="ms-3 d-none d-sm-inline">Билеты</span>
                                                    </a>
                                                </li>
                                            
                                                <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0" onClick={setUsers}>
                                                    <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                                        <i className="bi bi-people-fill"></i>
                                                        <span className="ms-3 d-none d-sm-inline">Пользователи</span>
                                                    </a>
                                                </li>
                                            {/* </Link> */}
                                        </ul>
                                    </div>
                                </Nav>
                            </Container>
                        </Navbar>   
                    </div> 
                </div>            
            </div>
{/* 
            <div className="d-flex justify-content-center row gy-3 m-lg-2 gap-2 m-4">
                 {tours.map((elem) => (<TourItem key={elem.id} tour={elem} />))}
                 import TourItem from "../tour/tourItem";
            </div> 
             <div className="d-flex justify-content-center row gy-3 m-lg-2 gap-2 m-4">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th><th>Название тура</th><th>Тип тура</th><th>Страна</th><th>Город</th><th>Дата</th><th>Длительность</th><th>Цена $</th><th></th><th></th>
                        </tr>
                    </thead>
                    {tours.map((elem) => (<TourAdmin key={elem.id} tour={elem} index={elem.index}/>))}
                </Table>
            </div> */}
        
       
        {tourFlag === true ? <Admin /> : ""}
        {bookingFlag === true ? <BookingAdmin /> : ""}
        {ticketFlag === true ? <TicketAdmin /> : ""}
        {userFlag === true ? <Users /> : ""}
            
        
        
        
        





        
        
        
        </div>
    </>)
};

export default SideBarMenu;

/* <a className="text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-2">
                            {/* <i className="fs-4 bi bi-speedometer"></i>
                            <span className="ms-1 fs-4">Brand</span>bi bi-table 
                        </a> 
*/

/*


         <div className="dropdown open">
                                            <a className="bg-dark text-decoration-none text-white dropdown-toggle p-3" 
                                               type="button"
                                               id="triggerId" 
                                               data-bs-toggle="dropdown"
                                               aria-haspopup="true" 
                                               aria-expanded="false">
                                                <i className="bi bi-person-circle"></i> <span className="ms-2 d-none d-sm-inline">Isma</span></a>
                                          
                                                <div className="dropdown-menu" aria-labelledby="triggerId">
                                                <Link id="RouterNavLink" to='/dashboard' className='text-decoration-none'>
                                                    <a className="dropdown-item" href="#">Profile</a>
                                                </Link>
                                                <Link id="RouterNavLink" to='/dashboard' className='text-decoration-none'>
                                                <a className="dropdown-item" href="#">Setting</a>
                                                </Link>
                                            </div>
                                        </div>
                                        
*/
/*<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
<Navbar.Collapse id="responsive-navbar-nav"> 
*/
