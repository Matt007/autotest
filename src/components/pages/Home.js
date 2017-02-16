// React
import	React				from 'react';
import	Reflux				from 'reflux';
import	ReactDOM			from 'react-dom';
import	CarGrid				from './../shared/CarGrid';
import	Footer				from './../shared/Footer';
import	Filter				from './../shared/Filter';
//import	ApiStore			from './../eventStores/ApiStore';
import	Api					from './../../js/api';

import UserActions			from './../eventStores/UserActions';
import CarStore				from './../eventStores/CarStore';
import VerticalSeperator	from './../shared/VerticalSeperator';


var		isServerSide	=	typeof(document)=='undefined';

export default class Home extends Reflux.Component {

	constructor(props) {
		super();
		
		this.state = {
			cars: 	[],
			filter: {},
		}
		
		this.store = CarStore;

	}
	
	
	
	componentDidMount() {
		UserActions.queryCars();
	}
	
	render() {
		
		console.log(this.state.filter);
		return (
			<div>
				<div className='header'>
					
				</div>
				<div className='narrow viewport'>
					<div className="pure-sg">
						<div className="pure-u-1 pure-u-md-6-24 box">
							<div className='padding'>
								<VerticalSeperator />
								<Filter />					
							</div>
						</div>
						<div className="pure-u-1 pure-u-md-18-24 box">
							<div className='padding'>
								Found {this.state.cars.length} cars
								<VerticalSeperator />
								<CarGrid cars={this.state.cars} filter={this.state.filter}/>	
							</div>
						</div>
					</div>
					<Footer />
				</div>
				
			</div>
			
			
		)
	
	}

	

}



window.react_component_Home = function(id) {
	ReactDOM.render(<Home />, document.getElementById(id))
}