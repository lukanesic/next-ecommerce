import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

export const connectDatabase = async () => {
  const response = await MongoClient.connect(process.env.MONGODB_URI)

  return response
}

export const connectToDbMong = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
