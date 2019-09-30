import React, {Component} from 'react';
import './css/style.css'
import axios from "axios";
import './css/bootstrap.min.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {faCut} from '@fortawesome/free-solid-svg-icons'
// import {prof} from '@fortawesome/free-solid-svg-icons'
import NavBar from "./components/navBar";

import Employee from "./components/Employee";
import UpdateEmployee from "./components/UpdateEmployee";
import AddTask from "./components/AddTask";

function Employeers(props) {
    var classes = '';
    if (props.posts.degree === 'SENIOR') {
        classes = 'redColor'
    }
    const content =
        <tr className={classes} onClick={props.onMark}>
            <td>{props.posts.id}</td>
            <td>{props.posts.name}</td>
            <td>{props.posts.surname}</td>
            <td>{props.posts.degree}</td>
            <td>{props.posts.tasks.length}</td>
            {props.children}
        </tr>
    return (content)
}

function Tasks(props) {
    console.log(props.task);
    const content =
        <tbody className={'border'}>
        <tr>
            <td>{props.task.id}</td>
            <td>{props.task.title}</td>
            <td>{props.task.description}</td>
            <td>{props.task.assignedTime}</td>
            <td>{props.task.endTime}</td>
            <td>{props.task.status}</td>
            {props.children}
        </tr>
        </tbody>

    return (content)
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            employee: [],
            appTitle: 'React',
            addEmpl: false,
            updateEmpl: false
        };
    }

    componentDidMount() {
        var employers = [];
        fetch('http://localhost:8090/all/')
            .then(res => res.json())
            .then(json => {
                if (json._embedded !== undefined) {
                    json._embedded.employeeResourceList.forEach(obj => {
                        employers.push(obj.employer);
                    })
                }
                console.log(employers);
                this.setState({
                    loading: true,
                    employee: employers,
                })
            })
    }

    handleMArked(id) {
        const empls = this.state.employee.concat()
        var find = empls.find(empl => empl.id === id);
        if (find.degree === 'SENIOR') {
            find.degree = 'MIDDLE'
        } else {
            find.degree = 'SENIOR'
        }
        this.setState({
            loading: true,
            employee: empls,
        })
    }

    emplUpdate(id) {
        fetch('http://localhost:8090/getOneEmployee/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    empl: json.employer,
                    updateEmpl: true
                })
            });
        return this.state.empl
    }

    emplDelete(id) {
        axios.delete('http://localhost:8090/deleteEmployee/' + id).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
        this.componentDidMount()

        this.setState({
            employee: this.componentDidMount()
        })
    }


    addEmpl() {
        this.setState({addEmpl: true})
    }


    titleChangeHandler(title) {
        if (title.trim() === '') {
            title = 'React'
        }
        this.setState({
            appTitle: title
        })

    }

    searchHandler(name) {
        console.log(name);
        // var rows = document.getElementById('myTable').childNodes;
        // rows.forEach(row => {
        //     if (row.childNodes[1].innerText.toUpperCase().startsWith(name.toUpperCase())) {
        //         row.style.display = "";
        //     } else {
        //         row.style.display = "none";
        //     }
        // })
        if (name.length ===0) {
            this.componentDidMount()
        } else {
            var employers = [];
            fetch('http://localhost:8090/searchEmployee/' + name)
                .then(res => res.json())
                .then(json => {
                    json._embedded.employeeResourceList.forEach(obj => {
                        employers.push(obj.employer);
                    })
                    this.setState({
                        employee: employers,
                    })
                })
        }
    }


    tasksIter() {

        if (this.state.empl !== undefined) {
            return this.state.empl.tasks.map((task) => {
                return (
                    <Tasks key={task.id} task={task}/>
                )
            })
        }
    }

    EmployersRender() {
        // var id;
        // var employee
        // this.state.employee.forEach((empl) => {
        //         id = empl.id + 1
        //         employee = {id: id, name: 'namer' + id, surname: 'asdasd', degree: 'MIDDLE', tasks: []}
        //     }
        // )
        if (this.state.addEmpl) {
            return (
                <Employee/>
            )
        }
        if (this.state.updateEmpl) {
            return (

                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>description</th>
                            <th>start time</th>
                            <th>end time</th>
                            <th>status</th>
                            <th>update/delete</th>
                        </tr>
                        </thead>
                        {this.tasksIter()}
                    </table>
                    <UpdateEmployee empl={this.state.empl}/>
                    <AddTask empl={this.state.empl}/>
                </div>


            )
        }
        // this.state.employee.push(posts)
        return this.state.employee.map((empl) => {
            return (
                <Employeers key={empl.id} posts={empl} onMark={this.handleMArked.bind(this, empl.id)}>
                    <td className={'update'}>
                        <button onClick={this.emplUpdate.bind(this, empl.id)}><FontAwesomeIcon icon={faPencilAlt}/>
                        </button>
                        <button className={'ml-4'} onClick={this.emplDelete.bind(this, empl.id)}><FontAwesomeIcon
                            icon={faCut}/>
                        </button>
                    </td>

                </Employeers>
            )
        })
    }

    render() {
        var {loading,  addEmpl, updateEmpl} = this.state;
        var style = {marginLeft: '50px'}
        return (
            <div id={'container'} className={'container'}>
                <h1>{this.state.appTitle}</h1>
                <div className="App">
                    <NavBar title="Employers"/>
                </div>
                <div>
                    <button onClick={() => this.addEmpl()}> Add Employe</button>
                    <input style={style} value={this.state.appTitle} type='text'
                           onChange={(event) => this.titleChangeHandler(event.target.value)} placeholder={'name'}/>
                    <input style={style} type='text'
                           onChange={(event) => this.searchHandler(event.target.value)} placeholder={'search'}/>
                </div>
                {addEmpl || updateEmpl ?
                    <div>
                        {this.EmployersRender()}</div> :

                    !loading ? <h1>loading...</h1> :
                        <table className="table">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>surname</th>
                                <th>degree</th>
                                <th>tasks QTY</th>
                                <th>update/delete</th>
                            </tr>
                            </thead>
                            <tbody className={'border'}>
                            {this.EmployersRender()}
                            </tbody>
                        </table>}
            </div>
        );
    }


}

export default App;
