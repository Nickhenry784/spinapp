import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  FlatList, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const numCol = 3;

const dataFisrt = [
  {id: 1, image: images.f1},
  {id: 2, image: images.f2},
  {id: 3, image: images.f3},
  {id: 4, image: images.f4},
  {id: 5, image: images.f5},
  {id: 6, image: images.f6},
  {id: 7, image: images.f7},
  {id: 8, image: images.f8},
  {id: 9, image: images.f9},
  {id: 10, image: images.f10},
  {id: 11, image: images.f11},
]

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play", {fisrtData: item});
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <ImageBackground source={images.buy} style={appStyle.buyImage}>
            <Text style={appStyle.turnText}>{points.value}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Image source={images.welcome} style={appStyle.centerImage} />
      <View style={appStyle.centerView}>
        <FlatList
          data={dataFisrt} 
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => onClickStartButton(item)}>
              <View style={appStyle.itemView}>
                <Image source={item.image} style={appStyle.logoImage} />
              </View>
            </TouchableOpacity>
          )}/>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  attributeView: {
    flex: 0.1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  appBar: {
    position: 'absolute',
    top: '5%',
    right: '3%',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontFamily: 'Comic Boom Bubble_DEMO',
    color: 'white',
  },
  labelText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontFamily: 'Comic Boom Bubble_DEMO',
    marginBottom: 10,
    marginTop: windowHeight * 0.1,
  },
  buyImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',

  },
  centerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Home;