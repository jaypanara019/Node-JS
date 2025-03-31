const express = require("express");
const port = 8022;
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    let studentArr = [
        {
            name : "jay",
            email : "jay@gmail.com",
            age : 18,
            phone : 956474411,
        },
        {
            name : "rahul",
            email : "rahul@gmail.com",
            age : 19,
            phone : 955585855,
        },
        {
            name : "pawar",
            email : "pawar@gmail.com",
            age : 20,
            phone : 5824962147,
        },
    ]
    return res.render("index",{
        studentArr
    });
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("Server running successfully.");
    
})