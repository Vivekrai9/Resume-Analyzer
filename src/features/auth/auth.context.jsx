import {createContext,useState,useEffect } from 'react';
import { getMe } from './services/auth.api';



export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe() //this call the getMe function from the auth.api.js file to get the current user data logged-in. And this bring the data from the backend using cookies,this is depend on the cookies not on the state. 
                setUser(data.user)
            } catch (err) { 
                setUser(null) 
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])



    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}