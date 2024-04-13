 

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())
const port = 3005;

 
const db = new sqlite3.Database(':memory:'); // In-memory database for demonstration

 
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, image TEXT, para TEXT, amount TEXT, mamamount TEXT, off TEXT)');

  const stmt = db.prepare('INSERT INTO products (id, image, para, amount, mamamount, off) VALUES (?, ?, ?, ?, ?, ?)');
  const data = [
    [1, 'https://i.ibb.co/tpFJMv4/salesa5.jpg', 'The Brown Metro Movers', '4800', '8999', '50% Off'],
    [2, 'https://i.ibb.co/tpFJMv4/salesa5.jpg', 'The Brown Metro Movers', '4800', '8999', '50% Off'],
    [3, 'https://i.ibb.co/Pw3RwSP/salesa8.jpg', 'The Metro Movers Black', '4800', '8999', '50% Off'],
    [4, 'https://i.ibb.co/41yXZ9D/salesa6.jpg', 'The Metro Movers Black', '4800', '8999', '50% Off'],
    [5, 'https://i.ibb.co/cvfp825/salesa4.jpg', 'The Brown Metro Movers', '4800', '8999', '50% Off'],
    [6, 'https://i.ibb.co/LgLp6Yz/salesa3.jpg', 'The Metro Movers Black', '4800', '8999', '50% Off'],
    [7, 'https://i.ibb.co/xfSxmGz/salesa2.jpg', 'The Metro Movers Black', '4800', '8999', '50% Off'],
    [8, 'https://i.ibb.co/1RGF4Mv/salesa1.jpg', 'The Metro Movers Black', '4800', '8999', '50% Off'],
  ];

  data.forEach(row => stmt.run(row));
  stmt.finalize();
});

 
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ user: rows });
  });
});

 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
