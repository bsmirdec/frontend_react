import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  	const navigate = useNavigate();
	useEffect(() => {
		axiosInstance.post('users/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('first_name');
		localStorage.removeItem('last_name');
		localStorage.removeItem('user_permissions');
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/login');
	});
	return <div>Déconnexion</div>;
}