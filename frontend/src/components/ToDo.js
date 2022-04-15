import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
   return (
       <tr>
           <td>{todo.project}</td>
           <td>{todo.text}</td>
           <td>{todo.date_created}</td>
           <td>{todo.date_updated}</td>
           <td>{todo.user}</td>
           <td>{todo.is_active}</td>
           <td><button onClick={()=>deleteToDo(todo.id)} type='button'>Delete</button></td>
       </tr>
   )
}

const ToDoList = ({todos, deleteToDo}) => {
   return (
       <div>
       <table>
           <tr>
               <th>Project</th>
               <th>Text</th>
               <th>Created</th>
               <th>Updated</th>
               <th>User</th>
               <th>Active</th>
           </tr>
           {todos.map((todo) => <ToDoItem todo={todo}  deleteToDo={deleteToDo} />)}
       </table>
       <Link to='/todos/create'>Create</Link>
       </div>
   )
}


export default ToDoList