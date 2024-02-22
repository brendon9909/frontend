import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import UserContext from "./UserContext";
import { useContext, useState } from "react";

//function to add new todos
export default function AddTodo(props) {
  //get the stored username
  const { username } = useContext(UserContext);
  //create error state to store error from backend
  const [myError, setMyError] = useState(null);
  //formik to handle the add todo form
  const formik = useFormik({
    initialValues: {
      task: "",
    },
    onSubmit: async (values) => {
      try {
        //make the put request to api
        const response = await fetch("http://localhost:8000/todo/add", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            todo: values.task,
          }),
        });

        if (response.ok) {
          //close the modal
          props.close();
          //reload the todos to reflect new todo
          props.reload();
          //clear the error
          setMyError(null);
        } else {
          //create the error
          const responseData = await response.json();
          setMyError(responseData.message);
        }
      } catch (error) {
        console.error("something went wrong", error);
      }
    },
    validate: (values) => {
      //formik validating
      const errors = {};

      if (!values.task) {
        errors.task = "required";
      }

      return errors;
    },
  });

  return (
    <Modal show={props.show}>
      {/*modal for adding new todos*/}
      <Modal.Header>Add New Todo</Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="task">Task</label>
          <br />
          <input
            type="text"
            placeholder="task"
            name="task"
            value={formik.values.task}
            onChange={formik.handleChange}
          />
          {formik.touched.task && formik.errors.task ? (
            <div className="error">{formik.errors.task}</div>
          ) : null}
          {myError ? <div className="error">{myError}</div> : null}
          <br />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
