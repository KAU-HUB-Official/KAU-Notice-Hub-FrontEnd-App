import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ChatbotScreen from "./src/screens/ChatbotScreen";
import Homescreen from "./src/screens/Homescreen";
import NoticeDetailTab from "./src/screens/NoticeDetailTab";
import SearchresultScreen from "./src/screens/SearchresultScreen";
import SplashScreen from "./src/screens/SplashScreen";

export type RootStackParamList = {
  SplashScreen: undefined;
  Homescreen: undefined;
  ChatbotScreen : undefined;
  NoticeDetailTab: undefined;
  SearchresultScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="NoticeDetailTab" component={NoticeDetailTab} />
        <Stack.Screen name="SearchresultScreen" component={SearchresultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}