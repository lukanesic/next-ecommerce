import { MongoClient } from 'mongodb'

export const connectDatabase = async () => {
  const response = await MongoClient.connect(process.env.MONGODB_URI)

  return response
}
