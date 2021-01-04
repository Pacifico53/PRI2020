const axios = require('axios');

axios.post('http://localhost:3000/instrumentos', {
    "id": "I53",
    "#text": "Tamborim"
}).then((resp) => {
    console.log(resp.data);
}).catch((err) => {
    console.log('Erro: ' + err);
});
