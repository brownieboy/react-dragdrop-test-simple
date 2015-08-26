import $ from 'jquery';
import 'jquery-ui/sortable';

import React from 'react';
import ListComponent from './ListComponent.jsx';
// window.jQuery = $;
// window.$ = $;

export default class ComponentsList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   console.log("1. this.props.connectWithComponentId = " + this.props.connectWithComponentId);
  // }
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section>
        <h2>{this.props.title}</h2>
        <ul ref="indexList" id={this.props.id} className="connected-list index-list">
          {this.props.items.map((item, index) => {
              return(<ListComponent key={index} item={item} />);
          })}
        </ul>
      </section>
    )
  }

  componentDidMount() {
    console.log("ComponentsList.componentDidMount()");
    var thisDOMNode = React.findDOMNode(this);
    this.makeSortable(thisDOMNode);    
  }

  makeSortable(thisDOMNode) {
    if(this.props.connectWithComponentId) {
      var connectionString = "#" + this.props.id + ", #" + this.props.connectWithComponentId;
      $(connectionString).sortable({
        helper: "clone",
        connectWith: ".connected-list",
        start: function(event, ui) {
            // Do nothing?
        },
        stop: function(event, ui) {
          this.props.onItemDragStop(event, ui);
        }
      });
    }
  }

  getId() {
    return this.props.id;
  }
}

ComponentsList.defaultProps = {
  items: []
};
