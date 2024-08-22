import { databases } from "../../appwrite/appwrite.config"; // Import the database instance

export const deleteEvent = async (eventId: string) => {
  try {
    await databases.deleteDocument('events', '66c5a8640021a1dfe1fd', eventId); // Adjust the parameters based on your Appwrite setup
  } catch (error: any) {
    throw new Error('Error deleting event: ' + error.message);
  }
};
