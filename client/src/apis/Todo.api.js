import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost3001/api/v1/todos"
})