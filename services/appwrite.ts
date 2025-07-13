// track the searches made by a user
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.chamod.movieflex");

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    const document = result.documents[0];

    // Check if a document exists
    if (result.total > 0 && document) {
      console.log(
        `Search term '${document.searchTerm}' found with count ${document.count}. Incrementing count...`
      );

      // If a document is found, increment the count field
      const documentId = document.$id;
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
        count: document.count + 1,
      });
    } else {
      console.log(`Search term '${query}' not found. Creating new document...`);

      // If no document is found, create a new document in the Appwrite database
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `https://placehold.co/400x800/black/orange?font=raleway&text=${encodeURIComponent(
              "Not\nFound"
            )}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw new Error("Failed to update search count");
  }
};
