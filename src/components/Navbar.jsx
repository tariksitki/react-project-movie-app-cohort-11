import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const currentUser = true;
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-primary ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white" href="#">
          <h4 className="ms-5">React Movie App</h4>
        </Link>

        <div className="d-flex align-items-center" id="navbarTogglerDemo03">
          {currentUser ? (
            <>
              <h4 className="text-white me-4">Tarik Sitki</h4>
              <button className="btn btn-primary border border-white me-4" onClick={() => navigate("/")}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary border border-white me-4" onClick={() => navigate("/login")} >
                Login
              </button>
              <button className="btn btn-primary border border-white me-4" onClick={() => navigate("/register")} >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
