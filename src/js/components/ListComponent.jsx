import React from "react";

const ListComponent = ({
	title
}) => {
  return (<li>{title}</li>);
};

ListComponent.propTypes = {
	title: React.PropTypes.string.isRequired
};

export default ListComponent;

// export default class ListComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (<li>item {this.props.title}</li>);
//   }
// }
