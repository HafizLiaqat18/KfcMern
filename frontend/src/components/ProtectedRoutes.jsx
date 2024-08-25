import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!document.cookie.split(';').find(row => row.startsWith('token='));
    return isAuthenticated ? children : <Navigate to="/"/>;
};

export default ProtectedRoute;
