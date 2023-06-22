const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const user = require("./routes/routes")
const app = express()



app.use(cors({origin:true}));
app.use(express.json());


mongoose.connect("mongodb+srv://netflix:netflix@cluster0.orxg00c.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongodb connected');
}).catch((error)=>{
    console.log(error.message);
})


app.use("/api/user",user)


app.listen(5000,()=>{
    console.log("server is running on 5000");
})