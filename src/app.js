import express from "express";
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

// Aguardar a conexão ser feita
const conexao = await conectaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

// Once é para conexão aberta, ou seja, bem-sucedida
conexao.once("open", () => {
    console.error("Conexão bem-sucedida!");
})

const app = express();
routes(app)

export default app;