var router 		 	 = require('express').Router();
var bodyParser 		 = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var jsonParser 		 = bodyParser.json();
var bill             = require('.././models/bill');
// app.use();
// app.use()

router.post('/vote', urlencodedParser,jsonParser, function(req,res){
	console.log("post");
	console.log(req.body)
	// req.body.yea++;
	// console.log(req.body.vote.yea);
	var currYea = req.body.vote.yea;
	var newYea = currYea + 1;
	// var userVote   = req.body.yea;
	var voteBillId = req.body.vote.bill_id;
	console.log(voteBillId);
	// var yeaUp = 2;
	// var currVal =0;
	// bill.findOne({"id":voteBillId},'yea', function(err, doc){
	// 	// var billObj = doc.toObject();
	// 	// console.log(billObj);
	// 	// var currVal = billObj.yea++;
	// 	// console.log("____");
	// 	// console.log(doc.yea);
	// 	// currVal = doc.yea;
	// 	// yeaUp = currVal + 1;
	// 	// console.log(yeaUp);
	// }).lean()
	bill.findOneAndUpdate({"id":voteBillId}, {$set:{yea: currYea}}, {new:true}, function(err, item){
		// console.log(yeaUp);
		if (err){
			return console.log(err);
		}else{
			// console.log(item)
			res.status(200);
			console.log("___");
			console.log(item);
			return  res.send(item);
		}
	})
	// bill.findOne({id: voteBillId}, function(err, item){
	// 	if(err){
	// 		console.log(err)
	// 		res.status(400)
	// 			.json({err:err});
	// 	} else{
	// 		if (userVote){

	// 			 	var _newVote = item({
	// 				yea: userVote;
	// 			});
	// 			console.log('its yea');
	// 		}
			
	// 	}
	// })
	// console.log(userVote);
});

module.exports = router;