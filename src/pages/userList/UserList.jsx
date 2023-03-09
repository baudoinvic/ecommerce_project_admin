import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function UserList() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const TOKEN = localStorage.getItem("token")
        console.log(TOKEN, "token")
        const res = await axios({
          method: "GET",
          url: `http://localhost:5000/api/users/`,
          headers: { token: `Bearer ${TOKEN}` }
        });
        const array = []
        res.data.map((item, index)=>{
          array.push({
            ...item,
            id: index
          })
        })
        console.log(array)
        setUsers(array)
        // const res = await userRequest.get("/users/stats");
        
      } catch(err) {
        console.log(err)
      }
    };
    getUsers();
  }, []);

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  console.log("Usrs")
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <button onClick={()=>navigate("/dashboard/user/" + params.row.id)} className="userListEdit">Edit</button>
           
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
