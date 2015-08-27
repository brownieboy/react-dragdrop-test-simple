'use strict';
import $ from 'jquery';
import 'jquery-ui/sortable';

import React from 'react';
import IndexComponent from './components/ComponentsList.jsx';

export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }

	render() {
		return (
			<div>
				<IndexComponent items={this.props.sourceItems}
					title="Source list" id="sourceList"
					sectionClassName="listSection"
					sortable={true}
					onItemDragStop={this.onSourceListItemDragStop} />
			 </div>
			 )
	}

	onSourceListItemDragStop(sortableContextObject, event, ui) {
      var newText = ui.item[0].textContent;
      var targetListId = ui.item.parent().attr("id");
      console.log("tempText = " + newText);
      console.log("targetListId = " + targetListId);
	}
}

MainApp.defaultProps = {sourceItems: [1,2,3]};


React.render(<MainApp />, document.body);




