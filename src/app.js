import express from "express";
import conectaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";



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

app.use(express.json());

// Página padrão depois de localhost:3000
app.get("/",(req, res) => {
    res.status(200).send("Curso de Node.js");
});

// Listar livros na URL "/livros"
app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

// Buscar livros na URL "/livros"
app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

// Cadastrar livros na URL "/livros"
app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro Cadastrado!");
});

// Atualizar dados dos livros na URL "/livros"
app.put("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro Removido");
})

export default app;