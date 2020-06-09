import RestfulClient from 'react-native-restful-client/index';

export default class DTS_PersonnelsApi extends RestfulClient {
  constructor () {
    super(
      //'http://localhost:8080/traineedrive/public/api', {    // The base URL of the API to consume
      'http://localhost:8080/traineedrive/public/api', {    // The base URL of the API to consume
        resource: 'dts/personnel'           // The resource of the API to consume
    })
  }
}