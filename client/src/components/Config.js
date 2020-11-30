// 'D' : Dev, 'P' : Product
export const envCheck = 'D' 

//SERVER ROUTES
export const USER_SERVER = '/api/users';

// Back-end
export let URL = '';
if (envCheck === 'D') {
    URL = 'http://localhost:9999';
} else if (envCheck === 'P') {
    URL = 'http://15.164.230.54:9999';
} else {
    URL = '';
}

