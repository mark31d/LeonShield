import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SettingsContext } from './SettingsContext'; // <-- Импортируем контекст

export default function Settings({ navigation }) {
  // Деструктурируем нужные настройки/сеттеры из контекста
  const {
    work1, setWork1,
    shortBreak, setShortBreak,
    work2, setWork2,
    longBreak, setLongBreak,
    work3, setWork3,
    soundEnabled, setSoundEnabled,
    vibrationEnabled, setVibrationEnabled,
    motivationEnabled, setMotivationEnabled,
  } = useContext(SettingsContext);

  // Локальный стейт для показа оверлея с подтверждением
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Функция для сброса настроек к дефолтным
  const handleResetDefaults = () => {
    setWork1(25);
    setShortBreak(5);
    setWork2(25);
    setLongBreak(15);
    setWork3(25);
    setShowResetConfirm(false);
  };

  // Функция для увеличения/уменьшения значений
  const increment = (val, setVal) => setVal(val + 1);
  const decrement = (val, setVal) => {
    if (val > 1) setVal(val - 1);
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

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.navigate('Info')}
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

      <ScrollView style={styles.scrollArea}>
        {/* Заголовок «Timer Settings:» с уголком (refresh) */}
        <View style={styles.timerSettingsHeader}>
          <Text style={styles.sectionTitle}>Timer Settings:</Text>

          {/* Уголок-градиент с иконкой refresh */}
          <LinearGradient
            colors={['#F5E9A9', '#635332']}
            style={styles.cornerOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity onPress={() => setShowResetConfirm(true)}>
              <View style={styles.iconContainer}>
                {/* Можно вместо текста «⟳» использовать Image с иконкой */}
                <Text style={styles.cornerIcon}>⟳</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <Text style={styles.sectionSubtitle}>Sections length (minutes)</Text>

        {/* Секция настроек длительностей */}
        <View style={styles.settingsBlock}>
          {/* Work #1 */}
          <View style={styles.rowContainer}>
            <View style={styles.leftPill}>
              <Text style={styles.leftPillText}>Work</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.minutesText}>{work1}</Text>
              <TouchableOpacity onPress={() => increment(work1, setWork1)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement(work1, setWork1)}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Short Break */}
          <View style={styles.rowContainer}>
            <View style={styles.leftPill}>
              <Text style={styles.leftPillText}>Short Break</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.minutesText}>{shortBreak}</Text>
              <TouchableOpacity onPress={() => increment(shortBreak, setShortBreak)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement(shortBreak, setShortBreak)}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Work #2 */}
          <View style={styles.rowContainer}>
            <View style={styles.leftPill}>
              <Text style={styles.leftPillText}>Work</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.minutesText}>{work2}</Text>
              <TouchableOpacity onPress={() => increment(work2, setWork2)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement(work2, setWork2)}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Long Break */}
          <View style={styles.rowContainer}>
            <View style={styles.leftPill}>
              <Text style={styles.leftPillText}>Long Break</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.minutesText}>{longBreak}</Text>
              <TouchableOpacity onPress={() => increment(longBreak, setLongBreak)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement(longBreak, setLongBreak)}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Work #3 */}
          <View style={styles.rowContainer}>
            <View style={styles.leftPill}>
              <Text style={styles.leftPillText}>Work</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.minutesText}>{work3}</Text>
              <TouchableOpacity onPress={() => increment(work3, setWork3)}>
                <Text style={styles.plusMinus}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrement(work3, setWork3)}>
                <Text style={styles.plusMinus}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <Text style={styles.sectionTitle}>App Settings:</Text>
        <View style={[styles.appSettingsBox, { backgroundColor: '#1D1D1D' }]}>
          {/* Motivational quotes */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Motivational quotes</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#F5E9A9' }}
              thumbColor={motivationEnabled ? '#635332' : '#f4f3f4'}
              onValueChange={val => setMotivationEnabled(val)}
              value={motivationEnabled}
            />
          </View>

          {/* Sound */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#F5E9A9' }}
              thumbColor={soundEnabled ? '#635332' : '#f4f3f4'}
              onValueChange={val => setSoundEnabled(val)}
              value={soundEnabled}
            />
          </View>

          {/* Vibration */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#F5E9A9' }}
              thumbColor={vibrationEnabled ? '#635332' : '#f4f3f4'}
              onValueChange={val => setVibrationEnabled(val)}
              value={vibrationEnabled}
            />
          </View>
        </View>

        <View style={{ height: 150 }} />
        {/* Нижняя панель с тремя кнопками */}
        <View style={styles.bottomBar}>
          {/* Левая кнопка */}
          <TouchableOpacity style={styles.bottomButtonGear}>
            <Image
              source={require('../assets/gear.png')}
              style={styles.bottomIconGear}
            />
          </TouchableOpacity>

          {/* Центральная кнопка */}
          <TouchableOpacity
            style={styles.bottomButtonCenter}
            onPress={() => navigation.navigate('FocusTimerScreen')}
          >
            <Image
              source={require('../assets/play.png')}
              style={styles.bottomIconCenter}
            />
          </TouchableOpacity>

          {/* Правая кнопка */}
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('History')}>
            <Image
              source={require('../assets/timer.png')}
              style={styles.bottomIconSide}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== Модальное окно (оверлей) подтверждения сброса ===== */}
      {showResetConfirm && (
        <View style={styles.resetOverlay}>
          <View style={styles.resetCard}>
            {/* Иконка reset (можно использовать Image или Text) */}
            <Image
              source={require('../assets/refresh_big.png')} // или ваша иконка
              style={styles.resetIcon}
            />
            <Text style={styles.resetTitle}>
              Are you sure want{"\n"}to reset the settings to default?
            </Text>

            {/* Кнопка Cancel */}
            <TouchableOpacity
              style={styles.resetCancelButton}
              onPress={() => setShowResetConfirm(false)}
            >
              <Text style={styles.resetCancelText}>Cancel</Text>
            </TouchableOpacity>

            {/* Кнопка Reset */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetDefaults}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

// ===== Стили =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // чёрный фон
  },
  // ===== Хедер =====
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
    borderColor: '#F5E9A9',
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    width: 36,
    height: 36,
    tintColor: '#F5E9A9',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // ===== Заголовки и пр. =====
  timerSettingsHeader: {
    // Контейнер, в котором располагаем сам заголовок Timer Settings и уголок
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'NicoMoji-Regular',
    fontSize: 24,
    color: '#F5E9A9',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Nunito-VariableFont_wght',
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },

  // Уголок (refresh) + иконка
  cornerOverlay: {
    width: 45,
    height: 45,
   borderRadius:15,

    borderColor: '#F5E9A9',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12, // небольшой отступ от края
    marginBottom:-15,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerIcon: {
    left:1.5,
    color: '#635332',
    fontSize: 20,
  },

  settingsBlock: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPill: {
    width: 180,
    backgroundColor: '#212121',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftPillText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Nunito-VariableFont_wght',
  },
  rightBox: {
    width: 140,
    height: 50,
    backgroundColor: '#1D1D1D',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  minutesText: {
    fontSize: 18,
    color: '#F5E9A9',
    fontWeight: '600',
    fontFamily: 'Nunito-VariableFont_wght',
    width: 40,
    textAlign: 'center',
  },
  plusMinus: {
    fontSize: 20,
    color: '#F5E9A9',
    width: 20,
    textAlign: 'center',
  },

  // ===== App Settings =====
  appSettingsBox: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Nunito-VariableFont_wght',
  },

  // ===== Три кнопки внизу =====
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomButtonGear: {
    borderColor: '#2A2A2A',
    borderWidth: 1,
    top: 10,
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#F5E9A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconGear: {
    width: 30,
    height: 30,
    tintColor: '#2A2A2A',
  },
  bottomButtonCenter: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#2A2A2A', // Серый фон
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconCenter: {
    width: 40,
    height: 40,
    tintColor: '#F5E9A9', // Золотистая иконка
  },
  bottomButton: {
    borderColor: '#F5E9A9',
    borderWidth: 1,
    top: 10,
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconSide: {
    width: 30,
    height: 30,
    tintColor: '#F5E9A9',
  },

  // ===== Оверлей сброса настроек =====
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
    fontSize: 18,
    color: '#FFFFFF',
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
});
