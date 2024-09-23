import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './style.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tasks');
                console.log("Tarefas recebidas:", response.data);
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error.response || error.message);
            }
        };
    
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <TaskForm setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;
