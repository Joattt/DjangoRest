import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import UserProjectList from "./components/UserProject";
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

// class App extends React.Component {
//    constructor(props) {
//        super(props)
//        const user1 = {id: 1, first_name: 'Ivan', last_name: 'Dulin', username: 'ivan', email: 'ivan@mail.ru'}
//        const user2 = {id: 2, first_name: 'Leonid', last_name: 'Yakubovich', username: 'leo', email: 'leo@mail.ru'}
//        const users = [user1, user2]
//        const project1 = {name: 'Project 1', repository_link: 'https://github.com/Joattt/DjangoRest/1', user: user1}
//        const project2 = {name: 'Project 2', repository_link: 'https://github.com/Joattt/DjangoRest/2', user: user2}
//        const project3 = {name: 'Project 3', repository_link: 'https://github.com/Joattt/DjangoRest/3', user: user2}
//        const project4 = {name: 'Project 4', repository_link: 'https://github.com/Joattt/DjangoRest/4', user: user1}
//        const projects = [project1, project2, project3, project4]
//        this.state = {
//            'users': users,
//            'projects': projects
//        }
//    }
//
//    render() {
//        return (
//             <div className="App">
//                 <BrowserRouter>
//                     <nav>
//                         <ul>
//                             <li>
//                                 <Link to='/'>Users</Link>
//                             </li>
//                             <li>
//                                 <Link to='/Projects'>Projects</Link>
//                             </li>
//                         </ul>
//                     </nav>
//                     <Switch>
//                         <Route exact path= '/' component={() => <UserList items={this.state.users} />} />
//                         <Route exact path= '/projects' component={() => <ProjectList items={this.state.projects} />} />
//                         {/*<UserList items={this.state.users} />*/}
//                         {/*<ProjectList items={this.state.projects} />*/}
//                         <Route path="/user/:id">
//                             <UserProjectList items={this.state.projects} />
//                         </Route>
//                         <Redirect from='/users' to='/' />
//                         <Route component={NotFound404} />
//                     </Switch>
//                 </BrowserRouter>
//             </div>
//        )
//    }
// }


class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'token': ''
       }
   }

   set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        // this.setState({'token': token})
        this.setState({'token': token}, ()=>this.load_data())
   }

   is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        // this.setState({'token': token})
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
            // console.log(response.data)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
            return headers
        }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    load_data() {
       const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
    }

    componentDidMount() {
       this.get_token_from_storage()
       // this.load_data()
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
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                            {/*<li>*/}
                            {/*    <Link to='/login'>Login</Link>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList items={this.state.users} />} />
                        <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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
