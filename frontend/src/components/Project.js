import React from 'react'


const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>{project.name}</td>
           <td>{project.repository_link}</td>
           <td>{project.user.id}</td>
       </tr>
   )
}

const ProjectList = ({projects}) => {
   return (
       <table>
           <th>Name</th>
           <th>Repository Link</th>
           <th>Users</th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList