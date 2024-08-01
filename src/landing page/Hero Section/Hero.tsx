import "./Hero.scss";
import Logo from "../../assets/home page/logo.png"
import Pointer from "../../assets/home page/pointer.png"
import Google from "../../assets/home page/calender logo/google.png"
import Apple from "../../assets/home page/calender logo/apple.png"
import Outlook from "../../assets/home page/calender logo/outlook.png"
import Banner from "../../assets/home page/banner.png"
import Arrow from "../../assets/home page/arrow.png"

export default function Hero() {
  return (
    <div className="hero-section">

      <div className="gradient"></div>
      <nav>
        <img src={Logo} alt="" />

        <ul>
          <li>Create Event</li>
          <li>Dashboard</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>

        <button>
          <img src={Pointer} alt="" />
          Register Now !!
          <img src={Arrow} alt="" />
        </button>
      </nav>

      <main>
        <h1>Effortlessly Create, Share & Manage <br />
          <span>Event Links</span> With Your Audience
        </h1>
        <p>Get your events in their calendars & dairies right now !!</p>
        <div className="calender-logos">
          <div className="calender">
            <img className="google" src={Google} alt="" />
            <h2>Google</h2>
          </div>

          <span className="dot"></span>

          <div className="calender">
            <img className="apple" src={Apple} alt="" />
            <h2>Apple</h2>
          </div>

          <span className="dot"></span>

          <div className="calender">
            <img className="outlook" src={Outlook} alt="" />
            <h2>Outlook</h2>
          </div>
        </div>

        <div className="banner">
          <div className="left">
            <img src={Banner} alt="" />
          </div>

          <div className="right">

            <div className="form">
              <div className="dual">
                <div className="input">
                  <label htmlFor="">Enter Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter Event Name"
                    name=""
                    id=""
                  />
                </div>

                <div className="input">
                  <label htmlFor="">Enter Host Name</label>
                  <input
                    type="text"
                    placeholder="Enter Host Name"
                    name=""
                    id=""
                  />
                </div>
              </div>
              <br />
              <div className="dual">
                <div className="input">
                  <label htmlFor="">Event Start Time</label>
                  <input
                    type="date"
                    placeholder="Enter Event Location"
                    name=""
                    id=""
                  />
                </div>

                <div className="input">
                  <label htmlFor="">Event End Time</label>
                  <input
                    type="date"
                    placeholder="Enter Event Timezone"
                    name=""
                    id=""
                  />
                </div>
              </div>
              <br />

              <div className="dual">
                <div className="input">
                  <label htmlFor="">Enter Event Location</label>
                  <input
                    type="text"
                    placeholder="Enter Event Location"
                    name=""
                    id=""
                  />
                </div>

                <div className="input">
                  <label htmlFor="">Enter Event Timezone</label>
                  <input
                    type="text"
                    placeholder="Enter Event Timezone"
                    name=""
                    id=""
                  />
                </div>
              </div>

              <br />
              <div className="input">
                <label htmlFor="">Enter Meeting Link (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter Meeting Link"
                  name=""
                  id=""
                />
              </div>
              <br />

              <div className="input">
                <label htmlFor="">Enter Event Description</label>
                <textarea placeholder="Enter Event Description"></textarea>
              </div>

              <br />

              <div className="input">
                <label htmlFor="">Customize Meeting Link</label>
                <div className="link">
                  <span>calender.io/</span>
                  <input type="text" placeholder="My Meeting" name="" id="" />
                </div>
              </div>
              <br />
              <button>Create Calender Link</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
