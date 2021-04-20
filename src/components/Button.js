import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = props => {
  const { children, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A5D9',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#000000',
    marginBottom: 10,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Button;
