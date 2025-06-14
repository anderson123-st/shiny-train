const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./estoque.db');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(session({ secret: 'segredo', resave: false, saveUninitialized: true }));

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, quantidade INTEGER)");
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '1234') {
    req.session.logado = true;
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));