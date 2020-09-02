var express = require("express")
var app = express()

var mysql = require("mysql")
const { response } = require("express")

var bodyparser= require('body-parser')
var cores = require("cores")

//json encoded parser

var jsonparser = bodyparser.json();


//url encoded parser

var urlencodedparser = bodyparser.urlencoded({extended:false});

app.use(cores)

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'books'

})
con.connect((err)=>{
    if(err)throw err;
    console.log("connected to db");
    
})
//selecting all books
app.get('/books',(req,res)=>{
    con.query('SELECT * from books',(err,result,field)=>{
        if(err)throw err;
        res.send(result)
    })
})
//select a single book
app.get('/books/:id',(req,res)=>{
    let id = req.params.id;
  
    con.query(`SELECT * from books where id ='${id}'`,(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/books/add',jsonparser,(req,res)=>{
    let book_name = req.body.book_name;
    let discription = req.body.discription;
    let author = req.body.author_name;
    let price = req.body.price;

    qr = `INSERT INTO books(name, discription, author, price) VALUES ('${book_name}', '${discription}', '${author}', ${price})`;
    con.query(qr,(err,result,fields)=>{
        if(err) throw err;
          
    })
})

//update a book

app.patch('/books/update',jsonparser,(req,res)=>{
    let book_name = req.body.book_name;
    let discription = req.body.discription;
    let author = req.body.author_name;
    let price = req.body.price;
    let id = req.body.id;

    qr = `UPDATE books SET name='${book_name}',discription='${discription}',author='${author}',price=${price} WHERE id=${id}`;

    con.query(qr,(err,result,field)=>{
        if(err){
            res.send({fail:"failed"})
        }else{
            res.send({succes:"succes updates"})
        }
    })
})

app.delete('/books/delete/:id',(req,res)=>{
   let id= req.params.id
   qr =  ' DELETE FROM books WHERE id='+id;
   con.query(qr,(err,result,field)=>{
       if(err){
           res.send({fail:"operation failed"});
       }else{
           res.send({succes:"operation success"})
       }
   })
})




app.listen(3000)