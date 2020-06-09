
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

export default class CoPTNew_ViewScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'ตัวอย่าง - สอบออนไลน์(ใหม่)',
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

      dataSource: null,
      dataSource_score: null,

      /*id: '',
      examineeid: '',*/
      examinee_account: '',
      //module_name_abbr: '',
      scheduleid: '',
      /*enter_score_people: '',
      enter_score_date: '',
      is_enter_score: '',
      totalscore: '',
      examresult: '',*/
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

    this.GetCoPTNew();      
  }  
  
  GetCoPTNew = async () => {  
    this.setState({ 
      //id: this.CheckParam('id'),
      //examineeid: this.CheckParam('examineeid'),
      examinee_account: this.CheckParam('examinee_account'),
      //module_name_abbr: this.CheckParam('module_name_abbr'),
      scheduleid: this.CheckParam('scheduleid'),
      /*enter_score_people: this.CheckParam('enter_score_people'),
      enter_score_date: this.CheckParam('enter_score_date'),
      is_enter_score: this.CheckParam('is_enter_score'),
      totalscore: this.CheckParam('totalscore'),
      examresult: this.CheckParam('examresult'),*/    
    })

    const ea = this.CheckParam('examinee_account');
    const schedid = this.CheckParam('scheduleid');
    
    fetch(      
      //'http://localhost/api/coptnew/score_examinee/sitthinai.w/3'
      'http://kbwservice.psu.ac.th/api/coptnew/score_examinee/' + ea + '/' + schedid
      //'http://localhost/api/coptnew/score_examinee/' + this.state.examinee_account + '/' + this.state.scheduleid
      )   
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState(
        {
          isLoading: false,          
          dataSource: responseJson.examinee_exam[0].examinee,
          dataSource_score: responseJson.examinee_exam[0].exam_score_includes,
        },
        function(){ }
      );
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  CheckParam(p_name){
    let p_val = this.props.navigation.getParam('param_'+p_name);     
    return ( p_val == null ? "" : (p_val != "null" ? String(p_val) : "") );
  } 

  render() {
    const {navigate} = this.props.navigation;                  

    return(     
      <View style={styles.container}>
        <ScrollView>
                    
          <Text style={styles.header}>
            ข้อมูลคะแนนสอบ
          </Text>
          
          <FlatList
            data={this.state.dataSource_score}
            renderItem = { ({item}) => 
              <View style={styles.flatview}>              
                <Text style={styles.text}>รหัสประจำตัวผู้สอบ : { item.examineeAccount }</Text>
                <Text style={styles.text}>ชื่อ - สกุล : { this.state.dataSource.namePrefix + this.state.dataSource.firstname + ' ' + this.state.dataSource.lastname }</Text>
                <Text style={styles.text}>อีเมล : { this.state.dataSource.emailaddress }</Text>
                <Text style={styles.text}>รหัสรอบสอบ : COP-{ String(item.examScheduleID).padStart(4, '0') }</Text>
                <Text style={styles.text}>วิชาที่สอบ : { item.moduleNameAbbr == 'w'? 'Word' : 'PowerPoint' }</Text>             
                <Text style={styles.text}>วันและเวลาสอบ : { Moment(item.testStart.date ).format('DD/MM/YYYY HH:mm') } น.</Text>
                <Text style={styles.text}>ห้องสอบ : { item.room }</Text>
                <Text style={styles.text}>เลขที่นั่งสอบ : { item.seat_no }</Text>                
                <Text style={styles.text}>คะแนนที่ได้ : { item.totalScore }</Text>                
                <Text style={styles.text}>ผลการสอบ : { item.examResult == 'G' ? 'ผ่าน - ดีเยี่ยม (Good)' : item.examResult == 'P' ? 'ผ่าน (Pass)': 'ไม่ผ่าน (False)' }</Text>
              </View>
            }
            //keyExtractor={({id}, index) => id}
            keyExtractor={item=>item.id.toString()}  
          >          
          </FlatList>
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
    minWidth: 350,
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
