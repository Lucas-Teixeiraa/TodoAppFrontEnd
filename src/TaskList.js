import axios from 'axios';
import React, { useState } from 'react'

const TaskList = ({ tasks, setTasks }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    if (!tasks || tasks.length === 0) {
        return <div>Loading...</div>;
    }

    // Deletar tarefa
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); 
        } catch (error) {
            console.error("Erro ao deletar tarefa", error);
        }
    };

    // Editar tarefa
    const handleEdit = (task) => {
        setEditingTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
    };

    // Salvar tarefa editada
    const handleSaveEdit = async (id) => {
        try {
            const updatedTask = { title: editedTitle, description: editedDescription };
            const response = await axios.put(`http://localhost:8080/tasks/${id}`, updatedTask);
            
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? response.data : task))
            );
            setEditingTask(null);
        } catch (error) {
            console.error("Erro ao editar tarefa", error);
        }
    };

    // Alternar o estado da tarefa para 'completa' ou 'incompleta'
    const handleComplete = async (id, completed) => {
        try {
            const updatedTask = { completed: !completed }; // Alterna o status
            const response = await axios.put(`http://localhost:8080/tasks/${id}/complete`, updatedTask);

            // Atualiza o estado das tarefas com o novo status
            setTasks(prevTasks =>
                prevTasks.map(task => (task.id === id ? response.data : task))
            );
        } catch (error) {
            console.error("Erro ao marcar tarefa como completa", error);
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <div key={task.id} className="card">
                    {editingTask && editingTask.id === task.id ? (
                        <>
                            <input 
                                type="text" 
                                value={editedTitle} 
                                onChange={(e) => setEditedTitle(e.target.value)} 
                                placeholder="Novo título" 
                            />
                            <input 
                                type="text" 
                                value={editedDescription} 
                                onChange={(e) => setEditedDescription(e.target.value)} 
                                placeholder="Nova descrição" 
                            />
                            <button onClick={() => handleSaveEdit(task.id)}>Salvar</button>
                            <button onClick={() => setEditingTask(null)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.completed ? "Completa" : "Incompleta"}</p>
                            <button onClick={() => handleEdit(task)}>Editar</button>
                            <button onClick={() => handleDelete(task.id)}>Deletar</button>
                            <button onClick={() => handleComplete(task.id, task.completed)}>
                                {task.completed ? "Desmarcar" : "Completar"}
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;