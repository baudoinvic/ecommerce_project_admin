import { useEffect, useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data";
import { addProductFailure, addProductSuccess } from "../../redux/productRedux";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function NewProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputs({
      title: "",
      desc: "",
      price: "",
      category: "computers",
    });
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setInputs((prev) => {
      return { ...prev, category: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = { ...inputs, img: file };

    console.log(product);

    const data = new FormData();
    data.append("file", file);
    data.append("title", inputs.title);
    data.append("desc", inputs.desc);
    data.append("price", inputs.price);
    data.append("category", inputs.category);


    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/api/products`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addProductSuccess(res.data));
      navigate("/dashboard/products");
      setLoading(false);
    } catch (err) {
      dispatch(addProductFailure());
      setLoading(false);
      setIsError(true);
    }
  };





  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder=""
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select defaultValue={inputs.categories} name="category" onChange={handleCat}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.cat}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {isError && (
          <p style={{
            color: "red",
          }}>Something went wrong, please try again</p>
        )}
        <button onClick={handleClick} className="addProductButton">
          {loading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
