import { Client,Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6661c6c10011c0848e8b');

export const account = new Account(client);
export default client;