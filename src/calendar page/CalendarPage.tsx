import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventData, EventData } from '../appwrite/functions/getEventData';
import "./calandar-page.scss"
import Logo from "../assets/home page/logo.png"
import Google from "../assets/calandar page/google.svg"
import Apple from "../assets/calandar page/apple.svg"
import Outlook from "../assets/calandar page/outlook.svg"
import Yahoo from "../assets/calandar page/yahoo.svg"
import Office from "../assets/calandar page/offfice.svg"

export default function CalendarPage() {
    const { id } = useParams<{ id: string }>(); // Extract id from URL
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            if (id) {
                try {
                    const data = await getEventData(id);
                    setEventData(data);
                } catch (error) {
                    console.error("Error fetching event data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEventData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    // Parse calendar links
    const calendarLinks = eventData?.add_to_calandar_links ? JSON.parse(eventData.add_to_calandar_links) : {};

    return (
        <div className='calandar-page'>

            {eventData ? (
                <div className="page">
                    <img className='logo' src={Logo} alt="" />
                    <div className='container'>
                        <h1>{eventData.event_title}</h1>
                        <p>Host: {eventData.host_name}</p>
                        <p>Start: {eventData.start_date_time}</p>
                        <p>End: {eventData.end_date_time}</p>
                        <p>Timezone: {eventData.event_timezone}</p>
                        <p>Location: {eventData.event_location}</p>
                        <p>Meeting Link: <a href={eventData.meeting_link} target="_blank" rel="noopener noreferrer">{eventData.meeting_link}</a></p>
                        <p>Description: {eventData.event_desc}</p>

                        <h2>Add To Calandar Links</h2>
                        <div className='links'>
                            {calendarLinks.google && (
                                <button
                                    onClick={() => window.open(calendarLinks.google, '_blank')}
                                >
                                    <img src={Google} alt="Google Calendar" />
                                    Google
                                </button>
                            )}
                            {calendarLinks.outlook && (
                                <button
                                    onClick={() => window.open(calendarLinks.outlook, '_blank')}
                                >
                                    <img src={Outlook} alt="Outlook" />
                                    Outlook
                                </button>
                            )}
                            {calendarLinks.apple && (
                                <button
                                    onClick={() => window.open(calendarLinks.apple, '_blank')}
                                >
                                    <img src={Apple} alt="Apple Calendar" />
                                    Apple
                                </button>
                            )}
                            {calendarLinks.office365 && (
                                <button
                                    onClick={() => window.open(calendarLinks.office365, '_blank')}
                                >
                                    <img src={Office} alt="Office 365" />
                                    Office 365
                                </button>
                            )}
                            {calendarLinks.yahoo && (
                                <button
                                    onClick={() => window.open(calendarLinks.yahoo, '_blank')}
                                >
                                    <img src={Yahoo} alt="Yahoo Calendar" />
                                    Yahoo
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            ) : (
                <div>No event data found.</div>
            )}
            <div className="gradient"></div>
        </div>
    );
}
