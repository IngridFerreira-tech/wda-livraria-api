import { http } from "./config";


export default{

    listar:() => {
        return http.get('usuarios')
    },

    salvar:(usuario) => {
        return http.post('usuario',usuario)
    },

    alterar:(usuario)=>{
        return http.put('editar/usuario', usuario)
    },

    deletar:(usuario) =>{
        return http.delete('usuario', { data: usuario })
    }
}