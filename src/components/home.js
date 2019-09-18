import React, {Component} from "react";

class Home extends Component {
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
}

export default Home;