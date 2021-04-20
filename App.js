import React, { useState, useEffect } from 'react';

import AppContext from './src/contexts/AppContext';
import AppRoutes from './src/routes/index';

export default function App() {

  const [userLocation, setUserLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [locationGranted, setLocationGranted] = useState(false);
  const [ userPlan, setUserPlan ] = useState({
    name: 'Pacote X',
    servicesNames: '',
    services: [],
    distance: 0.0,
    price: 0.0,
  });
  const [selectedPlan, setSelectedPlan] = useState({});
  const [servicesFound, setServicesFound] = useState([]);


  useEffect(() => {
    setUserPlan(selectedPlan);
  }, [selectedPlan]);

  return (
    <AppContext.Provider 
      value={{
        userLocation,
        setUserLocation, 
        locationGranted,
        setLocationGranted,
        userPlan, 
        setUserPlan,
        servicesFound,
        setServicesFound,
        selectedPlan,
        setSelectedPlan,        
      }}
    >
      <AppRoutes /> 
    </AppContext.Provider>
  );

  
}