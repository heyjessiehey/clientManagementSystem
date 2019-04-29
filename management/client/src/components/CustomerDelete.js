import React from 'react';

class CustmerDelete extends React.Component{

    deleteCustomer(id){
        //REST API
        const url = 'api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render(){
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>Delete</button>
        )
    }
}

export default CustmerDelete;