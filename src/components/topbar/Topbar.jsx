import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { logout } from "../../redux/userRedux";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate({
      pathname: "/"
    })
  }

  const dispatch = useDispatch()
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div onClick={handleLogout} style={{
            cursor: "pointer"
          }} className="topbarIconContainer">
            Logout
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
