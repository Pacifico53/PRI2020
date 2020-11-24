//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/shopList';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexao ao MongoDB realizada com sucesso...")
});

var shopListSchema = new mongoose.Schema({
    product: String,
    quantity: Number,
    category: String
});

var shopListModel = mongoose.model('list', shopListSchema);

var data = [
    {
        "product" : "Bananas",
        "quantity": 6,
        "category": "Fruit"
    },  
    {
        "product" : "Sugar",
        "quantity": 2,
        "category": "Groceries"
    },
    {
        "product" : "Apples",
        "quantity": 10,
        "category": "Fruit"
    },
    {
        "product" : "Carrots",
        "quantity": 8,
        "category": "Vegetables"
    }
]

shopListModel.create(data);

console.log("That's all folks...")
