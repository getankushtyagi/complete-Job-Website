import React, { useEffect, useState } from 'react'
import AuthRoute from "../common/authroute";
import '../css/Dashboard.css'
import { Link } from 'react-router-dom';


const ToastComponent = () => {
  return (
    alert('Job Apply Successfully')
  )
}
const JobComponent = ({ val }) => {
  const { http } = AuthRoute();
  const [loading, setLoading] = useState(false);

  const applyJob = (jobid) => {
    setLoading(true)
    http.post(`/jobs/${jobid}/apply`)
      .then((response) => {
        return response
      }).then((res) => {
        ToastComponent()
        setLoading(false)

      }).catch((e) => {
        setLoading(false)
        console.error(e);
      })
  }
  return (
    <li className="list-group-item pt-0">
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-3">
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar rounded-circle" />
        </div>
        <div className="mx-3 flex-grow-1">
          <h6 className="mb-0"> {val.job_title}</h6>
          <p className="mb-0 text-muted">{val.job_description}</p>
        </div>
        <div className="flex-shrink-0 text-end">
          <span>
            <button type="button" className="mx-3 btn btn-primary" onClick={() => applyJob(val.id)}>
              {loading ? <i className="fa fa-spinner fa-spin" /> : "Apply"}
            </button>
          </span>
        </div>
      </div>
    </li>
  )
}

export default function Dashboard() {

  const { user, http } = AuthRoute();
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userlist, setUserlist] = useState([]);


  //admin can delete any user
  const deleteuser = (userid) => {
    http.delete(`admin/users/${userid}`).then((response) => {
      return response
    }).then((res) => {
      alert('user delete successfully')
        window.location.reload(false);

    })
  }

  //list of all jobs user can see and apply
  const fetchjob = () => {
    http.get('/jobs').then((response) => {
      return response
    }).then((res) => {
      let jobdata = res.data
      // console.log(jobdata.data);
      setJobs(jobdata.data)
    })
  }

  //recruiter publish jobs
  const publishJob = () => {
    http.post('/jobs', { title: title, description: description }).then((response) => {
      // console.log(response);
      return response
    }).then((res) => {
      alert(res.data.message)
    })
  }

  //list of all users admin can see
  useEffect(() => {
    http.get('/admin/users').then((response) => {
      return response
    }).then((res) => {
      // console.log(res.data.data);
      setUserlist(res.data.data)
    }).catch((e) => {
      console.error(e);
    })
  }, [])

  useEffect(() => {
    fetchjob()
  }, [])

  if (user.role === 1) {
    return (
      <div className="containe mx-5">
        <br />
        <div className="row">
          <div className="col-xl-12 mb-3 mb-lg-5">
            <div className="card">
              <div className="d-flex card-header justify-content-between">
                <h5 className="me-3 mb-0">Available Jobs</h5>
                <Link to="/job/applied">Applied List</Link>
              </div>
              <div className="card-body m-3">
                <ul className="list-group list-group-flush">
                  {jobs.map((val, index) =>
                    <JobComponent val={val} key={index} />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (user.role === 2) {
    return (
      <div className='my-5 container'>
        <h1 style={{ display: "flex", justifyContent: "center" }}> Post Job</h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
          <input type="title" className="form-control" id="exampleFormControlInput1" placeholder="ex-Laravel Developer" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">About Job</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='description' rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div style={{ marginLeft: "45%" }}>
          <button type="button" className="btn btn-success" onClick={publishJob} >Post</button>
        </div>

      </div>
    )

  } else {
    return (
      userlist.map((val, index) =>
        <div className="container my-3 card" key={index} >
          <div className="card-body">
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" className="avatar rounded-circle" />
            <h5 className="card-title">{val.name}</h5>
            <p className="card-text">{val.email}</p>
            <button type="button" className="btn btn-danger" value={val.id} onClick={() => deleteuser(val.id)}>Delete</button>
          </div>
        </div>
      )

    )
  }
}

