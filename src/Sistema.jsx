import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Função para desabilitar datas passadas no calendário
  const isDateInPast = (date) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0); // Compara apenas as datas, ignorando as horas
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    generateAvailableTimes(date);
  };

  // Gerar horários disponíveis, exceto os já reservados
  const generateAvailableTimes = (date) => {
    const times = [];
    const startHour = 9; // Horário de início
    const endHour = 17; // Horário de fim

    for (let hour = startHour; hour < endHour; hour++) {
      const time = `${hour}:00`;
      if (!reservedTimes.includes(time)) times.push(time); // Horários já reservados não aparecem na lista de disponíveis
    }
    setAvailableTimes(times);
  };

  // Função para agendar uma reunião
  const bookMeeting = (time) => {
    const today = new Date();

    // Verifica se a data selecionada é no passado
    if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      alert('Não é possível agendar em uma data passada.');
      return;
    }

    setReservedTimes([...reservedTimes, time]);
    setSelectedTime(time);
    setAvailableTimes(availableTimes.filter(t => t !== time)); // Remove o horário da lista de disponíveis
    alert(`Reunião agendada para ${selectedDate.toDateString()} às ${time}`);
  };

  // Função para ordenar horários no formato "HH:MM"
  const sortTimes = (times) => {
    return times.sort((a, b) => {
      const [aHour] = a.split(':').map(Number);
      const [bHour] = b.split(':').map(Number);
      return aHour - bHour;
    });
  };

  // Função para cancelar uma reunião
  const cancelMeeting = (time) => {
    // Remover o horário da lista de horários reservados
    const updatedReservedTimes = reservedTimes.filter(t => t !== time);
    setReservedTimes(updatedReservedTimes);

    // Adicionar o horário de volta à lista de horários disponíveis e ordenar
    const updatedAvailableTimes = [...availableTimes, time];
    setAvailableTimes(sortTimes(updatedAvailableTimes)); // Ordena os horários ao adicionar de volta

    alert(`Reunião cancelada para ${selectedDate.toDateString()} às ${time}`);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <header className="flex justify-between w-full mb-4">
        <h1 className={`mb-10 text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Marque sua reunião</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded ${darkMode ? 'bg-white text-gray-900' : 'bg-black text-white'}`}
        >
          {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>
      </header>
      <div className={`flex bg-white shadow-lg rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={({ date, view }) => view === 'month' && isDateInPast(date)} // Desabilitar datas passadas
            className="border-r border-gray-200"
          />
        </div>
        <div className="ml-4 p-4">
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-black' : 'text-black'}`}>Horários Disponíveis</h2>
          {availableTimes.length > 0 ? (
            availableTimes.map(time => (
              <div key={time} className={`mb-2 flex items-center justify-between p-3 border rounded-lg transition duration-300 ${selectedTime === time ? 'bg-blue-200 border-blue-500' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}>
                <span className={`text-lg ${darkMode ? 'text-black' : 'text-black'}`}>{time}</span>
                <div>
                  <button
                    onClick={() => bookMeeting(time)}
                    className={`ml-2 px-4 py-1 rounded ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-gray-500 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nenhum horário disponível</p>
          )}

          <h2 className={`text-xl font-bold mt-6 mb-4 ${darkMode ? 'text-black' : 'text-black'}`}>Horários Reservados</h2>
          {reservedTimes.length > 0 ? (
            reservedTimes.map(time => (
              <div key={time} className="mb-2 flex items-center justify-between p-3 border rounded-lg bg-red-100 border-red-300">
                <span className={`text-lg font-semibold ${darkMode ? 'text-black' : 'text-black'}`}>{time}</span>
                <div>
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
            <p className={`text-gray-500 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Nenhum horário reservado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
