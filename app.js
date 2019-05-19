var bodyparser=require("body-parser"),
mongoose      =require("mongoose"),
express       =require("express"),
app           =express();
//APP CONFIG
mongoose.connect("mongodb://localhost/blog_app",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


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

const port = 3000;
app.listen(port ,() => {
    console.log(`Server started at port ${port}`);
});