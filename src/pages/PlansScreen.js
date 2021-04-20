import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import haversine from 'haversine-distance';

import AppContext from '../contexts/AppContext';

import MContainer from '../components/MContainer';
import HeaderBar from '../components/HeaderBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Button from '../components/Button';

import PlanCard from '../components/PlanCard';

const PlansScreen = () => {
  const [, updateState] = React.useState();
  const [mountedPlans, setMountedPlans] = useState([]);
  const { servicesFound, userLocation, setSelectedPlan } = useContext(
    AppContext,
  );

  const navigation = useNavigation();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    const TVServices = [];
    const broadbandServices = [];
    const landlineServices = [];
    const addOnServices = [];
    const selectedServices = [];
    const allPlans = [];

    let id = 0;
    let price = 0;
    let distance = 0.0;
    let services = [];

    servicesFound.forEach(service => {
      if (service.type === 'TV') {
        TVServices.push(service);
      } else if (service.type === 'BROADBAND') {
        broadbandServices.push(service);
      } else if (service.type === 'LANDLINE') {
        landlineServices.push(service);
      } else if (service.type === 'ADDON') {
        addOnServices.push(service);
      }
    });

    addOnServices.forEach(addon => {
      selectedServices.push(addon);

      landlineServices.forEach(land => {
        selectedServices.push(land);

        broadbandServices.forEach(broad => {
          selectedServices.push(broad);

          TVServices.forEach(tv => {
            selectedServices.push(tv);

            id += 1;

            price = (
              selectedServices[3].price +
              selectedServices[2].price +
              selectedServices[1].price +
              selectedServices[0].price
            ).toFixed(2);

            const points = [];

            points.push(
              [userLocation.latitude, userLocation.longitude],
              [selectedServices[0].coords.lat, selectedServices[0].coords.lon],
              [selectedServices[1].coords.lat, selectedServices[1].coords.lon],
              [selectedServices[2].coords.lat, selectedServices[2].coords.lon],
              [selectedServices[3].coords.lat, selectedServices[3].coords.lon],
            );

            distance += haversine(points[0], points[1]);
            distance += haversine(points[1], points[2]);
            distance += haversine(points[2], points[3]);
            distance += haversine(points[3], points[4]);
            distance /= 100;
            distance = distance.toFixed(2);

            services.push(selectedServices[0]);
            services.push(selectedServices[1]);
            services.push(selectedServices[2]);
            services.push(selectedServices[3]);

            const newPlan = {
              id,
              price,
              distance,
              services,
              servicesNames: `${selectedServices[3].name} + ${selectedServices[2].name} + ${selectedServices[1].name} + ${selectedServices[0].name}`,
            };
            allPlans.push(newPlan);
            // eslint-disable-next-line no-shadow
            setMountedPlans(mountedPlans => [...mountedPlans, newPlan]);
            price = 0;
            distance = 0;
            services = [];
            selectedServices.pop();
          });
          selectedServices.pop();
        });
        selectedServices.pop();
      });
      selectedServices.pop();
    });
  }, [servicesFound]);

  const handleOrderByPrice = () => {
    const priceOrdered = mountedPlans.sort((a, b) => {
      return a.price - b.price;
    });
    setMountedPlans(priceOrdered);
    forceUpdate();
  };

  const handleOrderByDistance = () => {
    const distanceOrdered = mountedPlans.sort((a, b) => {
      return a.distance - b.distance;
    });
    setMountedPlans(distanceOrdered);
    forceUpdate();
  };

  function handlePlanSelect(item) {
    console.log(item);
    setSelectedPlan(item);
    navigation.navigate('MapScreen');
  }

  const renderItem = ({ item }) => (
    <PlanCard item={item} onPress={() => handlePlanSelect(item)} />
  );

  return (
    <MContainer>
      <HeaderBar style={styles.header}>Planos Encontrados</HeaderBar>

      <PageContent>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.8,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              style={styles.orderByPrice}
              onPress={handleOrderByPrice}
            >
              <Text>Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderByDistance}
              onPress={handleOrderByDistance}
            >
              <Text>Distância</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8, marginVertical: 10 }}>
            <FlatList
              data={mountedPlans}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>

          <Button
            style={styles.searchButton}
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </View>
      </PageContent>

      <Footer style={styles.footer} />
    </MContainer>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  orderByPrice: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '40%',
    backgroundColor: '#00A5D9',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000000',
  },
  orderByDistance: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '40%',
    backgroundColor: '#00A5D9',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000000',
  },

  adressInputContainer: {
    width: '100%',
    height: '12%',
    backgroundColor: '#F4FDFF',

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
    width: '70%',
    alignSelf: 'flex-start',
  },
  useLocationText: {
    fontSize: 16,
    color: '#000000',
  },
});
