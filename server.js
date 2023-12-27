import  express, { json }  from "express";
import {v4 as uuid} from "uuid";
import {readFile,writeFile} from "node:fs/promises";

const server = express()

const port = process.env.PORT || 8000;



server.use (express.json())

server.get('/', async(req,res)=>{
    res.json({message:"Yes home is working"})
})
server.get("/users",async (req,res)=>{
    try{
  const data = await readFile("./data/users.json", { encoding: 'utf8' })
   
    const users =JSON.parse(data);
    res.json(users);
    } catch (error){
        res.json({error:"Something went wrong"});
         
    }

});

server.get('/users/:id',async(req,res)=>{
const id = req.params.id;
try{
    const data = await readFile("./data/users.json", { encoding: 'utf8' })
    const users = JSON.parse(data);
     
      const singleUser=users.find((user)=>user.id===id)
      if (singleUser){
          res.json(singleUser)
        }else{
        res.json({error:"User not found"})

      }
      
      } catch (error){
          res.json({error:"Something went wrong"});
           
      }
  
    });

server.delete('/users/:id',()=>{})
server.post('/',()=>{})
server.patch('/',()=>{})


server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})