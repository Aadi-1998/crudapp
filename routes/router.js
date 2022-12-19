const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   const { name, email, age, mobile, work, add, desc } = req.body;

//   if (!name || !email || !age || !mobile || !work || !add || !desc) {
//   //  return res.status(422).json("plz fill the data");
//   console.log("Hi")
//  return res.send({status:422,
//     message:"plz fill the data"
//   })
//   }

//   try {
//     const preUser = await users.findOne({ email: email });
//     console.log(preUser);

//     if (preUser) {
//       //  res.status(422).json("this is user is already present");
//       res.send({status:422,
//         message:"this is user is already present"
//       })
//     } else {
//       const addUser = new users({
//         name,email,age,mobile,work,add,desc,
//       });

//       await addUser.save();
//       res.status(201).json(addUser);
//       console.log(addUser);
//     }
//   } catch (error) {
//     console.log(error)
//     res.send({status:422,
//       message:"Server error"
//     })
//     // res.status(422).json(error);
//   }
// });



router.post("/register",async(req,res)=>{
  // console.log(req.body);
  const {name,email,age,mobile,work,add,desc} = req.body;

  if(!name || !email || !age || !mobile || !work || !add || !desc){
      res.status(422).json("plz fill the data");
  }

  try {
      
      const preuser = await users.findOne({email:email});
      console.log(preuser);

      if(preuser){
          res.status(422).json("this is user is already present");
      }else{
          const adduser = new users({
              name,email,age,mobile,work,add,desc
          });

          await adduser.save();
          res.status(201).json(adduser);
          console.log(adduser);
      }

  } catch (error) {
      res.status(422).json(error);
  }
})


// ****************


// router.post('/add', (req,res)=>{
//   console.log(req.body)
//   const data = new users({
//     name:  req.body.name, 
//     email: req.body.email,
//     age:   req.body.age,
//     mobile:req.body.mobile,
//     work:  req.body.work,
//     add:   req.body.add,
//     desc:  req.body.desc
//   })
//   data.save()
//   .then(result=>{console.log(result)
//     res.status(201).json({data:result})
//   })
//   .catch(err=>{
//     console.log(err)
//     res.status(404).json({error:err})
//   })
// })

// get userData

router.get('/getData',async(req,res)=>{
  try{
    const userData = await users.find();
    res.status(201).json(userData)
    console.log(userData)
  }
  catch (error){
res.send({
  status:422,
  message:error
})

  }
})


// get user by Id

// router.get('/getUser/:id',async(req,res)=>{
//     try {
//       console.log(req.params)
//       const {id} = req.params;
//       const userIndividual = await users.findById(id);
//       console.log (userIndividual)
//       res.status(201).json(userIndividual)


//     } catch (error) {
  

//       res.send({
//         status:422,
//         message:error
//       })
//       console.log(error);
//     }
// })

router.get("/getUser/:id",async(req,res)=>{
  try {
      console.log(req.params);
      const {id} = req.params;

      const userIndividual = await users.findById({_id:id});
      console.log(userIndividual);
      res.status(201).json(userIndividual) 

  }
   catch (error) {
      res.status(422).json(error);
  }}
)
  //update userData
  


 router.patch('/updateUser/:id',async(req,res)=>
 {
 
 try {
  const {id}= req.params;
  
  const updatedUser= await users.findByIdAndUpdate(id,req.body,{
    new:true
  });
  console.log(updatedUser)
  res.status(201).json(updatedUser);


  
 } 
 catch (error) 
 {
  res.status(422).json(error)
  
 }

})


//Delete User

router.delete('/deleteUser/:id', async(req,res)=>{
  try {
     const {id}= req.params;

     const deleteUser = await users.findByIdAndDelete({_id:id})
     console.log(deleteUser)
     res.status(201).json(deleteUser)
    
  } catch (error) {
    res.status(422).json(error)
    
  }
})


module.exports = router;
