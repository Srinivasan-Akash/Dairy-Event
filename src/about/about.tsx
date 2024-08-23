import { Link } from "react-router-dom"
import "./about.scss"
import Logo from "../assets/home page/logo.png"
import Pointer from "../assets/home page/pointer.png"

export default function about() {
  return (
    <div className="about">
          <nav>
        <img src={Logo} alt="Logo" className="logo" />
        <ul>
          <li><Link to={"/"}>Create Event</Link></li>
          <li><Link to={"/dashboard"}>Dashboard</Link></li>
          <li><Link to={"/about"}>About</Link></li>
          <li><a href={"https://mail.google.com/mail/u/0/?fs=1&to=kota.baby.work@gmail.com&tf=cm"}>Contact Us</a></li>
        </ul>

        <Link to={"/"}>
          <button>
            <img src={Pointer} alt="Pointer" />
            Create New Event
          </button>
        </Link>
      </nav>
    </div>
  )
}
