import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import App from '../App';

class Employee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            degree: 'JUNIOR'
        }
    }

    render() {
        const {name, surname, degree} = this.state;
        return (
            <div>
                <form action="" onSubmit={this.onSubmitHandler}>
                    <div>
                        <input value={name} name={'name'} placeholder={'name'} type="text"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input value={surname} name={'surname'} placeholder={'surname'} type="text"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <select value={degree} name={'degree'} placeholder={'degree'} onChange={this.changeHandler}>
                            <option  disabled>Choose a Degree...</option>
                            <option value="JUNIOR">JUNIOR</option>
                            <option value="MIDDLE">MIDDLE</option>
                            <option value="SENIOR">SENIOR</option>
                        </select>
                    </div>
                    <button type={'submit'}> SuBmIt</button>
                </form>
            </div>
        );
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})


    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8090/saveEmployee', this.state).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
        let myRegistrationModal = ReactDOM.render(<App />, document.getElementById('container'));
        myRegistrationModal.componentDidMount()
    }
}

export default Employee;