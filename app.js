const express = require('express');
const mysql=require("mysql")
require('dotenv').config();
const bodyparser = require('body-parser');
const app=express()
const {createUserDataValidation,deleteUserDatavalidation}=require('./validation');
const { result } = require('@hapi/joi/lib/base');

app.use(bodyparser.json());

const con=mysql.createConnection({
    host:'localhost',
    user: "root",
    password: process.env.PASSWORD,
    database:'customer'
   
  });
  
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });



// create database
app.get('/createdb',(req,res)=>{
    let sql="CREATE DATABASE customer" 
    con.query(sql,(err)=>{
        if(!err){
            res.send("database created")
        }
        else res.send(err)
    })
}
)

// create table
app.get('/createTable',(req,res)=>{
    let sql='CREATE TABLE customer_data(id int AUTO_INCREMENT,name VARCHAR(255) UNIQUE,email VARCHAR(255) UNIQUE,posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,phone BIGINT,PRIMARY KEY(id))'
    con.query(sql,(err)=>{
        if(!err)res.send("table created")

        else{
            res.send(err)
            console.log(err);
        }
    })
})

// Create API
// POST -  localhost:3000/createuser
// request body- {name:'lakshya',email:'lakshyabhasin@gmail.com',phone:"*********"}
app.post('/createUser',(req,res)=>{
    var body=req.body
    const {error}=createUserDataValidation(body)
    if(error){
        return res.status(400).send({error:"ERROR! NOT VALID INPUT",message:error.details[0].message})
     }

    let sql='INSERT INTO customer_data SET ?' 
    let query=con.query(sql,body,err=>{
        if(err){
            res.send(err);
        }
        else res.status(200).send({error:"null",message:"User Data added"})
    })
})

// Delete API
app.delete('/deleteUser',(req,res)=>{
    var body=req.body
    const {error}=deleteUserDatavalidation(body)
    if(error){
        return res.status(400).send({error:"ERROR! NOT VALID INPUT",message:error.details[0].message})
     }

     let sql = "DELETE FROM customer_data WHERE email = ?";
     let email=body.email

     let query=con.query(sql,email,(err)=>{
        if(err){
            res.status(400).send(err)
        }
        else res.status(200).send({error:"null",message:"Row deleted"});
    })


})
// Search API
app.get('/search',(req,res)=>{
    var body=req.body
    const {error}=deleteUserDatavalidation(body)
    if(error){
        return res.status(400).send({error:"ERROR! NOT VALID INPUT",message:error.details[0].message})
     }
    let sql='SELECT FROM members WHERE email= ?'
    let email=body.email

    let query=con.query(sql,email,(err,result)=>{
        if(err){
            res.status(400).send(err)

        }else{
            console.log(result)

         res.status(200).send(result);
        }
    

    })
    
})

// List API
app.get('/getList',(req,res)=>{
    let sql='SELECT * FROM customer_data ORDER BY posted_date';
    let query=con.query(sql,(err,result)=>{
        if(err){
            res.send(err)
        }
        else res.send(result);
    })
})





app.get('/',(req,res)=>{
    res.send({
        status:'ok'
    })
})
app.listen('3000',()=>{
console.log("listening to port 3000");
})