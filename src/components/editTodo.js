import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "./UserContext";

export default function EditTodo(props) {
  const { task, username } = useContext(UserContext);
  const [myError, setMyError] = useState(null)

  const formik = useFormik({
    initialValues: {
      task: "",
    },
    onSubmit: async(values) => {
      try{
        const response = await fetch('http://localhost:8000/todo/edit', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "todo": task,
                "newTodo": values.task
            })
        })

        if(response.ok){
            props.reset()
            props.close()
            setMyError(null)
        }
        else{
            const responseData = await response.json()
            setMyError(responseData.message)
          }
      }
      catch(error){
        console.error('something went wrong', error)
      }
    },
    validate: (values) => {
        const errors = {}

        if(!values.task){
            errors.task = "Required"
        }

        return errors;
    }
  });

  return (
    <Modal show={props.show}>
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
          />{formik.touched.task && formik.errors.task ? <div className="error">{formik.errors.task}</div>: null}
          {myError ? <div className="error">{myError}</div>: null}
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
