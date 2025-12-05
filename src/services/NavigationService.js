import router from "@/router";

export default {

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToAtmsView() {
        router.push({name: 'atmsRoute'})
    },

    navigateToErrorView() {
        // todo: productionis sisse kommenteerida
        // router.push({name: 'errorRoute'})
    },


    navigateToNotAuthorizedView() {
        router.push({name: 'notAuthorizedRoute'})
    },

    navigateToEditAtmLocation(locationId) {
        router.push({
            name: 'locationRoute',
            query: {
                locationId: locationId
            }
        })
    },

}