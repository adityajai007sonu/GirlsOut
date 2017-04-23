var myApp=angular.module('starter.controllers', [])

myApp.factory('Data',function(){
    return{
        id:''
    };
});

myApp.factory('Search',function(){
    return{
        area:'',
        service:''
    };
});

myApp.controller('AppCtrl',['$scope','starter.UserService','$ionicModal','$timeout',function($scope,UserService,$ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

   //Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal1.hide();
  };

  // Open the login modal
  $scope.login = function () {

    $scope.modal1.show();
  };
    //create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
  }).then(function (modal) {
      $scope.modal2 = modal;
  });


    //signup form
  $scope.signupForm = function () {
      
      $scope.modal2.show();

  }
  $scope.closesignup = function () {
      $scope.modal2.hide();

  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function (loginData) {
      console.log('Doing login', loginData);

      var ID = UserService.GetsUserID(loginData);
      if (ID != "") {
          $scope.Message = "you are logged in";
          $timeout(function() {
                  $scope.closeLogin();
                }, 2000);
              
      }

      else {
          $scope.Message = "please sign up";
      }
  }
  $scope.dosignup = function (signupdata) {
      UserService.insertUser(signupdata);
      $scope.Message = "Thanks for sign up.Now you can Sign In";
      $timeout(function () {
          $scope.closesignup();
      }, 1000);

  }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  //  $timeout(function() {
  //    $scope.closeLogin();
  //  }, 1000);
  //};
}])

myApp.controller('homeCtrl', function($scope,$stateParams,$http,$location,Search) {
  $scope.list_areas = {
        data: [{name: 'Malviya Nagar'},
               {name: 'Sanganer'},
               {name:'Bajaj Nagar'}]
    };
    $scope.list_services = {
        data: [{name: 'Dancing'},
               {name: 'Singing'},
               {name:'Yoga'},
               {name:'Gym'},
               {name:'Music'},
               {name:'Salon'},
               {name:'Club'}]
    };
    $scope.services = [
    { title: '1. PASS A NOTE - Remember the good ol’ days of “Do you want to go out with me? Check ‘yes’ if you do”? Send your cute coworker a schooldays-style note, asking her on a date.', id: "Singing", img: '1.jpg' },
    { title: '2. CALL HER - Nothing fancy here. If you asked for her number, call her when you say you would and ask her out on a date. Your straightforward approach will be appreciated.', id: "Dancing", img: '2.jpg' },
    { title: '3. BUY TICKETS - If you both love the same band, order tickets for the next local concert. Show up at her desk with a hardcopy ticket and ask her to go with you.', id: "Yoga", img: '3.jpg' },
    { title: '4. SAY IT WITH FLOWERS - Old-fashioned, romantic and hard to resist.', id: "Gym", img: '4.jpg' },
    { title: '5. OR SAY IT WITH PIZZA - Order her favorite pizza and have it delivered to her home or workplace (if appropriate). Make sure there’s a note inside the box: “I know this is cheesy, but I’d love to take you out for dinner next week.”', id: "Gym", img: '5.jpg' },
{ title: '5. BRING HER A COFFEE- If you know she’s been working long hours recently, swing by her workplace with her regular coffee order and a note of encouragement. Tell her you’d like to take her out when the craziness subsides.', id: "Gym", img: '6.jpg' },
{ title: '6. SING IT- There’s nothing more awkward, embarrassing and slightly endearing than dedicating a song to your crush on karaoke night.', id: "Gym", img: '7.jpg' },
{ title: '7. LET YOUR DOG DO IT FOR YOU - If your crush frequents the same dog park as you, tie a note around your dog’s neck for her to find.', id: "Gym", img: '8.jpg' },
{ title: '8. STAY SOBER- If you’re out at happy hour together, skip the libations. When she asks why, tell her you want to be sober when you ask her out to dinner — and then ask her out to dinner.', id: "Gym", img: '9.jpg' },
{ title: '9. PROPOSE AN IRRESISTIBLE PLAN - Vagueness is easy to dismiss. Ask her out on a specific, tailor-made date that includes an activity, event or restaurant that you know she loves or has been wanting to try.', id: "Gym", img: '10.jpg' },
{ title: '10. PLAN AHEAD - Ask a girl out for tomorrow night, and she’s likely to be unavailable. Respect her time and schedule, and give a week’s advance notice.', id: "Gym", img: '11.jpg' },
{ title: '11. KEEP IT IN PERSPECTIVE - You’re asking her out on a date, not for her hand in marriage. Give yourself a pep talk to keep the nerves at bay, and don’t let the fear of rejection stop you from trying.', id: "Gym", img: '12.jpg' },
{ title: '12. VOLUNTEER TOGETHER - The couple that serves together does dinner together? Appeal to her philanthropic side and team up for a weekend volunteering project. Propose that you end the day with dinner — you’ll have a lot to talk about.', id: "Gym", img: '13.jpg' },
{ title: '13. BUY HER A LOTTERY TICKET - Tell her that if she wins, she’s taking you out to dinner. If she doesn’t, you’ll take her out.', id: "Gym", img: '14.jpg' },
{ title: '14. WRITE HER A LETTER - Cat got your tongue? Write it out. Letter-writing is fast becoming a lost art form. Drop her a line in the mail and you’re sure to impress her.', id: "Gym", img: '15.jpg' },
{ title: '15. JUST DO IT — IN PERSON - Sometimes keeping things simple is best. Wait for a moment when you can be alone and ask her out directly. Don’t play it too cool. Let her know how excited you are to date her if she says yes, and thank her for her honesty if she says no. ', id: "Gym", img: '16.jpg' },

  ];
    $scope.selectedChoice = function(){
        // 
        var selectedArea = 'Malviya Nagar';
        var selectedService = 'Dancing';
        Search.area=selectedArea;
        Search.service=selectedService
        
        
        
        $http.post('php/search.php', {
        'area' : selectedArea,
        'service' : selectedService
        
    }).success(function(response){
          console.log(response);
         // $location.path('/app/thankyou')
      });
        $location.path('/app/aftersearch') 
    }
})

