import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Share,
} from 'react-native';

const sessionsData = [
  {
    id: 1,
    date: '12/04/2024',
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  {
    id: 2,
    date: '13/04/2024',
    work: 30,
    shortBreak: 5,
    longBreak: 15,
  },
  {
    id: 3,
    date: '14/04/2024',
    work: 20,
    shortBreak: 5,
    longBreak: 10,
  },
];

export default function History({ navigation, route }) {
  const [history, setHistory] = useState(sessionsData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (route.params?.newSession) {
      setHistory(prev => [...prev, route.params.newSession]);
    }
  }, [route.params?.newSession]);

  // Удаление всей истории
  const handleDeleteHistory = () => {
    setHistory([]);
    setShowDeleteConfirm(false);
  };

  // Функция для шаринга сессии
  const shareSession = async (session) => {
    try {
      const message = `Session Log:
Date: ${session.date}
Work: ${session.work} min
Short break: ${session.shortBreak} min
Long break: ${session.longBreak} min`;
      await Share.share({ message });
    } catch (error) {
      console.log('Error sharing session:', error);
    }
  };

  // Рендер карточки сессии
  const renderSessionCard = (session) => (
    <View key={session.id} style={styles.statsCard}>
      <Text style={styles.dateText}>{session.date}</Text>
      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Work:</Text>
        <Text style={styles.statValue}>{session.work}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Short break:</Text>
        <Text style={styles.statValue}>{session.shortBreak}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statLabel}>Long break:</Text>
        <Text style={styles.statValue}>{session.longBreak}</Text>
      </View>
      {/* При нажатии на Repeat session передаём данные выбранной сессии */}
      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => navigation.navigate('FocusTimerScreen', { sessionData: session })}
      >
        <Text style={styles.statsButtonText}>Repeat session</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => shareSession(session)}
      >
        <Text style={styles.statsButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Заголовок */}
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>Sessions log:</Text>
        <TouchableOpacity style={styles.trashButton} onPress={() => setShowDeleteConfirm(true)}>
          <Image
            source={require('../assets/trash.png')}
            style={styles.trashIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Список сессий */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {history.map((session) => renderSessionCard(session))}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomButtonGear} onPress={() => navigation.navigate('Settings')}>
            <Image
              source={require('../assets/gear.png')}
              style={styles.bottomIconGear}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonCenter} onPress={() => navigation.navigate('FocusTimerScreen')}>
            <Image
              source={require('../assets/play.png')}
              style={styles.bottomIconCenter}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonTimer}>
            <Image
              source={require('../assets/timer.png')}
              style={styles.bottomIconTimer}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Модальное окно для подтверждения удаления */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.deleteOverlay}>
          <View style={styles.deleteCard}>
            <Image
              source={require('../assets/trash.png')}
              style={styles.deleteIcon}
              resizeMode="contain"
            />
            <Text style={styles.deleteTitle}>
              Are you sure want{"\n"}to delete the sessions history?
            </Text>
            <TouchableOpacity style={styles.deleteCancelButton} onPress={() => setShowDeleteConfirm(false)}>
              <Text style={styles.deleteCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHistory}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // Header styles
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
  infoIcon: { width: 36, height: 36, tintColor: '#F5E9A9' },
  // Title row styles
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  titleText: { fontFamily: 'NicoMoji-Regular', fontSize: 24, color: '#fff' },
  trashButton: { padding: 10 },
  trashIcon: { width: 36, height: 36, tintColor: '#FF0000' },
  // Session card (StatsCard) styles
  statsCard: {
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    padding: 20,
    marginBottom: 20,
  },
  dateText: { color: '#909090', fontSize: 14, marginBottom: 10, fontFamily: 'Nunito-VariableFont_wght' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  statLabel: { color: '#fff', fontSize: 16, fontFamily: 'Nunito-VariableFont_wght' },
  statValue: { color: '#F5E9A9', fontSize: 16, fontFamily: 'Nunito-VariableFont_wght', fontWeight: '600' },
  statsButton: { backgroundColor: '#F5E9A9', borderRadius: 12, marginTop: 16, paddingVertical: 14, alignItems: 'center' },
  statsButtonText: { color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'Nunito-VariableFont_wght' },
  // Delete modal styles
  deleteOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  deleteCard: {
    width: 300,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5E9A9',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  deleteIcon: { width: 50, height: 50, tintColor: '#FF0000', marginBottom: 20 },
  deleteTitle: { fontFamily: 'NicoMoji-Regular', fontSize: 19, color: '#fff', textAlign: 'center', marginBottom: 24 },
  deleteCancelButton: { backgroundColor: '#F5E9A9', borderRadius: 12, paddingHorizontal: 80, paddingVertical: 12, marginBottom: 12 },
  deleteCancelText: { fontSize: 16, color: '#000', fontWeight: '600' },
  deleteButton: { backgroundColor: '#2A2A2A', borderRadius: 12, borderWidth: 1, borderColor: '#FFFFFF', paddingHorizontal: 80, paddingVertical: 12 },
  deleteButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  // Bottom bar styles
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  // Left bottom button (Gear)
  bottomButtonGear: {
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
  bottomIconGear: { width: 30, height: 30, tintColor: '#F5E9A9' },
  // Center bottom button (Play)
  bottomButtonCenter: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomIconCenter: { width: 40, height: 40, tintColor: '#F5E9A9' },
  // Right bottom button (Timer)
  bottomButtonTimer: {
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
  bottomIconTimer: { width: 30, height: 30, tintColor: '#2A2A2A' },
});
