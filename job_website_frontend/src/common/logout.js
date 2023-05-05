
import AuthRoute from './authroute';
export default function logout() {
    const { http,logout } = AuthRoute();
    return (
        http.post('auth/logout').then((res)=>{
            console.log(res);
            // console.log('logout');
        }),
        logout()
    )
}
