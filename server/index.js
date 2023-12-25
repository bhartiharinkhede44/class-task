import  express, { response }  from "express";
import  mongoose  from "mongoose";
import dotenv from "dotenv";
import Task from "./models/task.js"
dotenv.config();
const app = express();
app.use(express.json());


const connectDB = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://bhartiharinkhede44:iG6aWXwtADa2Aaa2@bharti.nok7e9w.mongodb.net/classtask");
        if (conn) {
            console.log ('MongoDB connected 🙂...');
        }
    }
    catch(err){
        console.log(err.message)
    }
   
};

app.post('/addTasks',async(req,res)=>{
    const {title,msg,pri}=req.body;
    const newTask = new Task({
        title,msg,pri

    })
    try {
        const saveTask = await newTask.save()
        return res.json({
            data: saveTask,
            success: true,
            message: "successfully Added all task"
        })
    }
    catch (e) {
        return res.json(
            {
                message: (e.message)
            }
        )
    }
    
})
    app.get('/showAllTasks',async(req,res)=>{
        const allTask= await Task.find()
        return res.json({
            data:allTask,
            success:true,
            message:"successefully fetched all Task"
        })
    })

    





const PORT = 5000;
app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});