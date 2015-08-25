import $ from 'jquery';
import 'jquery-ui/sortable';

import React from 'react';
import ListComponent from './ListComponent.jsx';
// window.jQuery = $;
// window.$ = $;

export default class ComponentsList extends React.Component {
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section>
        <h2>{this.props.title}</h2>
        <ul ref="indexList" id={this.props.id} className="index-list">
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

    // var connectWith = this.props.connectWithComponent ? : false;
    var connectWith = false;
    $(thisDOMNode).find("ul").sortable({
      helper: "clone",
      connectWith: connectWith,
      start: function(event, ui) {
        console.log("drag started");
      },
      stop: function(event, ui) {
        console.log("drag stopped");
      }
    });
  }
}

ComponentsList.defaultProps = {
  items: []
};
