const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

const allTask = [
    {
        id:Math.floor(Math.random()*1000),
        task:'first Task',
        status:false
    }
]

app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

console.log(__dirname)

app.get('/',async (req,res)=>{
    return res.render('home',{allTask});
})

app.get('/main',async (req,res)=>{
    return res.render('main',{allTask});
})

app.post('/insertTask',async (req,res)=>{
    allTask.push({
        id:Math.floor(Math.random()*1000),
        task:req.body.task,
        status:false
    });
    return res.redirect('/main');
})


app.get('/completeTask/:id',async(req,res)=>{
    allTask.map((item,i)=>{
        if(item.id==req.params.id){
            item.status = true;
        }
    });
    return res.redirect('/main');
});

app.get('/update', async (req, res) => {
    return res.render('edit', { allTask });
});

app.post('/updateTask/:id', async (req, res) => {
    console.log(req.params.id); 
    const { id } = req.params;
    const { task } = req.body;
    let taskUpdated = false;
    allTask = allTask.map((item) => {
        if (item.id == id) { 
            taskUpdated = true;
            return { ...item, task };
        }
        return item;
    });


        res.redirect('/update');  
   
});


app.get('/deleteTask/:id',async (req,res)=>{
    allTask.map((item,i)=>{
        if(item.id==req.params.id){
            allTask.splice(i,1);
        }
    });
    return res.redirect('/main');
})

app.listen(port,err=>console.log(err?err:"Server run in http://localhost:"+port))