import axios from "axios";

export const BaseApi = axios.create(

    {
        baseURL: "http://localhost:4000/"
    }

)