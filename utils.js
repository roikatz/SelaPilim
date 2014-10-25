
var removeDuplicatesFromArray = function (arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
};

var mergeArrays = function(arr1, arr2){
  var fullArray = arr1.concat(arr2);
    return removeDuplicatesFromArray(fullArray);
};

module.exports = mergeArrays;

