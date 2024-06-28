import { Account ,Avatars,Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nativeapp.halo',
    projectId: '6662adb50011f3aa93b3',
    databaseId: '6662b6ac003a3ba5b2d9',
    userCollectionId: '6662ba1f00376ae87937',
    videoCollectionId: '6662bb61002df4f5ba5d',
    storageId: '6662c92e0003bae0dce3'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    //.setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases  = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error ('Failed to create account');
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountid: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };
  
// Sign In
export const signIn = async (email, password) => {
  try {
    // Check for active session
    const currentSession = await account.getSession('current');
    if (currentSession) {
      // If there's an active session, log out first
      await account.deleteSession('current');
    }
    
    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    // Handle specific session error
    if (error.message.includes('session is active')) {
      throw new Error('An active session already exists. Please try logging out first.');
    }
    throw new Error(error.message);
  }
}

//function for get users
export const getCurrentUser = async () => {
  try{
    const currentAccount = await account.get ();

    if(!currentAccount) throw Error ('No current account');

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountid', currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error('User not found in database');

    return currentUser.documents[0];

  }catch(error){
    console.log (error.message);
  }
};


//Function for fetch all posts
export const getAllPosts = async () => {
  try{
    const posts = await databases.listDocuments (
      databaseId,
      videoCollectionId
    )
    return posts.documents;

  }catch (error){
    throw new Error (error);
  }
}

//Function fro fetch to the latest videos
export const getLatestPosts = async () => {
  try{
    const posts = await databases.listDocuments (
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents;

  }catch (error){
    throw new Error (error);
  }
}