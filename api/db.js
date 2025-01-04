import pg from "pg";

const client = new pg.Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"postgres",
    database:"crud_react_db"
})

client.connect()
    .then(() => console.log("Conectado ao banco de dados!"))
    .catch(err => console.error("Erro ao conectar ao banco de dados:", err.stack));

export default client;