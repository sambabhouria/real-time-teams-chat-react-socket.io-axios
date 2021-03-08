import axios from 'axios';

const API_ROOT =  'http://localhost:8002' //process.env.REACT_APP_SERVER_URI

axios.defaults.baseURL = API_ROOT;

export const fetchUsers = () => {
    // console.log("'fetching users", API_ROOT);
    return axios.get(`/users`)
.then(res => res.data.data)
}
