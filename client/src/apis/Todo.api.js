import axios from 'axios';

export default axios.create({
    baseURL: "https://localhost3001/api/v1/todos"
})