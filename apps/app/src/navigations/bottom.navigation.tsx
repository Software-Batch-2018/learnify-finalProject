import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen } from '../screens/AccountScreen';
import MainStackNavigator from './stack.navigation';
import CoursesScreen from '../screens/courses.screen';
import BlogScreen from '../screens/blog.screen';

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
          component={CoursesScreen}
        />

        <Tab.Screen
          options={{
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
          component={AccountScreen}
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
          component={BlogScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
