import axios from "axios";

export default {

    sendGetLoginRequest(username, password) {

        return axios.get('/login', {
            headers: {Prefer: preferValue, Accept: 'application/json'},
            params: {
                username: username,
                password: password
            }
        });
    },

}