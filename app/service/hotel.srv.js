/*
* module to make rest calls
* @author : vpatidar@adobe.com
*/

(function(){
	angular.module("service_module",[]);
	//service is singleton - acts like a shared memory for controllers
	angular.module("service_module").service("HotelService",function($http,$q){


		
		this.getReservations=function(){
			var deferred = $q.defer();//promise
			$http.get("/reservations").then(function(result){
				deferred.resolve(result);
			},
			function(result){
				deferred.reject(result);
			});
			return deferred.promise;
		};

		this.getHotels=function(){
			var deferred = $q.defer();//promise
			$http.get("/hotels").then(function(result){
				deferred.resolve(result);
			},
			function(result){
				deferred.reject(result);
			});
			return deferred.promise;
		};


		this.placeReservation = function(reservationData)
			{
				var deferred = $q.defer(); //promise based, might take time because the server
				//may fulfil it by its own time.
				$http.post("/reservations",reservationData);
			};

		
		this.getHotel=function(id){
			var deferred = $q.defer();//promise
			$http.get("/hotels/"+id).then(function(result){
				deferred.resolve(result);
			},
			function(result){
				deferred.reject(result);
			});
			return deferred.promise;
		};

		this.deleteCustomer =function(id){
			$http.delete("/customers/"+id);
		};
		this.updateCustomer= function(id,customer)
		{
			$http.put("/customers/"+id,customer);
		};
		 this.addCustomer= function(custonmer){
		 	$http.post("/customers",customer);
		 }
		

	});
})();