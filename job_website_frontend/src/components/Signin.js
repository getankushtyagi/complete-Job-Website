/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Signin.css";
import AuthRoute from "../common/authroute";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { http, setToken } = AuthRoute();

  const userLogin = () => {
    // api call
    http.post('auth/login', { email: email, password: password }).then((res) => {
      // console.log(res);
      setToken(res.data.user, res.data.authorisation.token);
    })
  }

  // async function userLogin() {
  //   //fetch function does not return json like axios
  //         const details = {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ email, password }),
  //         };
  //         fetch("http://127.0.0.1:8000/v1/api/auth/login", details)
  //           .then((response) => response.json())
  //           .then((response) => {
  //             setToken(response.authorisation.token);
  //             console.log(token);
  //             if (!response.status === "success") {
  //               alert("something went wrong");
  //               console.log(response.message);
  //               return;
  //             }
  //             // handle successful requests here
  //             alert("user Login successfully");
  //             usenavigate("/dashboard");
  //           });
  // }
  return <div className="contain">{signin()}</div>;

  function signin() {
    return (
      <section className="vh-100">
        <div className="contain-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>


                  <Link to={"/resetpassword"} className="text-body">
                    Reset password?
                  </Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={userLogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to={"/signup"} className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
