import React, { useState } from 'react';
import { View } from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';

import useFetch from '../../utils/useFetch';

const Home: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);

  let posts: markup;
  const data: object = useFetch(global.api.makeURL("/feeds/user/1"));

  if(data.success) {
    posts =
      <ViewPager
        onPageSelected={e => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {data.response.map(item => (
          <View key={item._id}>
            <Feed item={item} play={false} />
          </View>
        ))}
      </ViewPager>
  }

  return (
    <Container>
      <Header>
        <Tab onPress={() => setTab(1)}>
          <Text active={tab === 1}>Following</Text>
        </Tab>
        <Separator>|</Separator>
        <Tab onPress={() => setTab(2)}>
          <Text active={tab === 2}>For You</Text>
        </Tab>
      </Header>
      {posts}
    </Container>
  );
};

export default Home;
