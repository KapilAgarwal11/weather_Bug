import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Title, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCities, fetchWeatherData } from './API';


export default Search = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedFavoriteCity, setSelectedFavoriteCity] = useState(null);
    


    useEffect(() => {
        loadFavorites();
    }, []);



    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };



    const saveFavorites = async (updatedFavorites) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };



    const addToFavorites = (selectedCity) => {
        const updatedFavorites = [...favorites, selectedCity];
        saveFavorites(updatedFavorites);
    };



    const removeFromFavorites = (selectedCity) => {
        const updatedFavorites = favorites.filter(city => city.name !== selectedCity.name);
        saveFavorites(updatedFavorites);
    };

    const fetchWeather = async (selectedCity) => {
        await fetchWeatherData(selectedCity, setWeatherData);
    };


    const renderCityItem = (item, isFavorite) => (
        <Card style={{ margin: 2, padding: 12, backgroundColor: 'mistyrose' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>{item.name}</Text>
            <Button
                onPress={() => {
                    if (isFavorite) {
                        removeFromFavorites(item);
                        
                        setShowDetails(false);
                    } else {
                        addToFavorites(item);
                        setSelectedCity(item.name);
                        
                        setSelectedFavoriteCity(item.name);
                        fetchWeatherData(item.name);
                        
                        setShowDetails(true);
                    }
                }}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            {isFavorite && (
                <Button
                    onPress={() => {
                       
                        if (selectedFavoriteCity === item.name) {
                            setSelectedFavoriteCity(null);
                            setShowDetails(false);
                        } else {
                            setSelectedFavoriteCity(item.name);
                            setShowDetails(true);
                            
                            fetchWeather(item.name);

                        }
                    }}
                >
                    View Weather
                </Button>
            )}
        </Card>
    );




    const fetchCityData = async (text) => {
        await fetchCities(text, setCity, setCities);
    };

    const renderWeatherDetails = () => (
        showDetails && selectedFavoriteCity && (
            <Card style={{ borderRadius: 10, margin: 10, padding: 15, backgroundColor: '#f9f9f9', elevation: 4 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>Weather Details for {selectedFavoriteCity}</Text>
                {weatherData && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <DetailItem label="Temperature" value={weatherData.temp} color="#FFD2B7" image={require('./Images/tempertaure.png')} />
                        <DetailItem label="Humidity" value={weatherData.humidity} color="#B7FFD2" image={require('./Images/humidity.png')} />
                        <DetailItem label="Description" value={weatherData.desc} color="#B7D2FF" image={require('./Images/desc.png')} />
                        <DetailItem label="Pressure" value={weatherData.pressure} color="#FFD2B7" image={require('./Images/pressure.png')} />
                        <DetailItem label="Precipitation" value={weatherData.precipitation} color="#B7FFD2" image={require('./Images/preci.png')} />
                        <DetailItem label="Wind Speed" value={weatherData.Wind_Speed} color="#B7D2FF" image={require('./Images/wind.png')} />
                    </View>
                )}
            </Card>
        )
    );

    const DetailItem = ({ label, value, color, image }) => (
        <View style={{ width: '48%', marginBottom: 10 }}>
            <Card style={{ backgroundColor: color, padding: 10, borderRadius: 8 }}>
                
                <Image source={image} style={{ width: 30, height: 30, marginBottom: 5 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{label}</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{value}</Text>
            </Card>
        </View>
    );





    return (
        <ImageBackground
            source={require('./Images/cloud_image.webp')}
            style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <TextInput
                        label="City Name"
                        theme={{ colors: { primary: '#3498db' } }}
                        value={city}
                        onChangeText={(text) => fetchCities(text)}
                        style={{ backgroundColor: 'white', borderRadius: 5, margin: 4, padding: 4, fontWeight:'bold' }}
                        
                    />

                    <View>

                        <FlatList
                            data={cities}
                            renderItem={({ item }) => {
                                const isFavorite = favorites.some(favoriteCity => favoriteCity.name === item.name);
                                return renderCityItem(item, isFavorite);
                            }}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                    {weatherData && renderWeatherDetails()}
                    <Card style={{ borderRadius: 100, backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 120, padding: 5, borderRadius: 50 }}>Favorites: <Image source={require('./Images/fav.png')} style={{ width: 30, height: 30, marginBottom: 10 }} /></Text>
                        <FlatList
                            data={favorites}
                            renderItem={({ item }) => renderCityItem(item, true)}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </Card>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};
