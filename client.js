import sanityClient from '@sanity/client';

const VITE_APP_PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID;
const VITE_APP_API_VERSION = import.meta.env.VITE_APP_API_VERSION;
const VITE_APP_TOKEN = import.meta.env.VITE_APP_TOKEN;


const client = sanityClient({
  projectId: VITE_APP_PROJECT_ID , // Use your actual project ID
  dataset: 'production', // Use your dataset
  apiVersion: VITE_APP_API_VERSION, // Use the latest version
  token: VITE_APP_TOKEN, // Replace with your Sanity token if private
  useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
