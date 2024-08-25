import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!document.cookie.split(';').find(row => row.startsWith('adminToken='));
    return isAuthenticated ? children : <Navigate to="/admin/login"/>;
};

export default ProtectedRoute;
