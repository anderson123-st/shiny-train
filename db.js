const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./banco.db");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL, quantidade INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY, data TEXT, total REAL)");
});

module.exports = {
  todosProdutos() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM produtos", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  inserirProduto(nome, preco, quantidade) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)", [nome, preco, quantidade], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  vendasPorDia(dias) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT data as dia, SUM(total) as total FROM vendas WHERE date(data) >= date('now', ?) GROUP BY data`, [`-${dias} days`], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  filtrarProdutos(nomeFiltro, qtdMin) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM produtos WHERE 1=1";
      let params = [];

      if (nomeFiltro) {
        query += " AND nome LIKE ?";
        params.push(`%${nomeFiltro}%`);
      }

      if (qtdMin) {
        query += " AND quantidade >= ?";
        params.push(qtdMin);
      }

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};
