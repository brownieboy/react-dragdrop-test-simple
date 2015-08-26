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
      <section className={this.props.sectionClassName}>
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
      var that = this;
      var connectionString = "#" + this.props.id;
      $(connectionString).sortable({
        helper: "clone",
        connectWith: "." + that.props.connectWithClass,
        over: function() {
          console.log("over called");
          $('.placeholder').hide();
        },
        stop: function(event, ui) {
          that.props.onItemDragStop(this, event, ui);
        },
        start: function(event, ui) {
          $(ui.item).show();

        }
      }).bind(this);
    }
  }

  getId() {
    return this.props.id;
  }
}

ComponentsList.defaultProps = {
  items: []
};
