import {useContext, useEffect} from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";




export const useAuth = () => {

    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    // this is called a fat arrow function that takes an object with email and password as parameters and calls the login function from the auth.api.js file to log in the user. It also sets the user and loading state in the context.
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } 
        catch (err) {} 

        finally {
            setLoading(false)
        }
    }


    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } 
        catch (err) {} 
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } 
        catch (err) {} 
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {}
            finally { setLoading(false) }
        }
        getAndSetUser()
    }, [])



    return { user, loading, handleLogin, handleRegister, handleLogout }

}