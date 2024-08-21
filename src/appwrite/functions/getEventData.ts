import { databases } from "../../appwrite/appwrite.config"; // Import the database instance
import { ID, Models } from "appwrite";

// Define a TypeScript interface for the event data
export interface EventData {
    event_title: string;
    host_name: string;
    start_date_time: string;
    end_date_time: string;
    event_timezone: string;
    event_location: string;
    meeting_link: string;
    event_desc: string;
    shareable_event_link: string;
}

export async function getEventData(id: string): Promise<EventData | null> {
    try {
        const document = await databases.getDocument(
            "events",
            "66c5a8640021a1dfe1fd", // Replace with your Collection ID
            id
        );

        // Cast the Document to EventData
        const eventData: EventData = {
            event_title: document.event_title,
            host_name: document.host_name,
            start_date_time: document.start_date_time,
            end_date_time: document.end_date_time,
            event_timezone: document.event_timezone,
            event_location: document.event_location,
            meeting_link: document.meeting_link,
            event_desc: document.event_desc,
            shareable_event_link: document.shareable_event_link,
        };

        console.log("Event data retrieved successfully:", eventData);
        return eventData;
    } catch (error) {
        console.error("Failed to retrieve event data:", error);
        return null;
    }
}
