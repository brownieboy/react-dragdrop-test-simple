/* eslint-env browser */

import $ from "jquery";
import "jquery-ui/sortable";
import "jquery-ui-touch-punch";
import es6BindAll from "es6bindall";
import shortid from "shortid";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import ListOfComponents from "./components/ListOfComponents.jsx";

class MainApp extends Component {
  constructor(props) {
    super(props);
    var tempItems = props.sourceItems.map((item) => {
      return { title: item, key: shortid.generate() };
    });
    this.state = { sourceItems: tempItems };
    es6BindAll(this, ["onSourceListItemDragStart", "onSourceListItemDragStop"]);
  }

  onSourceListItemDragStart(sortableContextObject, event, ui) {
    this.dragStartIndex = ui.item.index();
  }

  onSourceListItemDragStop(sortableContextObject, event, ui) {
    var oldIndex = this.dragStartIndex;
    var newIndex = ui.item.index();
    $(sortableContextObject).sortable("cancel");
    this.reorderFromIndices(oldIndex, newIndex);
  }

  reorderFromIndices(oldIndex, newIndex) {
    var newStateSourceItems = this.state.sourceItems.slice();
    newStateSourceItems.splice(newIndex, 0, newStateSourceItems.splice(oldIndex, 1)[0]);
    this.setState({ sourceItems: newStateSourceItems });
    console.log("order is " + JSON.stringify(this.state.sourceItems));
  }

  render() {
    return (
      <div>
        <ListOfComponents items={this.state.sourceItems}
          title="Source list" id="sourceList"
          sectionClassName="listSection"
          sortable={true}
          onItemDragStop={this.onSourceListItemDragStop}
          onItemDragStart={this.onSourceListItemDragStart} />
    </div>
    );
  }
}

MainApp.defaultProps = { sourceItems: ["Apples", "Bananas", "Blueberry"] };

MainApp.propTypes = {
	sourceItems: React.PropTypes.array.isRequired
};


ReactDOM.render(<MainApp title="element" />, document.getElementById("main"));
