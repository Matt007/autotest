import	React				from 'react';
import	ReactDOM			from 'react-dom';



export default class VerticalSeperator extends React.Component {

	constructor(props) {
		super();
		this.state = {
			leftContent:	props.leftContent,
			rightContent:	props.rightContent
		}
	}

	componentWillReceiveProps(props) {
		this.setState(props);
	}

	render()  {
		return (
			<div className="pure-sg vertical-seperator">
			    <div className="pure-u-1 pure-u-md-2-3 left">
			    	<h4>{this.state.leftContent}</h4>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3 right">
			    	<h4>{this.state.rightContent}</h4>
			    </div>
			</div>		
		);
	}

	

}




window.react_component_VerticalSeperator = function(id) {
	ReactDOM.render(<VerticalSeperator />, document.getElementById(id))
}