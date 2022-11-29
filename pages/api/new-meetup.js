//api/new-meetup
import { MongoClient } from 'mongodb'

async function handler(req, res) {

    if(req.method === 'POST'){
        const data = req.body

        const {title, image, address, description} = data
        const client = await MongoClient.connect('mongodb+srv://taskapp:selin28082013@cluster0.wmy7i.mongodb.net/nextjs?retryWrites=true&w=majority')
        const db = client.db()
        const meetupscollection = db.collection('meetups')
        const result = await meetupscollection.insertOne(data)
        console.log(result)

        client.close()

        res.status(201).json({message: "meetup inserted"})
    }
}

export default handler