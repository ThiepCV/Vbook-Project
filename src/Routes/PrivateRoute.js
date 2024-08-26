import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('access'); // Kiểm tra nếu người dùng đã đăng nhập

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
