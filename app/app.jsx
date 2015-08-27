'use strict';
import $ from 'jquery';
import 'jquery-ui/sortable';
import shortid from "shortid";

import React from 'react';
import ListOfComponents from './components/ListOfComponents.jsx';

class MainApp extends React.Component {
    constructor(props) {
    	super(props);
    	// In ES6 class syntax, React no longer automagically binds your
    	// methods to the component object, so DIY (if they're likely to
    	// used as callbacks only?)
		var tempItems = props.sourceItems.map((item, index) => {
			return {title: item, key: shortid.generate()};
		});
		this.state = {sourceItems: tempItems};
    	this.onSourceListItemDragStart = this.onSourceListItemDragStart.bind(this);
        this.onSourceListItemDragStop = this.onSourceListItemDragStop.bind(this);
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
		)
	}
	onSourceListItemDragStart (sortableContextObject, event, ui) {
      this.dragStartIndex = ui.item.index();
	}
	onSourceListItemDragStop (sortableContextObject, event, ui) {
		var oldIndex = this.dragStartIndex;
		var newIndex = ui.item.index();
		$(sortableContextObject).sortable("cancel");

		this.reorderFromIndices(oldIndex, newIndex);

	}
  reorderFromIndices(prevIndex, newIndex) {
     // var newItems = ;


     // productsPickedDataClone.splice(newIndex, 0, productsPickedDataClone.splice(prevIndex, 1)[0]);


     // this.setState({productsPickedData: productsPickedDataClone});
 }
}

MainApp.defaultProps = {sourceItems: [1,2,3]};


React.render(<MainApp />, document.body);




