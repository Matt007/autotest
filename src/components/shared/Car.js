// React
import	React				from 'react';
import	ReactDOM			from 'react-dom';

export default class Car extends React.Component {

	constructor(props) {
		super();
		this.state = {
			car:				props.car,
			fullSize:			typeof(props.fullSize)!='undefined' ? props.fullSize : false
		}
		

	}
	
	componentWillReceiveProps(props) {
		this.setState(props);
	}

	
	onClick() {
		window.location= '/details/'+this.state.car.getId();
	}
	
	render() {
		
		let car = this.state.car;
		let image = null;
		
		if(car.getPhotos().length>0) {
			image = car.getPhotos()[0];
		}

		return (
			<div className={'car'}>
				<img src={this.state.fullSize == false ? image.getBaseUrl() : image.getOriginalUrl() } className={this.state.fullSize==true && 'fullsize'} onClick={this.onClick.bind(this)}/>
				<div className='description'>{car.getMake()} {car.getModel()} ${car.getPrice()}</div>
			</div>
			
		)
	
	}

}



window.react_component_Car = function(id) {
	ReactDOM.render(<Car />, document.getElementById(id))
}