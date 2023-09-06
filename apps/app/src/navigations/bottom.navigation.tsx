import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import React from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Feather,
} from '@expo/vector-icons';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarHideOnKeyboard: true,
                  tabBarStyle: {
                    backgroundColor: 'white',
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
                          top: Platform.OS === 'ios' ? 0 : 0,
                        }}
                      >
                        <Icon
                          size={29}
                          as={<AntDesign name="home" />}
                          color={focused ? 'emerald.600' : '#5d606599'}
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
                          size={29}
                          as={<Ionicons name="book-outline" />}
                          color={focused ? 'emerald.600' : '#5d606599'}
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
                          top: Platform.OS === 'ios' ? 0 : 0,
                          width: 50,
                          height: 50,
                          borderColor: '#5d606599',
                          borderRadius: 50,
                          backgroundColor: focused ? '#366735d5' : '#5d606599',
                        }}
                      >
                        <Icon
                          name="pluscircle"
                          mt={2.5}
                          ml={2.5}
                          as={<MaterialCommunityIcons name="forum-outline" />}
                          size={29}
                          color="white"
                        />
                      </View>
                    ),
                    headerShown: false,
                    tabBarIconStyle: {},
                  }}
                />

                <Tab.Screen
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View
                        style={{
                          top: Platform.OS === 'ios' ? 0 : 0,
                        }}
                      >
                        <Icon
                          size={29}
                          as={<Feather name="user" />}
                          color={focused ? 'emerald.600' : '#5d606599'}
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
                          top: Platform.OS === 'ios' ? 0 : 0,
                        }}
                      >
                        <Icon
                          size={29}
                          as={<Ionicons name="reader-outline" />}
                          color={focused ? 'emerald.600' : '#5d606599'}
                        />
                      </View>
                    ),
                    headerShown: false,
                  }}
                  name="Blogs"
                  component={BlogScreen}
                />
              </Tab.Navigator>
            </View>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </>
  );
}
