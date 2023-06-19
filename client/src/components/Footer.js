import React from "react";

const l = {
  backgroundColor: "#214CFF",
  borderRadius: "0px 0px 25px 25px",
};

const footer = {
  backgroundColor: "#f1f1f1",
  borderRadius: "25px",
  boxShadow: "10px 10px 40px #E2E0EE",
};

const Footer = () => {
  return (
    <div className="container my-5 rounded">
      <footer className="text-center text-white" style={footer}>
        <div className="container pt-4">
          <section className="mb-4">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </section>
        </div>
        <div className="text-center text-white p-3" style={l}>
          <a
            className="text-white text-decoration-none"
            href="https://mdbootstrap.com/"
          >Позвонить: +375-(25)-702-12-47
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
