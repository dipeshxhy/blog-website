const express = require("express");
const dotenv = require("dotenv");
const multer=require("multer")
const cors=require('cors')

const mongoose = require("mongoose");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
 const path = require("path");
const categoryRoute=require("./routes/categories")

dotenv.config();
const app = express();
app.use(express.json())

//serve static files from the build folder

app.use("/images", express.static(path.join(__dirname, "/images")));

// app.use("/images",express.static(path.join(_dirname,"/images")))

app.use(cors())
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongoDb"))
  .catch((error) => console.log(error));


  const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"images")
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name)
    }
  })

  const upload=multer({storage:storage})
  app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.send("file uploaded successfully")
  })

//routes
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)






const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});



