import RestfulClient from 'react-native-restful-client/index';

export default class NFR_RentApi extends RestfulClient {
  constructor () {
    super(
 	  'http://172.17.144.144/traineedrive/public/api', {    // The base URL of the API to consume
        resource: 'nfrl2/rent'           // The resource of the API to consume
    })
  }
}