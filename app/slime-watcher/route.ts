import { NextResponse } from 'next/server';
import clientPromise from '@/app/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("slime_watcher");


        // Test query
        const testData = await db.collection("input_data")
        .find({})
        .limit(5)
        .toArray();

        //console.log("Fetched Data:", testData); // Debug log

        return NextResponse.json(testData);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}