// React
import	React				from 'react';
import	Reflux				from 'Reflux';
import	ReactDOM			from 'react-dom';
import	MediaQuery			from 'react-responsive';
import	Car					from './../shared/Car';
import	CarStore			from './../eventStores/CarStore';

export default class CarGrid extends Reflux.Component {

	constructor(props) {
		super();
		this.state = {
			cellCount:			typeof(props.cellCount) != 'undefined' ? props.cellCount : 3,
			rows:				[],
			cars:				[],
			filter:				typeof(props.filter) != 'undefined' ? props.filter : {}
		}

	}
	
	componentWillReceiveProps(props) {
		this.setState(props);
	}
	
	componentWillMount() {
		this.generateRows();
	}
	
	countMakefilter(filter) {
		var counter = 0;
		for(var key in filter) {
			if(filter[key]==true) {
				counter++;	
			}		
		}
		return counter;
		
	}	
	generateRows(cellCount) {
		
		var rows		= [];
		
		let cars		= this.state.cars;
		let rowCount	= Math.ceil(cars.length/cellCount)
		
		let rowCounter	= 0;
		let cellCounter	= 0;
		var row			= [];
		var makesFilter = null;
		if(typeof(this.state.filter.makes)!='undefined') {
			makesFilter	= this.state.filter.makes;
		}
		if(makesFilter!=null && this.countMakefilter(makesFilter)==0) {
			makesFilter = null;
		}
		
		
		
		cars.map(car => {
			
			if(cellCounter==cellCount) { cellCounter = 0; }
			
			if(cellCounter == 0) {
				row = [];
				rows.push(row);
			}
			
			if(!makesFilter || makesFilter[car.getMake()]==true) {
				row.push(car);	
				
			}
			cellCounter++;
			
		})
		
		return rows;
	}
	

	
	grid(cellCount) {

		var rows = this.generateRows(cellCount);
		return (
			<div className='grid'>
				{rows.map( (row, rowIndex) => [
					
					row.map( (car, cellIndex) => (
						<div className={"image-wrapper pure-u-1 pure-u-md-1-"+cellCount}>
							<Car car={car} />
						</div>
					))
					
					
				])}
			</div>			
		);
	}
	
	render() {		
		return (

			<div className="image-grid pure-sg">
				{this.grid(3)}
			</div>	
		)
	
	}

	

}



window.react_component_CarGrid = function(id) {
	ReactDOM.render(<CarGrid />, document.getElementById(id))
}








