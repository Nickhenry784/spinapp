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

  const {fisrtData} = route.params;

  const [top, randomTop] = useState(50);

  const [left, randomLeft] = useState(50);

  const [timeDown, setTimeDown] = useState(Math.floor(10 + Math.random() * 60) * 1000);

  useEffect(() => {
    const timeD = setTimeout(() => {
      if(timeDown > 0){
        console.log(timeDown);
        Math.floor(0 + Math.random() * 5) === 0 ? randomTop(top + 1) : randomTop(top - 1);
        Math.floor(0 + Math.random() * 5) === 0 ? randomLeft(left + 1) : randomLeft(left - 1);
      }
      if(timeDown === 0 ){
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      }
    }, 500);
    return () => {
      clearTimeout(timeD);
    }
  },[timeDown]);

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <Animated.Image source={fisrtData.image} style={{
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        resizeMode: 'contain',
        position: 'absolute',
        top: `${top} %`,
        left: `${left} %`,
      }} />
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