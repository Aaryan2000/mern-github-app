//To keep track whether user is authenticated or not
//generally we use context to proovide global value to our entire application so that we don't do prop drilling
import {toast} from 'react-hot-toast'
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext=createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};


export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState(null)
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const checkUserLoggedIn=async()=>{
            setLoading(true)
            try {
                const res=await fetch("/api/auth/check",{credentials:"include"});//if not able to understand then see viteconfig.js
                const data=await res.json();
                setAuthUser(data.user)
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        checkUserLoggedIn();
    },[])
    return(
        <AuthContext.Provider value={{authUser,setAuthUser,loading}}>
        {children}
        </AuthContext.Provider>
    )
}