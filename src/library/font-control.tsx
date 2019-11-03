import React from 'react';
import { fontSizes } from "../constants";
import { SessionStore } from "../library/session-store";

var FontControl = (function() {

	var getFontSize = function () {
		let textsize;
		if (SessionStore.get('FontSize')) {
			textsize = SessionStore.get('FontSize')
		} else {
			textsize = fontSizes[2]
		}
		return textsize
	}

	var setFont = function(e) {
		var textsize = getFontSize()

		if (e.target.id === 'increase') {
			var index = fontSizes.indexOf(textsize) + 1
			textsize = fontSizes[index]
			SessionStore.push('FontSize', textsize)
		} else if (e.target.id === 'decrease') {
			var index = fontSizes.indexOf(textsize) - 1
			textsize = fontSizes[index]
			SessionStore.push('FontSize', textsize)
		}
		loadFont()
	}

	var loadFont = function() {
		var textsize = getFontSize()

		Array.from(document.getElementById('child-wrapper').children).forEach(function(node) {
			node.style['font-size'] = textsize
	    	node.querySelectorAll('*').forEach(function(node) {
		    	node.style['font-size'] = textsize
		    })
    	})
	}

	return {
		getFontSize: getFontSize,
	    setFont: setFont,
	    loadFont: loadFont
  	}


})();

export { FontControl };
