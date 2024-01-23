import knexfile from "./knexfile";

const pool = new Pool(knexfile.connection);

// Пример запроса
pool.query('SELECT * FROM task', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(res.rows);
});
module.exports