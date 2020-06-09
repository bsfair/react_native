import RestfulClient from 'react-native-restful-client/index';

export default class NFRL_ReserveApi extends RestfulClient {
  constructor () {
    super(
 	  'http://localhost/traineedrive/public/api', {    // The base URL of the API to consume
        resource: 'nfrl2/reserve'           // The resource of the API to consume
    })
  }
}