import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Use the correct environment variables
  .setProject("66b36d4100251dc5916a");

const account = new Account(client);
export const databases = new Databases(client); // Add this line to initialize the database

export { account };
