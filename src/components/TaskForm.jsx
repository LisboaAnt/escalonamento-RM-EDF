// components/TaskForm.js
import { useState } from 'react';

const TaskForm = ({ onTasksChange }) => {
    const [taskList, setTaskList] = useState([
        { periodo: 4, tempoExecucao: 1, deadline: 4 },
        { periodo: 5, tempoExecucao: 2, deadline: 5 },
        { periodo: 20, tempoExecucao: 4, deadline: 20 }
    ]);

    const handleChange = (index, field, value) => {
        const updatedTasks = [...taskList];
        updatedTasks[index][field] = value;
        setTaskList(updatedTasks);
        onTasksChange(updatedTasks); // Notifica a página principal sobre as mudanças
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tarefas Atualizadas:', taskList);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {taskList.map((task, index) => (
                <div key={index} className="flex items-center justify-center bg-gray-200 p-2 rounded-xl">
                    <h1 className={`mr-2 text-xl ${index === 0 ? 'text-red-500' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-green-500' : ''}`}>{"t" + (1 + index)}</h1>
                    
                    <label className="font-bold">Períodos:</label>
                    <input 
                        type="number"
                        value={task.periodo}
                        onChange={(e) => handleChange(index, 'periodo', Number(e.target.value))}
                        className="border p-2 w-14"
                    />
                    
                    <label className="ml-2 font-bold">Tempos de Execução:</label>
                    <input
                        type="number"
                        value={task.tempoExecucao}
                        onChange={(e) => handleChange(index, 'tempoExecucao', Number(e.target.value))}
                        className="border p-2 w-14"
                    />
                    
                    <label className="ml-2 font-bold">Deadlines Relativos:</label>
                    <input
                        type="number"
                        value={task.deadline}
                        onChange={(e) => handleChange(index, 'deadline', Number(e.target.value))}
                        className="border p-2 w-14"
                    />
                </div>
            ))}
        </form>
    );
};

export default TaskForm;
