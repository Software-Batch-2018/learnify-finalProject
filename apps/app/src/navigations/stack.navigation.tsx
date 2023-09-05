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
import UserQuizHistory from '../screens/quizhistory.screen';
import ForumScreen from '../screens/forum.screen';
import ForumRepliesScreen from '../screens/forum.replies.screen';
import { AuthProvider } from '../components/AuthProvider';

const Stack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
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

export function ForumStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ForumHome"
        component={ForumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForumReply"
        component={ForumRepliesScreen}
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
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizHistory"
        component={UserQuizHistory}
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
      <Stack.Screen
        name="Contents"
        component={ContentScreen}
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
