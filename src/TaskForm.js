import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ setTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, completed };

        try {
            const response = await axios.post('http://localhost:8080/tasks', newTask);
            setTasks(prevTasks => [...prevTasks, response.data]);
            setTitle('');
            setDescription('');
            setCompleted(false);
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
};

export default TaskForm;
