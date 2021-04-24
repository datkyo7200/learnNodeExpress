const express = require("express");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const posts = require("./routes/posts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const http = require("http");

// Khoi dong app
const app = express();
const serve = http.createServer(app);
// Nhap khau routes

// Khoi dong Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Khoi dong body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Khoi dong method overrirde middleware
app.use(methodOverride("_method"));

// Khoi dong express middleware
app.use(express.json());

// Ket noi database
connectDB();

// Mot so routes co ban co the dua vao file rieng trong folder
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
// Mang routes vao de su dung
app.use("/posts", posts);

const PORT = process.env.PORT || 8000;

serve.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT} 👍`)
);
