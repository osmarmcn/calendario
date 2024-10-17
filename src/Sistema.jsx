

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    generateAvailableTimes(date);
  };

  const generateAvailableTimes = (date) => {
    const times = [];
    const startHour = 9; // Horário de início
    const endHour = 17; // Horário de fim

    for (let hour = startHour; hour < endHour; hour++) {
      const time = `${hour}:00`;
      if (!reservedTimes.includes(time)) times.push(time);
    }
    setAvailableTimes(times);
  };

  const bookMeeting = (time) => {
    setReservedTimes([...reservedTimes, time]);
    setSelectedTime(time);
    alert(`Reunião agendada para ${selectedDate.toDateString()} às ${time}`);
    generateAvailableTimes(selectedDate); // Atualiza os horários disponíveis
  };

  const cancelMeeting = (time) => {
    setReservedTimes(reservedTimes.filter(t => t !== time));
    alert(`Reunião cancelada para ${selectedDate.toDateString()} às ${time}`);
    generateAvailableTimes(selectedDate); // Atualiza os horários disponíveis
  };

  return (
    <div className={`flex flex-col items-center min-h-screen p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <header className="flex justify-between w-full mb-4">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Agendador de Reuniões</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'}`}
        >
          {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </header>
      <div className={`flex bg-white shadow-lg rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-r border-gray-200"
          />
        </div>
        <div className="ml-4 p-4">
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Horários Disponíveis</h2>
          {availableTimes.length > 0 ? (
            availableTimes.map(time => (
              <div key={time} className={`mb-2 flex items-center justify-between p-3 border rounded-lg transition duration-300 ${selectedTime === time ? 'bg-blue-200 border-blue-500' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}>
                <span className={`text-lg ${selectedTime === time ? 'font-semibold' : 'font-normal'} ${darkMode ? 'text-white' : 'text-black'}`}>{time}</span>
                <div>
                  <button
                    onClick={() => bookMeeting(time)}
                    className={`ml-2 px-4 py-1 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Agendar
                  </button>
                  <button
                    onClick={() => cancelMeeting(time)}
                    className={`ml-2 px-4 py-1 rounded ${darkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-gray-500 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nenhum horário disponível</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
