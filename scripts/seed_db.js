const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.db")

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users")
    db.run("CREATE TABLE users (id INT, username TEXT, role TEXT)")
    const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
    stmt.run(1, 'standard_user', 'customer');
    stmt.run(2, 'admin_user', 'admin');
    stmt.finalize();

    db.run("DROP TABLE IF EXISTS products")
    db.run("CREATE TABLE products (id INT, name TEXT, price REAL)")
    const stmt2 = db.prepare("INSERT INTO products VALUES (?, ?, ?)");
    stmt2.run(1, 'Sauce Labs Backpack', 29.99);
    stmt2.finalize();

    console.log("✅ Database Seeded.");
})

db.close();
