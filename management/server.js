const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
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
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));