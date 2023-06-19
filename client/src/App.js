import { React, useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Tours from "./components/tour/Tours";
import Home from "./components/Home";
import About from "./components/About";
import DetailsTour from "./components/details/DetailsTour";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBarMenu from "./components/sidebar/SideBarMenu";
import Admin from "./components/admin/Admin";
import { getTours, getUsers } from "../src/store/tourStore/tourSlice";
import ClientInfo from "./components/clientInfo/ClientInfo";
import CardInfo from "./components/clientInfo/cardInfo/CardInfo";
import Account from "./components/account/Account";
import SearchBar from "./components/search/SearchBar";
import BookingUser from "./components/booking/BookingUser";
import TicketUser from "./components/ticket/TicketUser";
import BookingUserBasket from "./components/booking/BookingUserBasket";
import { getBookingUser } from "./store/customerStore/customerSlice";

function App() {
  const dispatch = useDispatch();
  const store = useStore();
  const [lang, setLang] = useState(true);

  const userStore = useSelector((state) => state);
  const [tour, setTour] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [eee, setEee] = useState(0);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    async function getToursAPI() {
      dispatch(getTours());
      dispatch(getUsers())
    }
    getToursAPI();

    if (trigger) {
      console.log("trigger");
      const obj = {...userStore.user.user.user};
      console.log(obj);
      setUser(obj);
      console.log(user);
      // if (obj !== null && obj !== undefined || isEmpty(obj)) {
      if (!isEmpty(obj)) {
        console.log("trigger");
        setIsAuth(true);
        setEee((eee) => eee + 1);
        dispatch(getBookingUser(obj));
      } 
    }
  }, [tour, userStore.user.user]);


  

  return (
    <div>
      <NavBar setTrigger={setTrigger} isAuth={isAuth} trigger={trigger} eee={eee} user={user} setIsAuth={setIsAuth}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/tours"
          element={user.role === "ADMIN" ? <SideBarMenu /> : <Tours />}
        />
        <Route path="/about" element={<About />} />
        {/* <Route path="/tour-work" element={<Admin />} /> */}
        <Route path="/dashboard" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/tour/details" element={<DetailsTour isAuth={isAuth} user={user}/>} />
        <Route path="/tour/details/buy" element={<ClientInfo />} />
        <Route path="/buy/tour/validation" element={<CardInfo />} />
        <Route path="/booking/user" element={<BookingUser />} />
        <Route path="/booking/basket" element={<BookingUserBasket />} />
        <Route path="/ticket/user" element={<TicketUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


/*

:

                            (<div className="dropdown open">
                             <Link id="RouterNavLink" to='/account' className='text-decoration-none'> 
                                <a className="bg-dark text-decoration-none text-white p-1" 
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                    id="triggerId">
                                    <i className="bi bi-person-circle"></i> 
                                        <span className="ms-2 d-none d-sm-inline">
                                            Isma
                                        </span>
                                </a>
                            </Link>  
                            </div>)
*/