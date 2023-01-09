require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const port = process.env.PORT | 8081;
const mongo = process.env.MONGODB_URL | "mongodb+srv://root:root@bezen.m0zolsz.mongodb.net/test";

// Mongodb Connection...
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://root:root@bezen.m0zolsz.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('============== Mongodb Database Connected Successfully ==============')
}).catch((error) => {
    console.log('============== Database Not Connected ==============')
})

//  Config
app.use(express.json());
app.use(cors());

// Testing app routs
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Routes
app.use("", require("./routes/auth.routes"));
app.use("/recipes", require("./routes/recipe.routes"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})