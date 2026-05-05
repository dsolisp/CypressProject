import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

/**
 * Hermetic seeding API (connection-based).
 * Accepts an existing sqlite Database connection so callers can control isolation.
 */
export async function seed(db) {
  await run(db, 'DROP TABLE IF EXISTS users');
  await run(db, 'DROP TABLE IF EXISTS products');

  await run(db, 'CREATE TABLE users (id INT, username TEXT, role TEXT)');
  await run(db, 'INSERT INTO users VALUES (?, ?, ?)', [1, 'standard_user', 'customer']);
  await run(db, 'INSERT INTO users VALUES (?, ?, ?)', [2, 'admin_user', 'admin']);

  await run(db, 'CREATE TABLE products (id INT, name TEXT, price REAL)');
  await run(db, 'INSERT INTO products VALUES (?, ?, ?)', [1, 'Sauce Labs Backpack', 29.99]);
}

export async function seedSqliteFile(dbPath) {
  const db = new sqlite3.Database(dbPath);
  try {
    await seed(db);
  } finally {
    db.close();
  }
}

// CLI usage for local debugging.
if (import.meta.url === `file://${process.argv[1]}`) {
  const dbPath = process.env.DB_PATH ?? 'app.db';
  seedSqliteFile(dbPath).then(() => {
    // eslint-disable-next-line no-console
    console.log('✅ Database Seeded.');
  });
}
