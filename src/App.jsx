import { useEffect } from "react";
import { useState } from "react";
//                                                    TO DO APP in REACT JS. 
//
//                                             Features:
//                                                       Add, Edit & Delete Tasks.
//                                                       Autosave Tasks.
function App() {
  const [todos, setTodos] =useState(()=>{
    // Load Autosaved Tabs on Initial Render
    const saved= JSON.parse(localStorage.getItem("todos"));
    return saved ? saved : [];
  })
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");
  const [currentTask,setCurrentTask]=useState(null);

// Autosave
useEffect(()=>{
localStorage.setItem("todos",JSON.stringify(todos));
},[todos])
  

// Retrieve Autosaved Tasks

  
  function AddTask(){
                                               
    if(input.trim()==="") return;                        // To Prevent Empty Tasks.
    setTodos([...todos,{id:Date.now(),text:input}])      // Date.now() gives the Unique ID to Todos.
    setInput("");                                        // Clear after creating the Task.
  }
  
  function EditTask(todo){
    setInput(todo.text);
    setIsEditing(true);
    setCurrentTask(todo);
  }
  function DelTask(id){
    setTodos(
    todos.filter((todo)=>todo.id!==id)
    );
  }
  function UpdateTask(){
    setTodos(todos.map((todo)=>
    todo.id == currentTask.id ? {...todo,text:input}:todo
    ))
    setCurrentTask(null);
    setIsEditing(false);
    setInput("");
  }
  function Completee(id){
    setTodos(todos.map((todo)=>todo.id === id? {...todo,completed:!todo.completed}:todo))
  }
  return <>
  <div>
  <h2>To Do Tasks</h2>
  <p>Manage your all tasks and keep Disciplined using this App.</p>
  <input type="text" 
  placeholder="Enter the Tasks.."
  value={input}
  onChange={(e)=>setInput(e.target.value)}
  required
  />
  {isEditing ? (<button onClick={UpdateTask} onKeyDown={UpdateTask} className="addup">Update</button>):
  (<button onClick={AddTask} onKeyDown={AddTask} className="addup">Add</button>)}
  <ul>
    {todos.map((todo)=><li key={todo.id} style={{textDecoration:todo.completed?"line-through":"none"}}>
    <input type='checkbox' 
    onChange={()=>Completee(todo.id)}
    checked={todo.completed}
    
    />
      {todo.text}
      <button onClick={()=>EditTask(todo)}>Edit</button>
      <button onClick={()=>DelTask(todo.id)}>Delete</button>
    </li>)}
  </ul>
  </div>
  </>;
}
export default App;