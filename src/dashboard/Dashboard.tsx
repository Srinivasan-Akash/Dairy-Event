import { Link } from "react-router-dom";
import "./dashboard.scss";
import Logo from "../assets/home page/logo.png";
import Pointer from "../assets/home page/pointer.png";
import { Settings, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { account } from "../appwrite/appwrite.config";
import { getEventsByUser, EventData } from "../appwrite/functions/getEventsByUser";

export default function Dashboard() {
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [user, setUser] = useState<{ $id: string } | null>(null);
  const [events, setEvents] = useState<EventData[] | null>(null);

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
      }
    };

    fetchEvents();
  }, [user]);

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

      {isSessionReady ? (
        <div className="grid">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div className="card" key={event.event_title}> {/* Use a better unique key like event ID if available */}
                <h2>{event.start_date_time} - {event.end_date_time}</h2>
                <h1>{event.event_title}</h1>
                <p>{event.event_desc}</p>
                <div className="btns">
                  <button>Copy Event Link</button>
                  <button><Settings /></button>
                  <button><Trash2 /></button>
                </div>
              </div>
            ))
          ) : (
            <h2>No events found</h2>
          )}
        </div>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
}
