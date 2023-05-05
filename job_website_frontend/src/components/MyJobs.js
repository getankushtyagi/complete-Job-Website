import React, { useEffect, useState } from 'react'
import Authroute from "../common/authroute";
import { Link, useNavigate } from 'react-router-dom';


// const 
const JobComponent = ({ val }) => {
    const navigate = useNavigate()
    const jobdetails = (jobid) => {

        navigate(`/jobdetails?jobid=${jobid}`)
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
                        <button type="button" value={val.id} className="mx-3 btn btn-primary" onClick={() => jobdetails(val.id)}>
                            details
                        </button>

                    </span>
                </div>
            </div>
        </li>
    )
}


export default function MyJobs() {
    const { http } = Authroute();
    const [jobs, setJobs] = useState([]);
    const fetchjob = () => {
        http.get('/jobs').then((response) => {
            return response
        }).then((res) => {
            let jobdata = res.data
            console.log(jobdata.data);
            setJobs(jobdata.data)
        })
    }

    useEffect(() => {
        fetchjob()
    }, [])
    return (
        <div className="contain mx-5">
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
}
