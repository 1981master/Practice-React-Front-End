import axios from 'axios'

export default async function callPythonHealth() {
    try {
        const response = await axios.get('http://localhost:8000/')
        console.log('Health API response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching health API:', error)
        throw new Error('Failed to fetch health API')
    }
}
