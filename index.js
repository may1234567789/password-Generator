import express from "express";
import bodyParser from "body-parser";
import generator from "generate-password";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index", { password: null });
});


// app.post("/generate", (req, res) => {
//   console.log("req.body:", req.body);
//   console.log("Uppercase:", req.body.uppercase);
//   console.log("Lowercase:", req.body.lowercase);
//   console.log("Numbers:", req.body.numbers);
//   console.log("Symbols:", req.body.symbols);
//   res.send("Check terminal");
// });


app.post("/generate", (req, res) => {
  const { uppercase, lowercase, numbers, symbols } = req.body;
  const Numbers = req.body.numbers;
  const Symbols = req.body.symbols;
  const Uppercase = req.body.uppercase;
  const Lowercase = req.body.lowercase;
  const password = generator.generate({
    length: 12,
    numbers: Numbers === "on" ? true : false,   
    symbols:Symbols === "on" ? true : false,
    uppercase: Uppercase === "on" ? true : false,
    lowercase: Lowercase === "on" ? true : false,
  });
  res.render("index", { password });
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
