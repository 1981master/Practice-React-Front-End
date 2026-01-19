import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default async function saveToDo(todo) {
    try {
        const response = await axios.post(
            'http://localhost:8081/todo/saveToDo',
            todo,
        )

        //backend return saved todo
        return {
            ...response.data,
            uid: uuidv4(),
        }
    } catch (error) {
        throw new Error('Fatal save todo', error)
    }
}

export async function fetchAllTodos() {
    try {
        const response = await axios.get('http://localhost:8081/todo/allToDo')
        return response.data
    } catch (error) {
        console.log('Fatal fetching all todos')
        return []
    }
}

export async function deleteToDoAPI(todoId) {
    try {
        const response = await axios.delete(
            `http://localhost:8081/todo/deleteToDo/${todoId}`,
        )
        return response.status
    } catch (error) {
        throw new Error(`fatal delete todo: ${error}`)
    }
}
