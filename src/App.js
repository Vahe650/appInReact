import React, {Component} from 'react';
import './css/style.css'
import NavBar from "./components/navBar";
// import Home from "./components/home";


class App extends Component {
    state={
        loading:true,
        employee: null
    };
 async   componentDidMount() {
        const url='http://developer:8090/all/'
        const response=await fetch(url)
        const data=response.json()
     this.setState({employee: data.results})
        data.then((dt)=>{
            console.log(dt);
        });
    };

    render() {
        return (
            <div>
                <div className="App">
                    <NavBar title="Employers"/>
                </div>
                <div className="App">
                    {this.state.then(n((dt)=>{
                        console.log(dt);
                    }))}
                </div>
            </div>
        );
    }
}

export default App;
