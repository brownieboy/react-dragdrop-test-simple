import React from "react";

const ListComponent = ({ title }) => <li>item {title}</li>;

export default ListComponent;

ListComponent.propTypes = {
  title: React.PropTypes.string.isRequired
};
