import { databases } from "../appwrite.config"; // Import the database instance
import { Query } from "appwrite"; // Import Query for filtering

// Define a TypeScript interface for the event data
export interface EventData {
    event_title: string
    host_name: string;
    start_date_time: string;
    end_date_time: string;
    event_timezone: string;
    event_location: string;
    meeting_link: string;
    event_desc: string;
    add_to_calandar_links: string;
    created_by: string;
    calndr_event_id: string;
    calndr_secret_id: string;
    all_day: boolean
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

        console.log("Events retrieved successfully:",  response.documents);
        // @ts-ignore
        return response.documents as EventData[];
    } catch (error) {
        console.error("Failed to retrieve events:", error);
        return null;
    }
}
