// Info.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';

export default function Info({ navigation }) {
  // Функция «поделиться», вызываем Share API
  const handleShareApp = async () => {
    try {
      await Share.share({
        message: `Check out King's Focus Timer! It's a great Pomodoro app to help you stay productive.`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===== Хедер ===== */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Frame29.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.infoIconWrapper}>
            <Image
              source={require('../assets/info.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* ===== Основной контент (ScrollView) ===== */}
      <ScrollView style={styles.contentScroll}>
        <Text style={styles.title}>About King's Focus Timer</Text>

        <Text style={styles.body}>
          Welcome to King's Focus Timer, your personal productivity companion! 
          This app is designed to help you stay focused, manage your time 
          effectively, and maximize your productivity using the famous Pomodoro Technique.
        </Text>

        <Text style={styles.body}>
          The Pomodoro Technique is a time-management method developed by 
          Francesco Cirillo in the late 1980s. It encourages you to break 
          your work into intervals, traditionally 25 minutes in length, 
          separated by short breaks. After four "Pomodoros" (work intervals), 
          you take a longer break. This approach helps maintain high levels 
          of concentration while preventing burnout.
        </Text>

        <Text style={styles.subtitle}>How it Works:</Text>
        <Text style={styles.bullet}>
          1. Work in Focused Intervals: Set your timer for 25 minutes of focused work.
        </Text>
        <Text style={styles.bullet}>
          2. Short Break: Take a 5-minute break after each Pomodoro to recharge.
        </Text>
        <Text style={styles.bullet}>
          3. Longer Break: After four Pomodoros, enjoy a longer break (15-30 minutes) to relax.
        </Text>
        <Text style={styles.bullet}>
          4. Track Your Progress: Monitor your completed Pomodoros and keep your productivity on track.
        </Text>

        <Text style={styles.body}>
          Whether you're tackling work tasks, studying, or pursuing creative 
          projects, King's Focus Timer keeps you motivated, focused, 
          and on track.
        </Text>

        <Text style={styles.body}>
          Start your Pomodoro journey today and unlock your true potential!
        </Text>

        {/* Дополнительное место, чтобы кнопка не наезжала на текст */}
        <View style={{ height: 80 }} />

        {/* Кнопка Share App */}
        <View style={styles.shareContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShareApp}>
            <Text style={styles.shareButtonText}>Share app</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ===== Стили =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Хедер
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48, 
    marginHorizontal: 40,
    justifyContent: 'space-between',
  },
  logo: {
    width: 215,
    height: 85,
  },
  infoButton: {
    padding: 10,
  },
  infoIconWrapper: {
    padding: 10,
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#212121',
    backgroundColor: '#F5E9A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    width: 36,
    height: 36,
    tintColor: '#212121',
  },

  // Контент
  contentScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    color: '#F5E9A9',
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'NicoMoji-Regular', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#F5E9A9',
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    fontFamily: 'NicoMoji-Regular',
  },

  // Добавляем textAlign: 'justify'
  body: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 14,
    fontFamily: 'Nunito-VariableFont_wght',
    textAlign: 'justify',    // Выровнять текст по ширине
  },
  bullet: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
    fontFamily: 'Nunito-VariableFont_wght',
    textAlign: 'justify',    // Тоже выровнять по ширине, если хотите
  },

  // Кнопка Share
  shareContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#F5E9A9',
    paddingHorizontal: 110,
    paddingVertical: 16,
    borderRadius: 20,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Nunito-VariableFont_wght',
  },
});
