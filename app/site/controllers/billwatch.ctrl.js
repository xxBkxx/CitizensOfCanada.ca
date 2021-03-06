(function(){
	
	angular
		.module('ccApp')
		.controller('BillWatchCtrl', function BillWatchCtrl($scope, $rootScope, $location, billSrv, billComments, bills, initUser, initVotes, $http, commentSrv, authSrv){
		 	
		 	var billWatchVm = this;
		 	// console.log(bills);
			// billWatchVm.bills = billSrv.getBills();
			billWatchVm.bills 			= bills;
			billWatchVm.billComments    = billComments;
			billWatchVm.initVotes  		= initVotes;
			billWatchVm.authSrv  		= authSrv;
			billWatchVm.toMainPage      = toMainPage;
			billWatchVm.toAboutPage     = toAboutPage;
			billWatchVm.toBillWatchPage = toBillWatchPage;
			billWatchVm.toPrivacyPage   = toPrivacyPage;
			billWatchVm.toTermsPage 	= toTermsPage;
			billWatchVm.voteYea 		= voteYea;
			// billWatchVm.voteNay			= voteNay;
			billWatchVm.comment         = comment;
			billWatchVm.readBill  		= readBill;
			billWatchVm.placeComment    = placeComment;
			billWatchVm.commentHtml		= commentHtml;
			billWatchVm.initUser		= initUser;
			billWatchVm.showComments    = showComments;
			billWatchVm.toLoginPage     = toLoginPage;
			billWatchVm.signOut			= signOut;
			billWatchVm.removeMessage   = removeMessage;
			// billWatchVm.numberOfCommentsById = numberOfCommentsById;
			$scope.user                 = initUser;
			// $scope.comment.user_name           =  comment.user_name;
			// console.log($scope.comment.user_name);
			// $scope.pleaseShow = true;
			billWatchVm.toShow          = false;
			$scope.activeIndex;
			// console.log($scope.user);
			// console.log(billWatchVm.billComments);
			$scope.billComments = billWatchVm.billComments;

			$scope.regex = '[a-zA-Z0-9 .,!\$\'\"]+';
			// console.log(billWatchVm.billComments[0].user_name);
			// console.log(billWatchVm.commentUSerName);
			//Link Pages
			console.log(initVotes[0].yea);
					if( localStorage.auth_token =='' || 
						localStorage.auth_token == undefined || 
						localStorage.auth_token == 'guest'){
						console.log('here');
						// $('.message-container').css('visibility', 'visible');
						
						// $('.icon').css('visibility', 'hidden');
						// $('.vote-up').css('visibility', 'hidden ');
						// $('.vote-down').css('visibility', 'hidden ');						
						// $('.icon').css('visibility', 'visible');
						this.loggedin = false;
					}
			
			function toMainPage(){
				$location.url('/home');
			}
			function toAboutPage(){
				$location.url('/about');
			}

			function toLoginPage(){
				$location.url('/login');
			}

			function toBillWatchPage(){
				$location.url('/billWatch');
			}

			function toPrivacyPage(){
				$location.url('/privacy');
			}

			function toTermsPage(){
				$location.url('/terms');
			}

			function signOut(){
				billWatchVm.authSrv.signOut();
			}

			function find_id(){

			}
			// billWatchVm.isShowing = function (index){
			// 	return billWatchVm.activeIndex === index;
			// }
			function showComments(index){

				$scope.activeIndex = index;
				console.log(index);

				// billWatchVm.activeIndex = index;
				// billId = parseInt(billId);
				// console.log('toShow');
				// console.log(billWatchVm.toShow);

				// // console.log('bill_id');
				// // console.log(billId);

				// console.log('commentId');
				// console.log(commentId);

				// console.log('billComments');

				// for(var i= 0; i<billWatchVm.billComments.length; i++){
				// 	// console.log(billWatchVm.billComments[i].bill_id);
				// 	if(billWatchVm.toShow == false ){
				// 		// console.log(billWatchVm.billComments[i].bill_id);
				// 		return billWatchVm.toShow = true;
				// 	}
				// 	else 
				// 		// console.log('toShow = false');
				// 		// console.log(billWatchVm.billComments[i].bill_id);
				// 		billWatchVm.toShow = false;
				// }
			}

			function isShowing(index){
		
					return $scope.activeIndex === index;
			
			}

			function comment(bill_id){

				if( localStorage.auth_token ==''         || 
					localStorage.auth_token == undefined || 
					localStorage.auth_token == 'guest'){

						$('.comment-message-container').css('visibility','visible');
						return;
						// window.alert("Please login to vote, you'll be redirected");
						// $location.url('/login');
					// $location.url('/login');
					// $('.message-container').show();
					// window.alert("please login to vote");
				}else{
					var comment = billWatchVm.billComment;

					billWatchVm.billComment = '';

					var token = localStorage.getItem('auth_token');

					var commentPkg = {

						billId:  bill_id,
						comment: comment,
						token:   token
					}

					// $scope.commentsArray.push(comment);
					// console.log($scope.commentsArray);

					$scope.userComm = comment;
				
					// var nameLetter = $scope.user.charAt(0);
					// for (var i = 1; i<27 ; i++){
					// 	console.log('---nameLetter---');
					// 	console.log(nameLetter);
					// 	user_letter = {fileNumber:i, letter:String.fromCharCode(96+i)}
						
					// 	if(user_letter.letter == nameLetter){
					// 		$scope.picture = user_letter.fileNumber;
					// 		console.log('---------- match -----');
					// 		console.log($scope.picture);
					// 	}

					// 	console.log('---------------user-------------');
					// 	console.log(user_letter);
					// }

					// console.log(billWatchVm.billComment);
					var comm = commentSrv.billComment(commentPkg);
					billWatchVm.content 	= billWatchVm.billComment;
					// billWatchVm.rawComment  = billWatchVm.billComment;
					//billWatchVm.commentHtml = "<p>paragraph</p>";///$sce.trustAsHtml("<p>paragraph</p>");
					//console.log(billWatchVm.commentHtml);
					// billWatchVm.userName 	= billSrv.updateCommentName();
						}
				}	

			function removeMessage(){
				// $('.message-container').remove();
				$('.vote-message-container').css('visibility','hidden');
				$('.comment-message-container').css('visibility','hidden');
			}

			function voteYea(decision, bill_id, billVote, index){
				// for (var i = 0; billWatchVm.bills.length; i++){
				// 		console.log(billWatchVm.bills.length);
				// 	if (billWatchVm.bills[i].id == bill_id){
				// 		console.log(billWatchVm.bills[i].yea)
				// 	}

				// }
				// $('.message-container').hide();
				if( localStorage.auth_token =='' || 
					localStorage.auth_token == undefined || 
					localStorage.auth_token == 'guest'){

						$('.vote-message-container').css('visibility', 'visible');

						// $location.url('/login');
						
						// $('.icon').css('visibility', 'hidden');
						// $('.vote-up').css('visibility', 'hidden ');
						// $('.vote-down').css('visibility', 'hidden ');						
						// $('.icon').css('visibility', 'visible');
						// this.loggedin = false;
						// window.alert("Please login to vote, you'll be redirected");
						// $location.url('/login');
						
					} else{
						if(decision == 1){

							var vote_count = billVote;
							vote_count = vote_count +1;
							billWatchVm.initVotes[index].yea = vote_count;
							console.log(vote_count);
							var vote  = { 
								yea: billWatchVm.initVotes[index].yea,
								bill_id: bill_id 
							};

							billSrv.vote(1,vote);

						} else if(decision == 0){
							console.log(billVote);
							var vote_count = billVote;
							vote_count = vote_count +1;
							billWatchVm.initVotes[index].nay = vote_count;
							var vote = {
								nay: billWatchVm.initVotes[index].nay,
								bill_id: bill_id
							};

							billSrv.vote(0,vote);
						}
							billWatchVm.currYeaValue = billSrv.updateBillVote();
							// console.log(billWatchVm.currYeaValue);
					}
						// $http.post('/vote', vote)
				// 	.then(function success(response){
				// 		console.log(response);
				// 		billWatchVm.bills.yea = response.data.yea;
				// 	}, function err(err){
				// 		console.log(err);
				// 	})
			}

			function placeComment(){
				console.log('here');
				billWatchVm.commentHtml();
			}

			function commentHtml(){
				console.log('here');
				billWatchVm.billCommentHtml = "<p>Here!</p>";
			}

			function readBill(bill_id){
				var billLink = 'http://www.parl.gc.ca/HousePublications/Redirector.aspx?RefererUrl=%2fHousePublications%2fPublication.aspx%3fLanguage%3dE%26Mode%3d1%26DocId%3d' +
					bill_id + '&File=4';
				$window.alert(billLink);
				$window.location.href = billLink;
			}
		})

})();