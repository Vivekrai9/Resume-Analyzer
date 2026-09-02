import {useAuth} from '../hooks/useAuth'
import React from 'react'
import {Navigate} from "react-router"



const Protected = ({children}) => {
    const {loading,user} = useAuth()

    if(loading){
        return (
            <main>
                <h1> Loading.....</h1>
            </main>
        )
    }

    if(!user) {
        return <Navigate to ="/login" /> 
    }

    return children // This will render the child components if the user is authenticated. If the user is not authenticated, it will redirect them to the login page.
                    // The children prop is a special prop in React that allows you to pass components or elements as children to a parent component. In this case, the Protected component will render its children only if the user is authenticated. If the user is not authenticated, it will redirect them to the login page instead of rendering the children.


}


export default Protected