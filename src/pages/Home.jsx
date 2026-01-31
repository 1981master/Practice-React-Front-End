import Counter from '../components/Counter'
import PracticeArea from '../components/PracticeArea'
import PythonEchoTester from '../components/pythonComponents/PythonEchoTester'
import TodoList from '../components/todoList/TodoList'
import CounterProvider from '../context/CounterContext'

export default function Home() {
    return (
        <>
            <h1>Welcome to Kids Fun Math</h1>

            <PracticeArea>
                <CounterProvider>
                    <Counter />
                </CounterProvider>
                <PythonEchoTester />
                <TodoList />
            </PracticeArea>
        </>
    )
}
