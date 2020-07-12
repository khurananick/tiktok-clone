import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';

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
          <View key={item.id}>
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
