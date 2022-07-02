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

const numCol = 2;

const dataSpin = [
  {id: 1, image: images.s1},
  {id: 2, image: images.s2},
  {id: 3, image: images.s3},
  {id: 4, image: images.s4},
  {id: 5, image: images.s5},
]

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const [spin, setSpin] = useState(null);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    if(spin === null){
      var randomInt = Math.floor(0 + Math.random() * 5);
      setSpin(dataSpin[randomInt]);
    }
    navigation.navigate("Play", {spinData: spin});
  }

  const onClickItemList = (item) => {
    setSpin(item);
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
      <Text style={appStyle.labelText}>Choose your spin</Text>
      <View style={appStyle.centerView}>
        <FlatList
          data={dataSpin} 
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => onClickItemList(item)}>
              <View style={appStyle.itemView}>
                <Image source={item.image} style={appStyle.logoImage} />
              </View>
            </TouchableOpacity>
          )}/>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image style={appStyle.createButton} source={images.OK} />
        </TouchableOpacity>
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
    justifyContent: 'space-between',
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
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
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