import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error("useAuthContext must be used inside the AuthContext Provider.");
    }

    return context;
}