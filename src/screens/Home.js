import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  FlatList, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const bearData = [
  {id: 1, image: images.s1},
  {id: 2, image: images.s2},
  {id: 3, image: images.s3},
  {id: 4, image: images.s4},
  {id: 5, image: images.s5},
  {id: 6, image: images.s6},
  {id: 7, image: images.s7},
  {id: 8, image: images.s8},
];
const numCol = 4;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const [items, setItems] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    if(items === null){
      Alert.alert("Please choose design image!");
      return false;
    }
    dispatch(decrement());
    setShow(true);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickRefreshButton = () => {
    setShow(false);
    setItems(null);
  }

  const onClickItem = (item) => {
    setItems(item);
    setShow(false);
  }



  return (
    <View style={appStyle.homeView}>
      <View style={appStyle.leftBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.buy} style={appStyle.buyImage}>
            <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
            <Image source={images.OK} style={appStyle.b2Image} />
        </TouchableOpacity>
        <ImageBackground source={images.tshirt} style={appStyle.tshirtImage}>
          {show && <Image style={appStyle.b1Image} source={items} />}
        </ImageBackground>
        <TouchableOpacity onPress={() => onClickRefreshButton()}>
            <Image source={images.refresh} style={appStyle.refreshBtn} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <FlatList 
          data={bearData}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => onClickItem(item.image)}>
              <Image source={item.image} style={appStyle.itemImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  leftBar: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  tshirtImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage:{
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 10,
  },
  centerView: {
    width: '100%',
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  refreshBtn: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    resizeMode: 'contain',
  },
  priceText: {
    fontSize: windowWidth > 640 ? 50 : 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  b1Image: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.15,
    resizeMode: 'contain',
    marginRight: 10,
  },
  b2Image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.1,
    resizeMode: 'cover',
  },
  bottomView: {
    height: windowHeight * 0.3,
    width: '100%',
  },
});

export default Home;