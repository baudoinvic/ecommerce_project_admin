import { useState } from "react";
import "./newUser.css";

export default function NewUser() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // replace with your own logic to handle form submission
    setIsSuccess(true);
  };

  return (
    <div className="newUser">
      {!isSuccess ? (
        <>
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm" onSubmit={handleSubmit}>
            <div className="newUserItem">
              <label>Username</label>
              <input type="text" placeholder="" name="username" />
            </div>
            <div className="newUserItem">
              <label>Full Name</label>
              <input type="text" placeholder="" name="fullName" />
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="email" placeholder="" name="email" />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input type="password" placeholder="" name="password" />
            </div>
            <div className="newUserItem">
              <label>Phone</label>
              <input type="text" placeholder="" name="phone" />
            </div>
            <div className="newUserItem">
              <label>Address</label>
              <input type="text" placeholder="" name="address" />
            </div>
            <div className="newUserItem">
              <label>Gender</label>
              <div className="newUserGender">
                <input type="radio" name="gender" id="male" value="male" />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" id="other" value="other" />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div className="newUserItem">
              <label>Active</label>
              <select className="newUserSelect" name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button className="newUserButton" type="submit">
              Create
            </button>
          </form>
        </>
      ) : (
        <h1 className="newUserTitle">User created successfully!</h1>
      )}
    </div>
  );
}