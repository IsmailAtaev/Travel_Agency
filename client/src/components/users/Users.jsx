import { React, useState } from "react";
import { Container, Nav, Navbar, Table, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Users = () => {
  const usersArr = useSelector((state) => state.tour.users);
  console.log(usersArr);

  return (
    <div
      style={{ marginLeft: "auto", marginRight: "auto", marginTop: "0.5rem" }}
    >
      {usersArr.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Имя пользователя</th>
              <th>Почта</th>
              <th>Роль</th>
              <th>активирован</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {usersArr.map((value, index) => {
              return (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.nickName}</td>
                  <td>{value.email}</td>
                  <td>{value.role}</td>
                  <td>
                    {value.isActivated === true
                      ? "Активирован"
                      : "Не активирован"}
                  </td>
                  <td>
                    <Button variant="outline-danger">Удалить</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div style={{ marginTop: "10rem" }}>Нету пользователей в системе</div>
      )}
    </div>
  );
};

export default Users;
