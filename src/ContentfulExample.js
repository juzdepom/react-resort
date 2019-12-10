import {createClient} from 'contentful'

// space and access token can be found on your account on Contentful in Settings > API Keys
// in this project, you created a new API token named reactResorts
export default createClient({
    // Space ID
    space: "xxxxxxxx",
    // Content Delivery API - access token
    accessToken: "xxxxxxxxxxx",
})