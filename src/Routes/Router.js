import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import ProfilePage from "../Page/Profile/Profile";



const publicRoutes =[
    { path: '/login', component: Login , layout: null},
    { path: '/register', component: Register ,layout: null},
    { path: '/profile', component: ProfilePage ,layout: null},
]

// const privateRoutes =[];
export { publicRoutes}