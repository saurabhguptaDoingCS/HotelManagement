/**
*
@author  vpatidar@adoe.com
*
*/
(function()
{
	
	 angular.module("hotel_module",["service_module","custom_directives"]); // [] says dependencies among module ... creating a module with square brackets.. similar to including or importiung files

	 //--------------------------------------------------------------------//
	 angular.module("hotel_module").controller("HotelMenuController", function($rootScope,$scope){
	 	$scope.searchText="";
	 	$scope.updatehotel = function(){
	 		$rootScope.$broadcast("filter_event",$scope.searchText);
	 	}
	 	$scope.updateview = function(txt){
	 		//$scope.view=txt;
	 		$rootScope.$broadcast("change_view",$scope.view);

	 	}
	 }); 

	 //--------------------------------------------------------------------//
	 angular.module("hotel_module").controller("HotelListController", function($rootScope,$scope,HotelService){ // getting a module without square brackets
	 	$scope.displayPrev = false;
	 	$scope.displayNext = true;
		$scope.hotels=[];
		$scope.maxSize = 1;
		$scope.begin=0;
		$scope.user={};
		$scope.successTextAlert = "Congrats! Room Reserved!!";
		$scope.showSuccessAlert = false;
	 	

		HotelService.getHotels().then(function(result){
	 		$scope.hotels=result.data;
	 	 });

	 	//$scope.viewHotel=false;
	 	//$scope.ShowTag =false;
	 	//$scope.view=false;
	 	$scope.closeSideForm = function()
        {
          document.getElementById("mySidenav").style.width = "0";
          $scope.showSuccessAlert = false;
          $scope.user={};
        }

        $scope.showHotelDetails = function(hotel)
        {
        	$scope.showSuccessAlert = false;
            $scope.selectedHotel = hotel; //console.log(hotel);//  console.log(angular.element('#mySidenav'));
            angular.element('#mySidenav').css('width','350px');
        }

 
        $scope.saveReservation = function(form)
        {
          
          var reservation={};   //console.log(form);  //console.log(12);
          reservation.id = $scope.reservations[$scope.reservations.length-1].id +1;
          reservation.email = $scope.user.email;
          reservation.checkin = $scope.user.checkin;
          reservation.checkout = $scope.user.checkout;
          reservation.hotel_id = $scope.selectedHotel.id;  // console.log(reservation);
         
          HotelService.placeReservation(reservation);
          $scope.showSuccessAlert = true;
          $scope.user={};  // document.getElementById("mySidenav").style.width = "0";
         
        }
    
	 	
	 	$scope.loaded=false;


	 	$scope.getHotelDetails=function(searchText,numResults){
	 		console.log(searchText);  console.log('hiiiiiiii'); console.log(numResults);
	 		
	 		$scope.maxSize=numResults;

	 	 	HotelService.getHotels().then(function(result){
	 	 	$scope.hotels=result.data;
	 	 	//console.log($scope.hotels);
	 	 	$scope.loaded=true;
	 	 });
	 	 //console.log('All HOtels: '); console.log($scope.hotels);

	 	 $scope.results=filterHotels($scope.hotels,searchText);

	 	 //console.log($scope.results);

	 	 var temp=[]; //= $scope.results;
	 	 angular.copy($scope.results, temp);

	 	 //console.log('getHotels'); console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 	 var diff = $scope.results.length*1 - $scope.begin*1;

	 	 if (diff <= $scope.maxSize){
	 	 		$scope.displayNext = false;
	 	 }
	 	 //if (diff < $scope.maxSize){
	 	 //	$scope.hotelss =temp.splice($scope.begin, diff);
	 	 //}
	 	 //else{
	 	 $scope.hotelss =temp.splice($scope.begin,Math.min(diff,$scope.maxSize));
	 	 //$scope.hotelss =temp.splice($scope.begin,$scope.maxsize);
	 	//}
	 	 //console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 	 //console.log($scope.hotelss);
	 	 //$scope.begin+=$scope.maxsize;

	 	 //if $scope.hotels.length*1 - 1 - $scope.begin*1 >= $scope.maxSize*1 {
	 	 //	$scope.displayPrev = false;
	 	//	$scope.displayNext = true;
	 	 //}

	 	}


	 	$scope.goNext = function(){
	 		//console.log('next'); console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 		$scope.begin = $scope.begin*1 + $scope.maxSize*1;
	 		var temp=[]; //= $scope.results;
	 	 	angular.copy($scope.results, temp);

	 	 	var diff = $scope.results.length*1 - $scope.begin*1;
	 	 	$scope.hotelss =temp.splice($scope.begin,Math.min(diff,$scope.maxSize));
	 	 	if (diff <= $scope.maxSize){
	 	 		$scope.displayNext = false;
	 	 	}
	 	 	//else{
	 	 	//	$scope.displayNext = true;	
	 	 	//}
	 	 	if ($scope.begin >= $scope.maxSize){
	 	 		$scope.displayPrev = true;	
	 	 	}
	 	 	//else{
	 	 	//	$scope.displayPrev = false;	
	 	 	//}

	 	

	 		//$scope.hotelss = temp.splice($scope.begin,$scope.maxSize);
	 		//console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 	}


	 	$scope.goPrevious = function(){
	 		//console.log('Prev'); //console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 		
	 		$scope.begin = $scope.begin*1 - $scope.maxSize*1;
	 		if ($scope.begin < 0)
	 	 		$scope.displayPrev = false;
	 		var temp=[]; //= $scope.results;
	 	 	angular.copy($scope.results, temp);
			var diff = $scope.results.length*1 - $scope.begin*1;

			if (diff > $scope.maxSize){
	 	 		$scope.displayNext = true;
	 	 	}
			if ($scope.begin <= 0){
	 	 		$scope.displayPrev = false;	
	 	 	}
	 	   	$scope.hotelss = temp.splice($scope.begin,$scope.maxSize);
	 	   	//console.log($scope.begin); console.log($scope.maxSize); console.log($scope.results.length)
	 	}


	 	
	 	var filterHotels= function(hotelData,txt){
	 		var result=[];
	 		console.log(hotelData);
	 		$.each(hotelData,function(id,c){
	 			if(c.name.toUpperCase().indexOf(txt.toUpperCase())>=0){
	 				console.log("yes"); //console.log(c);
	 				result.push(c);
	 			}

	 		});
	 		console.log(result);
	 		return result;
	 	}

	 	HotelService.getReservations().then(function(result){
	 	 	$scope.reservations=reservationData=result.data;
	 	 	$.each(reservationData,function(id,obj){
	 	 		HotelService.getHotel(obj.hotel_id).then(function(result){
	 	 			obj.hotel_name=result.data.name; //adding a new field to the object
	 	 			//reservationData[id]
	 	 		});
	 	 		
	 	 	});
	 	 	$scope.reservations=reservationData;
	 	 });



		$scope.updateEntry= function(hotel){
				//$scope.hotel=hotel;
				HotelService.updatehotel(hotel.id,hotel)
		}

	 	$scope.$on("change_view", function(evt,txt){ 

	 		$scope.view=txt;
	 	});

	 	$scope.delete= function(hotel){
	 	$scope.hotels.splice($scope.hotels.indexOf(hotel),1);
	 	HotelService.deletehotel(hotel.id);
	 	//actual delete will be $http.delete(...) using Restful services	
	 	}

/*


		//angular.element('#main').css('marginLeft', '250px');
           // angular.element('#mySidenav').ng-style = "{width: '250px'}";
            //angular.element('#main').ng-style="{marginLeft: '250px'}";
            //document.getElementById("mySidenav").style.width = "250px";
            //document.getElementById("main").style.marginLeft = "250px";
            //console.log(document.getElementById("mySidenav"));
            //console.log("ff");
           // $scope.viewHotel=true;
            //$scope.loaded=true;
	 	  
	 	*/
	 	/*
	 	HotelService.getHotels().then(function(result){
	 	 	$scope.hotels=result.data;
	 	 });*/
	 });

	
})();
