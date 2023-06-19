import React from "react";
import { useLocation } from "react-router-dom";
import ll from "../../assets/user.png";

const Account = () => {
  const location = useLocation();
  const { user } = location.state;
  return (
    <div className="justify-content-center ">
      {/* <div className="vh-100" style={{backgroundColor: "#AEB6BF"}}> */}
      <div className="container py-5 text-center">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-3">
            {/* <div className="col col-md-9 col-lg-7 col-xl-3"> */}
            <div
              className="card"
              style={{ borderRadius: "15px", backgroundColor: "#AEB6BF" }}
            >
              <div className="card-body p-4">
                <div className="d-flex text-white">
                  <div className="flex-shrink-0">
                    <img
                      src={ll}
                      alt="Generic placeholder image"
                      className="img-fluid justify-content-center align-items-center"
                      style={{ width: "140px", borderRadius: "10px" }}
                    ></img>
                    <br />
                    <br />
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">{user.nickName}</h5>
                      <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                       email: {user.email}
                      </p>
                      <div
                        className="text-dark d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ backgroundColor: "#f1f1f1" }}
                      >
                        <div>
                          <p className="small text-muted mb-1">Забронировано</p>
                          <p className="mb-0">41</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Билеты</p>
                          <p className="mb-0">976</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* Account
      <br />
      {user.nickName}
      <br />
      {user.role}
      <br />
      {user.email}
      <br />
      {user.isActivated}
      {user.id} */}
      </div>
    </div>
  );
};

export default Account;
