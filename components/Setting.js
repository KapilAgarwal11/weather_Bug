import React, { useState } from 'react';
import { View, Button, Text, Switch, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import { useTemperatureContext } from './TemperatureContext';
const Setting = () => {
    const [showAboutDetails, setShowAboutDetails] = useState(false);


    const { isCelsius, toggleTemperatureUnit } = useTemperatureContext();

    const toggleAboutDetails = () => {
        setShowAboutDetails((prevValue) => !prevValue);
    };

    return (
        <ImageBackground
            source={require('./Images/ranibow.webp')}
            style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            <TouchableRipple onPress={toggleAboutDetails}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.settingLabel}>About Weather</Text>
                    </Card.Content>
                </Card>
            </TouchableRipple>

            {showAboutDetails && (
                <Card style={[styles.card, styles.aboutDetails]}>
                    <Card.Content>
                        <Text style={styles.aboutText}>
                            Weather is the state of the atmosphere, describing for example the degree to
                            which it is hot or cold, wet or dry, calm or stormy, clear or cloudy.[1] On Earth,
                            most weather phenomena occur in the lowest layer of the planet's atmosphere, the
                            troposphere,[2][3] just below the stratosphere. Weather refers to day-to-day temperature,
                            precipitation, and other atmospheric conditions, whereas climate is the term for the averaging
                            of atmospheric conditions over longer periods of time.[4] When used without qualification,
                            "weather" is generally understood to mean the weather of Earth.
                        </Text>
                    </Card.Content>
                </Card>
            )}

                <Card style={styles.settingItem}>
                    <Text style={styles.settingTemp}>Temperature Unit</Text>
                    <Button
                        title={` ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
                        onPress={toggleTemperatureUnit}
                    />
                </Card>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2196F3',
    },
    settingItem: {
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5,
        backgroundColor:"linen"
    },
    settingLabel: {
        fontSize: 18,
        marginBottom: 8,
        color: 'black',
    },
    settingTemp: {
        fontSize: 18,
        marginBottom: 8,
        color: 'black',
        marginLeft:8
    },
    card: {
        marginBottom: 20,
        backgroundColor: 'lavender'
    },
    aboutDetails: {
        marginTop: 10,
    },
    aboutText: {
        fontSize: 16,
        color: 'black',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    unitText: {
        fontSize: 18,
        color: 'black',
        marginLeft:4
    },
    unitFare: {
        fontSize: 18,
        color: 'black',
        marginRight:7
    },
});

export default Setting;



