import axios from 'axios'

export default async function getAllCounters() {
    try {
        const response = await axios.get(
            'http://localhost:8081/counter/allCounters',
        )
        console.log('DATA: ', response.data)
        return response.data
    } catch (error) {
        throw new Error('Fatal Fetching All Counter')
    }
}
