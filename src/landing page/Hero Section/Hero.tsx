import React, { useState } from "react";
import JSConfetti from "js-confetti";
import "./Hero.scss";
import Logo from "../../assets/home page/logo.png";
import Pointer from "../../assets/home page/pointer.png";
import Google from "../../assets/home page/calender logo/google.png";
import Apple from "../../assets/home page/calender logo/apple.png";
import Outlook from "../../assets/home page/calender logo/outlook.png";
import Banner from "../../assets/home page/banner.png";
import Arrow from "../../assets/home page/arrow.png";

export default function Hero() {
  const [formData, setFormData] = useState({
    eventTitle: "",
    hostName: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    meetingLink: "",
    eventDescription: "",
    customMeetingLink: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [jsConfetti] = useState(new JSConfetti());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Trigger confetti
    jsConfetti.addConfetti({
      confettiColors: ['#FF0000', '#00FF00', '#0000FF'], // Adjust colors if needed
      confettiRadius: 6, // Size of the confetti pieces
      confettiNumber: 500, // Number of confetti pieces
      confettiLifetime: 0.7, // Duration of the confetti (in seconds)
    });
    // Show thank you message
    setSubmitted(true);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      <div className="gradient"></div>
      <nav>
        <img src={Logo} alt="Logo" />
        <ul>
          <li>Create Event</li>
          <li>Dashboard</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
        <button>
          <img src={Pointer} alt="Pointer" />
          Visit Dashboard
          <img src={Arrow} alt="Arrow" />
        </button>
      </nav>
      <main>
        <h1>
          Effortlessly Create, Share & Manage <br />
          <span>Event Links</span> With Your Audience
        </h1>
        <p>Get your events in their calendars & diaries right now !!</p>
        <div className="calender-logos">
          <div className="calender">
            <img className="google" src={Google} alt="Google" />
            <h2>Google</h2>
          </div>
          <span className="dot"></span>
          <div className="calender">
            <img className="apple" src={Apple} alt="Apple" />
            <h2>Apple</h2>
          </div>
          <span className="dot"></span>
          <div className="calender">
            <img className="outlook" src={Outlook} alt="Outlook" />
            <h2>Outlook</h2>
          </div>
        </div>
        <div className="banner">
          <div className="left">
            <img src={Banner} alt="Banner" />
          </div>
          <div className="right">
            {submitted ? (
              <div className="form">
                <h2 className="title">Copy Your Calendar Link</h2>
                <p className="desc">Share your event landing page on social media.</p>
                <div className="final-link">
                  <h2>https://cal.et/oqous8eb</h2>
                  <button>Copy Link</button>
                </div>
                <div className="or-component">
                  <div className="line"></div>
                  <span>Direct Links</span>
                  <div className="line"></div>
                </div>

               

                  
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="dual">
                  <div className="input">
                    <label htmlFor="eventTitle">Enter Event Title</label>
                    <input
                      type="text"
                      placeholder="Enter Event Name"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="hostName">Enter Host Name</label>
                    <input
                      type="text"
                      placeholder="Enter Host Name"
                      name="hostName"
                      value={formData.hostName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br />
                <div className="dual">
                  <div className="input date-picker">
                    <label htmlFor="eventStartTime">Event Start Time</label>
                    <input
                      type="datetime-local"
                      name="eventStartTime"
                      value={formData.eventStartTime}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                    />
                  </div>
                  <div className="input date-picker">
                    <label htmlFor="eventEndTime">Event End Time</label>
                    <input
                      type="datetime-local"
                      name="eventEndTime"
                      value={formData.eventEndTime}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker()}
                    />
                  </div>
                </div>
                <br />
                <div className="dual">
                  <div className="input">
                    <label htmlFor="eventLocation">Enter Event Location</label>
                    <input
                      type="text"
                      placeholder="Enter Event Location"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="eventTimezone">Enter Event Timezone</label>
                    <input
                      type="text"
                      placeholder="Enter Event Timezone"
                      name="eventTimezone"
                      value={formData.eventTimezone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br />
                <div className="input">
                  <label htmlFor="meetingLink">Enter Meeting Link (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter Meeting Link"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="input">
                  <label htmlFor="eventDescription">Enter Event Description</label>
                  <textarea
                    placeholder="Enter Event Description"
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <br />
                <div className="input">
                  <label htmlFor="customMeetingLink">Customize Meeting Link</label>
                  <div className="link">
                    <span>calender.io/</span>
                    <input
                      type="text"
                      placeholder="My Meeting"
                      name="customMeetingLink"
                      value={formData.customMeetingLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br />
                <button type="submit">Create Calendar Link</button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
