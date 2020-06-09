
import React from 'react';
import {
  Alert, 
  Button, 
  Image, 
  Platform, 
  ScrollView, 
  StatusBar,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  ImageBackground
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import AppNavigator from '../../navigation/AppNavigator';
import AsyncStorage from '@react-native-community/async-storage';

export default class EXS_SignInScreen   extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'PSU-EXAMINATION',
    headerStyle: {
      backgroundColor: '#3366CC',      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
      marginRight: 70,
    },
    headerLeft: (
      <TouchableOpacity  onPress={() => navigation.toggleDrawer()} >
        <Image
          source={require('../../image/drawer.png')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            width: 35,
            marginLeft: 10,
            resizeMode: 'stretch',
            backgroundColor: 'white',
          }}
        />         
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      //loading: true,
      dataSource:[],
      email: '-',
      password: '-',
      username: '',     
    };
  }   

  onSingIn() {
    const { username, password } = this.state;    

    const {navigate} = this.props.navigation;

    if(username === '' || password === '') {
      Alert.alert('Sign In', `กรุณาระบุผู้ใช้งานและรหัสผ่าน`); 
    }
    else {
      if(typeof username === 'string' && username !== null && username !== undefined &&
        typeof password === 'string' && password !== null && password !== undefined) {
        if(username === 'admin' && password === '1234') {
          Alert.alert('Sign In', `ผู้ใช้: ${username} , รหัสผ่าน: ${password}`);
          /*AsyncStorage.multiSet([
              ["username", username],
              ["password", password]
          ]);*/
          this.storeData(username);
          navigate('EXSHome_Admin', {name: 'User'})
        }
        else{          
          Alert.alert('Sign In', `ผู้ใช้งานและ/หรือรหัสผ่านไม่ถูกต้อง`); 
        }
      }    
    }
  }

  storeData = async (usrn) => {
    try {
      await AsyncStorage.setItem('uname', usrn)
    } catch (e) {
      // saving error
    }
  }

  onSingUp() {
    const { username, password } = this.state;    
    //Alert.alert('Credentials', `${username} + ${password}`);
    const {navigate} = this.props.navigation;      
    navigate('SingUp', {name: 'Jane'})
  } 

  render() {    
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../../image/detailBackground.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>
      <View style={styles.title}>
          <Image source={require('../../image/exam.png')} style={{width: 300, height: 200}}/>
      </View>

        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />        
        <Button
          title={'Sign in'}
          style={styles.input} 
          onPress={this.onSingIn.bind(this)}            
        />        
                
       
       
      </View>
      </ImageBackground>
    );
  } 

}


const styles = StyleSheet.create({
   container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  backdrop: {width: '100%', height: '100%'},
  header: {
    alignItems: 'center',
    fontWeight: '900',
  },

  logo:{
    textAlign: 'center',
    fontWeight:"bold",
    fontSize:25,
    color:"black",
    marginBottom:40
  },

  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },  
  button: {
    backgroundColor: 'green',
    width: 300,
    height: 44,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
