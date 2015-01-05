var threejs_canvas = angular.module('threejs_canvas', ['sceneServices']);

threejs_canvas.controller('canvasCtrl', ['$scope', 'mainSvc', 
	function($scope, mainSvc){

		// $scope.scene;

	}
]);

threejs_canvas.directive('canvasDir', ['mainSvc', function(mainSvc){
	return {
	    // templateUrl: '/templates/canvas.html',
	    restrict: 'A',
	    controller: 'canvasCtrl',
	    link: function(scope, element, attributes){

	    	mainSvc.camera.position.set(0,0,90000);

	    	THREE.Mesh.prototype.disa = function(scene){
	    		var _self = this;
	    		setTimeout(function(){
	    			scene.remove(_self);
	    		}, 8000);
	    	};

	    	var scale = 24;

	    	var anchor = new THREE.Object3D();
	    	mainSvc.addObject([anchor]);
	    	anchor.add(mainSvc.camera);
	    	anchor.rotation.x = Math.PI / 4;
	    	
	    	var gridHelper = new THREE.GridHelper( 100000, 10000 );
	    	mainSvc.addObject(gridHelper);
	    	
	    	mainSvc.setRenderer({antialias:true,autoClear:true, alpha:true});
	    	mainSvc.renderer.setSize(500, 500);
	    	mainSvc.renderer.setClear = true;
			element.append(mainSvc.renderer.domElement);

			var earth = new THREE.Mesh(new THREE.SphereGeometry( 6371, 32, 32 ), mainSvc.createMat());
			earth.name = 'earth';
			earth.velocity = new THREE.Vector3(0.7,0,-0.7);
			earth.mass = 5.972 * Math.pow(10, 24);

			var craft = new THREE.Mesh(new THREE.SphereGeometry( 1200, 12, 12 ), mainSvc.createMat());
			craft.name = 'craft';
			craft.position.z = 6371 + 435 + 4000;
			craft.velocity = new THREE.Vector3(5.66,0.0,0).add(earth.velocity.clone());
			craft.mass = 5.972 * Math.pow(10, 24) * 0.2;

			var iss = new THREE.Mesh(new THREE.SphereGeometry( 1200, 12, 12 ), mainSvc.createMat());
			iss.name = 'iss';
			iss.position.z = 6371 + 435 + 2000;
			iss.velocity = new THREE.Vector3(7.66,0.0,0).add(earth.velocity.clone());
			iss.mass = 1;

			var craft2 = new THREE.Mesh(new THREE.SphereGeometry( 400, 12, 12 ), mainSvc.createMat());
			craft2.position.z = 6371 + 435 + 7000;
			craft2.velocity = new THREE.Vector3(-5,0.0,0).add(craft.velocity.clone());
			craft2.mass = 0.0001;

			mainSvc.addObject(earth);
			mainSvc.addObject(craft);
			mainSvc.addObject(craft2);

			// (5.974*10**24 kg)(7.349*10**22 kg)/(3.844*10**8 m)2
			// var g1 = 1/
			// 	((5.974*Math.pow(10,24))*(7.349*Math.pow(10,22))/
			// 					(Math.pow(3.844, 2)*Math.pow(10,16)));
	
			
			var G = 6.67384 * Math.pow(10, -11) * Math.pow(10, -9) * scale;

			function grav(mesh, wells, cb){

				var oldPosition = mesh.position.clone();
				var sum = new THREE.Vector3();

				for (var i = 0 ; i < wells.length ; i++) {

					var m 		= wells[i].mass;
					var radius2 = Math.pow(mesh.position.distanceTo(wells[i].position.clone()), 2);
					var force 		= (- (G * m) / radius2);
					var forceComp 	= force - force * mesh.mass/(mesh.mass + m);
					var vel 		= mesh.position.clone().sub(wells[i].position.clone()).setLength(forceComp);

					sum.add(vel.clone());
				};

				mesh.position.add( mesh.velocity.clone().add( sum ).multiplyScalar(scale) );
				mesh.velocity = oldPosition.clone().add( mesh.velocity.clone().add( sum )).sub(oldPosition.clone());// mesh.position.clone().sub(oldPosition.clone());

				cb(mesh.position.clone());
			};

			anchor.applyMatrix(new THREE.Matrix4().makeRotationX( - Math.PI / 2 ));
			var mils = 1;
			var time = setInterval(function(){

				// anchor.applyMatrix(new THREE.Matrix4().makeRotationY( - Math.PI / 1000 ));

				grav(craft, [earth, craft2], function(pos){
					var c = new THREE.Mesh(new THREE.BoxGeometry(100,100,100),mainSvc.createMat());
					c.position.copy(pos.clone());
					mainSvc.addObject(c);
					c.disa(mainSvc.mainScene);
				});
				grav(earth, [craft, craft2], function(pos){
	
				});
				grav(craft2, [craft, earth], function(pos){
					var c = new THREE.Mesh(new THREE.BoxGeometry(100,100,100),mainSvc.createMat());
					c.position.copy(pos.clone());
					mainSvc.addObject(c);
					c.disa(mainSvc.mainScene);
				});

				mainSvc.render();
			}, 1);

			
	    }
	};
}]);