import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.user.name}</td>
        </tr>
    )
}

const UserProjectList = ({items}) => {
   let { id } = useParams();
   let filtered_items = items.filter((item) => item.user.id == id)
   console.log(items)
   return (
       <table>
           <tr>
               <th>ID</th>
               <th>First name</th>
               <th>Last Name</th>
               <th>Username</th>
               <th>Email</th>
           </tr>
           {filtered_items.map((item) => <ProjectItem item={item} />)}
       </table>
   )
}


export default UserProjectList