myApp.controller('aftersearchController', function($scope, $stateParams, $http,Search,Data) {
     $http.get('json/services'+Search.service+'.json',{}).success(function(data){
        Data.id=Search.service;
        $scope.lists=[];
        var k=0
        //console.log($stateParams.listId);
        console.log("hi");
        for(i=0;i<data.length;i++){
            if(data[i].area==Search.area){
                $scope.lists[k]=data[i];
                k=k+1;
                console.log($scope.lists);
                
            }
        }
            
    });
})

myApp.controller('ListingController', function($scope, $stateParams, $http,Data) {
    console.log($stateParams);
    Data.id=$stateParams.serviceId;
    console.log(Data.id);
    $http.get('json/services'+$stateParams.serviceId+'.json',{}).success(function(data){
			$scope.lists = data;
        console.log($scope.lists);
		});
})

myApp.controller('DetailController',function($scope, $stateParams, $http,Data){
    var x = Data.id;
    console.log(x);
     $http.get('json/services'+Data.id+'.json',{}).success(function(data){
         $scope.lists = data;
         
         for(i=0;i<data.length;i++){
             if(data[i].id==$stateParams.listId){
                 $scope.detail=data[i];
                 //$scope.demo=data[i].id;
                 break;
             }
         }
		});
    console.log("hello");
    $http.get('json/'+Data.id+'_services.json',{}).success(function(data){
        $scope.lists=data;
        $scope.tuples=[];
        var k=0
        console.log($stateParams.listId);
        console.log("hi");
        for(i=0;i<data.length;i++){
            if(data[i].id==$stateParams.listId){
                $scope.tuples[k]=data[i];
                k=k+1;
                console.log($scope.tuples);
                
            }
        }
    });
    
    $http.get('json/'+Data.id+'_gallery.json',{}).success(function(data){
        $scope.lists=data;
        var j=0;
        $scope.images=[];
        console.log($stateParams.listId);
        console.log("hi");
        for(i=0;i<data.length;i++){
            if(data[i].id==$stateParams.listId){
                $scope.images[j]=data[i];
                j=j+1;
                console.log($scope.images);
                
            }
        }
    });       
})
myApp.controller('OrderController',function($scope,$stateParams,Data,$http){
    $scope.message=$stateParams.serviceId;
    $http.get('json/'+Data.id+'_services.json',{}).success(function(data){
        $scope.lists=data;
        for(i=0;i<data.length;i++){
            if(data[i].service_id==$stateParams.serviceId){
                $scope.order=data[i];
                break;
            }
        }
    });
})
myApp.controller('PlaylistCtrl', function($scope, $stateParams) {
});
