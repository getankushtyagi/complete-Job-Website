import React, { useEffect, useState } from 'react'
import Authroute from "../common/authroute";

export default function () {
  const [jobdata, setJobdata] = useState([])
  const { http } = Authroute()

  const deleteJob = (id) => {
    http.delete(`/admin/jobs/${id}`)
      .then((response) => {
        return response
      }).then((res) => {
        alert('user delete successfully')
        window.location.reload(false);
       
      }).catch((e)=>{
        console.error(e);
      })
  }
  useEffect(() => {
    http.get('/admin/jobs').then((response) => {
      return response
    }).then((res) => {
      setJobdata(res.data.data)
      // console.log(jobdata);
    })
  }, [])

  return (

    jobdata.map((val, index) =>
      <div className="my-3 card container" key={index}>
        <div className="card-body">
          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar rounded-circle" />
          <h5 className="card-title">{val.Title}</h5>
          <p className="card-text">{val.Description}</p>
          <h6 className="card-subtitle mb-2 text-muted"><strong>Recruiter ID =  </strong>{val.RecruiterID}   <strong>,  Job ID =</strong>{val.id}</h6>
          <button type="button" value={val.id} className="my-2 btn btn-danger" onClick={() => deleteJob(val.id)}>
            Delete
          </button>
        </div>
      </div>
    )

  )
}
