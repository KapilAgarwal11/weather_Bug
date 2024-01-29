import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { View, Text, FlatList, Image, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { useTemperatureContext } from './TemperatureContext';
import { useNavigation } from '@react-navigation/native';
import { getWeatherData } from './API';
const Home = (props) => {
    const { isCelsius } = useTemperatureContext();

    const [info, setInfo] = useState({
        name: ' ',
        temp: "Loading...",
        humidity: "Loading...",
        desc: "Loading...",
        icon: 'loading',
        pressure: "Loading...",
        precipitation: "Loading...",
        Wind_Speed: "Loading..."
    });
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        getLocationAndWeather();
    }, [isCelsius]);

    const getLocationAndWeather = async () => {
        try {
            const position = await Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherData(latitude, longitude);
                },
                (error) => {
                    console.log(error);
                    throw new Error('Error getting location. Please check your device settings.');
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } catch (error) {
            alert(error.message);
        }
    };


    const fetchData = async (latitude, longitude) => {
        await getWeatherData(latitude, longitude, isCelsius, setInfo, setForecast);
    };

   
    const renderInfoCard = (label, value, backgroundColor, imageSource) => (
        
        <Card style={{ flex: 1, margin: 5, padding: 10, backgroundColor, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={imageSource} style={{ width: 30, height: 30, marginRight: 10 }} />
            <View>
                <Title style={{ color: 'black', fontSize: 18, fontWeight:'bold'}}>{label}</Title>
                <Text style={{ color: 'black', fontSize: 16, fontWeight:'bold' }}>{value}</Text>
            </View>
        </Card>
    );
    const renderForecastItem = ({ item }) => (
        <Card style={{ flex: 1, margin: 2, padding: 5, alignItems: 'center', backgroundColor: "oldlace" }}>
            <Title style={{ color: 'black', fontSize: 10, fontWeight:'bold' }}>{item.date}</Title>
            <Image source={{ uri: `http:${item.day.condition.icon}` }} style={{ width: 30, height: 30, marginBottom: 4 }} />
            <Text style={{ color: 'black', fontSize: 16, fontWeight:'bold' }}>{item.day.maxtemp_c} °C</Text>
        </Card>
    );
    return (
        <ImageBackground
            source={require('./Images/back.jpg')}
            style={{ flex: 1 }}>
            <ScrollView>
                <Card style={{ margin: 10, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('./Images/location.png')} style={{ width: 30, height: 30, marginLeft: 30 }} />
                    <Title style={{ color: 'white', fontSize: 30, fontWeight:'bold' }}>{info.name}</Title>
                </Card>

                <FlatList
                    data={[
                        { label: 'Temperature', value: info.temp, backgroundColor: 'lightblue', imageSource: require('./Images/tempertaure.png') },
                        { label: 'Humidity', value: info.humidity, backgroundColor: 'lightgreen', imageSource: require('./Images/humidity.png') },
                        { label: 'Precipitation', value: info.precipitation, backgroundColor: 'lightcoral', imageSource: require('./Images/preci.png') },
                        { label: 'Pressure', value: info.pressure, backgroundColor: 'lightyellow', imageSource: require('./Images/pressure.png') },
                        { label: 'Description', value: info.desc, backgroundColor: 'lightgray', imageSource: require('./Images/desc.png') },
                        { label: 'SSW Wind', value: info.Wind_Speed, backgroundColor: 'lightpink', imageSource: require('./Images/wind.png') },
                    ]}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => renderInfoCard(item.label, item.value, item.backgroundColor, item.imageSource)}
                />
                <Card style={{ flex: 1, color: 'white', fontSize: 30, margin: 10, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <Title style={{ color: 'white', fontWeight:'bold' , fontSize:25}}>7-Day Weather Forecast</Title>
                </Card>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        horizontal
                        data={forecast}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderForecastItem}
                    />
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    );
};

export default Home;

