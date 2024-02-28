import { Navigate, useLocation } from 'react-router-dom';
export const PrivateRoute = ({ children }) => { //Mientas tanto
	const location = useLocation();

	return location?.state?.logged ? children : <Navigate to='/login' />;
};