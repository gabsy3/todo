const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const path = require('path');


app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let arr = [
    {
        id: "1",
        action: "update",
        title: "test 1",
        description: "test 1",
        status: "OPEN"
    },
    {
        id: "2",
        action: "update",
        title: "test 2",
        description: "test desc 2",
        status: "CLOSE"
    },
    {
        id: "3",
        action: "update",
        title: "test 3",
        description: "test desc 3",
        status: "CLOSE"
    },
    {
        id: "4",
        action: "add",
        title: "test",
        description: "test",
        status: "OPEN"
    }
]

app.get('/todos', (req , res) => {
    res.status(200).send({
        arr
    });
});

app.post('/todo', (req , res) => {
    let todo = req.body;
    console.log(todo);
    arr.push(todo)
    res.status(200).send({ 
        arr
    });
});

app.delete('/todo/:id', (req , res) => {
    const id = req.params.id;
    const index = arr.findIndex(data => data.id === id)
    arr.splice(index , 1);
    res.status(200).send({
        arr
    });
});

app.put('/todo/:id', (req , res) => {
    const id = req.params.id;
    const index = arr.findIndex(data => data.id === id);
    const todo = req.body;
    arr[index] = todo;
    res.status(200).send({
        arr
    });
});



app.listen(port, () => console.log(`listen to ${port}`));