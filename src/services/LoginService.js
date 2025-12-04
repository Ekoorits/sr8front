import axios from "axios";

export default {

    sendGetLoginRequest(username, password) {

        return axios.get('/login', {
            headers: {Accept: 'application/json'},
            params: {
                username: username,
                password: password
            }
        });
    },

}