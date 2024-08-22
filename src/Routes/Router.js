import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";



const publicRoutes =[
    { path: '/login', component: Login , layout: null},
    { path: '/register', component: Register ,layout: null}
]

const privateRoutes =[];
export { publicRoutes}