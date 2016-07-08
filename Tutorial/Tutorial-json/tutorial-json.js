// demo-json.js
var obj = {
	"name" : "LiLi",
	"age" : 22,
	"sex" : "F"
};

var str = JSON.stringify(obj);
console.log(str);

var obj2 = JSON.parse(str);
console.log(obj2);

console.log(typeof(obj2["name"]));
console.log(obj2["age"]);