import RestfulClient from 'react-native-restful-client/index';

export default class EXS_CustomersApi extends RestfulClient {
  constructor () {
    super(
      //'http://localhost:8080/traineedrive/public/api', {    // The base URL of the API to consume
      'http://localhost/traineedrive_F/public/api', {    // The base URL of the API to consume
        resource: 'exs/customer'           // The resource of the API to consume
    })
  }
}