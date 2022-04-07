import React from 'react'


const ToDoItem = ({todo}) => {
   return (
       <tr>
           <td>{todo.project}</td>
           <td>{todo.text}</td>
           <td>{todo.date_created}</td>
           <td>{todo.date_updated}</td>
           <td>{todo.user}</td>
           <td>{todo.is_active}</td>
       </tr>
   )
}

const ToDoList = ({todos}) => {
   return (
       <table>
           <th>Project</th>
           <th>Text</th>
           <th>Created</th>
           <th>Updated</th>
           <th>User</th>
           <th>Active</th>
           {todos.map((todo) => <ToDoItem todo={todo} />)}
       </table>
   )
}


export default ToDoList