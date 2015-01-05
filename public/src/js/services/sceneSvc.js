var sceneServices = angular.module('sceneServices', []);

sceneServices.factory('mainSvc', [
  function(threejs_canvas) {
    return new function() {

    	var _self = this;
    	this.mainScene = new THREE.Scene();
    	this.camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000000 );
    	this.renderer;

    	this.addObject = function(obj){
    		if(obj instanceof Array){
    			for(var i = 0 ; i < obj.length ; i++){
    				_self.mainScene.add(obj[i]);
    			}
    		}else{
    			_self.mainScene.add(obj);
    		}
    	};

    	this.setRenderer = function(params){
    		this.renderer = new THREE.WebGLRenderer(params);
    		return this.renderer;
    	};

    	this.render = function(){
    		this.renderer.render( this.mainScene, this.camera );
    	};

    	this.createMat = function(){
    		return new THREE.MeshLambertMaterial({color:0x00ff00, wireframe:true});
    	};
    }
}]);