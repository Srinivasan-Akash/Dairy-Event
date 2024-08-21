import { storeEventData } from "../../appwrite/functions/storeEventData";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import "./Hero.scss";
import Logo from "../../assets/home page/logo.png";
import Pointer from "../../assets/home page/pointer.png";
import Google from "../../assets/home page/calender logo/google.png";
import Apple from "../../assets/home page/calender logo/apple.png";
import Outlook from "../../assets/home page/calender logo/outlook.png";
import Arrow from "../../assets/home page/arrow.png";
import { account } from "../../appwrite/appwrite.config";
import { Link } from "react-router-dom";

export default function Hero() {
  const [formData, setFormData] = useState({
    eventTitle: "",
    hostName: "",
    eventStartTime: new Date().toISOString().slice(0, 16),
    eventEndTime: new Date(new Date().getTime() + 30 * 60000).toISOString().slice(0, 16),
    eventLocation: "",
    eventTimezone: "",
    meetingLink: "",
    eventDescription: "",
    customMeetingLink: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [jsConfetti] = useState(new JSConfetti());
  const [isSessionReady, setIsSessionReady] = useState(false); // Track session status

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData((prevData) => ({ ...prevData, eventTimezone: data.timezone }));
      } catch (error) {
        console.error("Error fetching timezone:", error);
      }
    };

    fetchTimezone();
  }, []);

  useEffect(() => {
    const loginAnonymously = async () => {
      try {
        const session = await account.getSession("current");
        console.log("Existing session:", session);
        setIsSessionReady(true); // Session is ready
      } catch (error) {
        try {
          const response = await account.createAnonymousSession();
          console.log("New session created:", response);
          setIsSessionReady(true); // Session is ready
        } catch (error) {
          console.error("Failed to create a session:", error);
          setIsSessionReady(false); // Session creation failed
        }
      }
    };

    loginAnonymously();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const eventPayload = {
      title: formData.eventTitle,
      start: formData.eventStartTime,
      end: formData.eventEndTime,
      description: formData.eventDescription,
      timezone: formData.eventTimezone,
      location: formData.eventLocation,
    };

    try {
      console.log(eventPayload);

      // Fetch meeting link from external API
      const meetingResponse = await fetch("https://calndr.link/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      });

      if (!meetingResponse.ok) {
        throw new Error(`HTTP error! status: ${meetingResponse.status}`);
      }

      const meetingResult = await meetingResponse.json();
      console.log(meetingResult)

      // Store event data and get document ID
      const docId = await storeEventData({
        event_title: formData.eventTitle,
        host_name: formData.hostName,
        start_date_time: formData.eventStartTime,
        end_date_time: formData.eventEndTime,
        event_timezone: formData.eventTimezone,
        event_location: formData.eventLocation,
        meeting_link: formData.meetingLink, // Store the meeting link obtained from the external API
        event_desc: formData.eventDescription,
        add_to_calandar_links: JSON.stringify(meetingResult.links) // Initially empty
      });

      // Construct event link
      const currentURL = window.location.origin;
      const constructedEventLink = `${currentURL}/${docId}`;

      setEventLink(constructedEventLink);
      setLoading(false);
      setSubmitted(true);

      // Trigger confetti
      jsConfetti.addConfetti({
        confettiColors: ['#FF0000', '#00FF00', '#0000FF'],
        confettiRadius: 6,
        confettiNumber: 500,
      });

      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error creating event:", error);
      setLoading(false);
    }
  };

  return (
    <div className="hero-section">
      <div className="gradient"></div>
      <nav>
        <img src={Logo} alt="Logo" className="logo" />
        <ul>
          <li>Create Event</li>
          <li>Dashboard</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
        <Link to={"/dashboard"}>
          <button>
            <img src={Pointer} alt="Pointer" />
            Visit Dashboard
            <img className="arrow" src={Arrow} alt="Arrow" />
          </button>
        </Link>
      </nav>
      <main>
        <h1>
          Effortlessly Create, Share & Manage <br />
          <span>Event Links</span> With Your Audience
        </h1>

        <h1 className="mobile">
          Effortlessly Create, Share & Manage &nbsp;
          <span>Event Links</span>
        </h1>

        <p>Get your events in their calendars & diaries right now !!</p>
        <p className="mobile">Get your events in your followers digital calendar or diary ASAP !!</p>
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
          <div className={submitted ? "left min-height" : "left"}>
            {/* <img src={Banner} alt="Banner" /> */}
          </div>
          <div className="right">
            {submitted ? (
              <div className="form">
                <h2 className="title">Copy Your Calendar Link</h2>
                <p className="desc">Share your event landing page on social media.</p>
                <div className="final-link">
                  <h2>{eventLink}</h2>
                  <button onClick={() => navigator.clipboard.writeText(eventLink)}>Copy Link</button>
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
                <div className="dual">
                  <div className="input">
                    <label htmlFor="eventStartTime">Event Start Time</label>
                    <input
                      type="datetime-local"
                      name="eventStartTime"
                      value={formData.eventStartTime}
                      onChange={handleChange}
                      onClick={(e: any) => e.target.showPicker()}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="eventEndTime">Event End Time</label>
                    <input
                      type="datetime-local"
                      name="eventEndTime"
                      value={formData.eventEndTime}
                      onChange={handleChange}
                      onClick={(e: any) => e.target.showPicker()}
                    />
                  </div>
                </div>
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
                <div className="input">
                  <label htmlFor="eventDescription">Enter Event Description (Optional)</label>
                  <textarea
                    placeholder="Enter Event Description"
                    name="eventDescription"
                    value={formData.eventDescription}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" disabled={!isSessionReady || loading}>
                  {loading ? "Creating Calendar Link..." : "Create Calendar Link"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
