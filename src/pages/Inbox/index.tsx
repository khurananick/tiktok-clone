import React , { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import ViewPager from '@react-native-community/viewpager';

import { Container, Title, Header, Card, Comment, Author } from './styles';

import useFetch from '../../utils/useFetch';

const Inbox: React.FC = () => {
  let comments: markup;
  const data: object = useFetch(global.api.makeURL(`/comments/user/abc`));
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
