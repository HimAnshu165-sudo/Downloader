const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/user", (req, res) => {
  res.json([
    {
      id:1,
      name: "Amit",
      role: "Frontend Dev",
      salary: 15000,
    },
    {
      id:2,
      name: "Hemu",
      role: "Frontend Dev",
      salary: 18000,
    },
    {
      id:3,
      name: "Himanshu",
      role: "Frontend Dev",
      salary: 20000,
    }
  ]);
});
app.get("/client", (req, res) => {
  res.json([
    {
      id:1,
      name: "Salanki",
      role: "Api User",
    },
    {
      id:2,
      name: "xyz",
      role: "Api user",
    }
  ]);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
