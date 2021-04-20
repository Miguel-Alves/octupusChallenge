import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    alignItems: 'center',
    borderTopColor: '#000000',
    borderTopWidth: 1,
  },
  text: {
    marginTop: 5,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
});

const Footer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Powered by</Text>
    <Text style={styles.text}>Octupus</Text>
  </View>
);

export default Footer;
