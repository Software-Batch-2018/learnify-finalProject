import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AccountStackNavigator,
  BlogStackNavigator,
  CoursesStackNavigator,
  MainStackNavigator,
} from './stack.navigation';
import BlogScreen from '../screens/blog.screen';
import ForumScreen from '../screens/forum.screen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Icon
                mt="1"
                as={<MaterialIcons name="home" />}
                color="gray.500"
                size="lg"
              />
            ),
          }}
          name="Home"
          component={MainStackNavigator}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Icon
                mt="1"
                as={<MaterialIcons name="library-books" />}
                color="gray.500"
                size="lg"
              />
            ),
          }}
          name="Courses"
          component={CoursesStackNavigator}
        />

        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Icon
                mt="1"
                as={<MaterialIcons name="account-circle" />}
                color="gray.500"
                size="lg"
              />
            ),
          }}
          name="Account"
          component={AccountStackNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Icon
                mt="1"
                as={<MaterialIcons name="collections-bookmark" />}
                color="gray.500"
                size="lg"
              />
            ),
          }}
          name="Blogs"
          component={BlogStackNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
