import { Link } from "react-router-dom"
import "./dashboard.scss"
import Logo from "../assets/home page/logo.png";
import Pointer from "../assets/home page/pointer.png";
import { Settings, Trash2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <div className="gradient"></div>
      <nav>
        <img src={Logo} alt="Logo" className="logo" />
        
        <div className="right-nav">
          <input type="text" placeholder="Search For Your Event" />
          <Link to={"/dashboard"}>
          <button>
          <img src={Pointer} alt="Pointer" />
            Create Event
          </button>
        </Link>
        </div>
      </nav>

      <div className="grid">
        <div className="card">
          <h2>7th Aug - 8th Aug</h2>
          <h1>Postman Dev Meetup</h1> 
          <p>A specialized meeting calling out all designers and developers from India, USA, France, Canada for an important & crucial.</p>
          <div className="btns">
          <button>Copy Event Link</button>
          <button><Settings /></button>
          <button><Trash2 /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
