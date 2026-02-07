import axios from 'axios'
import { v4 as uuidv4 } from 'uuid' // ✅ import UUID

export default async function getAllCounters() {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/counter/allCounters`,
        )
        console.log('DATA:', JSON.stringify(response.data, null, 2))

        // Add UID to each item
        const dataWithUid = response.data.map((item) => ({
            ...item,
            uid: uuidv4(), // generate a unique ID for React keys
        }))

        return dataWithUid
    } catch (error) {
        throw new Error('Fatal Fetching All Counter', error)
    }
}
