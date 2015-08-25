'use strict';

import React from 'react';
import { Router, Route, Link } from 'react-router';
import IndexComponent from './components/ComponentsList.jsx';


// React.render(<div><IndexComponent items={[1,2,3]} title="Source list" />
// 	<IndexComponent items={[4,5,6]} title="Target list" /></div>, document.body);


// var sourceListComponent = <IndexComponent items={[1,2,3]} title="Source list" />;
// var targetListComponent = <IndexComponent items={[4,5,6]} title="Target list" connectListTo={sourceListComponent} />;

React.render(<div><IndexComponent items={[1,2,3]} title="Source list" />
	<IndexComponent items={[4,5,6]} title="Target list" /></div>, document.body);




