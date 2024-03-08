import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController{
    static async listarLivros(req, res){
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na requisição!` })
        }
        
    };

    static async buscarLivro(req, res){
        try{
            const id  = req.params.id
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na requisição!` })
        } 
    };

    static async cadastrarLivro(req, res){
        const novoLivro = req.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ msg: "Criado com sucesso!", livro: novoLivro });
        } catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha no cadastro de livro!` })
        }
    };

    static async atualizarLivro(req, res){
        try{
            const id  = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({msg: "Livro atualizado!"});
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na atualização!` })
        } 
    };

    static async excluirLivro(req, res){
        try{
            const id  = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(200).json({msg: "Livro excluído!"});
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na exclusão!` })
        } 
    };

    static async listarLivrosPorEditora(req, res){
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            res.status(500).json({ msg: `${erro.msg} - Falha na busca!` })
            
        }
    }

};

export default LivroController;