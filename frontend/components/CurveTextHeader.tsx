import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CurveTextHeaderSVG from '@/assets/svgs/curveText.svg';

const CurveTextHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <CurveTextHeaderSVG style={{ marginLeft: 20, marginBottom: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('window').height * 0.1, // 5% of screen height
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
});

export default CurveTextHeader;
