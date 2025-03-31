import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const slidesData = [
  {
    id: 1,
    title: 'Set Your Focus Goals',
    text: 'Before you start your first session, think about what you\'d like to achieve. Whether it\'s a study session, work task, or creative project, set your goal and let\'s get focused!',
    image: require('../assets/logo.png'),
    button: 'Next',
  },
  {
    id: 2,
    title: 'Start the Timer',
    text: 'Tap the timer to begin your Pomodoro session. Focus for 25 minutes, then take a short break! You\'ll feel energized and productive.',
    image: require('../assets/logo.png'),
    button: 'Next',
  },
  {
    id: 3,
    title: 'Stay on Track',
    text: 'We’ll send you positive reminders along the way. Keep going, you\'re doing great!',
    image: require('../assets/logo.png'),
    button: 'Next',
  },
  {
    id: 4,
    title: 'Track Your Progress',
    text: 'Keep an eye on your completed sessions and track your productivity. Celebrate small victories!',
    image: require('../assets/logo.png'),
    button: 'Next',
  },
  {
    id: 5,
    title: 'Relax and Recharge',
    text: 'After every 4 sessions, take a longer break to recharge. Your focus deserves it!',
    image: require('../assets/logo.png'),
    button: "I'm ready!",
  },
];

const Start = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slidesData[currentIndex];

  const handleNextPress = () => {
    if (currentIndex === slidesData.length - 1) {
      navigation.navigate('FocusTimerScreen');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Таймер (чёрный прямоугольник с обводкой и уголком с градиентом)
  const TimerMock = () => {
    return (
      <View style={styles.timerContainer}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>24:22</Text>
          <LinearGradient
            colors={['#F5E9A9', '#635332']}
            style={styles.cornerOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity onPress={() => { /* Пока без логики */ }}>
              <View style={styles.iconContainer}>
                <Text style={styles.cornerIcon}>⟳</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  };

  // «Now! Work» (только на id=2)
  const NowWorkBar = () => (
    <View style={styles.nowWorkWrapper}>
      <View style={styles.nowPill}>
        <Text style={styles.nowPillText}>Now!</Text>
      </View>
      <Text style={styles.workText}>Work</Text>
    </View>
  );

  // Альтернативный вариант для id=3: золотая полоса + «пузырь» с текстом
  const AltWorkBarWithComment = () => (
    <View style={styles.altWorkContainer}>
      <View style={styles.goldBar} />
      <View style={styles.commentBubble}>
        <View style={styles.commentTail} />
        <Text style={styles.commentText}>
          "Stay focused, the finish line is near!"
        </Text>
      </View>
    </View>
  );

  // Карточка статистики для id=4
  const StatsCard = () => (
    <View style={styles.statsCard}>
      {/* Дата в левом верхнем углу */}
      <Text style={styles.dateText}>12/04/2024</Text>

      {/* Столбцы: подписи и значения */}
      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Work:</Text>
        <Text style={styles.statValue}>25</Text>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Short break:</Text>
        <Text style={styles.statValue}>5</Text>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Long break:</Text>
        <Text style={styles.statValue}>15</Text>
      </View>

      {/* Кнопки Repeat session / Share */}
      <TouchableOpacity style={styles.statsButton}>
        <Text style={styles.statsButtonText}>Repeat session</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.statsButton}>
        <Text style={styles.statsButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Показ таймера/плашек для определённых id */}
      {currentSlide.id === 2 && <TimerMock />}
      {currentSlide.id === 2 && <NowWorkBar />}

      {currentSlide.id === 3 && <TimerMock />}
      {currentSlide.id === 3 && <AltWorkBarWithComment />}

      {currentSlide.id === 4 && <StatsCard />}

      {/* 
        Для остальных (id=1,5) – показываем логотип (image).
        Если не хотим картинку на id=4 – исключаем "4" из массива
      */}
      {![2, 3, 4].includes(currentSlide.id) && (
        <Image
          source={currentSlide.image}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* Заголовок и описание */}
      <Text style={styles.title}>{currentSlide.title}</Text>
      <Text style={styles.description}>{currentSlide.text}</Text>

      {/* Кнопка Next / I'm ready! */}
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>{currentSlide.button}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;

/** ----- Стили ----- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: -10,
  },
  title: {
    fontSize: 24,
    color: '#F5E9A9', 
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'NicoMoji-Regular',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#F5E9A9',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 100,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-VariableFont_wght',
  },

  // Таймер
  timerContainer: {
    marginBottom: 20,
  },
  timerBox: {
    width: 310,
    height: 140,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerText: {
    fontSize: 52,
    color: '#F5E9A9',
    fontWeight: '600',
    letterSpacing: 2,
    fontFamily: 'NicoMoji-Regular',
  },
  cornerOverlay: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 50,
    height: 50,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F5E9A9',
    overflow: 'hidden',
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerIcon: {
    color: '#635332',
    fontSize: 30,
    left: 2,
  },

  // «Now! Work» (id=2)
  nowWorkWrapper: {
    width: 300,
    backgroundColor: '#F5E9A9',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  nowPill: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 16,
  },
  nowPillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  workText: {
    left:25,
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },

  // Альтернативный вариант (id=3)
  altWorkContainer: {
    width: 310,
    marginBottom: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  goldBar: {
    width: 310,
    height: 50,
    backgroundColor: '#635332',
    borderRadius: 20,
  },
  commentBubble: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 14,
    maxWidth: 210,
  },
  commentText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Nunito-VariableFont_wght',
    fontWeight: '600',
  },
  commentTail: {
    position: 'absolute',
    right: -9,
    top: '50%',
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
    transform: [{ translateY: -5 }],
  },

  // Карточка для id=4
  statsCard: {
    width: 300,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    padding: 20,
    marginBottom: 20,
  },
  dateText: {
    color: '#909090', 
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Nunito-VariableFont_wght',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-VariableFont_wght',
  },
  statValue: {
    color: '#F5E9A9',
    fontSize: 16,
    fontFamily: 'Nunito-VariableFont_wght',
    fontWeight: '600',
  },
  statsButton: {
    backgroundColor: '#F5E9A9',
    borderRadius: 12,
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statsButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-VariableFont_wght',
  },
});
