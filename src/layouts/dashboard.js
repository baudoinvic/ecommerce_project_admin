import {Outlet, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import "../App.css"
import Topbar from "../components/topbar/Topbar"
import Sidebar from "../components/sidebar/Sidebar"

export const DashboardLayout = () => {
const navigate = useNavigate()
useEffect(()=>{
    navigate({
        pathname: '/dashboard/home'
    })
},[])
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <Topbar />
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>

              <Sidebar />
                <Outlet />
            </div>
              </div>
    )
}