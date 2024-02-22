import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from "react";

export default function Login() {
  const { setToken, setUsername } = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseData = await response.json();
          setUsername(responseData.user);
          setToken(responseData.token);
          navigate("/home");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    validate: (values) => {
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
