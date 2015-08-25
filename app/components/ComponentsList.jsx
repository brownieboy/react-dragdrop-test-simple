import $ from 'jquery';
// import $ from 'jquery-ui/sortable';
import 'jquery-ui';

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
        <h2>react-webpack-boilerplate</h2>
        <ul ref="indexList" className="index-list">
          {this.props.items.map((item, index) => {
         //    return (<li key={index}>item {item}</li>);
              return(<ListComponent key={index} item={item} />); 
          })}
        </ul>
      </section>
    )
  }

  componentDidMount() {
    console.log("ComponentsList.componentDidMount()");
    var thisDOMNode = React.findDOMNode(this);
    console.log("ComponentsList.componentDidMount(), thisDOMNode value = " + thisDOMNode);
    this.makeSortable(thisDOMNode);    
  }

  makeSortable(thisDOMNode) {
    // $(thisDOMNode).sortable({
    debugger;
   $(".index-list").sortable({
      helper: "clone",
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
