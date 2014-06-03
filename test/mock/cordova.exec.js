var cache = [];
var exec = function(onSuccess, onFailure, className, actionName, commandArguments) {
  var args = {};
  args.onSuccess = onSuccess;
  args.onFailure = onFailure;
  args.className = className;
  args.actionName = actionName;
  args.commandArguments = commandArguments;
  cache.push(args);
};

window.execCache = cache;

module.exports = exec;