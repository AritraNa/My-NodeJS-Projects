const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose")
const { type } = require("os");

const app = express();
const PORT = 8000;

// Connection 
mongoose.connect("mongodb://127.0.0.1:27017/myFirst-Node-JS-Project")
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("Mongo Error", err))
// Scheme
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  jobTitle: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile("log.txt", `\n${Date.now()}: ${req.method} ${req.path}\n`, (err, data) => {
    next();
  });
});

app.use((req, res, next) => {
  next();
});

//routes
app.get("/users", (req, res) => {
  const html = `<ul>
 ${users
      .map(
        (user) =>
          `
    <li>${user.first_name}</li>
    <li>${user.last_name}</li>
    <li>${user.gender}</li>`
      )
      .join(" ")}
 </ul>`;

  res.send(html);
});

//REST API

// GET POST /api/users

app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post(async (req, res) => {
    //TODO : Create new user
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
      res.status(400).json({ msg: "All fields are reqd." })
    }
    const result = await User.create({
      firstName: body.first_name,
      lastName: body?.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title
    })

    console.log("result", result);

    return res.status(201).json({ status: "success" })

  });



app.get("/user/get-single-user/:id"((req, res) => {
  const _id = req.params._id
  const body = req.body
  res.status(200).json({ msg: "success", body: body })
}))

app.get("/user/get-all-user"((req, res) => {
  const body = req.body
  res.status(200).json({ msg: "success", body: body })
}))

app.delete("/user/delete-user"((req, res) => {
  const body = req.body
  res.status(200).json({ msg: "success", body: body })
}))

app.post("/user/create-user"((req, res) => {
  const body = req.body
  //USE USER SCHEMA TO CREATE USER AND ADD IT TO DB
  res.status(200).json({ msg: "success", body: body })

}))

app.patch("/user/update-user"((req, res) => {
  const body = req.body
  //USE USER SCHEMA TO UPDATE USER AND ADD IT TO DB
  res.status(200).json({ msg: "success", body: body })
}))




app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) { res.status(404).json({ error: "User not found" }) }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req?.body;
    const userIndex = users.findIndex((user) => user?.id === id);

    users[userIndex] = {
      ...users[userIndex],
      ...body,
    };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  });

app.listen(PORT, () => console.log(`Server Started on port : ${PORT}`));
