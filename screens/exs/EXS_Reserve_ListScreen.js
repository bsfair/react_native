
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  ScrollView, 
  Image,
  AsyncStorage, 
  BackHandler,
  ActivityIndicator,
  FlatList, 
  TouchableOpacity, 
  RefreshControl
} from 'react-native';
import { Button, Icon,SearchBar } from 'react-native-elements'
import { MonoText } from '../../components/StyledText';
import ActionButton from 'react-native-action-button';

export default class EXS_Reserve_ListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ตรวจสอบสถานะการจอง',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      marginLeft: -45,
      alignSelf: 'center',
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
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
    this.arrayholder = [];
  }

  componentDidMount() {
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
      this.ShowEXS_Reserve();
    });
  }



  ShowEXS_Reserve = async () => {
    await fetch(
      'http://localhost/traineedrive_F/public/api/exs/reserve/'
      //'http://localhost/traineedrive/public/api/nfrl2/reserve'
      
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.reserve,
          },
          function () { }
        );
        this.arrayholder = responseJson.reserve;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  SearchFilterFunction(text) {
    let str = '';
    const newData = this.arrayholder.filter(function (item) {  
    const itemData = item.name.toUpperCase()
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
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",

      }} />
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.ShowEXS_Reserve().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground source={require('../../image/detailBackground.jpg')}
        style={styles.backdrop}>  
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
            <Icon style={styles.searchIcon} name="search" size={20} color='#696969' />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='black'
              placeholder="ค้นหารายการจากชื่อผู้จอง"
            />
          </View>

          

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  navigate('EXS_Reserve_List', {
                    param_id: item.id, //เปิด id
              
                  

                  })
                }}
                style={styles.list}
              >
                <Text style={styles.text}>ลำดับที่ : {item.id}</Text>
                <Text style={styles.text}>ชื่อผู้จอง : {item.name}</Text>
                <Text style={styles.text}>วันที่จองตรวจข้อสอบ : {item.reserve_date}</Text>
                <Text style={styles.text}>สถานะการจอง : {item.reserve_status}</Text>

                <View style={styles.buttonSection}>
                 
                </View>
              </TouchableOpacity>
            }
            //keyExtractor={({ id }, index) => id}
            keyExtractor={item => item.id.toString()}
          >
          </FlatList>
        </ScrollView >
      </View >
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
  loader: {
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
    borderRadius: 20,
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
    resizeMode: 'stretch',
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
  list: {
    paddingVertical: 4,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 0,
    backgroundColor: "#fff",
  },
  searchIcon: {    
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center',
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