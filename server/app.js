const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 5000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
});

// POST

app.post("/class", (req, res) => {
  const { classType, teacher, classNumber } = req.body;

  let tableName;
  switch (classType) {
    case "A":
      tableName = "class_a";
      break;
    case "B":
      tableName = "class_b";
      break;
    case "C":
      tableName = "class_c";
      break;
    default:
      return res.status(400).send("Invalid class type");
  }

  const query = `INSERT INTO ${tableName} (teacher, class_Number) VALUES (?, ?)`;
  connectDB.query(query, [teacher, classNumber], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send("Class added sucessfully");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
