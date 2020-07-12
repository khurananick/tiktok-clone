import React , { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import ViewPager from '@react-native-community/viewpager';

import { Container, Title, Header, Card, Comment, Author } from './styles';

const useFetch: object = (url: string) => {
  const [data: object, setData] = useState({});

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [url]);

  return data;
};

const Inbox: React.FC = () => {
  let comments;
  const data = useFetch(global.api.makeURL(`/comments/user/abc`));
  if(data.success) {
    comments =
        <View>
          {data.response.map(item => (
            <Card key={item.id}>
              <Author>{item.commenterName}</Author>
              <Comment>{item.text}</Comment>
            </Card>
          ))}
        </View>
  }

  return (
    <Container>
      <Header>
        <Title>All activity</Title>
      </Header>
      {comments}
    </Container>
  );
};

export default Inbox;

/*
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <Feather
          style={{ position: 'absolute', right: 10, top: 10 }}
          name="send"
          size={24}
          color="black"
        />
*/
