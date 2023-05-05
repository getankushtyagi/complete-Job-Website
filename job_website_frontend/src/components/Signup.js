/* eslint-disable jsx-a11y/img-redundant-alt */

import axios from 'axios'
import React, { useState } from 'react'

export default function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  async function Register() {

    // axios automatically return json
    axios.post('http://127.0.0.1:8000/v1/api/auth/signup', { name: name, password: password, email: email, role: role })
      .then(function (response) {
        if (!response.status === 'success') {
          //handle errors here
          alert("something went wrong")
          console.log(response.message)
          return;
        }
        // handle successful requests here
        alert("user create successfully")
        console.log(response.message)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div className="contain">
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="contain h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                          <div className=" mx-3 form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example1c"  >Your Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className=" mx-3 form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example3c" >Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="mx-3 form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example4c" >Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fa fa-lock fa-lg me-4 fa-fw"></i> */}
                          <label htmlFor="role">Select Role</label>
                          <select className='mx-3' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="1" >User</option>
                            <option value="2" defaultChecked>Recruiter</option>
                          </select>
                        </div>

                        <div className="row">
                          <input type="checkbox" name="" id="" />
                          <label className="form-check-label" htmlFor="form2Example3" style={{ marginLeft: "10px" }}>
                            I agree all statements in <a href="/">Terms of service</a>
                          </label>
                        </div>
                        <br />
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={Register}>Register</button>

                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
