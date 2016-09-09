(function(){
angular.module("custom_directives",[]);
angular.module("custom_directives").directive("cardView",function(){
	return{
   		'restrict':'EA',
   		'scope':{
   			'first' : '=', //means first(here) = first(in html file)
				'second' : '=',
				'item' : '=',
				'info' : '=',
				'pic' : '=',
				'delete' : '&'
   		},
		'templateUrl': 'app/template/card.tmpl.html'
	}
});
})();