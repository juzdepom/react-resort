import {createClient} from 'contentful'

// space and access token can be found on your account on Contentful in Settings > API Keys
// in this project, you created a new API token named reactResorts
// space ID and access token are in the .env.development file
export default createClient({
    // Space ID
    space: process.env.REACT_APP_API_SPACE,
    // Content Delivery API - access token
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
    
})