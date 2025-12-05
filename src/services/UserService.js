import axios from "axios";

export default {

    sendPostNewUserRequest(newUser) {
        return axios.post('/user', newUser)
    },


    sendPutAtmLocationRequest(locationId, location) {
        return axios.put('/atm/location', location, {
            params: {
                locationId: locationId
            }
        })
    },

}