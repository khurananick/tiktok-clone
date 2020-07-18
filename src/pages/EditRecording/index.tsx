import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StatusBar } from 'react-native';
import { Video } from 'expo-av';

import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

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

  const savePost: boolean = async (data) => {
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
            'Authorization': 'Bearer nknick1.dji3ofq8xc7vrqqo0hpbl.1594571782624'
          },
          body: formData
      });
      const responseJson = await response.json();
      if(responseJson.success)
        Alert.alert("Posted!", "", [{
          text: "OK", onPress: () => {navigation.goBack()}
        }]);
      return true;
    }
    catch (error) {
      console.log('error : ' + error);
      return false;
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
              const post = await savePost({
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
