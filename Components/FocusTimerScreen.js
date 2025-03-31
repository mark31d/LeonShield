import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SettingsContext } from './SettingsContext';
import { useRoute } from '@react-navigation/native';

const motivationalPhrases = [
  "You're doing great!",
  "Stay focused, the finish line is near!",
  "Remember your goal!",
  "Keep going, success is near!",
  "Stay positive, you're on track!",
  "Halfway there, don't give up!",
  "Push through, victory awaits!",
  "Stay calm and keep working!",
  "Almost done, final push!",
  "Excellent job, keep it up!",
];

export default function FocusTimerScreen({ navigation }) {
  const route = useRoute();
  const {
    work1,
    shortBreak,
    work2,
    longBreak,
    work3,
    soundEnabled,
    vibrationEnabled,
    motivationEnabled,
    playSound,
    setWork1,
    setWork2,
    setWork3,
    setShortBreak,
    setLongBreak,
  } = useContext(SettingsContext);
  const [newSession, setNewSession] = useState(null);

  // Если пришли данные для повтора сессии, обновляем значения таймера
  useEffect(() => {
    if (route.params?.sessionData) {
      const { work, shortBreak, longBreak } = route.params.sessionData;
      // Предполагается, что все work-значения равны
      setWork1(work);
      setWork2(work);
      setWork3(work);
      setShortBreak(shortBreak);
      setLongBreak(longBreak);
    }
    // Можно добавить очистку параметров, если требуется
  }, [route.params?.sessionData]);

  // Вычисляем длительности сессий (в секундах)
  const SESSIONS = [
    { key: 1, label: 'Work', type: 'work', duration: work1 * 60 },
    { key: 2, label: 'Short Break', type: 'short', duration: shortBreak * 60 },
    { key: 3, label: 'Work', type: 'work', duration: work2 * 60 },
    { key: 4, label: 'Long Break', type: 'long', duration: longBreak * 60 },
    { key: 5, label: 'Work', type: 'work', duration: work3 * 60 },
  ];

  const [timeLeft, setTimeLeft] = useState(SESSIONS[0].duration);
  const [phase, setPhase] = useState('work');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showDoneCard, setShowDoneCard] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Состояния для мотивационных баблов
  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [phrasesShown, setPhrasesShown] = useState(0);

  const intervalRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);
  const nextBubbleTimeoutRef = useRef(null);

  // Запуск/остановка таймера
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Обработка окончания таймера
  const handleTimerEnd = () => {
    setIsRunning(false);

    if (soundEnabled) {
      playSound();
    }
    if (vibrationEnabled) {
      Vibration.vibrate(500);
    }

    if (currentIndex < SESSIONS.length - 1) {
      // Переключаемся на следующий интервал
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextPhase = SESSIONS[nextIndex].type;
      setPhase(nextPhase);
      setTimeLeft(SESSIONS[nextIndex].duration);
      resetBubbleState();
    } else {
      // Формируем лог сессии
      const sessionLog = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        work: work1 + work2 + work3, // суммарное время работы
        shortBreak,
        longBreak,
      };
      // Сохраняем данные сессии в локальное состояние
      setNewSession(sessionLog);
      
      setPhase('done');
      setShowDoneCard(true);
      resetBubbleState();
    }
  };

  // Планирование мотивационных баблов
  useEffect(() => {
    if (phase === 'work' && isRunning && motivationEnabled) {
      planNextBubble();
    } else {
      resetBubbleState();
    }
  }, [phase, isRunning, motivationEnabled]);

  const planNextBubble = () => {
    if (phrasesShown >= 10) return;
    const randomDelay = getRandomInt(10, 20) * 1000;
  
    nextBubbleTimeoutRef.current = setTimeout(() => {
      if (!isRunning || phase !== 'work') return;
      const phrase = pickRandomPhrase();
      setBubbleText(phrase);
      setShowBubble(true);
      setPhrasesShown(count => count + 1);
  
      bubbleTimeoutRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 5000);
  
      if (phrasesShown + 1 < 10 && phase === 'work' && isRunning && motivationEnabled) {
        planNextBubble();
      }
    }, randomDelay);
  };

  const resetBubbleState = () => {
    setShowBubble(false);
    setBubbleText('');
    setPhrasesShown(0);
    clearTimeout(bubbleTimeoutRef.current);
    clearTimeout(nextBubbleTimeoutRef.current);
  };

  const pickRandomPhrase = () => {
    const idx = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[idx];
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handlePlayPause = () => setIsRunning(prev => !prev);
  const handleShowResetConfirm = () => setShowResetConfirm(true);
  const handleCancelReset = () => setShowResetConfirm(false);
  const handleReset = () => {
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(SESSIONS[0].duration);
    setCurrentIndex(0);
    setShowDoneCard(false);
    setShowResetConfirm(false);
    resetBubbleState();
  };
  const handleRepeat = () => {
    // При повторе можно просто сбросить таймер с уже установленными значениями из контекста
    setShowDoneCard(false);
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(SESSIONS[0].duration);
    setCurrentIndex(0);
    resetBubbleState();
  };
  const handleClose = () => setShowDoneCard(false);
  const handleSessionPress = (index) => {
    setIsRunning(false);
    setCurrentIndex(index);
    setPhase(SESSIONS[index].type);
    setTimeLeft(SESSIONS[index].duration);
    resetBubbleState();
  };

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Frame29.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('Info')}>
          <View style={styles.infoIconWrapper}>
            <Image
              source={require('../assets/info.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.focusTitle}>Focus timer:</Text>

      <View style={styles.timerBoxOuter}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>
            {phase === 'done' ? 'DONE' : formatTime(timeLeft)}
          </Text>
          <LinearGradient
            colors={['#F5E9A9', '#635332']}
            style={styles.cornerOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity onPress={handleShowResetConfirm}>
              <View style={styles.iconContainer}>
                <Text style={styles.cornerIcon}>⟳</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <ScrollView style={styles.sessionList} contentContainerStyle={{ paddingBottom: 80 }}>
        {SESSIONS.map((sess, i) => {
          if (i < currentIndex) {
            return (
              <View key={sess.key} style={[styles.finishedSessionButton, { backgroundColor: '#635332' }]}>
                <Text style={styles.finishedSessionText}>{sess.label}</Text>
              </View>
            );
          } else if (i === currentIndex && phase !== 'done') {
            return (
              <TouchableOpacity key={sess.key} style={styles.nowWorkWrapper} onPress={() => handleSessionPress(i)}>
                <View style={styles.nowPill}>
                  <Text style={styles.nowPillText}>Now!</Text>
                </View>
                <Text style={styles.workText}>{sess.label}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity key={sess.key} style={styles.normalSessionButton} onPress={() => handleSessionPress(i)}>
                <Text style={styles.normalSessionText}>{sess.label}</Text>
              </TouchableOpacity>
            );
          }
        })}

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Settings')}>
            <Image source={require('../assets/gear.png')} style={styles.bottomIconSide} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButtonCenter} onPress={handlePlayPause}>
            <Image
              source={isRunning ? require('../assets/pause.png') : require('../assets/play.png')}
              style={styles.bottomIconCenter}
            />
          </TouchableOpacity>

          <TouchableOpacity
  style={styles.bottomButton}
  onPress={() => navigation.navigate('History', { newSession })}
>
  <Image source={require('../assets/timer.png')} style={styles.bottomIconSide} />
</TouchableOpacity>

        </View>
      </ScrollView>

      {showBubble && phase === 'work' && (
        <View style={styles.bubbleContainer}>
          <View style={styles.bubbleTail} />
          <Text style={styles.bubbleText}>{bubbleText}</Text>
        </View>
      )}

      {showResetConfirm && (
        <View style={styles.resetOverlay}>
          <View style={styles.resetCard}>
            <Image source={require('../assets/refresh_big.png')} style={styles.resetIcon} />
            <Text style={styles.resetTitle}>
              Are you sure want{"\n"}to reset this timer?
            </Text>
            <TouchableOpacity style={styles.resetCancelButton} onPress={handleCancelReset}>
              <Text style={styles.resetCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showDoneCard && (
        <View style={styles.doneOverlay}>
          <View style={styles.doneCard}>
            <Image source={require('../assets/check.png')} style={styles.doneIcon} />
            <Text style={styles.doneTitle}>
              This focus session{'\n'}is successfully{'\n'}completed
            </Text>
            <TouchableOpacity style={styles.doneButton} onPress={handleRepeat}>
              <Text style={styles.doneButtonText}>Repeat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48,
    marginHorizontal: 40,
    justifyContent: 'space-between',
  },
  logo: { width: 215, height: 85 },
  infoButton: { padding: 10 },
  infoIconWrapper: {
    padding: 10,
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: { width: 36, height: 36 },
  focusTitle: {
    fontFamily: 'NicoMoji-Regular',
    fontSize: 25,
    color: '#fff',
    marginLeft: 50,
    marginTop: 8,
    marginBottom: 12,
  },
  timerBoxOuter: { alignSelf: 'center', marginBottom: 16 },
  timerBox: {
    width: 320,
    height: 130,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerText: {
    fontFamily: 'NicoMoji-Regular',
    fontSize: 68,
    color: '#F5E9A9',
    fontWeight: '600',
    letterSpacing: 2,
  },
  cornerOverlay: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 50,
    height: 50,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerIcon: { left: 1.5, top: 1, fontSize: 25, color: '#635332' },
  sessionList: { flex: 1, marginHorizontal: 30, padding: 10 },
  finishedSessionButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  finishedSessionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  nowWorkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E9A9',
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 14,
    position: 'relative',
  },
  nowPill: {
    position: 'absolute',
    left: 16,
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  nowPillText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  workText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito-VariableFont_wght',
  },
  normalSessionButton: {
    backgroundColor: '#212121',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  normalSessionText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  bottomBar: {
    marginTop: 10,
    marginBottom: -24,
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomButton: {
    top: 10,
    borderColor: '#F5E9A9',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconSide: { width: 30, height: 30, tintColor: '#F5E9A9' },
  bottomButtonCenter: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#2A2A2A', // Серый фон для кнопки Play
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconCenter: { width: 40, height: 40, tintColor: '#F5E9A9' },
  bubbleContainer: {
    position: 'absolute',
    top: 320,
    left: 160,
    maxWidth: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  bubbleText: { color: '#000', fontSize: 14, fontWeight: '600', flexWrap: 'wrap' },
  bubbleTail: {
    position: 'absolute',
    right: -8,
    top: '50%',
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
    transform: [{ translateY: -1 }],
  },
  bubbleAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  resetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetCard: {
    width: 300,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  resetIcon: {
    width: 80,
    height: 80,
    tintColor: '#F5E9A9',
    marginBottom: 20,
  },
  resetTitle: {
    fontFamily: 'NicoMoji-Regular',
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  resetCancelButton: {
    backgroundColor: '#F5E9A9',
    borderRadius: 12,
    paddingHorizontal: 80,
    paddingVertical: 12,
    marginBottom: 12,
  },
  resetCancelText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 80,
    paddingVertical: 12,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  doneOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneCard: {
    width: 300,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  doneIcon: {
    width: 120,
    height: 64,
    tintColor: '#F5E9A9',
    marginBottom: 20,
  },
  doneTitle: {
    fontFamily: 'NicoMoji-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  doneButton: {
    backgroundColor: '#F5E9A9',
    borderRadius: 12,
    paddingHorizontal: 80,
    paddingVertical: 12,
    marginBottom: 12,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 80,
    paddingVertical: 12,
    marginBottom: 4,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
