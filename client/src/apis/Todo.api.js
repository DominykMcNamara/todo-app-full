import axios from 'axios';

export default axios.create({
    baseURL: "https://localhost:1437/api/v1/todos"
})