const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 6606;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
    }),
);
app.use(cors());

app.listen(port, () => {
    console.log('express server started with port', port);
});

const { RSAKey } = require('./rsa_js/rsa');

app.post('/encrypt-password', (req, res) => {
    const { password, modulus, exponent } = req.body;

    console.log(('요청', req.body));

    const rsa = new RSAKey();
    rsa.setPublic(modulus, exponent);
    const encPassword = rsa.encrypt(password);

    console.log('암호화된 비밀번호', encPassword);

    res.send({ encPassword });
});

fetch('http://localhost:6606/encrypt-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        password: '',
        modulus: '',
        exponent: '',
    }),
});
