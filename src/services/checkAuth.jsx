import { useNavigate } from "react-router-dom";

const Auth = () => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken === null) {
    window.location.href = "/";
    
  }
};

export default Auth;
