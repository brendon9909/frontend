import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddTodo from "./addTodo";

export default function Todos() {
  const navigate = useNavigate();
  const { token, username } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8000/login/data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setTodos(responseData);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const markComplete = async (todo) => {
    try {
      const response = await fetch("http://localhost:8000/todo/complete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          todo: todo,
        }),
      });

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData);
        fetchData()
      }
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  const markIncomplete = async(todo) => {
    try{
      const response = await fetch('http://localhost:8000/todo/reset', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "todo": todo
        })
      })

      if(response.ok){
        const responseData = await response.json()
        console.log(responseData);
        fetchData()
      }
    }
    catch(error){
      console.error('something went wrong', error)
    }
  } 

  return (
    <div style={{ backgroundColor: "black", padding: "51px", color: "white" }}>
      <h1 style={{ fontFamily: "Protest Guerrilla" }}>Todos</h1>
      <div className="todos">
        {todos.length > 0 ? (
          <>
            {todos.map((item) => (
              <div style={{ display: "flex" }}>
                <h5
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  <input
                    type="checkbox"
                    id={item.text}
                    onClick={() => {
                      let checkbox = document.getElementById(item.text);

                      if (checkbox.checked) {
                        markComplete(item.text);
                      } else {
                        markIncomplete(item.text);
                      }
                    }}
                    checked={item.completed}
                  />{" "}
                  {item.text}
                </h5>
                <AddTodo show={show} close={handleClose} reload={fetchData}/>
              </div>
            ))}
          </>
        ) : (
          <h4>Start adding todos</h4>
        )}
        <br />
        <Button variant="outline-success" onClick={() => {
          setShow(true)
        }}>Add new Todo</Button>
      </div>
    </div>
  );
}
