/* eslint-env jquery */
import React from "react";

// import ReactDom from "react-dom";
// import $ from 'jquery';
// import 'jquery-ui/sortable';
import "jquery-ui/ui/widgets/sortable.js";


import ListComponent from "./ListComponent.jsx";

export default class ComponentsList extends React.Component {
  componentDidMount() {
    this.$node = $(this.refs.sortable);
    this.makeSortable(this.$node);
  }

  makeSortable() {
    if (this.props.sortable) {
      const that = this;
      const connectionString = `#${this.props.id}`;

      $(connectionString).sortable({
        helper: "clone",
        start(event, ui) {
          that.props.onItemDragStart(this, event, ui);
        },
        stop(event, ui) {
          that.props.onItemDragStop(this, event, ui);
        }
      });
    }
  }

  getId() {
    return this.props.id;
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section className={this.props.sectionClassName}>
        <h2>{this.props.title}</h2>
        <ul id={this.props.id}
          ref="sortable"
          className="connected-list index-list">
          {this.props.items.map(item =>
              <ListComponent key={item.key} title={item.title} />
          )}
        </ul>
      </section>
    );
  }
}

ComponentsList.defaultProps = {
  items: []
};

ComponentsList.propTypes = {
  id: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  sectionClassName: React.PropTypes.string,
  sortable: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string
};

