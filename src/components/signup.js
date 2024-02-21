import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {
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
          navigate('/login')
        }
      } catch (error) {
        console.error(error);
      }
    },
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
          />
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
