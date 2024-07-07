import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StockDetailScreen from './screens/StockDetailScreen';
import ExploreScreen from './screens/ExploreScreen';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator  screenOptions={() => ({
          headerShown: false,
        })} initialRouteName="Explore">
          <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ title: 'Stocks App' }}
        />
        <Stack.Screen
          name="StockDetail"
          component={StockDetailScreen}
          initialParams={{ stockTicker: 'AAPL' }} // Default stock ticker for demonstration
          options={{ title: 'Details Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
