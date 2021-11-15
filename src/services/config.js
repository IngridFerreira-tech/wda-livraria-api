import axios from "axios";

export const http = axios.create({
    baseURL: 'https://locadoradelivros-api.herokuapp.com/api/'

})