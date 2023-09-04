import { NavigationContainer } from '@react-navigation/native';
import { Box, Icon } from 'native-base';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AccountStackNavigator,
  CoursesStackNavigator,
  ForumStackNavigator,
  MainStackNavigator,
} from './stack.navigation';

import { Platform, View } from 'react-native';
import BlogScreen from '../screens/blog.screen';
import { AuthProvider } from '../components/AuthProvider';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarHideOnKeyboard: true,
              tabBarStyle: {
                backgroundColor: '#301E67',
                height: 60,
              },
              tabBarShowLabel: false,
              headerShown: false,
            })}
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}
                  >
                    <Icon
                      size={30}
                      as={<MaterialIcons name="home" />}
                      color={focused ? 'white' : '#9594e5'}
                    />
                  </View>
                ),
                headerShown: false,
              }}
              name="Home"
              component={MainStackNavigator}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}
                  >
                    <Icon
                      size={30}
                      as={<MaterialIcons name="library-books" />}
                      color={focused ? 'white' : '#9594e5'}
                    />
                  </View>
                ),
              }}
              name="Courses"
              component={CoursesStackNavigator}
            />

            <Tab.Screen
              name="Forum"
              component={ForumStackNavigator}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? -10 : -20,
                      width: Platform.OS === 'ios' ? 50 : 50,
                      height: Platform.OS === 'ios' ? 50 : 50,
                      borderRadius: Platform.OS === 'ios' ? 25 : 30,
                      backgroundColor: 'white',
                      shadowColor: 'black',
                    }}
                  >
                    <Icon
                      name="pluscircle"
                      mt={3}
                      ml={3}
                      as={<MaterialIcons name="forum" />}
                      size={Platform.OS === 'ios' ? 7 : 7}
                      color={focused ? 'green.600' : 'blue.400'}
                    />
                  </View>
                ),
                headerShown: true,
                tabBarIconStyle: {},
              }}
            />

            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}
                  >
                    <Icon
                      size={30}
                      as={<MaterialIcons name="account-circle" />}
                      color={focused ? 'white' : '#9594e5'}
                    />
                  </View>
                ),
              }}
              name="Account"
              component={AccountStackNavigator}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}
                  >
                    <Icon
                      size={30}
                      as={<MaterialIcons name="collections-bookmark" />}
                      color={focused ? 'white' : '#9594e5'}
                    />
                  </View>
                ),
                headerShown: true,
              }}
              name="Blogs"
              component={BlogScreen}
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}
