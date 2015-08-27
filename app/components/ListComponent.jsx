import React from 'react';

export default class ListComponent extends React.Component {
	constructor(props) {
    	super(props);
  	}
	render() {
      return (<li>item {this.props.title}</li>);
	}
}