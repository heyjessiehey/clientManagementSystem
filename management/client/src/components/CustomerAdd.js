import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            sex: '',
            job: '',
            fileName: '',
            open: false
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
            fileName: '',
            open: false
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

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            sex: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add Client
                </Button>
                <Dialog open={this.state.open}  onClose={this.handleClose}>
                    <DialogTitle>Add Client</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br></br>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Choose Profile Image" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="Name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="Birthday" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="Sex" type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange}></TextField><br></br>
                        <TextField label="Job" ype="text" name="job" value={this.state.job} onChange={this.handleValueChange}></TextField><br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Add</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);