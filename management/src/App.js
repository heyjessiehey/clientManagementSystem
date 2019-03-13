import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer'

const customers =[
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/1',
    'name': 'James Brouwn',
    'birthday': '991023',
    'sex': 'Male',
    'job': 'Student'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': 'Michelle Obama',
    'birthday': '771103',
    'sex': 'Female',
    'job': 'Formal first lady'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/3',
    'name': 'Ariana Grande',
    'birthday': '891023',
    'sex': 'Female',
    'job': 'Singer'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return(
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                sex={c.sex}
                job={c.job}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
