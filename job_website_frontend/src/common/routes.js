import Signin from "../components/Signin";
import Signup from "../components/Signup";
import About from "../pages/About";
import Homepage from "../pages/Homepage";
import Dashboard from "../components/Dashboard";
import Logout from "../common/logout";
import AppliedJob from "../components/AppliedJob";
import MyJobs from "../components/MyJobs";
import JobDetail from "../components/JobDetail";
import AdminJobs from "../components/AdminJobs";
import ResetPassword from "./ResetPassword";

export const routes = [{
    name: 'Home',
    pathname: '/',
    component: <Homepage />
},
{
    name: 'About',
    pathname: '/about',
    component: <About />
},
{
    name: 'SignIn',
    pathname: '/signin',
    component: <Signin />
},
{
    name: 'SignUp',
    pathname: '/signup',
    component: <Signup />
},
{
    name: 'Dashboard',
    pathname: '/dashboard',
    component: <Dashboard />
},
{
    name: 'Logout',
    pathname: '/logout',
    component: <Logout />
},
{
    name: 'Job Applied',
    pathname: '/job/applied',
    component: <AppliedJob />
},
{
    name: 'Jobs',
    pathname: '/myjobs',
    component: <MyJobs />
},
{
    name: 'Job Details',
    pathname: '/jobdetails',
    component: <JobDetail />
},
{
    name: 'Jobs',
    pathname: '/jobs',
    component: <AdminJobs />
},
{
    name: 'Reset Password',
    pathname: '/resetpassword',
    component: <ResetPassword />
},
]