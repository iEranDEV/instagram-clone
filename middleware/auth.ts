export default defineNuxtRouteMiddleware((to, from) => {
    if(useFirebase().auth.currentUser === null && from.fullPath !== to.fullPath) {
        navigateTo('/accounts/login');
    }
    return true;
})