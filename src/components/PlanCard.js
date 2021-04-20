/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlanCard = props => {
  const { onPress, item } = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: '95%',
        backgroundColor: '#F4FDFF',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#03045E',
        margin: 5,
      }}
      onPress={onPress}
    >
      <Text style={styles.text}>Pacote {item.id}</Text>
      <Text style={styles.text}>{item.servicesNames}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.text}>R$ {item.price}</Text>

        <Text style={styles.text}>{item.distance} Km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'left',
    color: '#000000',
    margin: 5,
  },
});

export default PlanCard;
