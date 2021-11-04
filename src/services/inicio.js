import { http } from "./config";


export default{

    listarAluguel:() => {
        return http.get('alugueis')
    },
    
    listarLivros:() => {
        return http.get('livros')
    },
    listarUsuarios:() => {
        return http.get('usuarios')
    },

    
}