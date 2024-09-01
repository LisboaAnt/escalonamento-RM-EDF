"use client";

import { useState } from 'react';
import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskScheduler from '../components/TaskScheduler';
import TaskSchedulerEDF from '@/components/TaskSchedulerEDF';

export default function Home() {
    const [tasks, setTasks] = useState([
        { periodo: 4, tempoExecucao: 1, deadline: 4, remainingTime: 1, nextDeadline: 4 },
        { periodo: 5, tempoExecucao: 2, deadline: 5, remainingTime: 2, nextDeadline: 5 },
        { periodo: 20, tempoExecucao: 4, deadline: 20, remainingTime: 4, nextDeadline: 20 }
    ]);

    // Função para calcular o maior deadline
    const calcularMaiorDeadline = (tarefas) => {
        return Math.max(...tarefas.map(tarefa => tarefa.periodo));
    };

    const handleTasksChange = (updatedTasks) => {
        setTasks(updatedTasks);
    };

    // Function to calculate the least common multiple (LCM)
    const lcm = (a, b) => (a * b) / gcd(a, b);
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    // Calculate the hyperperiod (LCM of all task periods)
    const hiperperiodo = tasks.reduce((acc, task) => lcm(acc, task.periodo), 1);

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1 className="text-2xl font-bold m-3">Calculadora Escalonador RM & EDF</h1>
            <div>
                <TaskForm onTasksChange={handleTasksChange} />
            </div>
            
            <h1 className="text-2xl font-bold m-3">Rate Monotonic – RM</h1>
            <div className="flex flex-col text-center p-0 m-0">
                    <p>• Prioridade mais alta para a tarefa com período menor período</p>
                    <p>• Prioridade fixa</p>
                </div>
            <TaskScheduler tasks={tasks} hiperperiodo={hiperperiodo} />
            
            <h1 className="text-2xl font-bold m-3">Earliest Deadline First – EDF</h1>
            <div className="flex flex-col text-center p-0 m-0">
                    <p>• Inversamente proporcional ao deadline absoluto</p>
                    <p>• Quanto mais próximo o prazo, maior a prioridade da tarefa.</p>
                </div>
            <TaskSchedulerEDF tasks={tasks} hiperperiodo={hiperperiodo}/>
        </div>
    );
}
