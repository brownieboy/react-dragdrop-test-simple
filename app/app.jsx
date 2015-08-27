'use strict';
import $ from 'jquery';
import 'jquery-ui/sortable';

import React from 'react';
import ListOfComponents from './components/ListOfComponents.jsx';

class MainApp extends React.Component {
    constructor(props) {
    	super(props);
    	// In ES6 class syntax, React no longer automagically binds your
    	// methods to the component object, so DIY (if they're likely to
    	// used as callbacks only?)
		this.state = {items: props.items};
    	this.onSourceListItemDragStart = this.onSourceListItemDragStart.bind(this);  
      this.onSourceListItemDragStop = this.onSourceListItemDragStop.bind(this);
    }
	render() {
		return (
			<div>
				<ListOfComponents items={this.props.sourceItems}
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
		this.reorderFromIndexes(oldIndex, newIndex);

	}
   reorderFromIndexes: function(prevIndex, newIndex) {
     // var newItems = ;


     // productsPickedDataClone.splice(newIndex, 0, productsPickedDataClone.splice(prevIndex, 1)[0]);


     // this.setState({productsPickedData: productsPickedDataClone});
 }
}

MainApp.defaultProps = {sourceItems: [1,2,3]};


React.render(<MainApp />, document.body);




