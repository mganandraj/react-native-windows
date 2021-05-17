const MongoClient = require('mongodb').MongoClient;

let db;

let loadDb = async function () {
    if(db)
        return db;
    try{
        const uri = "mongodb+srv://mganandraj:Abc123@cluster0.l2ubn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        var err = await client.connect();
        db = client.db("test")
    } catch (error) {
        console.err(error)
    }
    return db;
}

module.exports = loadDb;