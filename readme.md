# ReactJS Sortable List with jQuery-ui

###Overview
A simple, sortable list implemented using ReactJS and jQuery-ui's sortable() method.



###Background
Although there's a number of drag and drop modules for ReactJS, they all seem to use the HTML5 drag and drop API for which browser support is still sadly lacking.  E.g. the documentation for the React DnD module says the following:

> React DnD does not work on mobile browsers yet because it currently relies
> on the HTML5 drag and drop API which no mobile browsers implement.
https://github.com/gaearon/react-dnd

jQuery-ui seems to have fallen out of favour recently, but it still has the best drag and drop (and sortable) UI that I've seen.  But how to combine it with ReactJS?  The raison d'etre of both libraries is to control the UI!  But they can't both do it; I've had ReactJS throw warnings at me when my other code has tried to monkey with the UI without its knowledge.


##Approach
The trick to getting them to work together was to not let jQuery-ui modify the UI at all, but only *appear* to do so.  All we want from jQuery-ui is the mechanics of the sortability.  In other words, we read its (and the user's) intentions, and then pass those to ReactJS to do the actual sorting.  This is possible because jQuery-ui's sortable() method has a cancel call that sets the UI back to how it was.  Here's the basic workflow then:

1. Attach the jquery-ui.sortable() method to a list of line items
2. Let the user drag and drop those line items to re-order them.
3. When the user starts dragging, we read the index of the line item (s)he's dragging
4. When the user drops the line item, we:
  1. Read from jQuery-ui.sortable)() the new index position for the line item
  2. Cancel jQuery-ui.sortable() so that the list goes backs to its original position, and the UI is unchanged.
  3. Pass the old and new indexes of the dragged line item to ReactJS.  ReactJS then reorders the back-end data and calls a setState(), which re-orders the list in the UI. 


##Advantages & Disadvantages
The major advantage is that it actually works!  And works everywhere, including mobile.

The disadvantages are that ReactJS plus jQuery plus jQuery-ui is a pretty heavy set of dependencies, even when minified.  You can, however, cut jQuery-ui down to just the essentials needed for its .sortable() functionality.


##Libraries and Build Tools
The sample list app requires ReactJS, jQuery and jQuery-UI as run time dependencies.  It's written in the new ES6, or ES2015 as it's now called, syntax using the module pattern.  So it requires Webpack and Babel as build tools.

##To Install
Clone the github repository https://github.com/brownieboy/react-dragdrop-test-simple  In a terminal, cd to the folder that you just cloned the repository into and run
```
npm install
```

You can build the app with either:
```
npm run build
```
or
```
npm run buildwin
```

The latter minifies and uglifies the resulting JavaScript libraries, which reduced to about a third of their unminified sizes.  However, build time is significantly higher!

Open the build/index.html file via a local server.  SublimeServer is good if you're running SubmlimeText.  Otherwise you can run:
```
npm run start
```
to start up webpack-dev-server.  When this is running, your test URL is http://localhost:8080.


## Demo
http://www.users.on.net/~mikeandgeminoz/code/react-jqueryui-drag-drop/build/index.html





