
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


export default class DTS_Personnel_AddScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Add - DTS Personnel',
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

      id: "",  
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
   
    this.GetDataAdd();  
  }

  GetDataAdd = async () => {
    
    /*fetch(            
      //'http://localhost:8080/traineedrive/public/api/dts/personnel/12'
      'http://192.168.2.246:8080/traineedrive/public/api/dts/personnel/12'
      )   
      .then((response) => response.json())
      .then((responseJson) => {        

      this.setState(
        {
          isLoading: false,          
          //dataSource: responseJson.personnel,        
          
          code: responseJson.personnel.code,
          no: responseJson.personnel.no,
          prefix: responseJson.personnel.prefix,
          firstname : responseJson.personnel.firstname,
          surname: responseJson.personnel.surname,
          position: responseJson.personnel.position,
          personneltype: responseJson.personnel.personneltype,
          address: responseJson.personnel.address,
          telephone: responseJson.personnel.telephone,
          email: responseJson.personnel.email,
          division: responseJson.personnel.division,
          detail: responseJson.personnel.detail,
          remark: responseJson.personnel.remark,
          //created_at: responseJson.personnel.created_at,
          //updated_at: responseJson.personnel.updated_at,

        },
        function(){ }
      );
    })
    .catch((error) =>{
      console.error(error);
    });*/

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

  AddData = async () => {

    const { navigate } = this.props.navigation;

    const { id,
      code,  no, prefix, firstname, surname,
      position, personneltype, address, telephone, email, 
      division, detail, remark, created_at, updated_at,
    } = this.state;

    const dTS_PersonnelsApi = new DTS_PersonnelsApi();

    try {
        
      let response_msg = 'No insert.';
      let data = {
        
        code: code,
        no: no,
        prefix: prefix,
        firstname: firstname,
        surname: surname,
        position: position,
        personneltype: personneltype,
        address: address,
        telephone: telephone,
        email: email,
        division: division,
        detail: detail,
        remark: remark,
        //created_at: created_at,
        //updated_at: updated_at,
      };

      response_msg = await dTS_PersonnelsApi.create(data);
      Alert.alert(JSON.stringify(response_msg));
    } 
    catch (error) {
      console.error(error);
    }

    navigate('DTS_Personnel_List');
    /*navigate('DTS_Personnel_View',{

      param_id: this.state.id,
      
      param_name: this.state.name,
      param_grouptype: this.state.grouptype,
      param_latitude: this.state.latitude,
      param_longitude: this.state.longitude
      
    });*/    
  }

  render() {
    const {navigate} = this.props.navigation;  
   
    return(     
      <View style={styles.container}>
        <ScrollView>
                             
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.header}>
              ข้อมูลบุคลากร
            </Text>

            <Text style={styles.text_index}>รหัส : </Text>
            <TextInput
              value={this.state.id}
              onChangeText={(id) => this.setState({ id })}
              style={styles.input_index}
              editable={false} 
              keyboardType='numeric'
            />              
          </View>
          
          <Text style={styles.text}>รหัส :</Text>
          <TextInput 
            value={this.state.code}
            onChangeText={(code) => this.setState({ code })}
            placeholder={'รหัส'}
            style={styles.input} 
          />
          <Text style={styles.text}>เลขที่ :</Text>
          <TextInput 
            value={this.state.no}
            onChangeText={(no) => this.setState({ no })}
            placeholder={'เลขที่'}
            style={styles.input} 
          />
          <Text style={styles.text}>คำนำหน้า :</Text>
          <TextInput 
            value={this.state.prefix}
            onChangeText={(prefix) => this.setState({ prefix })}
            placeholder={'คำนำหน้า'}
            style={styles.input} 
          />
          <Text style={styles.text}>ชื่อ :</Text>
          <TextInput 
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder={'ชื่อ - สกุล'}
            style={styles.input} 
          />
          <Text style={styles.text}>สกุล :</Text>
          <TextInput 
            value={this.state.surname}
            onChangeText={(surname) => this.setState({ surname })}
            placeholder={'ชื่อ - สกุล'}
            style={styles.input} 
          />

          <Text style={styles.text}>ตำแหน่ง :</Text>
          <TextInput 
            value={this.state.position}
            onChangeText={(position) => this.setState({ position })}
            placeholder={'ตำแหน่ง'}
            style={styles.input} 
          />

          <Text style={styles.text}>ประเภทบุคลากร :</Text>
          <TextInput 
            value={this.state.personneltype}
            onChangeText={(personneltype) => this.setState({ personneltype })}
            placeholder={'ประเภทบุคลากร'}
            style={styles.input}
          />           

          <Text style={styles.text}>ที่อยู่ :</Text>
          <TextInput 
            value={this.state.address}
            onChangeText={(address) => this.setState({ address })}
            placeholder={'ที่อยู่'}
            style={styles.input}
          />

          <Text style={styles.text}>เบอร์โทร :</Text>
          <TextInput 
            value={this.state.telephone}
            onChangeText={(telephone) => this.setState({ telephone })}
            placeholder={'เบอร์โทร'}
            style={styles.input}
          />

          <Text style={styles.text}>อีเมล :</Text>
          <TextInput 
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'อีเมล'}
            style={styles.input}
          />

          <Text style={styles.text}>สังกัดหน่วยงาน :</Text>
          <TextInput 
            value={this.state.division}
            onChangeText={(division) => this.setState({ division })}
            placeholder={'สังกัดหน่วยงาน'}
            style={styles.input}
          />

          <Text style={styles.text}>รายละเอียด :</Text>
          <TextInput 
            value={this.state.detail}
            onChangeText={(detail) => this.setState({ detail })}
            placeholder={'รายละเอียด'}
            style={styles.input}
          />  

          <Text style={styles.text}>หมายเหตุ :</Text>
          <TextInput 
            value={this.state.remark}
            onChangeText={(remark) => this.setState({ remark })}
            placeholder={'รายละเอียด'}
            style={styles.input}
          />
          <Text style={styles.text}>ปรับปรุงข้อมูล :</Text>
          <TextInput 
            value={this.state.updated_at }
            onChangeText={(updated_at) => this.setState({ updated_at })}
            placeholder={'รายละเอียด'}
            style={styles.input}
          />

          <Text style={styles.text}>ปรับปรุงข้อมูล :</Text>          
          <DatePicker            
            date={this.state.updated_at}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm:ss"
            is24Hour={true} 
            minDate="2019-01-01"
            maxDate="2019-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="ปรับปรุงข้อมูล (updated_at)"
            style={{
              minWidth: 300, 
              borderColor: 'gray',
              borderRadius: 20,    
              borderWidth: 1,
              height: 49,               
              borderRadius: 20,
              paddingLeft: 10,
              paddingTop: 5,
              paddingRight: 10,
              paddingBottom: 5,  
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36, 
                borderWidth: 0,                              
              },
              dateText: {                
                fontSize: 18,
                borderWidth: 0, 
              },
              placeholderText: {
                fontSize: 18,                
              }              
            }}
            onDateChange={(updated_at) => this.setState({updated_at})}
          />
                  
          <Button
            title={`บันทึก`}
            titleStyle={{ fontSize: 20 }}
            textStyle={{textAlign: 'center'}}           
            raised
            icon={{}}
            buttonStyle={ styles.button }            
            onPress={ this.AddData.bind(this) }
          />
                
          <Button
            title="ยกเลิก"
            titleStyle={{ fontSize: 20 }}
            textStyle={{ textAlign: 'center' }}            
            raised
            icon={{}}
            buttonStyle={ styles.button }
            onPress={ () =>  navigate('DTS_Personnel_View') }            
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
    width: 150, 
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
    /*borderColor: 'gray',
    backgroundColor: 'lightgray',*/
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
