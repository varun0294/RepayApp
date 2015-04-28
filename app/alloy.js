// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Titanium.include('/common/constant.js');
Alloy.Globals.CURRENT_USER = "";

var moment = require('alloy/moment');

if (OS_IOS || OS_ANDROID) {
	// Create collections
	Alloy.Collections.reimburse = Alloy.createCollection('reimburse');
	Alloy.Collections.reimburseDetail = Alloy.createCollection('reimburseDetail');
	Alloy.Collections.comment = Alloy.createCollection('comment');
	// Change default sorting (descending by date)
	// Alloy.Collections.comment.comparator = function(model) {
  		// return -(moment.parseZone(model.get('commentsDate')).unix());
	// };
	// Alloy.Collections.reimburseDetail.comparator = function(model) {
  		// return -(moment.parseZone(model.get('receiptDate')).unix());
	// };
	// Alloy.Collections.reimburse.comparator = function(model) {
  		// return -(moment.parseZone(model.get('projectDate')).unix());
	// };
	//Seed data
	fillTestData();
	
	//Alloy.Globals.top = 0;
	//Alloy.Globals.tableTop = '50dp';

	try {
		// check for iOS7
		// if (OS_IOS && parseInt(Titanium.Platform.version.split(".")[0], 10) >= 7) {
			// Alloy.Globals.top = '20dp';
			// Alloy.Globals.tableTop = '70dp';
		// }
	} catch(e) {
		// catch and ignore
	}
}

function addReimburse(item) {
    var reimburses = Alloy.Collections.reimburse;

    // Create a new model for the todo collection
    var reimburse = Alloy.createModel('reimburse', {
    	userId : 1,
    	userName : "Adam", //Alloy.Globals.CURRENT_USER,
    	userAvatar : "/icon/ic_action_user.png",
        title : item.title,
        projectDate : moment(item.projectDate).utc().toISOString(),
        sentDate : item.sentDate,
        status : item.status,
        total : item.total,
        isDeleted : 0,
    });

    // add new model to the global collection
    reimburses.add(reimburse);

    // save the model to persistent storage
    reimburse.save();

    // reload the tasks
    //reimburses.fetch();
    return reimburse;
}

function addReimburseDetail(item) {
    var reimburseDetails = Alloy.Collections.reimburseDetail;

    // Create a new model for the todo collection
    var reimburseDetail = Alloy.createModel('reimburseDetail', {
    	reimburseId : item.reimburseId,
        name : item.name,
        description : item.description,
        receiptDate : moment(item.receiptDate).utc().toISOString(),
        status : item.status,
        amount : item.amount,
        urlImageSmall: item.urlImageSmall,
        urlImageMedium: item.urlImageMedium,
        isDeleted : 0,
    });

    // add new model to the global collection
    reimburseDetails.add(reimburseDetail);

    // save the model to persistent storage
    reimburseDetail.save();

    // reload the tasks
    //reimburses.fetch();
    return reimburseDetail;
}

function addComment(item) {
    var comments = Alloy.Collections.comment;

    // Create a new model for the todo collection
    var comment = Alloy.createModel('comment', {
    	reimburseDetailId : item.reimburseDetailId,
        message : item.message,
        commentsDate : moment(item.commentsDate).utc().toISOString(),
        userId : 2,
        username : "Johan",
    });

    // add new model to the global collection
    comments.add(comment);

    // save the model to persistent storage
    comment.save();

    // reload the tasks
    //reimburses.fetch();
    return comment;
}

function fillTestData() {
	// delete all data from last to first
	var comments = Alloy.Collections.comment;
	comments.fetch(); // Make sure collection is in sync
	for (var i = comments.models.length-1; i >= 0; i--) {
  		comments.models[i].destroy();        
	}
	var reimburseDetails = Alloy.Collections.reimburseDetail;
	reimburseDetails.fetch(); // Make sure collection is in sync
	for (var i = reimburseDetails.models.length-1; i >= 0; i--) {
  		reimburseDetails.models[i].destroy();        
	}
	var reimburses = Alloy.Collections.reimburse;
	reimburses.fetch(); // Make sure collection is in sync
	for (var i = reimburses.models.length-1; i >= 0; i--) {
  		reimburses.models[i].destroy();        
	}
	
	
	//create new data
	for (var i = 1; i <= 25; i++) {
		var status = Math.round(Math.random()*3);
		var total = Math.round(Math.random()*1000)*1000 + 10000;
		var parent = addReimburse({
			title : "Proyek"+i+"  sadjhgaskfjhadjfhldahsjghksdjghksjhgksjhgksjhgfjhgkjdshgkjshgkjdhg",
			total : total,
			status : status,
			sentDate : status >= STATUSCODE[Const.Sent] ? moment().add(i, "days").format("YYYY-MM-DD") : null,
			projectDate : moment().add(i, "days").format("YYYY-MM-DD")
		});
		var detail = addReimburseDetail({
			reimburseId : parent.id,
			name : "Merchant"+i,
			description : "znnfhtdkjugkjfxgffdhgfhhhlkjhhgdgfbkbjtddfdgfhfsggfshfkhkjh sadpouoiyrtyu",
			amount : total,
			status : status,
			urlImageSmall : "/icon/ic_action_photo.png",
			urlImageMedium : "/icon/ic_action_photo.png",
			urlImageOriginal : "/icon/ic_action_photo.png",
			receiptDate : moment().add(i, "days").format("YYYY-MM-DD")
		});
		var comment = addComment({
			reimburseDetailId : detail.id,
			message : "Ok thanks "+i,
			commentsDate : moment().add(i, "days").format("YYYY-MM-DD")
		});
	}
}
