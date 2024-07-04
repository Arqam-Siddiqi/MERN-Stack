import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {

    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (email, password) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('http://localhost:3000/user/signup', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {"Content-type": "application/json"}
        });

        const json = await response.json();

        if(response.ok){
            dispatch( {type: 'LOGIN', payload: json} );
            localStorage.setItem('user', JSON.stringify(json));
        }
        else{
            setError(json.error);
        }

        setIsLoading(false);
    }

    return {
        signup,
        error,
        isLoading
    };
}
