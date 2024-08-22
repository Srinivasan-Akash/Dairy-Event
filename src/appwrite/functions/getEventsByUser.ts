import { databases } from "../appwrite.config"; // Import the database instance
import { Query, Models } from "appwrite"; // Import Query for filtering

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
    add_to_calandar_links: string;
}

// Function to get all documents created by a specific user
export async function getEventsByUser(userID: string): Promise<EventData[] | null> {
    try {
        // Fetch documents from the collection where created_by is equal to the provided userID
        const response = await databases.listDocuments(
            "events", // Replace with your database ID if needed
            "66c5a8640021a1dfe1fd", // Replace with your Collection ID
            [Query.equal("created_by", userID)]
        );

        // Map the documents to the EventData type
        const events: EventData[] = response.documents.map((document: Models.Document) => ({
            event_title: document.event_title,
            host_name: document.host_name,
            start_date_time: document.start_date_time,
            end_date_time: document.end_date_time,
            event_timezone: document.event_timezone,
            event_location: document.event_location,
            meeting_link: document.meeting_link,
            event_desc: document.event_desc,
            add_to_calandar_links: document.add_to_calandar_links,
        }));

        console.log("Events retrieved successfully:", events);
        return events;
    } catch (error) {
        console.error("Failed to retrieve events:", error);
        return null;
    }
}
