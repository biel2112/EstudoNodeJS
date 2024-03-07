import livro from '../models/Livro.js';

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
        try{
            const novoLivro = await livro.create(req.body);
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

};

export default LivroController;