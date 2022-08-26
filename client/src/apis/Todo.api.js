import axios from 'axios';

export default axios.create({
    baseURL: "http://toasty-brioche.herokuapp.com/"
})