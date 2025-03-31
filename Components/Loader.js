import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Loader = ({ onEnd }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Запуск бесконечной анимации вращения
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000, // полный оборот за 2 секунды
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();

    // Таймер на 5 секунд, по истечении которого вызываем onEnd
    const timer = setTimeout(() => {
      onEnd && onEnd();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Интерполяция значения для поворота от 0 до 360 градусов
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')} // Убедитесь, что путь к файлу корректный
        style={[styles.logo, { transform: [{ rotate }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Черный фон
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default Loader;
