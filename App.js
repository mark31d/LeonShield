// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loader from './Components/Loader';
import Start from './Components/Start';
import FocusTimerScreen from './Components/FocusTimerScreen';
import Info from './Components/Info';
import Settings from './Components/Settings';
import { SettingsProvider } from './Components/SettingsContext';
import History from'./Components/History';
const Stack = createStackNavigator();

export default function App() {
  const [loaderEnded, setLoaderEnded] = useState(false);

  return (
    <SettingsProvider>
      <NavigationContainer>
        {!loaderEnded ? (
          <Loader onEnd={() => setLoaderEnded(true)} />
        ) : (
          <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="FocusTimerScreen" component={FocusTimerScreen} />
            <Stack.Screen name="Info" component={Info} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="History" component={History} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SettingsProvider>
  );
}
