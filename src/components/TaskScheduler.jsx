"use client";
import React from "react";

function escalonarTarefas(tarefas, hiperperiodo) {
    let linhaDoTempo = new Array(hiperperiodo).fill(-1);
    let tarefasClone = tarefas.map(tarefa => ({
        ...tarefa,
        deadlineAtual: tarefa.deadline,
        tempoRestante: 0
    }));

    for (let t = 0; t < hiperperiodo; t++) {
        let tarefaEscolhida = -1;
        let menorDeadline = Infinity;

        for (let i = 0; i < tarefasClone.length; i++) {
            let tarefa = tarefasClone[i];

            if (t % tarefa.periodo === 0) {
                tarefa.tempoRestante = tarefa.tempoExecucao;
                tarefa.deadlineAtual = t + tarefa.deadline; // Calcula novo deadline
            }

            if (tarefa.tempoRestante > 0 && tarefa.deadlineAtual < menorDeadline) {
                menorDeadline = tarefa.deadlineAtual;
                tarefaEscolhida = i;
            }
        }

        if (tarefaEscolhida !== -1) {
            linhaDoTempo[t] = tarefaEscolhida + 1;
            tarefasClone[tarefaEscolhida].tempoRestante--;
        }
    }

    return linhaDoTempo;
}

const TaskScheduler = ({ tasks, hiperperiodo }) => {
    const resultado = escalonarTarefas(tasks, hiperperiodo);

    return (
        <div className="flex w-full border-b-8 border-b-black pb-4 mt-4 overflow-x-auto">
            {resultado.map((tarefa, index) => (
                <React.Fragment key={index}>
                    <p className="m-0">{index}</p>
                    <div className="m-0 p-0 w-1 border-l border-gray-500 border-dashed" />

                    <div
                        style={{
                            width: '50px',
                            height: '37.5px', // 75% de 50px
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            backgroundColor: tarefa === -1 ? '#cccccc' : 
                                tarefa === 1 ? '#ff9999' : 
                                tarefa === 2 ? '#99ccff' : 
                                '#99ff99',
                            marginTop: tarefa === 1 ? '0px' : tarefa === 2 ? '60px' : tarefa === 3 ? '120px' : '0px',
                        }}>
                        {tarefa === -1 ? 'T0' : `T${tarefa}`}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default TaskScheduler;
