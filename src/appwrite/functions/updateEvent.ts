import { databases } from "../appwrite.config"; // Import the database instance

const updateEvent = async (document_id: string, updatedAllDay: boolean) => {
  try {
    // Replace 'databaseId' and 'collectionId' with your Appwrite database and collection IDs
    await databases.updateDocument('events', '66c5a8640021a1dfe1fd', document_id, {
      all_day: updatedAllDay
    });

    console.log('Appwrite document updated successfully');
  } catch (error) {
    console.error('Failed to update Appwrite document:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default updateEvent