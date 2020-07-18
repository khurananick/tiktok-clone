import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';

import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

import {
  Container,
  RecordButton,
  Header,
  Row,
  Button,
  Description,
} from './styles';

const Record: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();
  useEffect(() => {
    async function permission(): Promise<void> {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      StatusBar.setHidden(true);
    }
    permission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const doStartRecording: void = async () => {
    this.recording = await this.camera.recordAsync({
      quality: "480p",
      maxDuration: 10
    });
    navigation.push("EditRecording", { recording: this.recording });
  }

  const doStopRecording: void = async () => {
    await this.camera.stopRecording();
  }

  return (
    <Camera style={{ flex: 1 }} type={type} ref={ref => { this.camera = ref }}>
      <Container>
        <Header>
          <Button
            onPress={() => {
              StatusBar.setHidden(false);
              navigation.goBack();
            }}
          >
            <AntDesign name="close" size={28} color="#fff" />
          </Button>
          <Button>
            <Row>
              <FontAwesome name="music" size={18} color="#fff" />
              <Description>Sons</Description>
            </Row>
          </Button>
          <Button
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <MaterialCommunityIcons
              name="rotate-right"
              size={28}
              color="#fff"
            />
          </Button>
        </Header>
        <RecordButton onLongPress={doStartRecording} onPressOut={doStopRecording} />
      </Container>
    </Camera>
  );
};

export default Record;
