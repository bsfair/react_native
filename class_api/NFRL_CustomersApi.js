import RestfulClient from 'react-native-restful-client/index';

export default class NFRL_CustomersApi extends RestfulClient {
	/*public ipAddress:"abc";*/
  constructor () {
    super(
 	  'http://localhost/traineedrive/public/api', {    // The base URL of the API to consume
        resource: 'nfrl2/customer'           // The resource of the API to consume
    })
  }
}