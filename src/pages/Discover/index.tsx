import React, { useState } from 'react';
import { View } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import ViewPager from '@react-native-community/viewpager';

import Feed from '../Home/Feed';

import { Container, Search, Header, Input } from './styles';

import useFetch from '../../utils/useFetch';

const Discover: React.FC = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);

  let posts: markup;
  const data: object = useFetch(global.api.makeURL(`/feeds/public?q=${encodeURIComponent(query)}`));

  const onSubmitEdit: void = (e) => {
    setQuery(e.nativeEvent.text);
  }

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
        <Search>
          <AntDesign
            style={{
              paddingRight: 10,
            }}
            name="search1"
            size={18}
            color="#838383"
          />
          <Input
            placeholder="Search"
            value={search}
            returnKeyType="search"
            onChangeText={text => setSearch(text)}
            onSubmitEditing={onSubmitEdit}
          />
        </Search>
        <Ionicons name="md-qr-scanner" size={25} color="black" />
      </Header>
      {posts}
    </Container>
  );
};

export default Discover;
