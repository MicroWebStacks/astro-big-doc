import express from 'express'

const apiTest = (req,res)=>{

    const data = {
        message: "Test, OK"
    }
    res.json(data)
}
  
const testRouter = express.Router()

testRouter.get('/api/test',apiTest);

export{
    testRouter
}
