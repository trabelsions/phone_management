import React , {useState} from "react";
import { Link } from "react-router-dom";
import { shercheAgent} from 'features/user/api'

function Navbar() {
  const token = localStorage.getItem("authToken");
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setDate] = useState([]);

  const toggleDropdown = (event:any) => {
    console.log(event?.target.value);
    setShowDropdown(false);

    shercheAgent(event?.target.value)
    .then(res =>{
      console.log(res)
      if(res.length > 0){
        setShowDropdown(true);
        setDate(res)
      }
    })
    .catch(err => console.log(err))
  //  setShowDropdown(!showDropdown);
  };
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid mlr-6">
        <a className="navbar-brand" href="#">
          <img src="/images/logo.jpeg" width={"320px"} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="w-50">
          <div className="border">
            <div className="input-group mb-3 border-0 " >
              <span className="input-group-text bg-white border-0">
                <i className='bx bx-file-find'></i>
              </span>
              <input className="form-control me-2 border-0 "  onChange={toggleDropdown} type="search" placeholder="Recherche..." aria-label="Recherche" />
            </div>
          </div>
        </form>
        <div>

        {showDropdown && (
            <div className="dropdown-menu d-block" aria-labelledby="dropdownMenuButton" style={{ minWidth: '250px' }}>
         {data.map((el:any,index) =>
          <a className="dropdown-item" href="#action1" key={index}>{el.name}</a>
          )}
         
        </div>
       
      )}
       </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {token ? (
              <>

                <li className="nav-item">
                  <img src={"/images/avatar.png"} alt={"user image"} className="avatar" />

                  <span >{"Admin Admin"}</span>

                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>

                  </ul>
                </li>

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/" className="nav-link active">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
