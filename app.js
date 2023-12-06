
/* mongo db stuff from The Net Ninja 
Node.js Crash Course Tutorial #9  https://www.youtube.com/watch?v=bxsemcrY4gQ
Node.js Crash Course Tutorial #10  https://www.youtube.com/watch?v=VVGgacjzc2Y
*/

  const express = require("express");  
//import express from 'express';
const morgan = require("morgan");    // requiring middleware
const mongoose =require("mongoose");
const Blag = require("./models/blogModel");
/* userx   123456@a to  6j5pbHRxwLanqaq4   Project0*/
const multer = require('multer'); const upload = multer(); //  to receive Formdata()
require('dotenv').config();
const app = express();

//  to conceal password in env file, see TNN mern stack4 video
//  app.listen(process.env.PORT || 3333); alternative below as part of logging in to mongoose
//  in password:654321@a ; may need to escape @ with %40 , password changed to : 6j5pbHRxwLanqaq4   

let api_key = process.env.MONGO_URI_FROM_ENVX; console.log("api_key = ",api_key);  



// install dotenv , use render environment variables
//           mongodb+srv://userx:6j5pbHRxwLanqaq4@cluster0.t8319.mongodb.net/Project0?retryWrites=true&w=majority
//const dbURI='mongodb+srv://userx:6j5pbHRxwLanqaq4@cluster0.t8319.mongodb.net/Project0?retryWrites=true&w=majority';                                                                                                                       
//mongoose.connect(dbURI, {UseNewUrlParser: true,UseUnifiedTopology:true})   
mongoose.connect(api_key, {UseNewUrlParser: true,UseUnifiedTopology:true})                                                                                                                                   
 .then((result)=>{app.listen(process.env.PORT || 3333); //ie localhost:3333 
                  console.log("connected to daaaata base");
                 })
 .catch((err)=>console.log(err));

app.use(express.json());
app.set("view engine","ejs");
``
app.use((req,res,next)=>    // this is middleware
 {console.log("in midddddleware");
  console.log(req.body);
  console.log("in midddddleware, after console.log(req.body)");
  next();    // necessary to proceed to next function   
 });

 app.use(express.static("public")); // to make files available to front end
 /*below: to parse form data sent, to a format usable form for attaching to ....*/
 app.use(express.urlencoded({extended: true})); /*... req object when creating new entry: To be able to accept form data*/
 app.use(morgan("tiny"));  // 3rd party middleware (morgan is pretty innocuous, varies log to console)

/*  
app.get("/",(req,res)=>
 {const blogs = [{title: "this is title 1",snippet: "no 1 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, temporibus!"},        
                 {title: "this is title 2",snippet: "no 2 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, temporibus!"},
                 {title: "this is title 3",snippet: "no 3 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, temporibus!"}                   
                ];
  res.render("index",{blogs: blogs});
 });
*/

 /* practice create new blog/ 
app.get("/add-blog",(req,res)=>
  {const blog1=new Blag({title: "new blog 2",
                          snippet: "2about new blog2",
                          body: "2much more on2 my new blog2"
                         });
   blog1.save()
    .then((result)=>{res.send(result);}) 
    .catch((error)=>{console.log(error);});                     
  }
 );
 end practice create new blog*/

/* practice get all blogs 
app.get("/all-blogs",(req,res)=>
 {Blag.find()
    .then((result)=>{res.send(result);})
    .catch((error)=>{console.log(error);}); 
 }     );
 end practice get all blogs  */

/* practice get single blog   /  
app.get("/single-blog",(req,res)=>
 {Blag.findById("61c3309d347f804d768d5c7d")
    .then((result)=>{res.send(result);})
    .catch((error)=>{console.log(error);}); 
 }     );
end practice get single blog  */

app.get("/",(req,res)=>{res.redirect("/blogs");});

//app.get("/",(req,res)=>
// {console.log("in abouttttt");
//  res.render("about",{titlex: "not aboout" });
// });


app.get("/about",(req,res)=>
 {console.log("in abouttttt");
  res.render("about",{titlex: "aboout" });
 });

 app.get("/extra1",(req,res)=>
 {console.log("in exxxxxtra1");
  res.render("extra1",{titlex: "extra1" });
 });

 app.put("/extra1",(req,res)=>
 {console.log("in exxxxxtra1");
  res.render("extra1",{titlex: "extra1" });
 });

app.get("/about-us",(req,res)=>{res.render("about");});  // re-direct

app.get("/update",(req,res)=>
 {console.log("in app, in get updatttte");
 
  const blog1 = new Blag();
  res.render("update",{titlex: "upddddate",blog: blog1});  //, blog :req.body });
 });

/* to get all blogs    */
app.get("/blogs",(req,res)=>
 {console.log("in get blogs before console.log(req.body)")
    //console.log(req.body);
    //res.render("index",{titlex: "All Blogs"});

    Blag.find().sort({createdAt: -1}) /* sort to go from newest to oldest */
    .then((result)=>{res.render("index",{titlex: "All Blogs",blogs: result});})
    .catch((error)=>{console.log(error);}); 

 }     );

 /* to create new entry */
app.post("/blogs",(req,res)=>
 {console.log("in app.js, new entry");
  const blog1 = new Blag(req.body);
    
  blog1.save()
    .then((result)=>{res.redirect("/blogs");}) /*after new entry is dispatched, go back to blogs page*/
    .catch((error)=>{console.log(error);});  
 });

 /* to display a single blog*/
 app.get("/blogs/:id",(req,res)=>
 { console.log(req.params);
   const id = req.params.id;  
   Blag.findById(id)
    .then((result)=>{res.render("detail",{blog: result, titlex: "blog details"}); })
    .catch((error)=>{console.log(error);});        
 }      );    
             
/* to delete an entry*/
app.delete("/blogs/:id",(req,res)=>
 {const id = req.params.id; 
   Blag.findByIdAndDelete(id)
   .then((result)=>{res.json({redirect: "/blogs"}); })
   .catch((error)=>{console.log(error);});   
 }        );

/*  */
//const multer = require('multer'); const upload = multer(); // essential to receive Formdata()

app.post('/send', upload.none(), (req, res) => {
  const formData = req.body;
  console.log('form data', formData);
  res.sendStatus(200);
});
/* */

/* to update an entry*/

app.put("/update", upload.none(), (req,res)=>
 {console.log("in app, in POST updateeee top"); //console.log(req);

  const filter = { _id: req.body.id };
  const update = { title: req.body.title,snippet: req.body.snippet,body: req.body.body,};
  console.log("update =", update);
  Blag.findOneAndUpdate(filter, update, { new: true})
    //.then((result)=>{console.log("in then after Blagchasing result", result);})
    .then((result)=>{return res.json({redirect: "/blogs"}); })
    .catch((error)=>{console.log("in Blag.findOneAndUpdate error",error);});  
 });        

app.get("/create",(req,res)=>{res.render("create", {titlex:"creeate"});});

app.use((req,res)=>{res.status(404).render("404",{titlex: " 404 "});}); // ie url cannot be applied

// end
 



