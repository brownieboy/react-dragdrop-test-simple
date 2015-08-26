'use strict';

import React from 'react';
// import { Router, Route, Link } from 'react-router';
import IndexComponent from './components/ComponentsList.jsx';

var sourceListComponent = <IndexComponent items={[1,2,3]}
	title="Source list" id="sourceList" />;
var targetListComponent = <IndexComponent items={[4,5,6]} title="Target list"
	id="targetList" connectWithComponentId="sourceList"/>;


export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }

	render() {
		return ( <div>
			<IndexComponent items={this.props.sourceItems}
				title="Source list" id="sourceList" />
			<IndexComponent items={this.props.targetItems} title="Target list"
				id="targetList" connectWithComponentId="sourceList"/></div> );
	}
}

MainApp.defaultProps = {sourceItems: [1,2,3], targetItems: [4,5,6]};



React.render(<MainApp />, document.body);




