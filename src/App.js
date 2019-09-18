import React, {Component} from 'react';
import './css/style.css'
import NavBar from "./components/navBar";

// import Home from "./components/home";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            employee: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/all/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    loading: true,
                    employee: json
                })
            })
    }


    render() {

        function Car(props) {
            const content = props.posts.map((post) =>
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.name}</td>
                    <td>{post.surname}</td>
                </tr>
            );
            return (content)
        }

        var {loading, employee} = this.state;
        var posts = [{id: '11', name: 'namer', surname: 'asdasd'}];

        return (
            <div>
                <div className="App">
                    <NavBar title="Employers"/>
                </div>

                <table className="App">
                    {!loading ? (
                        <thead>
                        <tr>
                            <th>loading...</th>
                        </tr>
                        </thead>
                    ) : <tbody className={'border'}>
                    {employee.map((empl) =>

                        <tr key={empl.id} className={'border'}>
                            <td>{empl.id}</td>
                            <td>{empl.name}</td>
                            <td>{empl.surname}</td>
                        </tr>
                    )}
                    <Car posts={posts}/>
                    </tbody>}
                </table>
            </div>
        );
    }

}

export default App;
