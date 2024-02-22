import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Signup() {
  const [myError, setMyError] = useState(null)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setMyError(null)
          navigate('/login')
        }else{
          const responseData = await response.json()
          setMyError(responseData.message)
        }
      } catch (error) {
        console.error(error);
      }
    },
    validate: (values) => {
      const errors = {}

      if(!values.username){
        errors.username = "Required"
      }

      if(!values.password){
        errors.password = "Required"
      }

      return errors;
    }
  });

  return (
      <div className="signup">
        <h1>Signup</h1>
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
          />{myError ? <div className="error">{myError}</div>: null}
          {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div>: null}
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
          />{formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div>: null}
          <br />
          <br />
          <Button type="submit" style={{ width: "20vh" }} variant="success">
            Signup
          </Button>
        </form>
        <p>Already have an account? Login <NavLink to="/login">here</NavLink></p>
      </div>
  );
}
