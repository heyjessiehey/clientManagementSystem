import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            sex: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((resposne)=> {
                console.log(resposne.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            sex: '',
            job: '',
            fileName: ''
        })

    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('sex', this.state.sex);
        formData.append('job', this.state.job);
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
        return(
            <form onSubmit = {this.handleFormSubmit}>
                <h1>Add Client</h1>
                Profile Image: <input type="file" name ="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input><br></br>
                Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input><br></br>
                Birthday: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input><br></br>
                Sex: <input type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange}></input><br></br>
                Job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input><br></br>
                <button type="submit">Add</button>
            </form>
        )
    }
}

export default CustomerAdd;