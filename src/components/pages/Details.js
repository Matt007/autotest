// React
import	React				from 'react';
import	ReactDOM			from 'react-dom';
import	CarGrid				from './../shared/CarGrid';
import	Footer				from './../shared/Footer';
import	Api					from './../../js/api';
var		api					= new Api();
import	Car					from './../shared/Car';

var		isServerSide	=	typeof(document)=='undefined';

export default class Details extends React.Component {

	constructor(props) {
		super();
		//http://local.travelcoup.com/details/c10160
		
		try {
			var _tmp = window.location.href.split('/');
			var carId = _tmp[_tmp.length-1];
		} catch(e) {
			var carId = null;
		}
			
		console.log(carId);
		
		this.state = {
			carId:	carId,
			car: 	null,
		}

	}
	
	
	
	componentDidMount() {
		
		if(this.state.carId==null) {
			alert('Please specifiy a car id');
			return;
		}
		
		api.getCarById(this.state.carId).then(car => {
			console.log(car);
			this.setState({
				car: car
			});
		}).catch(e => {
			console.log(e.stack);
			alert('error loading car details');
		});
	}

	
	render() {
		
	
	
		
		return (
			<div>
				<div className='header'>
					
				</div>
				<div className='narrow viewport'>
					<div className="pure-sg">
						<div className="pure-u-1 pure-u-md-3-3 box">
							<div className='padding'>
								{this.state.car &&
									<div>
										<h3>{this.state.car.getMake()}</h3>
										<Car fullSize={true} car={this.state.car} />
										
									</div>
								}
							</div>
						</div>
					</div>
					<Footer />
				</div>
				
			</div>
			
			
		)
	
	}

	

}



window.react_component_Details = function(id) {
	ReactDOM.render(<Details />, document.getElementById(id))
}