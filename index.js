var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/sepm',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/Login",(req,res)=>{
    var name = req.body.name;
    var address = req.body.adress;
    var phno = req.body.phno;
    var phnoo = req.body.phnoo;
    var email = req.body.email;
    var nation = req.body.nation;
    var password = req.body.password;

    var data = {
        "name": name,
        "address" : address,
        "phno": phno,
        "phnoo" : phnoo,
        "email" : email,
        "nation" : nation,
        "password" : password
        
    }

    db.collection('Admin').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('Home.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(5500);


console.log("Listening on PORT 5500");