const express = require("express");
const mongoose = require("mongoose")

const app = express();
const PORT = 3000

// Connection 
mongoose.connect("mongodb://127.0.0.1:27017/library")
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log("Mongo Error", err))

const bookDetailsSchema = new mongoose.Schema({
    Name: { type: String, required: true, },
    Author: { type: String, required: true, },
    Pages: { type: String, required: true },
    Price: { type: String, required: true },
    bookAvailability: { type: String, enum: ['In Stock', 'Out of Stock', 'Discontinued'], required: false },
    bookIssue: { type: Date, default: Date.now, required: true },
    bookReturn: { type: Date, required: true },
}, { timestamps: true })

const BookDetails = mongoose.model('book-details', bookDetailsSchema)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const html =
        `<html>
        <head>
            <title>
                Home
            </title>
        </head>

        <body>
        <p>HOMEPAGE</p>
        </body>
    </html>`

    res.send(html)
})


app.get("/chat-room", (req, res) => {
    const data = [
        {
            name: "JavaScript Book",
            availability: "In Stock",
            issueDate: new Date("2023-01-15"),
        },
        {
            name: "Python Book",
            availability: "Out of Stock",
            issueDate: new Date("2023-05-10"),
        },
        {
            name: "Node.js Book",
            availability: "Discontinued",
            issueDate: new Date("2022-12-01"),
        },
    ];

    const chatRoom =
        `<html>
            <head>
                <title>ChatRoom</title>
            </head>
            <style>
                table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}
                td,th {border: 1px solid #dddddd;text-align: left;padding: 8px;}
                tr:nth-child(even) {background-color: #dddddd;}
            </style>

            <body>
                <h1>All Books</h1>
                <table>
                    <tr>
                        <th>Book Name</th>
                        <th>Book Author</th>
                        <th>Book Pages</th>
                        <th>Book Price</th>
                        <th>Book Availability</th>
                        <th>Issue</th>
                        <th>Return</th>
                        <th>Delete</th>
                        </tr>
                        ${data.map(element => 
                            `<tr>
                            <td>${element.availability}</td>
                            <td>${element.availability}</td>
                            <td>${element.availability}</td>
                            <td>${element.availability}</td>
                            </tr>`
                        )}

                        
        </table>
            </body>
        </html>`

    res.send(chatRoom)
})

app.listen(PORT, (req, res) => {
    console.log("server connected succesfully to port:", PORT)
    console.log(`http://localhost:${PORT}`)
})