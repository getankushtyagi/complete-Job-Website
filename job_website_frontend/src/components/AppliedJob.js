import React, { useEffect, useState } from 'react'
import AuthRoute from "../common/authroute";

function AppliedJob() {
    const { http } = AuthRoute()
    const [joblist, setJoblist] = useState([])
    useEffect(() => {
        http.get('/jobs/applied').then((response) => {
            return response
        }).then((res) => {
            // console.log(res);
            setJoblist(res.data.data)
        }).catch((e) => {
            console.error(e);
        })
    }, [])

    return (
        // <div className=" contain mx-5">
        //     <br />
        //     <div className="row">
        //         <div className="col-xl-12 mb-3 mb-lg-5">
        //             <div className="card">
        //                 <div className="card-body m-3">
        //                     <ul className="list-group list-group-flush">
        //                         {joblist.map((val, index) =>
        //                             <li className="list-group-item pt-0" key={index}>
        //                                 <div className="d-flex align-items-center">
        //                                     <div className="flex-shrink-0 me-3">
        //                                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar rounded-circle" />
        //                                     </div>
        //                                     <div className="mx-3 flex-grow-1">
        //                                         <h6 className="mb-0"> {val.jobs.job_title}</h6>
        //                                         <p className="mb-0 text-muted">{val.jobs.job_description}</p>
        //                                     </div>
        //                                 </div>
        //                             </li>
        //                         )}
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        joblist.map((val, index) =>
            <div className="my-4 container card" >

                <div className="card-body">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar rounded-circle" />
                    <h5 className="my-1 card-title">{val.jobs.job_title}</h5>
                    <h6 className="my-2 accordion-headercard-subtitle mb-2 text-muted">{val.jobs.job_description}</h6>
                </div>
            </div>
        )

    )
}

// const JobListComponent = ({ val }) => {
//     console.log(val)
//     return (
//         val.map((k, index) => {
//             // <div className="my-3 card">
//             //     <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
//             //         <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid" />
//             //         <Link to="/job/applied">
//             //             <div className="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
//             //         </Link>
//             //     </div>
//             //     <div className="card-body">
//             //         <h5 className="card-title">Card title</h5>
//             //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             //         <a href="#!" className="btn btn-primary">Button</a>
//             //     </div>
//             // </div>
//             <p1>check</p1>
//         })
//     )
// }


export default AppliedJob