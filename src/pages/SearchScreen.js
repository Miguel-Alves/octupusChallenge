import React, { useEffect, useContext } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../services/api';
import AppContext from '../contexts/AppContext';

import MContainer from '../components/MContainer';
import HeaderBar from '../components/HeaderBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Button from '../components/Button';

const SearchScreen = () => {
  const { userLocation, locationGranted, setServicesFound } = useContext(
    AppContext,
  );
  const navigation = useNavigation();

  useEffect(() => {});

  async function useMyLocation() {
    await api
      .get(
        `/api/options?lat=${userLocation.latitude}&lon=${userLocation.longitude}`,
      )
      .then(response => {
        const services = response.data.list;
        setServicesFound(services);
        navigation.navigate('PlansScreen');
      })
      .catch(error => {
        if (error.response) {
          Alert.alert('Desculpe! Verifique sua localização e tente novamente!');
        } else {
          Alert.alert(
            'Desculpe! Estamos passando por problemas. Tente novamente mais tarde.',
          );
        }
      });
  }

  return (
    <MContainer>
      <HeaderBar style={styles.header}>Buscar planos por endereço</HeaderBar>

      <PageContent>
        <View style={styles.container}>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.adressInputContainer}>
              <TextInput
                style={styles.adressInput}
                placeholder="Insira sua localização"
              />
            </View>
            {locationGranted ? (
              <TouchableOpacity
                style={styles.useLocation}
                onPress={useMyLocation}
              >
                <Text style={styles.useLocationText}>
                  Usar Localização Atual
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                {Alert.alert(
                  'Por favor, reinicie a aplicação e nos dê permissão de usar a localização',
                )}
              </>
            )}
          </View>

          <Button onPress={() => navigation.goBack()}>Voltar</Button>
        </View>
      </PageContent>

      <Footer style={styles.footer} />
    </MContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  adressInputContainer: {
    width: '100%',
    height: '12%',
    backgroundColor: '#FAFAFA',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#03045E',
    marginBottom: 15,
  },
  adressInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    marginHorizontal: 10,
  },
  useLocation: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  useLocationText: {
    fontSize: 20,
    color: '#000000',
    backgroundColor: '#A4FAFF',
  },
});
