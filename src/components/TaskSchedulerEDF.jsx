import React, { useEffect, useState } from 'react';


const TaskScheduler = ({ tasks, hiperperiodo }) => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const executeSchedule = () => {
            const newSchedule = Array.from({ length: hiperperiodo }, () => 0); // Iniciar com 0 (T0)
            const updatedTasks = tasks.map(task => ({ ...task }));

            for (let time = 0; time < hiperperiodo; time++) {
                updatedTasks.forEach((task, i) => {
                    // Verifica se é o tempo de ativação da tarefa
                    if (time % task.periodo === 0) {
                        task.remainingTime = task.tempoExecucao;
                        task.nextDeadline = time + task.deadline;
                    }
                });

                const taskId = earliestDeadlineFirst(updatedTasks);
                if (taskId !== -1) {
                    updatedTasks[taskId].remainingTime--;
                    newSchedule[time] = taskId + 1; // Marcar como executando (T1, T2, T3, etc.)
                }
            }

            setSchedule(newSchedule);
        };

        executeSchedule();
    }, [tasks, hiperperiodo]);

    const earliestDeadlineFirst = (tasks) => {
        let minDeadline = Infinity;
        let chosenTask = -1;
        tasks.forEach((task, index) => {
            if (task.remainingTime > 0 && task.nextDeadline <= minDeadline) {
                minDeadline = task.nextDeadline;
                chosenTask = index;
            }
        });
        return chosenTask;
    };

    return (
        <div className="flex w-full border-b-8 border-b-black pb-4 mt-4 overflow-x-auto">
            {schedule.map((tarefa, timeIndex) => (
                <React.Fragment key={timeIndex}>
                    <p className="m-0">{timeIndex}</p>
                    <div className="m-0 p-0 w-1 border-l border-gray-500 border-dashed" />

                    <div
                        style={{
                            width: '50px',
                            height: '37.5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            backgroundColor: tarefa === 0 ? '#cccccc' : // T0
                                tarefa === 1 ? '#ff9999' : 
                                tarefa === 2 ? '#99ccff' : 
                                tarefa === 3 ? '#99ff99' : '#ffffff',
                                marginTop: tarefa === 1 ? '0px' : tarefa === 2 ? '60px' : tarefa === 3 ? '120px' : '0px',
                        }}>
                        {tarefa === 0 ? 'T0' : `T${tarefa}`} {/* Exibir T0 ou T1, T2, etc. */}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default TaskScheduler;
