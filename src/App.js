import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes ,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { DashboardLayout } from "./layouts/dashboard";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin);
  // console.log(admin, "Admin")

  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<DashboardLayout />} >

              <Route exact path="/dashboard/home" element={<Home/>}/>
              <Route exact path="/dashboard/users" element={<UserList/>}/>
              <Route exact path="/dashboard/user:id" element={<User/>}/>
              <Route exact path="/dashboard/newUser" element={<NewUser/>}/>
              <Route exact path="/dashboard/products" element={<ProductList/>}/>
              <Route path="/dashboard/product/:id" element={<Product/>} />
              <Route exact path="/dashboard/newproduct" element={<NewProduct/>}/>
              </Route>
              
              {/* <Route exact path="/home">
                <Home />
                </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route> */}
            
      </Routes>
    </BrowserRouter>
  );
}

export default App;
