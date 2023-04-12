//creating server using express and connecting it to mongoDB database

const express = require("express");

const cors = require("cors");
const mongodb = require("mongodb")
const { MongoClient } = require("mongodb");




const port = process.env.port || 5000;




const database = "ias-db";

//connection string to connect to the database
const url ="mongodb+srv://nitinpathak337:CSrF7mCyj92vZktD@cluster0.idctahp.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(url);
const app = express();
app.use(express.json());
app.use(cors());

let result = null;
let db = null;
let collection = null;

//connecting to database
async function connectDB() {
  try {
    result = await client.connect();

    db = result.db(database);

    collection = db.collection("requests-collection");

    console.log("Database Connected ");
  } catch (err) {
    console.log(`DB Error : ${err}`);
  }
}


//initialising server
app.listen(port, async() => {
    console.log("Server Started");
     connectDB();
  });



//login api 
app.post("/login",async(req,res)=>{
    const {username,password,type}=req.body;
    if(type==="Customer" && username==="customer" && password==="customer"){
      res.status(200);
      res.send(username);
    }
    else if (type==="Employee"){
      if(username==="employee1" && password==="employee1"){
        res.status(200);
        res.send(username);
      }
      else if (username==="employee2" && password==="employee2"){
        res.status(200);
        res.send(username);
      }
      else{
        res.status(400);
        res.send("Invalid Credentials")
      }
    }
    else{
      res.status(400);
      res.send("Invalid Credentials")
    }
})


//get all requests api
app.get("/get",async(req,res)=>{
  const data=await collection.find({}).toArray();
  res.send(data);

})


//post request api
app.post("/post",async(req,res)=>{
  const {product,issue,description}=req.body;
  const issueArr=issue.map((each)=>each.value);
  await collection.insertOne({product:product,issue:issueArr,description:description,name:"Customer",allocated:false,
  date:new Date(),employee:"",status:""  
});
  res.send("Request has been submitted and a customer care executive will be in touch with you soon");
  
}) 

//get single request api 
app.get("/get/:id",async(req,res)=>{
  const {id}=req.params;
  
  const data=await collection.find({_id:new mongodb.ObjectId(id)}).toArray();
  res.send(data); 

})

//api to allocate task to employee
app.put("/assign/:id",async(req,res)=>{
  const {id}=req.params;
  const {employee}=req.body;
  await collection.updateOne({_id:new mongodb.ObjectId(id)},{$set :{employee:employee,allocated:true,status:"OPEN"}});
  res.send("Task is allocated")
})

//api to change status of task 
app.put("/status/:id",async(req,res)=>{
  const {id}=req.params;
  const {status}=req.body;
  await collection.updateOne({_id:new mongodb.ObjectId(id)},{$set :{status:status}});
  res.send("Status Updated")
})
