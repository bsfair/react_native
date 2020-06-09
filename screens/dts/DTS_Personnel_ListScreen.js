
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
import { ActivityIndicator, FlatList } from 'react-native';
//import { List, ListItem } from 'react-native';

import { Button, Icon } from 'react-native-elements';

//import { MonoText } from '../../components/StyledText';
import Moment from 'moment';

//import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-action-button';

import DTS_PersonnelsApi from '../../class_api/DTS_PersonnelsApi';


export default class DTS_Personnel_ListScreen extends React.Component {
    
  static navigationOptions = ({ navigation }) => ({
    title: 'Get - DTS Personnel',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow:1,
      marginLeft: -45,
      alignSelf:'center',
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
      loading: true,
      refreshing: false,
      text: '',

      dataSource: null,
    };
    this.arrayholder = [] ;
  }
  
  componentDidMount(){
    /*
      const { navigate } = this.props.navigation;
      AsyncStorage.multiGet(['username', 'password']).then((data) => {
          let username = data[0][1];
          let password = data[1][1];

          //if (username !== 'tonlove') {
          if(typeof username !== 'string' || username === null || username === undefined) {
            navigate('SignIn', {name: 'User'})        
          }
      });
    */
    this.GetDataList();
    
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({         
        dataSource: null,
      });
      this.GetDataList();
    });    
  }

  // sitthinai 2019_09_19, add code, for refresh screen
  //componentWillUnmount() {
  //  // Remove the event listener before removing the screen from the stack
  //  this.focusListener.remove();      
  //}
    
  GetDataList =  async () => {    

    const dTS_PersonnelsApi = new DTS_PersonnelsApi();

    try {
      //let response_msg = 'No get data.'; 
      let data = null;   
      data = await dTS_PersonnelsApi.all();

      this.setState(
        {
          isLoading: false,
          dataSource: data.personnels,
        }, 
        function(){ }
      );
      this.arrayholder = data.personnels;

      response_msg = data.message;
      Alert.alert('แจ้งเตือน', JSON.stringify(response_msg));      
    }
    catch (error) {
      console.error(error);
    }
  }
      
  // DTS Personnel
  /*
    id: 1,
    code: "staff_01",
    no: "ch_1",
    prefix: "นาง",
    firstname: "ดนยา",
    surname: "วราสิทธิชัย",
    position: "นักวิชาการศึกษาชำนาญการพิเศษ",
    personneltype: "หัวหน้า",
    address: "ศูนย์คอมพิวเตอร์",
    telephone: "074282090",
    email: "donya.w@psu.ac.th",
    division: "ศูนย์คอมพิวเตอร์",
    detail: "ทดสอบเพิ่มรายละเอียด",
    remark: "หัวหน้ากลุ่มงานบริการวิชาการ",
    created_at: "2018-04-04 00:23:39",
    updated_at: "2018-07-16 10:30:24"
  */

  SearchFilterFunction(text){
    let str = '';
    const newData = this.arrayholder.filter(function(item){
      const schedule = 'staff_-'+String(item.examScheduleID).padStart(4, '0');
      const itemData = str.concat(item.examineeAccount, item.moduleNameAbbr, schedule).toUpperCase()
      //const itemData = item.ExamScheduleID.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      text: text
    })
  }  

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: 1,
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.5)",        
      }}/>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.GetDataList().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const {navigate} = this.props.navigation;       

    return(     
      <View style={styles.container}>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} name="search" size={20} color='#696969'/>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => this.SearchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid='black'
                placeholder="ค้นหารหัสรอบสอบ"
            /> 
          </View>

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem = { ({item}) =>              
              <TouchableOpacity 
                onPress={() => {
                  navigate('DTS_Personnel_View', {

                    param_id: item.id,

                    /*
                    param_code: item.code,
                    param_no: item.no,
                    param_prefix: item.prefix,  
                    param_firstname: item.firstname,
                    param_surname: item.surname,
                    param_position: item.position,
                    param_personneltype: item.personneltype,
                    param_address: item.address,
                    param_telephone: item.telephone,
                    param_email: item.email,
                    param_division: item.division,
                    param_detail: item.detail,
                    param_remark: item.remark,
                    */

                  })
                }} 
                style={styles.list} 
              >            
                <Text style={styles.text}>รหัส : { item.code } </Text>
                <Text style={styles.text}>ชื่อ - สกุล : { item.prefix }{ item.firstname } { item.surname }</Text>
                
                <View style={styles.buttonSection}>
                  <Button
                    onPress={() => {
                      navigate('Information', {

                        param_id: item.id,
                        param_code: item.code,
                        param_no: item.no,
                        param_prefix: item.prefix,  
                        param_firstname: item.firstname,
                        param_surname: item.surname,
                        param_position: item.position,
                        param_personneltype: item.personneltype,
                        param_address: item.address,
                        param_telephone: item.telephone,
                        param_email: item.email,
                        param_division: item.division,
                        param_detail: item.detail,
                        param_remark: item.remark,

                      })
                    }}
                    buttonStyle={ styles.button }                      
                    titleStyle={{ fontSize: 18 }}
                    title="ข้อมูล"
                  >                
                  </Button>
                </View>
              </TouchableOpacity>
            }
            //keyExtractor={({id}, index) => id}   
            keyExtractor={item=>item.id.toString()}         
          >
          </FlatList>
        </ScrollView> 

        <ActionButton 
          buttonColor="rgba(231,76,60,1)" 
          onPress = {()=> {navigate('DTS_Personnel_Add')}} 
        />

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
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginTop: 15,
    marginRight: 0,
    marginBottom: 5, 
  },
  searchSection_bk: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    /*borderWidth: 1,*/
    /*height: 44,*/
    borderRadius: 20 ,
    marginLeft: 10,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 5, 
    /*minWidth: 350,*/
  },
  searchIcon: {    
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 20,    
    borderWidth: 0,
    fontSize: 20,
    height: 44,    
    minWidth: 250,
    /*marginTop: 5,
    marginBottom: 15,*/       
    /*paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,*/ 
  },
  list:{
    paddingVertical: 4,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 0,
    backgroundColor: "#fff",    
  },
  text: {
    marginBottom: 5,
    fontSize: 18,
    marginLeft: 0,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,     
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#004fff',
    height: 44,   
    minWidth: 200,
    marginLeft: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 0,  
  },
});