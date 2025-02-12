import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CurveTextHeaderSVG from '@/assets/svgs/curveText.svg';

interface Props {
  additionalStyles?: StyleProp<ViewStyle>;
}

const CurveTextHeader: React.FC<Props> = ({ additionalStyles }) => {
  return (
    <View style={{ ...styles.header, ...(additionalStyles as object) }}>
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
