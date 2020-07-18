import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StatusBar } from 'react-native';
import { Video } from 'expo-av';

import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import secret from '../../../secret.json';

import {
  Container,
  Header,
  Row,
  Button,
  Description,
} from './styles';

const EditRecording: React.FC = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(props.route.params.recording);
  });

  const savePost: void = async (data) => {
    const path = global.api.makeURL(`/posts`);
    const formData = new FormData();
    const fileName = data.asset_uri.split("\/")[data.asset_uri.split("\/").length-1];
    const fileType = `video/${fileName.split(".")[1]}`;
    formData.append("video", {
      name: fileName,
      uri: data.asset_uri,
      type: fileType
    });
    formData.append("tags", "testing,one,two,three");

    try {
      const response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${secret.nknick2}`
          },
          body: formData
      });
      const responseJson = await response.json();
      if(responseJson.success) {
        Alert.alert("Posted!", "", [{
          text: "OK", onPress: () => {navigation.goBack()}
        }]);
      } else throw "Error uploading post."
    }
    catch (error) {
      console.log('error : ' + error);
      Alert.alert("Error", "Oops... an error occured.", [{
        text: "OK", onPress: () => {}
      }]);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <Button
            onPress={() => {
              StatusBar.setHidden(true);
              navigation.goBack();
            }}
          >
            <AntDesign name="close" size={28} color="#fff" />
          </Button>
          <Button
            onPress={async () => {
              savePost({
                asset_uri: props.route.params.recording.uri
              });
            }}>
            <MaterialCommunityIcons
              name="check-outline"
              size={28}
              color="#fff"
            />
          </Button>
        </Header>
        <Video
          source={{ uri: props.route.params.recording.uri }}
          style={{ flex: 1 }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
      </Container>
    </>
  );
};

export default EditRecording;
