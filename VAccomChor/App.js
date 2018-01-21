/**
 * Main app js for React app
 * version: wip
 * subject: built-in audio player with selecting local files
 */
 // TODO: to write inline comments for App class !!!

'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';

var RNFS = require('react-native-fs');

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      fileName : 'No selected'
    };
  }

  loadAudio = () => {
    var self = this;
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(function(res) {
        return Promise.all([RNFS.stat(res[0].path), res[0].path]);
      }).then((statResult) => {
        if (statResult[0].isFile()) {
          return RNFS.readFile(statResult[1], 'utf8');
        }
        self.setState(() => {
          return {fileName : 'No file'};
        });
      })
      .then((contents) => {
        self.setState(() => {
          return {fileName : 'There is a file'};
        });
      });
      //
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to our exciting ChorHacker Project!
        </Text>
        <Button
          onPress = {this.loadAudio}
          title="Load Music"
          color="#814584"
          accessibilityLabel="Choose an audio file"
        />
        <Text style={styles.instructions}>
          Load a music file: {this.state.fileName}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
