
import React from 'react';
import {  
  Alert,  
  FormattedDate,
  Image, 
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AsyncStorage, BackHandler } from 'react-native';
//import { ActivityIndicator, FlatList } from 'react-native';
//import { List, ListItem } from 'react-native';

import { Button, Icon } from 'react-native-elements';

//import { MonoText } from '../../components/StyledText';
import Moment from 'moment';

import DatePicker from 'react-native-datepicker';
//import ActionButton from 'react-native-action-button';

import DTS_PersonnelsApi from '../../class_api/DTS_PersonnelsApi';

import { NavigationEvents } from 'react-navigation';


export default class DTS_Personnel_ViewScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'View - DTS Personnel',
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

      //dataSource: null,

      id: this.CheckParam('id'),  
      code: "",
      no: "",
      prefix: "",
      firstname: "",
      surname: "",
      position: "",
      personneltype: "",
      address: "",
      telephone: "",
      email: "",
      division: "",
      detail: "",
      remark: "",
      created_at: "",
      updated_at: "",

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

    this.GetDataView();      
  }  
  
  GetDataView = async () => {  

    const dTS_PersonnelsApi = new DTS_PersonnelsApi();

    try {
      //let response_msg = 'No get data.'; 
      let data = null;   
      data = await dTS_PersonnelsApi.get(this.state.id);

      this.setState(
        {
          isLoading: false,          
          //dataSource: data.personnel,        
          
          code: data.personnel.code,
          no: data.personnel.no,
          prefix: data.personnel.prefix,
          firstname : data.personnel.firstname,
          surname: data.personnel.surname,
          position: data.personnel.position,
          personneltype: data.personnel.personneltype,
          address: data.personnel.address,
          telephone: data.personnel.telephone,
          email: data.personnel.email,
          division: data.personnel.division,
          detail: data.personnel.detail,
          remark: data.personnel.remark,
          created_at: data.personnel.created_at,
          updated_at: data.personnel.updated_at,

        },
        function(){ }
      );

      //response_msg = data.message;
      //Alert.alert('แจ้งเตือน', JSON.stringify(response_msg));      
    }
    catch (error) {
      console.error(error);
    }
  }

  CheckParam(p_name){
    let p_val = this.props.navigation.getParam('param_'+p_name);     
    return ( p_val == null ? "" : (p_val != "null" ? String(p_val) : "") );
  }

  DeleteConfirm(){
    Alert.alert(
      'Confirm delete record!',
      'Are you sure you want to delete this record?',
        [
          { 
            text: 'NO', 
            onPress: () => { 
              //Alert.alert("Record Not Deleted"); 
            }
          },
          { 
            text: 'YES', 
            onPress: () => {   
              //Alert.alert("Deleted Complete");            
              this.DeleteData();
            } 
          },
        ]
      );
  }

  DeleteData = async () => {

    const { navigate } = this.props.navigation;
    const { id } = this.state; 
    const dTS_PersonnelsApi = new DTS_PersonnelsApi();

    try {
      let response_msg = 'no delete';
      let response = null; 
           
      response = await dTS_PersonnelsApi.destroy(id);
      
      if (response == 204) {
        response_msg = 'Delete success';
      }      
      Alert.alert(JSON.stringify(response_msg));      
    }
    catch (error) {
      console.error(error);
    }

    navigate('DTS_Personnel_List');
  }

  render() {
    const {navigate} = this.props.navigation;  
   
    return(     
      <View style={styles.container}>
        <NavigationEvents
          //onWillFocus={payload => console.log('will focus',payload)}
          //onDidFocus={payload => console.log('did focus',payload)}
          //onWillBlur={payload => console.log('will blur',payload)}
          //onDidBlur={payload => console.log('did blur',payload)}
          onDidFocus={() => this.GetDataView()}
        />
        <ScrollView>
                    
          <Text style={styles.header}>
            ข้อมูลบุคลากร
          </Text>
          
          <View>
            <Text style={styles.text}>รหัส : { this.state.code } </Text>
            <Text style={styles.text}>เลขที่ : { this.state.no } </Text>
            <Text style={styles.text}>คำนำหน้า : { this.state.prefix } </Text>
            <Text style={styles.text}>ชื่อ : { this.state.firstname }</Text>
            <Text style={styles.text}>สกุล : { this.state.surname }</Text>

            <Text style={styles.text}>ตำแหน่ง : { this.state.position } </Text>
            <Text style={styles.text}>ประเภทบุคลากร : { this.state.personneltype } </Text>
            <Text style={styles.text}>ที่อยู่ : { this.state.address }</Text>
            <Text style={styles.text}>เบอร์โทร : { this.state.telephone }</Text>
            <Text style={styles.text}>อีเมล : { this.state.email }</Text>               
            
            
            <Text style={styles.text}>สังกัดหน่วยงาน : { this.state.division }</Text>
            <Text style={styles.text}>รายละเอียด : { this.state.detail }</Text>                
            <Text style={styles.text}>หมายเหตุ : { this.state.detail }</Text>

            <Text style={styles.text}>ปรับปรุงข้อมูล : { Moment(this.state.updated_at ).format('DD/MM/YYYY HH:mm') } น.</Text>
          </View>
            
          <View>
            <Button            
              title="แก้ไข"
              titleStyle={{ fontSize: 20 }}
              textStyle={{textAlign: 'center'}}
              raised
              icon={{}}
              buttonStyle={ styles.button }
              onPress={ () => {
                navigate('DTS_Personnel_Edit',{
                  param_id: this.state.id,
                  /*
                  param_name: this.state.name,
                  param_grouptype: this.state.grouptype,
                  param_latitude: this.state.latitude,
                  param_longitude: this.state.longitude
                  */
                })
              }}
            />
          </View>

          <View>
            <Button
              title="ลบ"
              titleStyle={{ fontSize: 20 }} 
              textStyle={{textAlign: 'center'}}
              raised
              icon={{}}
              buttonStyle={ styles.button }            
              //onPress={ this.DeleteLocation.bind(this) }
              onPress={ this.DeleteConfirm.bind(this) }
                    
            />
          </View>

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
