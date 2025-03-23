import sqlite3  from 'sqlite3';

const DB_FILE = 'test.db';
const db = new sqlite3.Database(DB_FILE);
db.serialize(()=>{
db.run("CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER )")
db.run("INSERT INTO items(title, completed) VALUES('sample', 0)")
});
db.close();  
