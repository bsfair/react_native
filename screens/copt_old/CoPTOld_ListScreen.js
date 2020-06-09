
import React from "react";
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
} from 'react-native';
import { ScrollView, Image } from "react-native";
import { Button, Icon } from 'react-native-elements'

import { AsyncStorage, BackHandler, } from 'react-native'
import { MonoText } from '../../components/StyledText';

import ActionButton from 'react-native-action-button';
import { 
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";


export default class COPTOld_ListScreen extends React.Component {
  
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
    /*const { navigate } = this.props.navigation;
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });*/
  
  // sitthinai 2019_09_19, add code, for refresh screen
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({         
        dataSource: null,
      });
      this.ShowCoPTOld();
    });    
  }

  // sitthinai 2019_09_19, add code, for refresh screen
  //componentWillMount() {
  //  // Remove the event listener before removing the screen from the stack
  //  this.focusListener.remove();      
  //}  

  ShowCoPTOld =  async() => {    
    const { sid } = this.state;    
    await fetch(
      'http://kbwservice.psu.ac.th/api/coptold/score/sitthinai.w'
    )
    .then((response) => response.json())
    .then((responseJson) => {
      //Alert.alert("รอบสอบ:  " + responseJson.score[0].ExamScheduleID + "\nคะแนน: " + responseJson.score[0].TotalScore);
      this.setState(
        {
          //isLoading: false,
          dataSource: responseJson.score,
        }, 
        function(){ }
      );
      this.arrayholder = responseJson.score;
    })
    .catch((error) => {
      console.error(error);
    });
  }  

  // CoPT-Old
  /*
    TesterID,
    ExamScheduleID,
    TotalScore,
  */
  SearchFilterFunction(text){
    let str = '';
    const newData = this.arrayholder.filter(function(item){
      const itemData = str.concat(item.TesterID, item.ExamScheduleID).toUpperCase()
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
    this.ShowCoPTOld().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const {navigate} = this.props.navigation;    

    return (
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
            data= {this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            //renderItem= {item=> this.renderItem(item)}          
            renderItem = { ({item}) => 
              <TouchableOpacity 
                onPress={() => {
                  navigate('CoPTOld_View', {
                    param_testerid: item.TesterID,
                    param_scheduleid: item.ExamScheduleID,
                    param_totalscore: item.TotalScore,                
                  })
                }} 
                style={styles.list} 
              >            
                <Text style={styles.text}>รหัสประจำตัวผู้สอบ : { item.TesterID }</Text>
                <Text style={styles.text}>รหัสรอบสอบ : { item.ExamScheduleID } , คะแนนที่ได้ : { item.TotalScore }</Text>                         
                <View style={styles.buttonSection}>
                  <Button
                    onPress={() => {
                      navigate('Information', {
                        param_id: data.item.id, 
                        param_code: data.item.code,
                        param_name: data.item.name,
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
            keyExtractor={({ExamScheduleID}, index) => ExamScheduleID}            
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