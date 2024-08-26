import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './Routes/Router';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('access') !== null;
};
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Private Routes */}
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Default route */}
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
