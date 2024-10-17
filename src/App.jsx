


import React from 'react';
 
import './index.css'; // Certifique-se de que o Tailwind CSS está sendo importado
import MyCalendar from './Sistema';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold p-4">Agendador de Reuniões</h1>
      <MyCalendar />
    </div>
  );
};

export default App;

