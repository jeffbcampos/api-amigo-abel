const path = require('path');
express = require('express');

const app = express();
app.use(require('cors')());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

app.post('/send', (req, res, next) => {
    const data = {...req.body};
    require('./src/services/emailService/index')(data)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});


app.listen(3000, () => {
    console.log('start');
});