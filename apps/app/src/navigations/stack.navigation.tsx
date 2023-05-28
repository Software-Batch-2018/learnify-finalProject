import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SignupScreen } from '../screens/Signup.screen';
import { AccountScreen } from '../screens/login.screen';
import { LevelScreen } from '../screens/levels.screen';
import { SubjectScreen } from '../screens/subject.screen';

const Stack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function AccountStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function CoursesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Levels"
        component={LevelScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subjects"
        component={SubjectScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
