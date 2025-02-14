const express = require('express')

const connectToDb = require('./src/config/db')

const userRouter = require('./src/routes/user-route')

const app = express()

app.use(express.json())

app.use('/api/v1/love-island', userRouter);

connectToDb()
const PORT =8000
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    
})