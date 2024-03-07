const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.static(path.join(__dirname, '/dist/todo/browser/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb+srv://gaby:Gb2367555@todo.imxhwqp.mongodb.net/?retryWrites=true&w=majority&appName=Todo";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db('Todo');
const collection = database.collection('todo');


async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error(error);
    }
}
app.get('/todos', async (req, res) => {
    try {
        // Query the collection
        const queryResult = await collection.find({}).toArray();
        // Return the documents as a JSON response
        res.json(queryResult);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.post('/todo', async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.json(result.ops);
    } catch (error) {
        res.status(500).send('Error creating data');
    }
});

app.put('/todo/:id', async (req, res) => {
    try {
        const result = await collection.findOneAndUpdate(
            { _id: ObjectID(req.params.id) },
            { $set: req.body },
            { returnOriginal: false }
        );
        res.json(result.value);
    } catch (error) {
        res.status(500).send('Error updating data');
    }
});

app.delete('/todo/:id', async (req, res) => {
    try {
        const result = await collection.findOneAndDelete({ _id: ObjectID(req.params.id) });
        res.json(result.value);
    } catch (error) {
        res.status(500).send('Error deleting data');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    connectToMongoDB();
});