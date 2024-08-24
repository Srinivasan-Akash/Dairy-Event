// @ts-ignore
import { Link } from "react-router-dom";
import "./dashboard.scss";
import Logo from "../assets/home page/logo.png";
import Pointer from "../assets/home page/pointer.png";
import { Copy, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { account } from "../appwrite/appwrite.config";
import { getEventsByUser, EventData } from "../appwrite/functions/getEventsByUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteEvent } from "../appwrite/functions/deleteEvent";
import "../landing page/Hero Section/Hero.scss"

export default function Dashboard() {
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [user, setUser] = useState<{ $id: string } | null>(null);
  const [events, setEvents] = useState<EventData[] | any>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
      .replace(/(\d{1,2})(?=,)/, day + suffix)
      .replace(',', '')
      .replace(/([ap]m)/i, match => match.toUpperCase());
  };

  useEffect(() => {
    const loginAnonymously = async () => {
      try {
        const session = await account.getSession("current");
        console.log("Existing session:", session);
        setIsSessionReady(true);
        setUser(session);
      } catch (error) {
        try {
          const response = await account.createAnonymousSession();
          console.log("New session created:", response);
          setIsSessionReady(true);
          setUser(response);
        } catch (error) {
          console.error("Failed to create a session:", error);
          setIsSessionReady(false);
        }
      }
    };

    loginAnonymously();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const userEvents = await getEventsByUser(user.$id);
        setEvents(userEvents);
        console.log(userEvents);
      }
    };

    fetchEvents();
  }, [user]);

  const handleDelete = (eventId: string) => {
    const deletePromise = deleteEvent(eventId)
      .then(() => {
        // Remove the event from local state on success
        setEvents(events.filter((event: EventData) => event.$id !== eventId));
      });

    toast.promise(deletePromise, {
      pending: "Deleting event...",
      success: "Event deleted successfully!",
      error: "Failed to delete event.",
    });
  };

  return (
    <div className="dashboard">
      <div className="gradient"></div>
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

      {isSessionReady ? (
        <div className="grid">
          {events && events.length > 0 ? (
            events.map((event: any) => (
              <div className="card" key={event.$id}>
                <h2 className="date">{"Event On " + formatDate(event.start_date_time)}</h2>
                <h1>{event.event_title}</h1>
                <p>{event.event_desc}</p>
                <div className="btns">
                  <button className="createEvent">Convert To Recurring Event</button>
                  <button className="settings" onClick={() => {
                    toast.success("Copied Event Page Link. Time To Share !!")
                    navigator.clipboard.writeText(`${window.location.origin}/${event.$id}`)
                  }}><Copy /></button>
                  <button className="delete" onClick={() => handleDelete(event.$id)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2>No events found</h2>
          )}
        </div>
      ) : (
        <div className="grid">
          <h1>Loading...</h1>
        </div>
      )}

      <ToastContainer
        style={{ width: "500px" }}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
