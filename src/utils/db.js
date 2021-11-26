import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;
  // const db = await connect(process.env.MONGODB_URL);
  const db = await connect(process.env.MONGO_REMOTE);

  conn.isConnected = db.connections[0].readyState;

  // console.log('connected to:', db.connection.db.databaseName);
}

connection.on('connected', () => {
  // console.log('Mongo db is connected');
});

connection.on('error', (err) => {
  // console.log('DB error: ', err);
});
