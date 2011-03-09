/*
---

name: Map.PolyLine

description: Google Maps with MooTools

license: MIT-style license

authors:
  - Ciul
  - Thomas Allmer

requires: [Map]

provides: [Map.PolyLine]

...
*/

Map.PolyLine = new Class({
	Implements: [Options, Events, SubObjectMapping],

	options: {
		/*clickable: true,
		geodesic: true,
		strokeColor: '#ff0000',
		strokeOpacity: 1,
		strokeWeight: 2,
		zIndex: number*/
		mapToSubObject: {
			'this.polyLineObj': {
				functions: ['path', 'map'],
				eventInstance: 'google.maps.event',
				eventAddFunction: 'addListener',
				events: ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseUp', 'rightclick']
			}
		}
	},

	polyLineObj: null,
	
	initialize: function (path, map, options) {
		this.setOptions(options);
		
		this.options.path = typeOf(path) === 'array' ? path.toLatLng() : path;
		this.options.map = map;
		
		this.polyLineObj = new google.maps.Polyline(this.options);
		this.mapToSubObject();
	},
	
	// Adds one element to the end of the array and returns the new length of the array.
	addLine: function(point) {
		var point = typeOf(point) === 'array' ? point.toLatLng() : point;
		return this.getPath().push(point);
	},

	// Inserts an element at the specified index.
	insertLineAt: function(index, point) {
		var point = typeOf(point) === 'array' ? point.toLatLng() : point;
		this.getPath().insertAt(index, point);
	},

	// Removes the last element of the array and returns that element.
	removeLastLine: function() {
		return this.getPath().pop();
	},

	// Returns the number of elements in this array.
	getLength: function() {
		return this.getPath().getLength;
	},

	// Removes an element from the specified index.
	removetLineAt: function(index) {
		this.getPath().removeAt(index); 
	},

	// Sets an element at the specified index.
	setLineAt: function(index, point) {
		var point = typeOf(point) === 'array' ? point.toLatLng() : point;
		this.getPath().setAt(index, point);
	},

	// Get an element at the specified index.
	getLineAt: function(index) {
		return this.getPath().getAt(index);
	},

	// Clears the polyLine path.
	clearPath: function() {
		this.setPath([]);
	},
	
	hide: function() {
		this.polyLineObj.setMap(null);
	},

	show: function() {
		this.setMap(this.options.map);
	},

	toggle: function() {
		if (!!this.getMap()) {
			this.hide();
		}	else {
			this.show();
		}
	},

	destroy: function() {
		this.polyLineObj.setMap(null);
		this.polyLineObj = null;
	}

});