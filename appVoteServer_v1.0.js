//---------------------------------------------------------
// AppVoteServer v1.0
// Copyright © 2013-2018 Fostudio. All rights reserved.
// Feedback: zhangjia517@hotmail.com
//---------------------------------------------------------

//2015年6月08日20:50:53 Http服务搭建
//2015年6月11日15:15:03 Json解析

var http = require("http");
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {
		auto_reconnect : true
	});
var db = new mongodb.Db('vote', server, {
		safe : true
	});

function RequestListener(req, res) {
	req.setEncoding('utf-8');

	if (req.method == "GET") {
		res.end("Welcome to AppVoteServer! \nHello everybody!");
	}

	if (req.method == "POST") {
		req.on("data", function (chunk) {
			console.log(chunk);

			var message = JSON.parse(chunk);
			switch (message["messageID"]) {
			case 10001:
				res.setHeader("messageID", message["messageID"]);
				res.end("fuck yourself");
				break;
			case 10002:
				// console.log(message["messageID"]);
				// console.log(message["infoId"]);

				var jsonData = "";
				db.open(function (err, db) {
					if (!err) {
						db.collection('v', {
							safe : true
						}, function (err, collection) {
							if (err) {
								console.log(err);
							}
							collection.find({
								_id : message["infoId"]
							}).toArray(function (err, docs) {
								if (docs) {
									var str = JSON.stringify(docs);
									str = str.substring(1, str.length - 1);
									if (str != "") {
										var obj = JSON.parse(str);
										//console.log(obj["_id"]);
										jsonData = '{\"_id\":' + obj["_id"] +
											',\"optionA\":' + obj["optionA"] +
											',\"optionB\":' + obj["optionB"] +
											',\"optionC\":' + obj["optionC"] +
											',\"optionD\":' + obj["optionD"] +
											',\"optionAll\":' + obj["optionAll"] + '}';
										res.setHeader("messageID", message["messageID"]);
										res.end(jsonData);
									} else {
										console.log("Cannot found");
										jsonData = '{\"_id\":' + message["infoId"] + '}';
										res.setHeader("messageID", message["messageID"]);
										res.end(jsonData);
									}
								} else
									console.log("data is null");
							});
						});
					}
				});
				break;
			default:
			}
		});
	}
}

var appVoteServer = http.createServer(RequestListener);
appVoteServer.listen(5517);

console.log('AppVoteServer running at http://127.0.0.1:5517/');
