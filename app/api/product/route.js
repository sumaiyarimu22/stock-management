import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = process.env.MONGO_URL;

  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const allProducts = await inventory.find(query).toArray();
    return NextResponse.json({ allProducts });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  let body = await request.json();
  const uri = process.env.MONGO_URL;

  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory.insertOne(body);
    return NextResponse.json({ products, ok: true });
  } finally {
    await client.close();
  }
}
