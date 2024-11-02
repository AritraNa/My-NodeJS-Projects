const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(users);
});

app.listen(PORT, () => console.log(`Server Started on port : ${PORT}`));
