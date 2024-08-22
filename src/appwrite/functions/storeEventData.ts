import { databases } from "../../appwrite/appwrite.config"; // Import the database instance
import { ID } from "appwrite";

export async function storeEventData(data: {
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
}): Promise<string> {
    try {
        const promise = await databases.createDocument(
            "events",
            "66c5a8640021a1dfe1fd", // Replace with your Collection ID
            ID.unique(), // Auto-generate a unique ID for the document
            data
        );
        console.log("Event data stored successfully:", promise);
        return promise.$id; // Return document ID
    } catch (error) {
        console.error("Failed to store event data:", error);
        throw error;
    }
}
