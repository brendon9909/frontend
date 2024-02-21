import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import UserContext from "./UserContext";
import { useContext } from "react";

export default function AddTodo(props) {
  const { username } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      task: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/todo/add", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "username": username,
            "todo": values.task,
          }),
        });

        if(response.ok){
            props.close()
            props.reload()
        }
      } catch (error) {
        console.error('something went wrong', error)
      }
    },
  });

  return (
    <Modal show={props.show}>
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
