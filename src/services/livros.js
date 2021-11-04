import { http } from "./config";


export default{

    listar:() => {
        return http.get('livros')
    },

    salvar:(livro) => {
        return http.post('livro',livro)
    },

    alterar:(livro)=>{
        return http.put('editar/livro', livro)
    },

    deletar:(livro) =>{
        return http.delete('livro', { data: livro })
    }
}
