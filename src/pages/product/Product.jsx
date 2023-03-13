import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
// import { userRequest } from "../../requestMethods";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [pStats, setPStats] = useState([]);

  const products = useSelector((state) =>
    state.product.products
  );

  const product = products.find((p) => p._id === id);

  console.log(product);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Product</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product?.title} />
            <label>Product Description</label>
            <input type="text" placeholder={product?.desc} />
            <label>Price</label>
            <input type="text" placeholder={product?.price} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
