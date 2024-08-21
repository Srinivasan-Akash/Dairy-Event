import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventData, EventData } from '../appwrite/functions/getEventData';

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

    return (
        <div>
            {eventData ? (
                <div>
                    <h1>{eventData.event_title}</h1>
                    <p>Host: {eventData.host_name}</p>
                    <p>Start: {eventData.start_date_time}</p>
                    <p>End: {eventData.end_date_time}</p>
                    <p>Timezone: {eventData.event_timezone}</p>
                    <p>Location: {eventData.event_location}</p>
                    <p>Meeting Link: {eventData.meeting_link}</p>
                    <p>Description: {eventData.event_desc}</p>
                    <p>Shareable Link: <a href={eventData.shareable_event_link} target="_blank" rel="noopener noreferrer">Event Link</a></p>
                </div>
            ) : (
                <div>No event data found.</div>
            )}
        </div>
    );
}
