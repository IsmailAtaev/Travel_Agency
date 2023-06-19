import { React, useState, useEffect } from "react";
import { getReservations } from "../../http/index";
import { Table } from "react-bootstrap";
//import IsEmptyObj from "../../../src/check/checkObj";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);

  useEffect(() => {
    async function getAllBooking() {
      if (fetchFlag) {
        const temp = await getReservations();
        setBookings(Object.keys(temp).map((key) => temp[key]));
        //console.log(temp);
        //setBookings(await getReservations().then((obj) => obj));
        setFetchFlag(false);
      }
    }
    getAllBooking();
  }, [bookings]);
  console.log("1", bookings);
  return (
    <div>
      <div className="d-flex justify-content-center row gy-3 m-lg-2 gap-2 m-4">
        {bookings.length !== 0 ? (
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>#</th>
                <th>Тур</th>
                <th>Кто едит</th>
                <th>Кем забронировано</th>
                <th>Стоимость</th>  
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((elem, index) => {
                return (
                  <tr key={elem._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Название тура:</h6>
                        <div style={{ marginLeft: "5%" }}>{elem.tour.name}</div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Страна:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tour.country}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Город:</h6>
                        <div style={{ marginLeft: "5%" }}>{elem.tour.city}</div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Дата:</h6>
                        <div style={{ marginLeft: "5%" }}>{elem.tour.date}</div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Длительность:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tour.duration}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Стоимость тура:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tour.price}
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
                          {elem.customers.map((obj, i) => {
                            return (
                              <tr>
                                <td>{obj.firstName}</td>
                                <td>{obj.lastName}</td>
                                <td>{obj.birthDate}</td>
                                <td>{obj.gender}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </td>

                    <td>
                      <div style={{ marginBottom: "3%", textAlign: "center" }}>
                        <h6>Имя:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.user.nickName}
                        </div>
                      </div>
                      <div style={{ marginBottom: "3%", textAlign: "center" }}>
                        <h6>Почта:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.user.email}
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <div>
                        <h6>Общая стоимость тура:</h6>
                        <div style={{ marginLeft: "5%" }}>{elem.price}</div>
                      </div>
                      <div style={{ marginBottom: "3%" }}>
                        <h6>Оплачено:</h6>
                        <div
                          style={{
                            marginBottom: "3%",
                            backgroundColor: "#1ADC00",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.pay}
                        </div>
                      </div>
                      <div style={{ marginBottom: "3%" }}>
                        <h6>Нужно оплатить:</h6>
                        <div
                          style={{
                            marginLeft: "5%",
                            backgroundColor: "#FF5100",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.needToPay}
                        </div>
                      </div>
                    </td>
                    <td>
                      <i class="bi bi-trash"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Нету забронированных туров</div>
        )}
      </div>
    </div>
  );
};

export default BookingAdmin;
