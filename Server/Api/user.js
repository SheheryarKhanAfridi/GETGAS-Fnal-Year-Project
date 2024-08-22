import { connectToDatabase } from '../../lib/mongodb'; // Your DB connection logic

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const users = await db.collection('users').find({}).toArray();
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
