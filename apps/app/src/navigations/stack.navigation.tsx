import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SignupScreen } from '../screens/Signup.screen';
import { AccountScreen } from '../screens/login.screen';
import { LevelScreen } from '../screens/levels.screen';
import { SubjectScreen } from '../screens/subject.screen';
import { ContentScreen } from '../screens/content.screen';
import { MainContentScreen } from '../screens/maincontent.screen';
import ProfilePage from '../screens/profile.screen';

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
      <Stack.Screen
        name="MainContent"
        component={MainContentScreen}
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: true }}
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Subjects"
        component={SubjectScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Contents"
        component={ContentScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MainContent"
        component={MainContentScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
