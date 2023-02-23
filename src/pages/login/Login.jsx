import { useState, useEffect } from "react";
import { redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user != null && user.isAdmin == true){
      console.log("Navigate")
      return navigate({
        pathname: "/dashboard",
      })
    }
  },[user])

  console.log(user, "user on login page")

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
