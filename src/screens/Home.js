import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  FlatList,
  Animated, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 2;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const [randomRotate, setRandomRotate] = useState([0,0,0,0]);
  const [timeDown, setTimeDown] = useState(Math.floor(10 + Math.random() * 20));
  const [play, setPlay] = useState(false);
  const [result, setResult] = useState(false);
  const [win, setWin] = useState(true);
  const bearData = [
    {id: 1, image: images.s1},
    {id: 2, image: images.s2},
    {id: 3, image: images.s3},
    {id: 4, image: images.s4},
  ];
  const dispatch = useDispatch();


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(timeDown > 0 && play){
        randomRotate[0] = Math.floor(Math.random() * 360);
        randomRotate[1] = Math.floor(Math.random() * 360);
        randomRotate[2] = Math.floor(Math.random() * 360);
        randomRotate[3] = Math.floor(Math.random() * 360);
        setTimeDown(timeDown - 1);
      }
      if(timeDown === 0 && play){
        setPlay(false);
        setResult(true);
        if(randomRotate[0] === 0 && randomRotate[1] === 0 && randomRotate[2] === 0 && randomRotate[3] === 0){
          setWin(true);
        }else{
          setWin(false);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  }, [timeDown, play]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    setPlay(true);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }




  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.leftBar}>
        <TouchableOpacity onPress={onClickTurnButton} style={appStyle.turnView}>
          <Image source={images.buy} style={appStyle.buyImage}/>
          <Text style={appStyle.turnText}>{points.value}</Text>
        </TouchableOpacity>
      </View>
      <Image source={win ? images.win : images.lose} style={appStyle.tshirtImage}/>
      <View style={appStyle.centerView}>
        <FlatList 
          data={bearData}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item, index}) => (
            <View style={appStyle.itemView}>
              <Animated.Image source={item.image} style={[appStyle.itemImage,{
              transform: [{
                rotate: `${randomRotate[index]} deg`
              }]
            }]} />
                {result && <View style={appStyle.topView}>
                  <Image source={randomRotate[index] === 0 ? images.true : images.false} style={appStyle.b2Image} />
                </View>}
            </View>
          )}
        />
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.play} style={appStyle.b1Image} />
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
    justifyContent: 'flex-end',
    resizeMode: 'contain',
  },
  leftBar: {
    position: 'absolute',
    top: '3%',
    right: '3%',
  },
  turnView: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    margin: 40,
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'black',
  },
  tshirtImage: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  itemImage:{
    width: windowWidth * 0.25,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  topView: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    position: 'absolute',
    top: '0%',
    right: '5%',
  },
  centerView: {
    width: '100%',
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
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
    resizeMode: 'contain',
  },
  bottomView: {
    height: windowHeight * 0.1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;