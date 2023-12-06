const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 5000
const userRouter = require("./router/userRouter")
const app = express()
      app.use(cors())
      app.use(express.json())
      dotenv.config()



      // connection 
mongoose.connect(process.env.MONGODB_ACCESS,
    {useNewUrlParser:true},
    {useUnifiedTopology: true }
    )
    .then(()=> console.log('connection successfull'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/users',userRouter)
//app.use('/users/id',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})