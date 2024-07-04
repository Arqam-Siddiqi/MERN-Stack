import { useState } from "react"
import { useSignup } from '../Hooks/useSignup'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
        setEmail('');
        setPassword('');
    }
    
  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>Email: </label>
        <input 
            type="email"
            required
            onChange={e => setEmail(e.target.value)}
            value={email}
        />
        
        <label>Password: </label>
        <input 
            type="password"
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
        />

        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup