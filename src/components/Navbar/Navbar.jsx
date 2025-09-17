import {Link} from "react-router-dom"
import "../styles/Variables.css";
import "./Navbar.css";
import loginIcon from "../../assets/loginIcon.svg";
import alertIcon from "../../assets/alertIcon.svg";

export default function Navbar ( {user}) {
    return (
        <header className="header">
            <nav className="navbar">
                <span className="left">
                    Recuerda...
                </span>
                <section className="right">
                    <Link to="/calendar">
                    <button className="alert">
                        <img src={alertIcon} alt="Alert" /> 
                    </button>
                    </Link>
                    {user ? (
                    <img
              src={user.photoUrl}
              alt={user.name}
              className="btn-loggedin"
                     />
          ) : (
                    <Link to="/login">
                    <button className="btn-login">
              <img src={loginIcon} alt="Login" />
                    </button>
                    </Link>
          )}
                </section>
            </nav>
            
        </header>
    );
}