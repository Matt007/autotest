// React
import	React				from 'react';
import	ReactDOM			from 'react-dom';
import	Reflux				from 'Reflux';

import	CarStore			from './../eventStores/CarStore';
import	UserActions			from './../eventStores/UserActions';

export default class Filter extends Reflux.Component {

	constructor(props) {
		super();
		this.state = {
			cars: [],
			selectedMakes: {}
			
		}
		
		this.store = CarStore;
		

	}
	
	componentWillReceiveProps(props) {
		this.setState(props);
	}

	
	onMakeSelection(make, e) {
		this.state.selectedMakes[make] = e.target.checked;
		
		console.log(this.state.selectedMakes);
		
		this.forceUpdate(() => {
			UserActions.changeFilter({
				makes: this.state.selectedMakes
			})			
		});

	}
	
	render() {


		let _makes	= {};
		let makes	= [];
		
		
		this.state.cars.map(car => {
			_makes[car.getMake()] = car.getMake();
		})
		
		for(var make in _makes) {
			makes.push(_makes[make]);
		}


		return (
			<div className={'filter'}>
			<ul>
				{makes.map( (make, index) => (
					<li>
						<input
							key={'make_'+index}
							onChange={this.onMakeSelection.bind(this, make)}
							type='checkbox'
							checked={typeof(this.state.selectedMakes[make])!='undefined' ? this.state.selectedMakes[make] : false} />
						<label>{make}</label>
					</li>
				))}
			</ul>
			</div>
			
		)
	
	}

	

}



window.react_component_Filter = function(id) {
	ReactDOM.render(<Filter />, document.getElementById(id))
}