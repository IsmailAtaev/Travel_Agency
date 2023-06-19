import { React, useEffect } from "react";
import { getTicketUser } from "../../store/user/userStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Table from "react-bootstrap/Table";

const TicketUser = () => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.user.ticket);
  const user = useSelector((state) => state.user.user.user);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (trigger) {
      const ticketInfoUser = {
        email: user.email,
        userId: user.id,
      };
      dispatch(getTicketUser(ticketInfoUser));
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <div style={{ margin: "1%" }}>
      <h4 style={{ marginLeft: "50%", marginBottom: "1%" }}>Билеты</h4>
      {
        ticket.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Тур</th>
                <th>Кто едит</th>
                <th>Путь</th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((elem, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex">
                        <h6>Название тура:</h6>
                        <div style={{ marginLeft: "3%" }}>
                          {elem.tourId.name}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h6>Страна:</h6>
                        <div style={{ marginLeft: "3%" }}>
                          {elem.tourId.country}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h6>Город:</h6>
                        <div style={{ marginLeft: "3%" }}>
                          {elem.tourId.city}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h6>Дата:</h6>
                        <div style={{ marginLeft: "1%" }}>
                          {elem.tourId.date}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h6>Длительность:</h6>
                        <div style={{ marginLeft: "1%" }}>
                          {elem.tourId.duration}
                        </div>
                      </div>
                      <div className="d-flex">
                        <h6>Стоимость:</h6>
                        <div style={{ marginLeft: "1%" }}>
                          {elem.tourId.price}
                        </div>
                      </div>
                    </td>
                    <td>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Дата рождения</th>
                            <th>Номер паспорта</th>
                          </tr>
                        </thead>
                        <tbody>
                          {elem.customers.map((v, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{v.firstName}</td>
                                <td>{v.lastName}</td>
                                <td>{v.birthDate}</td>
                                <td>{v.passportSeriesAndNumber}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "200px",
                        height: "5%",
                      }}
                    >
                      <div style={{ marginLeft: "3%" }}>
                        <h6>Рейс:</h6>
                        <div
                          style={{
                            width: "100px",
                            marginLeft: "25%",
                            backgroundColor: "#FF0000",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.flight}
                        </div>
                      </div>
                      <div style={{ marginLeft: "3%", marginTop: "3%" }}>
                        <h6>Время вылита:</h6>
                        <div
                          style={{
                            width: "100px",
                            marginLeft: "25%",
                            backgroundColor: "#006AE2",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.clock}
                        </div>
                      </div>
                      <div style={{ marginLeft: "3%", marginTop: "3%" }}>
                        <h6>Время вылита:</h6>
                        <div
                          style={{
                            width: "100px",
                            marginLeft: "25%",
                            backgroundColor: "#15EE5A",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.paid}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h4>У вас нету билетов</h4>
        )

        // ticket.length > 0 ? ticket[0].flight : "netu biletov"
      }
    </div>
  );
};

export default TicketUser;
