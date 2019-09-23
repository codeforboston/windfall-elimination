var SessionStore = (function() {

	var push = function(name, item) {
		sessionStorage.setItem(name, item);
	}

	var get = function(name) {
		return sessionStorage.getItem(name);
	}

	return {
	    push: push,
	    get: get
  	}


})();

export { SessionStore };