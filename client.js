import sanityClient from '@sanity/client';

const REACT_APP_PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;
const REACT_APP_TOKEN = process.env.REACT_APP_TOKEN;


const client = sanityClient({
  projectId: REACT_APP_PROJECT_ID , // Use your actual project ID
  dataset: 'production', // Use your dataset
  apiVersion: REACT_APP_API_VERSION, // Use the latest version
  token: REACT_APP_TOKEN, // Replace with your Sanity token if private
  useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
