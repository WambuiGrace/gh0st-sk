import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || MONGODB_URI;
const dbName = process.env.MONGODB_DB || MONGODB_DB;

let client;
let db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return { client, db };
}

export async function getTodos(limit = 10, skip = 0) {
  const { db } = await connectToDatabase();
  return db.collection('todos')
    .find({ isPublic: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

export async function addTodo(todoData) {
  const { db } = await connectToDatabase();
  const todo = {
    ...todoData,
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: todoData.isPublic === 'on' || todoData.isPublic === true
  };
  
  const result = await db.collection('todos').insertOne(todo);
  return result;
}

export async function getTodosByCategory(category, limit = 10, skip = 0) {
  const { db } = await connectToDatabase();
  const filter = { isPublic: true };
  if (category && category !== 'all') {
    filter.category = category;
  }
  
  return db.collection('todos')
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

export async function searchTodos(searchText, limit = 10, skip = 0) {
  const { db } = await connectToDatabase();
  return db.collection('todos')
    .find({
      isPublic: true,
      $text: { $search: searchText }
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}
