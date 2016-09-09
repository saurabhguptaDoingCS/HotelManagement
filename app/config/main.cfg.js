/**
* Main Confiuration file for Routing and Authorization code
*
*/
 (function()
 {
 	angular.module("main_module",["ngRoute","ngCookies","authenticationApp","hotel_module","service_module","custom_directives"]);

 	angular.module("main_module").controller("HeaderController", function($scope,$location){
 		$scope.isActive=function(viewLocation){
 			return viewLocation==$location.path();
 		};
 	});
 	angular.module("main_module").config(function($routeProvider){
 		$routeProvider.

 		when("/",{
 			'template':'<h1> Welcome to Hotel Booking Application!!!</h1>'
 		}).
 		when("/hotels",{
 			'templateUrl':'app/page/hotels.html'
 		}).
 		when("/customer_orders/:id",{
 			'template':'{{hotels}}'
 			
 		}).
 		when("/reservations",{
 			'templateUrl':'app/page/reservation.html',
 			'controller': function(HotelService,$scope){
 				HotelService.getReservations().then(function(result){
 					$scope.reservations=result.data;
 				}
 				);
 			}
 		});

 	}).run();

	
    })();