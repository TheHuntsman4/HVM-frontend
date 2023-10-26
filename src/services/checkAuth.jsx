import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        navigate('/login');
    }
};

export default Auth;
