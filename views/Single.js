import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{file.title}</Text>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        style={{width: '90%', height: '80%'}}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
