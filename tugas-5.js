const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

let task = [];
let complete = [];

app.get("/", function(req, res) {
    res.render("tugas", {task: task, complete: complete});
});

app.post("/add", function(req, res) {
    console.log(req.body)
    let newTask = req.body.newTask;
    task.push(newTask);
    res.redirect("/");
})

app.post("/remove", function(req, res) {

    let completeTask =  req.body.cek;

    console.log(completeTask)

    if (Array.isArray(completeTask)) {
        for (let i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    } else {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    }

    res.redirect("/");
})



app.listen(3700, function() {
    console.log("server is running on port 3700");
});