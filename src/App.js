import React, {Component} from 'react';
import './css/style.css'
import './css/bootstrap.min.css'
import NavBar from "./components/navBar";

// import Home from "./components/home";

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


        </tr>

    return (content)
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            employee: [],
            visible: true,
            appTitle: 'React'
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/all/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    loading: true,
                    employee: json,
                    visible: true
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
            visible: true
        })


    }


    carRender() {
        var id;
        var posts
        this.state.employee.forEach((empl) => {
                id = empl.id + 1
                posts = {id: id, name: 'namer' + id, surname: 'asdasd', degree: 'MIDDLE', tasks: []}
            }
        )
        if (!this.state.visible) {
            return null;
        }

        this.state.employee.push(posts)
        return this.state.employee.map((empl) => {
            return (
                <Employeers key={empl.id} posts={empl} onMark={this.handleMArked.bind(this, empl.id)}/>
            )
        })

    }

    toggleHandler() {
        console.log('it works');
        this.setState({visible: !this.state.visible})
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
        var rows = document.getElementById('myTable').childNodes;
        rows.forEach(row => {
            if (row.childNodes[1].innerText.toUpperCase().startsWith(name.toUpperCase())) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        })


    }

    render() {


        var {loading, employee} = this.state;
        var style = {marginLeft: '50px'}
        return (
            <div className={'container'}>
                <h1>{this.state.appTitle}</h1>
                <div className="App">
                    <NavBar title="Employers"/>
                </div>
                <div>
                    <button onClick={() => this.toggleHandler()}> Toggle</button>
                    <input style={style} value={this.state.appTitle} type='text'
                           onChange={(event) => this.titleChangeHandler(event.target.value)} placeholder={'name'}/>
                    <input style={style} type='text'
                           onChange={(event) => this.searchHandler(event.target.value)} placeholder={'search'}/>
                </div>


                {!this.state.loading ? <h1>loading...</h1> :
                    <table className="table">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>surname</th>
                            <th>degree</th>
                            <th>tasks QTY</th>
                        </tr>
                        </thead>
                        <tbody id="myTable" className={'border'}>
                        {this.carRender()}
                        </tbody>
                    </table>}
            </div>
        );
    }


}

export default App;
