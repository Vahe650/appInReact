import React, {Component} from 'react';
import axios from "axios";
import App from '../App';
import ReactDOM from 'react-dom';


class UpdateEmployee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.empl.id,
            name: props.empl.name,
            surname: props.empl.surname,
            degree: props.empl.degree
        }
    }

    render() {
        const {id, name, surname, degree} = this.state;
        return (<div className={'float-left'}>
                <form action="" onSubmit={this.onSubmitHandler}>

                    <input value={id} name={'id'}  type="hidden"/>
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
                            <option>SENIOR</option>
                            <option>MIDDLE</option>
                            <option>JUNIOR</option>
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
        axios.put('http://localhost:8090/updateEmployee/' + this.state.id, this.state).then(response => {
            console.log(response);
            let myRegistrationModal = ReactDOM.render(<App/>, document.getElementById('container'));
            myRegistrationModal.emplUpdate(this.state.id)

        }).catch(error => {
            console.log(error);
        })

    }
}

export default UpdateEmployee;