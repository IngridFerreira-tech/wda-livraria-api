import { http } from "./config";


export default{

    listar:() => {
        return http.get('editoras')
    },

    salvar:(editora) => {
        return http.post('editora',editora)
    },

    alterar:(editora)=>{
        return http.put('editar/editora', editora)
    },

    deletar:(editora) =>{
        return http.delete('editora', { data: editora })
    }
}
