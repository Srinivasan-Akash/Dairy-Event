import React, { useState, useEffect } from "react";
import "./Hero.scss";
import Logo from "../../assets/home page/logo.png";
import Pointer from "../../assets/home page/pointer.png";
import Google from "../../assets/home page/calender logo/google.png";
import Apple from "../../assets/home page/calender logo/apple.png";
import Outlook from "../../assets/home page/calender logo/outlook.png";
import Banner from "../../assets/home page/banner.png";
import Arrow from "../../assets/home page/arrow.png";

// Example list of timezones (you can expand this list)
const timezones = [
  "UTC",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Australia/Sydney",
  // Add more timezones as needed
];

export default function Hero() {
  const [formData, setFormData] = useState({
    eventTitle: "",
    hostName: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Default to user's timezone
    meetingLink: "",
    eventDescription: "",
    customMeetingLink: "",
  });

  useEffect(() => {
    // Update the timezone in state if needed
    setFormData((prev) => ({
      ...prev,
      eventTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
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
          Register Now !!
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
                    type="date"
                    name="eventStartTime"
                    value={formData.eventStartTime}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker()}
                  />
                </div>
                <div className="input date-picker">
                  <label htmlFor="eventEndTime">Event End Time</label>
                  <input
                    type="date"
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
                  <select
                    name="eventTimezone"
                    value={formData.eventTimezone}
                    onChange={handleChange}
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone}
                      </option>
                    ))}
                  </select>
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
          </div>
        </div>
      </main>
    </div>
  );
}
