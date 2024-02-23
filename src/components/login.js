import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext, useState } from "react";

//login page
export default function Login() {
  //context for setting the token and username globally
  const { setToken, setUsername } = useContext(UserContext);
  //state for storing error from backend
  const [myError, setMyError] = useState(null)

  const navigate = useNavigate();

  const formik = useFormik({
    //formik for form handling the login
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        //make the login request
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          //set the username
          setUsername(responseData.user);
          //set the token
          setToken(responseData.token);
          //go to home page
          navigate("/home");
          //clear error
          setMyError(null)
        }
        else{
          const responseData = await response.json()
          //set the error
          setMyError(responseData.message)
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validate: (values) => {
      //formik error validating
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  return (
    <div className="signup">
      <h1>Login</h1>
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <label className="labels" htmlFor="username">
          Username
        </label>
        <br />
        <input
          className="inpBox"
          name="username"
          type="text"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        {myError ? <div className="error">{myError}</div>: null}
        <br />
        <br />
        <label className="labels" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="inpBox"
          name="password"
          type="password"
          placeholder="*******"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <br />
        <br />
        <Button type="submit" style={{ width: "20vh" }} variant="success">
          Login
        </Button>
      </form>
      <p>
        Don't have an account? Signup <NavLink to="/">here</NavLink>
      </p>
    </div>
  );
}
