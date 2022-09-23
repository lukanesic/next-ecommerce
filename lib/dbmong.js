import mongoose from 'mongoose'

export const connectToDbMong = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI)

    console.log(client.connection.host)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
