import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import App from '../App';

class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employerId:props.empl.id,
            title: '',
            description: '',
            endTime: '',
            assignedTime: '',
            status: 'NEW'
        }
    }

    render() {
        const {title, description, endTime, assignedTime, status} = this.state;
        return (
            <div className={'float-left'}>
                <form action="" onSubmit={this.onSubmitHandler}>
                    <div>
                        <input value={title} name={'title'} placeholder={'title'} type="text"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input value={description} name={'description'} placeholder={'description'} type="text"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input value={assignedTime} name={'assignedTime'} placeholder={'assignedTime'} type="date"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input value={endTime} name={'endTime'} placeholder={'endTime'} type="date"
                               onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <select value={status} name={'status'} placeholder={'status'} onChange={this.changeHandler}>
                            <option disabled>Choose a status...</option>
                            <option value="NEW">new</option>
                            <option value="INPROGRESS">In Progress</option>
                            <option value="FINISHED">finished</option>
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
        axios.post('http://localhost:8090//addTask/'+this.state.employerId, this.state).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
        let myRegistrationModal = ReactDOM.render(<App/>, document.getElementById('container'));
        myRegistrationModal.emplUpdate(this.state.employerId)
    }
}

export default AddTask;