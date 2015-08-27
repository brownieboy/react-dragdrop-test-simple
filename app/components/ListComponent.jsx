import React from 'react';

export default class ListComponent extends React.Component {
	render() {
      return (<li key={this.props.key}>item {this.props.item}</li>);
	}
}