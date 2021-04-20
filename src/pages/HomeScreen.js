import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import MContainer from '../components/MContainer';
import HeaderBar from '../components/HeaderBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Button from '../components/Button';
import AppContext from '../contexts/AppContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    userPlan,
    userLocation,
    setUserLocation,
    locationGranted,
    setLocationGranted,
  } = useContext(AppContext);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    if (locationGranted !== true) {
      askUserLocation();
    } else if (userLocation.latitude === 0) {
      updateUserLocation();
    }
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [userPlan]);

  async function askUserLocation() {
    if (locationGranted === true && userLocation.latitude === 0) {
      updateUserLocation();
    } else if (locationGranted !== true) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationGranted(false);
      } else {
        setLocationGranted(true);
        updateUserLocation();
      }
    }
  }

  async function updateUserLocation() {
    const retrievedLocation = await Location.getCurrentPositionAsync({});
    const formatedLocation = {
      latitude: retrievedLocation.coords.latitude,
      longitude: retrievedLocation.coords.longitude,
    };
    setUserLocation(formatedLocation);
  }

  async function handleSearchButton() {
    navigation.navigate('SearchScreen');
    // console.log(userPlan);
  }

  return (
    <MContainer>
      <HeaderBar style={styles.header}>Meu Plano</HeaderBar>

      <PageContent>
        <View style={styles.contentContainer}>
          <View style={styles.myPlanContainer}>
            <View style={{ flex: 2 }}>
              <Text style={styles.myPlanText}>Plano Não selecionado</Text>
              <Text style={styles.myPlanText}>
                Navegue até o final da aplicação para selecionar um plano
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.myPlanText}>R$ 0,0</Text>
              <Text style={styles.myPlanText}>0 Km</Text>
            </View>
          </View>
          <Button onPress={() => handleSearchButton()}>Buscar Plano</Button>
        </View>
      </PageContent>

      <Footer style={styles.footer} />
    </MContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myPlanContainer: {
    flex: 0.4,
    width: '100%',
    backgroundColor: '#F4FDFF',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  myPlanText: {
    margin: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    textAlign: 'left',
  },
  myPlanText1: {
    marginHorizontal: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    backgroundColor: '#fdafaf',
  },
});
