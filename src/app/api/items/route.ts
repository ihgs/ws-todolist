// FIXME: ダメなところをいっぱい残してます
import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_FILE = 'test.db';
export async function GET() {
  const db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database
  })
  const items: any[] = [];
  await db.each("SELECT * FROM items", (err, row: any) => {
    if (err) throw err
    items.push({ id: row.id, title: row.title, completed: row.completed })
  })
  await db.close();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json()
  const db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database
  })
  let item = {};
  await db.run("INSERT INTO items(title, completed) VALUES(?,?)", [body.name, body.completed], (err: any, row: any) => {
    if (err) throw err
    item = { id: row.lastID, title: body.title, completed: body.completed }
  })
  await db.close();
  return NextResponse.json(item);
}

