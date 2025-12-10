import axios from "axios";

let preferValue;
export default {

    sendGetLoginRequest(username, password, prefer = preferValue) {

        return axios.get('/login', {
            headers: {Prefer: prefer, Accept: 'application/json'},
            params: {
                username: username,
                password: password
            }
        });
    },

}