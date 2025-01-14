import { Link } from "react-router-dom"
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from "../Hooks/useAuthContext";

const Navbar = () => {

  const { logout } = useLogout();
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Home</h1>
            </Link>
            <nav>
              { user && <div>
                <span>{user.email}</span>
                <button onClick={ handleLogout }>Logout</button>
              </div> }
              { !user && <div>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
              </div> }
            </nav>
        </div>
    </header>
  );
}

export default Navbar