// Desc: Routes for the client side
export const host = "http://localhost:5000";
export const signupRoute = `${host}/api/user/signup`;
export const loginRoute = `${host}/api/user/login`;
export const addQuery = `${host}/api/query/add`;
export const getQueries = `${host}/api/query/all`;
export const getCurrentCustomerQueries = `${host}/api/query/customer`;
export const getSlots = `${host}/api/query/slots`;
export const getAdminQueries = `${host}/api/query/admin`;
export const resolveQuery = `${host}/api/query/resolve`;