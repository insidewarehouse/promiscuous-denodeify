var Promise = require('promiscuous');

module.exports = function (nodeFn)
{
	return function () {
		var args = [].slice.call(arguments);
		return new Promise(function (resolve, reject) {
			var cb = function (e) {
				if (e) {
					reject(e)
				} else {
					resolve([].slice.call(arguments, 1));
				}
			};
			args.push(cb);
			nodeFn.apply(null, args);
		});
	}
};
