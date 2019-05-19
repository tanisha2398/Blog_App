var bodyparser=require("body-parser"),
methodOverride=require("method-override"),
mongoose      =require("mongoose"),
express       =require("express"),
app           =express();
//APP CONFIG
mongoose.connect("mongodb://localhost/blog_app",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:{type: Date,default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);

// Blog.create({
//     title:"Test Blog",
//     image:"https://farm6.staticflickr.com/5597/14986964993_befda7ef1e.jpg",
//     body:"This is my first blog in my blog app"
    
// });

app.get("/", (req, res) => {
    res.redirect("/blogs");
});
//RESTFUL  ROUTES

//INDEX ROUTE
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.blog(err);
        }
        else{
            res.render("index",{blogs:blogs});
        }
    });
     
});

//NEW ROUTE
app.get("/blogs/new",(req,res) =>{
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs",(req,res) =>{
    //create a new blog
    Blog.create(req.body.blog,(err,newBlog) =>{
        if(err){
            res.render("new");
        }else{
            //redirect to index
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id",(req,res) =>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    });
});

//Edit Route
app.get("/blogs/:id/edit",(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundBlog});
        }
    });
});

//Update Route
app.put("/blogs/:id",(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete Route
app.delete("/blogs/:id",(req,res)=>{
    Blog.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs")
        }
    });
});

const port = 3000;
app.listen(port ,() => {
    console.log(`Server started at port ${port}`);
});