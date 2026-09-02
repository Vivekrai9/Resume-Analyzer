import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true 
}) // here create an instance of axios with the base URL.



// export async function register({username, email, password}){ 
//     try {
//         const response = await axios.post('http://localhost:3000/api/auth/register',{
//             username, email, password 
//         },{
//             withCredentials: true
//         })
//         return response.data
//     } catch (error) {
//         console.log(error)

//     }
// }



export async function register({username, email, password}){ // this function takes an object with username, email, and password as parameters and sends a POST request to the /api/auth/register endpoint to register a new user.
    try {
        const response = await api.post('/api/auth/register',{
            username, email, password 
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error

    }
}

export async function login({email, password}){ 
    try {
        const response = await api.post('/api/auth/login',{
            email, password
        })
        return response.data
    } 
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function logout(){
    try {
        const response = await api.post('/api/auth/logout',{})
        return response.data
    } 
    catch (error) {
        console.log(error)
        throw error
    }   
}

export async function getMe(){
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } 
    catch (error) {
        console.log(error)
        throw error
    }
}