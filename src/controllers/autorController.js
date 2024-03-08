import { autor } from "../models/Autor.js"

class AutorController{
    static async listarAutores(req, res){
        try{
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na requisição!` })
        }
        
    };

    static async buscarAutor(req, res){
        try{
            const id  = req.params.id
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na requisição!` })
        } 
    };

    static async cadastrarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ msg: "Criado com sucesso!", autor: novoAutor });
        } catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha no cadastro de autor!` })
        }
    };

    static async atualizarAutor(req, res){
        try{
            const id  = req.params.id
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({msg: "Autor atualizado!"});
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na atualização!` })
        } 
    };

    static async excluirAutor(req, res){
        try{
            const id  = req.params.id
            await autor.findByIdAndDelete(id);
            res.status(200).json({msg: "Autor excluído!"});
        }catch (erro){
            res.status(500).json({ msg: `${erro.msg} - Falha na exclusão!` })
        } 
    };

};

export default AutorController;