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

app.delete("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro Removido");
})

export default app;