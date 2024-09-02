import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './Routes/Router';
import { Fragment } from "react";
import DefaultLayout from './components/Layout/DefaultLayout';
import RouteWrapper from './Routes/PrivateRoute';
import withLayout from './Routes/PrivateRoute';
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

         
{privateRoutes.map((route, index) => {
const Page = route.component;
            const Layout = route.layout === null ? Fragment : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAuthenticated() ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}

          
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
