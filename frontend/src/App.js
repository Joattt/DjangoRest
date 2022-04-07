import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import UserProjectList from "./components/UserProject";


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {
   constructor(props) {
       super(props)
       const user1 = {id: 1, first_name: 'Ivan', last_name: 'Dulin', username: 'ivan', email: 'ivan@mail.ru'}
       const user2 = {id: 2, first_name: 'Leonid', last_name: 'Yakubovich', username: 'leo', email: 'leo@mail.ru'}
       const users = [user1, user2]
       const project1 = {name: 'Project 1', repository_link: 'https://github.com/Joattt/DjangoRest/1', user: user1}
       const project2 = {name: 'Project 2', repository_link: 'https://github.com/Joattt/DjangoRest/2', user: user2}
       const project3 = {name: 'Project 3', repository_link: 'https://github.com/Joattt/DjangoRest/3', user: user2}
       const project4 = {name: 'Project 4', repository_link: 'https://github.com/Joattt/DjangoRest/4', user: user1}
       const projects = [project1, project2, project3, project4]
       this.state = {
           'users': users,
           'projects': projects
       }
   }

   render() {
       return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/Projects'>Projects</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path= '/' component={() => <UserList items={this.state.users} />} />
                        <Route exact path= '/projects' component={() => <ProjectList items={this.state.projects} />} />
                        {/*<UserList items={this.state.users} />*/}
                        {/*<ProjectList items={this.state.projects} />*/}
                        <Route path="/user/:id">
                            <UserProjectList items={this.state.projects} />
                        </Route>
                        <Redirect from='/users' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
            </div>
       )
   }
}


// class App extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = {
//            'users': []
//        }
//    }
//
//   componentDidMount() {
//       axios.get('http://127.0.0.1:8000/api/users/')
//           .then(response => {
//               const users = response.data
//                   this.setState(
//                   {
//                       'users': users
//                   }
//               )
//           }).catch(error => console.log(error))
//    }
//
//    render () {
//        return (
//            <div>
//                <UserList users={this.state.users} />
//            </div>
//        )
//    }
// }

export default App;
