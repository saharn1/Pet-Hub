import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const uploadsUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTile}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 4,
    backgroundColor: '#808080',
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
  },
  textbox: {
    flex: 1,
    padding: 10,
  },
  imagebox: {
    flex: 1,
  },
});
ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
