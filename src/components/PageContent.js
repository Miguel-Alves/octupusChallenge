import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import background from '../assets/octupusFadedLogo.png';

const PageContent = ({ children }) => {
  return (
    <View style={styles.pageContentContainer}>
      <ImageBackground source={background} style={styles.imageBackground}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default PageContent;

const styles = StyleSheet.create({
  pageContentContainer: {
    flex: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
});
