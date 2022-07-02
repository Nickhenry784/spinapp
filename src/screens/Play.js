import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  Animated, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = ({navigation, route}) => {

  const {spinData} = route.params;

  const [deg, setDeg] = useState(0);

  const [timeDown, setTimeDown] = useState(Math.floor(1000 + Math.random() * 2000));

  const [play, setPlay] = useState(false);

  useEffect(() => {
    const timeD = setTimeout(() => {
      if(timeDown > 0 && play){
        setTimeDown(timeDown - 10);
        setDeg(deg + 30);
      }
      if(timeDown === 0 && play){
        setPlay(false);
      }
    }, 1);
    return () => {
      clearTimeout(timeD);
    }
  },[timeDown, play]);

  const onClickStartButton = () => {
    setPlay(true);
    setTimeDown(Math.floor(1000 + Math.random() * 2000));
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <Animated.Image source={spinData.image} style={{
        width: windowWidth * 0.6,
        height: windowWidth * 0.6,
        marginTop: 30,
        transform: [
          {
            rotate: `${deg} deg`,
          }
        ]
      }} />
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image style={appStyle.createButton} source={images.Spin} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'contain',
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
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  buyImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    flex: 0.85,
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