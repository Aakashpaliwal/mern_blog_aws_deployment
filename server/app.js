import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/users.js";

// app.use(bodyParser({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));
app.use(express.json({ limit: "300mb" }));
// app.use(cors());
app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello Memories API");
// });

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://aakash404:Barcelona%40123@cluster0.u5wyo.mongodb.net/mern_blog_db?retryWrites=true&w=majority&authSource=admin&replicaSet=atlas-2f2785-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded." + PORT);
      app.listen(PORT, () =>
        console.log(`server is running on port : ${PORT}`)
      );
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

// mongoose.set("useFindAndModify", false);
