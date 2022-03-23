import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './Source/Screens/LoginPage';
import ListOfBooks from './Source/Screens/ListOfBooks';
import PurchaseScreen from './Source/Screens/PurchaseScreen';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';



const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#398',
    accent: '#f2575b',
  },
};



const MyStack = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator 
  >
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
          options={{
           headerShown: false }}
        />
        <Stack.Screen
          name="ListOfBooks"
          component={ListOfBooks}
          options={{
            headerShown: false }}
        />
        <Stack.Screen
          name="PurchaseScreen"
          component={PurchaseScreen}
          options={{
            headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <MyStack />
    </PaperProvider>
    );
};

