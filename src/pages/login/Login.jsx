import { useState, useEffect } from "react";
import { redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../../redux/userRedux";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user != null && user.isAdmin == true) {
      console.log("Navigate")
      return navigate({
        pathname: "/dashboard",
      })
    }
  }, [user])

  console.log(user, "user on login page")

  const handleClick = async (e) => {
    e.preventDefault();
    setIsError(false);
    setLoading(true);
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", { username, password });
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      dispatch(loginSuccess(res.data));
      setLoading(false);
    } catch (err) {
      setIsError(true);
      setLoading(false);
      dispatch(loginFailure());
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("https://coolbackgrounds.io/images/backgrounds/black/black-compute-ea4c57a4.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div style={{
        width: "25%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "white",
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 500 }}>LOGIN</h1>
        <input
          style={{ padding: 10, width: "90%", marginBottom: 20 }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ padding: 10, width: "90%", marginBottom: 20 }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isError && <span style={{
          color: "red"
        }}>Wrong Username or Password!</span>
        }
        <button onClick={handleClick} style={{
          width: "40%",
          border: "none",
          padding: "15px 20px",
          backgroundColor: "teal",
          color: "white",
          cursor: "pointer",
          marginBottom: "10px"
        }}>
          {loading ? "Loading..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Login;
