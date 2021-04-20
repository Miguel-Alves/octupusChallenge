import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import AppContext from '../contexts/AppContext';

import MContainer from '../components/MContainer';
import HeaderBar from '../components/HeaderBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';

const MapScreen = () => {
  const navigation = useNavigation();
  const { selectedPlan, userLocation } = useContext(AppContext);

  const markers = [
    {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      title: 'Você',
    },
    {
      latitude: selectedPlan.services[0].coords.lat,
      longitude: selectedPlan.services[0].coords.lon,
      title: 'TV',
    },
    {
      latitude: selectedPlan.services[1].coords.lat,
      longitude: selectedPlan.services[1].coords.lon,
      title: 'INTERNET',
    },
    {
      latitude: selectedPlan.services[2].coords.lat,
      longitude: selectedPlan.services[2].coords.lon,
      title: 'TELEFONE',
    },
    {
      latitude: selectedPlan.services[3].coords.lat,
      longitude: selectedPlan.services[3].coords.lon,
      title: 'ADICIONAL',
    },
  ];

  function handleAceptPlan() {
    Alert.alert(
      'Gostou da aplicação, quer ver ela mais próxima do protótipo?!',
      'Dê uma chance para este Dev Júnior! haha',
    );
    navigation.navigate('HomeScreen');
  }

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <MContainer>
      <HeaderBar style={styles.header}>Pontos do Plano</HeaderBar>

      <PageContent>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>Plano {selectedPlan.id}</Text>
              <Text>R$ {selectedPlan.price}</Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 0.95 }}>
                <Text>{selectedPlan.servicesNames}</Text>
              </View>
              <Text>{selectedPlan.distance} Km</Text>
            </View>
          </View>

          <View
            style={{
              flex: 3.5,
              width: '90%',
              alignItems: 'center',
              borderWidth: 1,
            }}
          >
            <MapView
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.4,
                longitudeDelta: 0.4,
              }}
              style={styles.map}
            >
              {markers.map(marker => (
                <Marker
                  key={marker.title}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                />
              ))}
            </MapView>
          </View>

          <View
            style={{
              flex: 2,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flex: 1.5,
                backgroundColor: '#F4FDFF',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 5,
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Clique nos marcadores, eles indicarão a que serviço se referem
              </Text>
              <Text style={{ textAlign: 'center' }}>
                Você também pode movimentar o mapa conforme sua necessidade. É
                só arrastar!
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <TouchableOpacity
                style={styles.goBack}
                onPress={() => handleGoBack()}
              >
                <Text>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.choosePlan}
                onPress={() => handleAceptPlan()}
              >
                <Text>Aceitar Plano</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PageContent>

      <Footer style={styles.footer} />
    </MContainer>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },
  goBack: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '40%',
    backgroundColor: '#00A5D9',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000000',
  },
  choosePlan: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '40%',
    backgroundColor: '#00D957',

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
  },
});
