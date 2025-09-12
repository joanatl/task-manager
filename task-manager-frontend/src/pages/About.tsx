import React from 'react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto mt-9 p-9 bg-grey rounded shadow text-gray-300">
      <h1 className="text-3xl font-bold mb-4">Sobre o Task Manager</h1>
      <p className="text-lg leading-7">
      O <strong>Task Manager</strong> é um projeto desenvolvido com o objetivo de auxiliar usuários a organizarem suas tarefas de forma eficiente e intuitiva.
      </p>

      <p className="mt-4">
        Desenvolvido com <strong>React + TypeScript</strong> no frontend, e <strong>Node.js + Express + MongoDB</strong> no backend, o sistema utiliza autenticação via JWT e um design responsivo com TailwindCSS.
      </p>

      <p className="mt-4">
        Criado como parte de um projeto de estudo e portfólio.
      </p>
    </div>
  );
}
