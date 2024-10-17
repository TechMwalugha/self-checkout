import mongoose from 'mongoose'

let isConnected = false 

export default async function connectToDB() {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URL) return console.log('MONGO DB URL not found')
    if(isConnected) return console.log('Already connect to DB')

    try {

        mongoose.connect(process.env.MONGODB_URL)

        isConnected = true

        console.log('Connected to DB')
        
    } catch (error: any) {
        console.log(`An error occurred while connecting to DB: ${error.message}`)
    }
}