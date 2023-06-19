import { React, useState, useEffect } from "react";
import { getTicket } from "../../http/index";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";

const TicketAdmin = () => {
  const [tickets, setTickets] = useState([]);
  const [noUserTicket, setNoUserTicket] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(true);
  const [flagOne, setFlagOne] = useState(true);
  const [flagValidUserTicket, setFlagValidUserTicket] = useState(true);

  useEffect(() => {
    async function getAllTickets() {
      if (fetchFlag) {
        const obj = await getTicket();
        setTickets(Object.keys(obj.arrTicket).map((key) => obj.arrTicket[key]));
        setNoUserTicket(
          Object.keys(obj.arrNoUserTicket).map((k) => obj.arrNoUserTicket[k])
        );
        setFetchFlag(false);
      }
    }
    getAllTickets();
  }, [tickets]);

  const actionFlag = (obj1, obj2) => {
    setFlagOne(obj1);
    setFlagValidUserTicket(obj2);
  };

  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        title="Выбирите просмотр каких билетов"
      >
        <Dropdown.Item onClick={(e) => actionFlag(true, false)}>
          Пользователи с аккаунтом
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => actionFlag(false, true)}>
          Пользователи без аккаунтов
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => actionFlag(true, true)}>
          Все билеты
        </Dropdown.Item>
      </DropdownButton>
      <div className="d-flex justify-content-center row gy-3 m-lg-2 gap-2 m-4">
        {flagOne === true && tickets.length !== 0 ? (
          <table className="table table-striped">
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
              {tickets.map((elem, index) => {
                return (
                  <tr key={elem._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Название тура:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.name}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Страна:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.country}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Город:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.city}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Дата:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.date}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Длительность:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.duration}
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginBottom: "3%" }}>
                        <h6>Стоимость тура:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.tourId.price}
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
                            <th>Номер паспорта</th>
                          </tr>
                        </thead>
                        <tbody>
                          {elem.customers.map((obj, i) => {
                            return (
                              <tr>
                                <td>{obj.firstName}</td>
                                <td>{obj.lastName}</td>
                                <td>{obj.birthDate}</td>
                                <td>{obj.passportSeriesAndNumber}</td>
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
                          {elem.userId.nickName}
                        </div>
                      </div>
                      <div style={{ marginBottom: "3%", textAlign: "center" }}>
                        <h6>Почта:</h6>
                        <div style={{ marginLeft: "5%" }}>
                          {elem.userId.email}
                        </div>
                      </div>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <div style={{ marginBottom: "3%" }}>
                        <h6>Рейс:</h6>
                        <div
                          style={{
                            marginLeft: "5%",
                            backgroundColor: "#FF0000",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.flight}
                        </div>
                      </div>
                      <div style={{ marginBottom: "3%" }}>
                        <h6>Время вылита:</h6>
                        <div
                          style={{
                            marginLeft: "1%",
                            backgroundColor: "#006AE2",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.clock}
                        </div>
                      </div>
                      <div style={{ marginBottom: "3%" }}>
                        <h6>Оплачено:</h6>
                        <div
                          style={{
                            marginLeft: "5%",
                            backgroundColor: "#15EE5A",
                            color: "white",
                            borderRadius: "50% 20% / 10% 40%",
                          }}
                        >
                          {elem.paid}
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
          ""
        )}
      </div>

      {flagValidUserTicket === true && noUserTicket.length !== 0 ? (
        <table className="table table-striped">
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
            {noUserTicket.map((elem, index) => {
              return (
                <tr key={elem._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Название тура:</h6>
                      <div style={{ marginLeft: "5%" }}>{elem.tourId.name}</div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Страна:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourId.country}
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Город:</h6>
                      <div style={{ marginLeft: "5%" }}>{elem.tourId.city}</div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Дата:</h6>
                      <div style={{ marginLeft: "5%" }}>{elem.tourId.date}</div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Длительность:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourId.duration}
                      </div>
                    </div>
                    <div className="d-flex" style={{ marginBottom: "3%" }}>
                      <h6>Стоимость тура:</h6>
                      <div style={{ marginLeft: "5%" }}>
                        {elem.tourId.price}
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
                          <th>Номер паспорт</th>
                        </tr>
                      </thead>

                      <tbody>
                        {elem.customers.map((obj, i) => {
                          return (
                            <tr>
                              <td>{obj.firstName}</td>
                              <td>{obj.lastName}</td>
                              <td>{obj.birthDate}</td>
                              <td>{obj.sex}</td>
                              <td>{obj.passportSeriesAndNumber}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </td>

                  <td>
                    <div style={{ marginBottom: "3%", textAlign: "center" }}>
                      <h6>Имя:</h6>
                      <div style={{ marginLeft: "5%" }}>{elem.firstName}</div>
                    </div>
                    <div style={{ marginBottom: "3%", textAlign: "center" }}>
                      <h6>Почта:</h6>
                      <div style={{ marginLeft: "5%" }}>{elem.email}</div>
                    </div>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: "3%" }}>
                      <h6>Рейс:</h6>
                      <div
                        style={{
                          marginLeft: "5%",
                          backgroundColor: "#FF0000",
                          color: "white",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      >
                        {elem.flight}
                      </div>
                    </div>
                    <div style={{ marginBottom: "3%" }}>
                      <h6>Время вылита:</h6>
                      <div
                        style={{
                          marginLeft: "1%",
                          backgroundColor: "#006AE2",
                          color: "white",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      >
                        {elem.clock}
                      </div>
                    </div>
                    <div style={{ marginBottom: "3%" }}>
                      <h6>Оплачено:</h6>
                      <div
                        style={{
                          marginLeft: "5%",
                          backgroundColor: "#15EE5A",
                          color: "white",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      >
                        {elem.paid}
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
        ""
      )}
    </div>
  );
};

export default TicketAdmin;
