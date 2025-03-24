import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Harmony: undefined;
  Care: undefined;
  Wonder: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'flex-end',
      alignItems: 'center', 
      padding: 20,
      paddingBottom: 40
    }}>
      <TouchableOpacity
        style={{
          height: '20%',
          width: '80%',
          backgroundColor: '#d2b48c',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          borderRadius: 25,
          marginBottom: 15
        }}
        onPress={() => navigation.navigate('Harmony')}
      >
        <Text style={{ 
          color: '#FFFFFF', 
          textAlign: 'center',
          fontSize: 32 // Added font size (default is 14)
        }}>Harmony</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: '20%',
          width: '80%',
          backgroundColor: '#87ceeb',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          borderRadius: 25,
          marginBottom: 15
        }}
        onPress={() => navigation.navigate('Care')}
      >
        <Text style={{ 
          color: '#FFFFFF', 
          textAlign: 'center',
          fontSize: 32 // Added font size
        }}>Care</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: '20%',
          width: '80%',
          backgroundColor: '#191970',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          borderRadius: 25,
          marginBottom: 75
        }}
        onPress={() => navigation.navigate('Wonder')}
      >
        <Text style={{ 
          color: '#FFFFFF', 
          textAlign: 'center',
          fontSize: 32,
        }}>Wonder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;