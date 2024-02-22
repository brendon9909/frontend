import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "./UserContext";

//function for editing a todo
export default function EditTodo(props) {
  //get the task stored globally
  const { task, username } = useContext(UserContext);
  //create error state
  const [myError, setMyError] = useState(null);

  const formik = useFormik({
    //formik for handling editing tasks
    initialValues: {
      task: "",
    },
    onSubmit: async (values) => {
      try {
        //make the put request
        const response = await fetch("http://localhost:8000/todo/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            todo: task,
            newTodo: values.task,
          }),
        });

        if (response.ok) {
          //reload todos
          props.reset();
          //close the modal
          props.close();
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
      const errors = {};

      if (!values.task) {
        errors.task = "Required";
      }

      return errors;
    },
  });

  return (
    <Modal show={props.show}>
      {/*modal for editing a task*/}
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="task">Edit</label>
          <br />
          <input
            name="task"
            type="text"
            value={formik.values.task}
            onChange={formik.handleChange}
          />
          {formik.touched.task && formik.errors.task ? (
            <div className="error">{formik.errors.task}</div>
          ) : null}
          {myError ? <div className="error">{myError}</div> : null}
          <br />
          <Button variant="success" type="submit">
            Apply changes
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
