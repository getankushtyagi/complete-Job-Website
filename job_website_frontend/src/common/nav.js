import Dashboard from "../components/Dashboard";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import About from "../pages/About";
import Homepage from "../pages/Homepage";
import Logout from "../common/logout";
import MyJobs from "../components/MyJobs";

export const nav = [

    {
        name: 'Home',
        pathname: '/',
        component: <Homepage />,
    },
    {
        name: 'About',
        pathname: '/about',
        component: <About />,
    },
    {
        name: 'Signin',
        pathname: '/signin',
        component: <Signin />,
    },
    {
        name: 'Signup',
        pathname: '/signup',
        component: <Signup />,
    },
    {
        name: 'Dashboard',
        pathname: '/dashboard',
        component: <Dashboard />,
    },
    {
        name: 'List Job',
        pathname: '/myjobs',
        component: <MyJobs />,
    },
    {
        name: 'Jobs',
        pathname: '/jobs',
        component: <MyJobs />,
    },
    {
        name: 'Logout',
        pathname: '/logout',
        component: <Logout />,
    },
]