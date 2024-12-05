const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const path=require('path')
const MovieRouter=require('./routes/movieRoutes')
app.use('/movies',MovieRouter)



app.get('/',(req,res)=>{
    res.send("welcome movie world")
})


app.listen(3003,()=>{
    console.log("server is started");
})