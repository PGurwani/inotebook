const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())   //req.body ko use karna hai tho hume 1 middle ware ko use karna padta hai
// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})