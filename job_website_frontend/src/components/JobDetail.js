import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import authroute from '../common/authroute';


export default function JobDetail(props) {
    const [queryParams] = useSearchParams();

    const { http } = authroute();
    const [jobdata, setJobdata] = useState([]);

    const jobdetails = (jobid) => {
        http.get(`/jobs/${jobid}`)
            .then((response) => {
                return response
            }).then((res) => {
                // console.log(res.data)
                setJobdata(res?.data?.data);
            }).catch((e) => {
                console.error(e);
            })
    }
    useEffect(() => {
        const jobId = queryParams.get('jobid');
        jobdetails(jobId);
    }, [queryParams])
    return (
        <div>
            {/* <h1>{JSON.stringify(jobdata)}</h1> */}

            {jobdata.map((val, index) =>
                <div className="my-2 container card" key={index} >
                    <div className="card-body">
                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" className="avatar rounded-circle" />
                        <h5 className="card-title">{val.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{val.email}</h6>
                        <p className="card-text"><strong>Application ID= </strong>{val.application_id}  <strong>, Job ID= </strong> {val.job_id}  </p>
                    </div>
                </div>
            )}
        </div>
    )
}
