import React from "react";
import { Card } from "react-bootstrap";

const About = () => {
  return (
    <div
      style={{
        alignItems: "center",
        marginTop: "2%",
        marginLeft: "10%",
        marginRight: "10%",
        paddingLeft: "10%",
        paddingRight: "10%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
      }}
    >
      <h4
        style={{
          paddingTop: "3%",
          textAlign: "center",
          marginTop: "2%",
          padding: "2px 16px",
        }}
      >
        О нас
      </h4>
      <br />
      Travel – это активно развивающаяся с 2023 года турагентста. Мы с любовью
      отправляем на отдых тысячи туристов. Наша основная ценность — это ваши
      положительные отдых. Сайт Travel.com – удобный сервис для бронирования
      туристических пакетов, созданный с мыслями о вашем комфорте. На сервисе
      собрана полная и актуальная информация о туре. Больше не нужно искать в
      интернете информацию на разных ресурсах — полная информация собрана на
      нашем сайте. Мы убеждены, что отдых не должен начинаться с мозгового
      штурма (по крайней мере, вашего), а должен начинаться с расслабления.
      Специалисты Travel – уникальные турагенты, которые хотят не просто продать
      тур, но досконально изучить ваши потребности, чтобы максимально четко
      подобрать курорт. любой тур на сайте Travel.com можно оформить и оплатить
      без общения с менеджером. Удобная система бронирования и оплаты позволяет
      зафиксировать цену без визита в офис.
      <h4
        style={{
          textAlign: "center",
          marginTop: "2%",
          padding: "2px 16px",
        }}
      >
        Наша команда
      </h4>
      <br />
      <div style={{ display: "flex", paddingLeft: "8%", paddingBottom: "5%" }}>
        <div>
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              width: "90%",
              marginTop: "2%",
            }}
          >
            <Card.Img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div style={{ padding: "2px 16px" }}>
              <h4>
                <b>Ева Иванова</b>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              width: "90%",
              marginTop: "2%",
            }}
          >
            <Card.Img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div style={{ padding: "2px 16px" }}>
              <h4>
                <b>Алина Лазовская</b>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              width: "90%",
              marginTop: "2%",
            }}
          >
            <Card.Img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <div style={{ padding: "2px 16px" }}>
              <h4>
                <b>Екатерина Иванов</b>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
