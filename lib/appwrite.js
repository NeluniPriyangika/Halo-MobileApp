import { Account ,Client } from 'react-native-appwrite';
import { Platform } from "react-native";


export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nativeapp.halo',
    projectId: '6662adb50011f3aa93b3',
    databaseId: '6662b6ac003a3ba5b2d9',
    userCollectionId: '6662ba1f00376ae87937',
    videoCollectionId: '6662bb61002df4f5ba5d',
    storageId: '6662c92e0003bae0dce3'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    .setPlatform(Config.platform) // Your application ID or bundle ID.

    const account = new Account(client);

export const createUser = () => {
        // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}
