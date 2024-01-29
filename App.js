"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// App.js
import React, {useEffect} from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './components/Home';
import Setting from './components/Setting';
import Favorite from './components/Favorite';


import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons'
import { TemperatureProvider } from './components/TemperatureContext';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <TemperatureProvider>
  
    <NavigationContainer>
      <Tab.Navigator
        activeColor="white"
        barStyle={{ backgroundColor: 'tomato' }}>
        <Tab.Screen name='WEATHER BUG' component={Home} initialParams={{ city: "london" }} options={{
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 14,
                color:'black',
                fontWeight: 'bold',
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: () => {
            return (
              <Image
                source={require('./components/Images/Home.png')}
                style={{ width: 30, height: 30 }}
              />
            )
          }
        }} />
        
        <Tab.Screen name='Favorite' component={Favorite} options={{
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              Favorite
            </Text>
          ),
          tabBarIcon: () => {
            return (
              <Image
                source={require('./components/Images/fvaorite.png')}
                style={{ width: 35, height: 35 }}
              />
            )
          }
        }} />
        <Tab.Screen name='Setting' component={Setting} options={{
          tabBarLabel: () => (
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              Setting
            </Text>
          ),
          tabBarIcon: () => {
            return (
              <Image
                source={require('./components/Images/SettingIcon.png')}
                style={{ width: 30, height: 30 }}
              />
            )
          }
        }} />
      </Tab.Navigator>
    </NavigationContainer>
    </TemperatureProvider>
    
  )
}

export default App;

