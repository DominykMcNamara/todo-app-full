import axios from 'axios';

export default axios.create({
    baseURL: "https://toasty-brioche.herokuapp.com/api/v1/todos"
})