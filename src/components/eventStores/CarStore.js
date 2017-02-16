import Reflux from 'reflux';

import UserActions	from './UserActions';

import	Api					from './../../js/api';
var api = new Api();



export default class CarStore extends Reflux.Store {

    constructor() {
        super();
		this.listenables = [UserActions]
    }


	changeFilter(filter) {
	console.log('changing to', filter);
	
		this.setState({
			filter: filter
		});

	}
	
	queryCars() {

		api.getCars().then(cars => {
			this.setState({
				cars: cars
			});
		}).catch(err => {
			console.log('err', err);
		});
	}
	
	


}