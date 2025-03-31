import React, { createContext, useState } from 'react';
import Sound from 'react-native-sound';
import { Vibration } from 'react-native';

// Создаём контекст
export const SettingsContext = createContext();

// Провайдер, который будет оборачивать наши экраны
export function SettingsProvider({ children }) {
  // Длительности (в минутах)
  const [work1, setWork1] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [work2, setWork2] = useState(25);
  const [longBreak, setLongBreak] = useState(15);
  const [work3, setWork3] = useState(25);

  // Переключатели настроек
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [motivationEnabled, setMotivationEnabled] = useState(true);

  // Функция для воспроизведения звука, если звук включён
  const playSound = () => {
    if (soundEnabled) {
      const ding = new Sound(require('../assets/ding.wav'), (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        ding.play((success) => {
          if (!success) {
            console.log('Sound playback failed');
          }
          ding.release();
        });
      });
    }
  };

  // Функция для воспроизведения вибрации, если вибрация включена
  const playVibration = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(500); // вибрация 500 мс
    }
  };

  const value = {
    // Длительности
    work1, setWork1,
    shortBreak, setShortBreak,
    work2, setWork2,
    longBreak, setLongBreak,
    work3, setWork3,

    // Переключатели
    soundEnabled, setSoundEnabled,
    vibrationEnabled, setVibrationEnabled,
    motivationEnabled, setMotivationEnabled,

    // Функции воспроизведения звука и вибрации
    playSound,
    playVibration,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
