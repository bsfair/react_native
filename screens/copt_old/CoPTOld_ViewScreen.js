
import React from 'react';
import {  
  Alert,
  Button,
  FormattedDate,
  Image, 
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import { AsyncStorage, BackHandler } from 'react-native';

import { FlatList, ActivityIndicator  } from 'react-native';
import Moment from 'moment';
import { List, ListItem } from 'react-native';

export default class COPTOld_ViewScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'ตัวอย่าง - สอบออนไลน์(เก่า)',
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
  });

  constructor(props) {
    super(props)
    
    this.state = {      
      testerid: '',
      scheduleid: '',
      totalscore: '',
    };    
  }
  
  componentDidMount(){ 
    /*const { navigate } = this.props.navigation;
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });*/

    this.GetCoPTOld();      
  }  
  
  GetCoPTOld = async () => {    
    this.setState({ 
      testerid: this.CheckParam('testerid'),
      scheduleid: this.CheckParam('scheduleid'),
      totalscore: this.CheckParam('totalscore'),                 
    })
  }
  CheckParam(p_name){
    let p_val = this.props.navigation.getParam('param_'+p_name);     
    return ( p_val == null ? "" : (p_val != "null" ? String(p_val) : "") );
  } 

  render() {
    const {navigate} = this.props.navigation;    

    return (
      <View style={styles.container}>
        <ScrollView>
                    
          <Text style={styles.header}>
            ข้อมูลคะแนนสอบ
          </Text>

          <Text style={styles.text}>รหัสประจำตัวผู้สอบ : </Text>
          <TextInput              
            value={this.state.testerid}
            onChangeText={(testerid) => this.setState({ testerid })}
            placeholder={'รหัสประจำตัวผู้สอบ'}
            style={styles.input}
            editable={false} 
          />
          
          <Text style={styles.text}>รหัสรอบสอบ : </Text>
          <TextInput              
            value={this.state.scheduleid}
            onChangeText={(scheduleid) => this.setState({ scheduleid })}
            placeholder={'รหัสรอบสอบ'}
            style={styles.input}
            editable={false} 
          />                                      
        
          <Text style={styles.text}>คะแนนที่ได้ :</Text>
          <TextInput
            value={this.state.totalscore}
            onChangeText={(totalscore) => this.setState({ totalscore })}
            placeholder={'คะแนนที่ได้'}
            style={styles.input}
            editable={false} 
          />
          
       </ScrollView>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    /*flex: 1,*/
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },  
  header: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',  
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
    fontSize: 18,
  },
  text_index: {
    alignItems: 'center',
    fontSize: 18,    
    marginTop: 20,
    marginBottom: 15,
  },  
  input: {
    borderColor: 'gray',
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 18,
    /*height: 44,*/
    marginTop: 5,
    marginBottom: 15,
    minWidth: 250,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },
  input_index: {
    alignItems: 'center',    
    marginTop: 13,
    /*marginBottom: 15,*/
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 18,
    height: 44,    
    minWidth: 100,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#004fff',
    height: 44,
    marginTop: 5,    
    minWidth: 300,    
  },  
  error: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,

  },
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})
