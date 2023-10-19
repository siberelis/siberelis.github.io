

      //Scene
      var scene = new THREE.Scene();
	
	  

      //Camera
		var height = 500;
		var width = 500;
		var distance = 1000;
		var diag = Math.sqrt((height*height)+(width*width))
		var fov = 2 * Math.atan((diag) / (2 * distance)) * (180 / Math.PI); //Field of View
		var camera = new THREE.PerspectiveCamera(8, 1 / 1, 0.3, distance);
	
  
    camera.position.y = 0
    camera.position.x = 0
    camera.position.z = -90




      //Canvas
      var myCanvas = document.getElementById('myCanvas');

      //Renderer
      var renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas,
		alpha: true
      });


		//renderer.setClearColor(0x000000);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(500, 500);
		renderer.shadowMap.enabled = true;
    	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    	renderer.gammaInput = true;
    	renderer.gammaOutput = true;
    	renderer.antialias = true;
		document.body.appendChild( renderer.domElement );

		//LIGHTS
		var light = new THREE.AmbientLight(0xffffff, 0.7);
		light.power = 10;  // GE Lumens @ 60W incade.
		light.decay = 2;
		light.distance = Infinity;
		light.position.set(0, 2, 0);
		light.castShadow = false;
		light.shadowCameraVisible = false;
		scene.add(light);

		//OrbitControls
		orbit = new THREE.OrbitControls(
			camera, renderer.domElement 
     );
		orbit.maxPolarAngle = Math.PI / 2;
		orbit.update();
    orbit.enablePan = false,
    orbit.enableZoom = false;

   

		
		// Instantiate a loader
		var loader = new THREE.GLTFLoader();
		loader.load('feya.glb', handle_load);

		var mixer;

		var mesh;

	function handle_load(gltf)
	{
        mesh = gltf.scene;
        scene.add( mesh );
		mesh.rotation.y = 91;
    mesh.position.y = -4.5;
		


	//	mixer = new THREE.AnimationMixer( mesh );

        let animations = gltf.animations;
        if ( animations && animations.length ) {
        mixer = new THREE.AnimationMixer( mesh );
        for ( let i = 0; i < animations.length; i ++ ) {
        let animation = animations[ i ];
        mixer.clipAction( animation ).play(); }	}
	}


	//Render loop
	render();

	var delta = 0;
	var prevTime = Date.now();




	function render() {
		//exposure
//	renderer.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
		
var clock;
clock = new THREE.Clock();
		
		requestAnimationFrame(render);
		
			
			//	controls.update();
			//	mesh.rotation.y += 0.001;
				
				var delta = clock.getDelta();
		
				renderer.render(scene, camera);

				if (mixer) mixer.update(clock.getDelta()*15);

	}
   
