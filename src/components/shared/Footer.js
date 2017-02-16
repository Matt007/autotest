import React				from 'react';



export default class Footer extends React.Component {
  
	constructor(props) {
		super();
		this.state = {

		}

	}

	render() {

	 
	  	return (
			<div className="pure-u-1 pure-u-md-3-3 footer box">
				<div className='padding'>
					<div className="pure-u-md-3-3 centered">
						Drive On!
					</div>

					<div className="pure-u-md-1-3 centered">
						<h4>Company</h4>
						<ul>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
						</ul>
					</div>
					<div className="pure-u-md-1-3 centered">
						<h4>Support</h4>
						<ul>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
						</ul>
					</div>
					<div className="pure-u-md-1-3 centered">
						<h4>SEO</h4>
						<ul>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
							<li><a href=''>some Link</a></li>
						</ul>
					</div>
				</div>
			</div>

	    );
	}
}

