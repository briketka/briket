"use strict";
  

import * as THREE from "../lib/three/three.module.js";
// import { OrbitControls } from '../lib/three/OrbitControls.js';
import { PointerLockControls } from '../lib/three/PointerLockControls.js';
import Stats from "../lib/three/stats.module.js";


function init() {

    let canvas = document.getElementById("canvas");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stats = Stats();
    document.body.appendChild(stats.dom);
 

    // scene

    let scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xcce0ff ); // небо
    scene.fog = new THREE.Fog( 0xcce0ff, 0, 1500 ); // туман


    // camera

    let camera = new THREE.PerspectiveCamera( 55, w / h, 0.1, 3000 );
    camera.position.set( -7, 5, 15 );


    // lights

    scene.add( new THREE.AmbientLight( 0x666666 ) );


    var light = new THREE.DirectionalLight( 0xdfebff, 1 );
    light.position.set( 50, 200, 100 );

    light.position.multiplyScalar( 1.3 );

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 300;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 1000;

    scene.add( light );


    // loader

    let loader = new THREE.TextureLoader();


    // obj 1

    var poleMat = new THREE.MeshLambertMaterial();

    let geometryBox_1 = new THREE.BoxGeometry(1,1,1);
    let materialBox = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    for (let i=0; i < geometryBox_1.faces.length; i++) {
        geometryBox_1.faces[i].color.setRGB(Math.random(),Math.random(),Math.random())
    }
    let meshBox_1 = new THREE.Mesh(geometryBox_1,materialBox);
    meshBox_1.position.set(2 , 0.5 , 2 );
    
    scene.add(meshBox_1);


    // obj 2

    let geometryBox_2 = new THREE.BoxGeometry(1,1,1);
    let meshBox_2 = new THREE.Mesh(geometryBox_2, poleMat);
    meshBox_2.position.set(-3 , 0.5, 4 );
    meshBox_2.receiveShadow = true;
    meshBox_2.castShadow = true;
    scene.add(meshBox_2);


    // obj 2

    let materialArray = [];

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (1)/mystic_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (15)/haze_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (21)/meadow_lf.jpg');

    let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (23)/morning_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (27)/paze_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (29)/quirk_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (44)/yonder_lf.jpg');

    // let texture_ft = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('../img/penguins/penguins (45)/zeus_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    for(let i=0;i<6;i++) {
     materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(2000,2000,2000);  
    let skybox = new THREE.Mesh(skyboxGeo , materialArray);
    skybox.position.set(0 , 0 , 0 );
    scene.add(skybox);


//     // let grid_1 = new THREE.GridHelper(1000, 1000, 0xfffff, 0x0f0f3f);
//     // grid_1.position.set(0, 0 , 0);
//     // scene.add(grid_1);

//     // let groundTexture = loader.load( 'grasslight-big.jpg' );
//     // groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
//     // groundTexture.repeat.set( 25, 25 );
//     // groundTexture.anisotropy = 16;
//     // groundTexture.encoding = THREE.sRGBEncoding;

//     // let groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );


//     let geometry = new THREE.PlaneGeometry( 50, 10, 10 );
//     let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
//     let plane = new THREE.Mesh( geometry, groundMaterial );
//     plane.rotation.x = - Math.PI / 2;
//     scene.add( plane );

//     // let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), groundMaterial );
// 	// 			mesh.position.y = - 0.1;
// 	// 			mesh.rotation.x = - Math.PI / 2;
// 	// 			mesh.receiveShadow = true;
// 	// 			scene.add( mesh );


    // sphere

    var ballGeo = new THREE.SphereBufferGeometry( 0.3, 32, 16 );
    var ballMaterial = new THREE.MeshLambertMaterial();

    var sphere = new THREE.Mesh( ballGeo, ballMaterial );
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.visible = true;
    sphere.position.set(10,2,-20);
    scene.add( sphere );


    // ground

    var groundTexture = loader.load( '../img/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 300, 300 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), groundMaterial );
    mesh.position.y = - 0.0;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );


    // poles

    var poleGeo = new THREE.BoxBufferGeometry( 0.5, 100, 0.5 );
    

    var mesh = new THREE.Mesh( poleGeo, poleMat );
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );

    // var mesh = new THREE.Mesh( poleGeo, poleMat );
    // mesh.position.x = 125;
    // mesh.position.y = - 62;
    // mesh.receiveShadow = true;
    // mesh.castShadow = true;
    // scene.add( mesh );

    var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 255, 5, 5 ), poleMat );
    mesh.position.y = - 250 + ( 750 / 2 );
    mesh.position.x = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );

    // var gg = new THREE.BoxBufferGeometry( 10, 10, 10 );
    // var mesh = new THREE.Mesh( gg, poleMat );
    // mesh.position.y = - 250;
    // mesh.position.x = 125;
    // mesh.receiveShadow = true;
    // mesh.castShadow = true;
    // scene.add( mesh );

    // var mesh = new THREE.Mesh( gg, poleMat );
    // mesh.position.y = - 250;
    // mesh.position.x = - 125;
    // mesh.receiveShadow = true;
    // mesh.castShadow = true;
    // scene.add( mesh );


    // renderer

    let renderer = new THREE.WebGLRenderer({canvas:canvas});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(w,h);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;


    // controls


    // OrbitControls

    // let controls = new OrbitControls( camera, renderer.domElement );
    // controls.maxPolarAngle = (Math.PI * 0.5) * 0.99;
    // controls.minDistance = 0.0;
    // controls.maxDistance = 1000;


    // PointerLockControls

    const menuPanel = document.getElementById('menuPanel');
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function () { controls.lock(); }, false);


    let controls = new PointerLockControls( camera, document.body );
    controls.addEventListener('lock', () => menuPanel.style.display = 'none');
    controls.addEventListener('unlock', () => menuPanel.style.display = 'block');


    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    var prevTime = performance.now(); // для времени
    var velocity = new THREE.Vector3();

   

    var myVectorEve = new THREE.Vector3();


    // scene.add( controls.getObject() ); // ни на что не влияет



    let onKeyDown = function (event) {
        switch (event.keyCode) {
        case 87: // w
        case 38: // up
            // controls.moveForward(.25)
            moveForward = true;
            break;
        case 65: // a
        case 37: // left
            // controls.moveRight(-.25)
            moveLeft = true;
            break;
        case 83: // s
        case 40: // down
            // controls.moveForward(-.25)
            moveBackward = true;
            break;
        case 68: // d
        case 39: // right
            // controls.moveRight(.25)
            moveRight = true;
            break;
        case 69: // e
            // controls.moveRight(.25)
            keyE_max();
            break;
        case 32: // space
            if ( canJump === true ) velocity.y += 35; // 350
            canJump = false;
            break; 
        }
    };

    let onKeyUp = function (event) {
        switch (event.keyCode) {
        case 87: // w
        case 38: // up
            // controls.moveForward(.25)
            moveForward = false;
            break;
        case 65: // a
        case 37: // left
            // controls.moveRight(-.25)
            moveLeft = false;
            break;
        case 83: // s
        case 40: // down
            // controls.moveForward(-.25)
            moveBackward = false;
            break;
        case 68: // d
        case 39: // right
            // controls.moveRight(.25)
            moveRight = false;
            break;
        case 69: // e
            // controls.moveRight(.25)
            keyE_min();
            break;    
        }
    };


    let keyE = 1;
    let keyE_max = () => keyE = 2;
    let keyE_min = () => keyE = 1;

    function f_mousedown(event) {

        if(event.which == 1) { // – левая кнопка
            
            }

        if(event.which == 2) { // – средняя кнопка
            
            }

        if(event.which == 3) { // – правая кнопка
            keyE_max();
            }        
    }

    function f_mouseup(event) {

        if(event.which == 1) { // – левая кнопка
            
            }

        if(event.which == 2) { // – средняя кнопка
            
            }

        if(event.which == 3) { // – правая кнопка
            keyE_min(); 
            }        
    }


    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousedown', f_mousedown, false );
    document.addEventListener( 'mouseup', f_mouseup, false );
    // document.addEventListener( 'mousedown', keyE_max, false );
    // document.addEventListener( 'mouseup', keyE_min, false );


    ///////////////////////////////////////////////////////

    var objects = [];
    let boxGeometry;
    var box;   

for ( var i = 0; i < 1000; i ++ ) {

        boxGeometry = new THREE.BoxGeometry( Math.random() * 1, Math.random() * 1, Math.random() * 1 );

        box = new THREE.Mesh( boxGeometry, poleMat);

        box.receiveShadow = true;
        box.castShadow = true;

        box.position.x = ( Math.random() * 2 - 1 ) * 50 ;
        box.position.y = ( Math.random() * 1  ) * 100 + 1;
        box.position.z = ( Math.random() * 2 - 1 ) * 50;

        scene.add( box );

        objects.push( box );
    }

//////////////////////////////////////////////////////////////////////////




    
    let speed = 0 ;



    function animate() {


        controls.getDirection(myVectorEve);
      

        if ( controls.isLocked ) {

            var time = performance.now(); //
            var deltaTimeSec = ( time - prevTime ) / 1000; //
            prevTime = time; //

            let k_zameddlenia = 10 ; // чем больше, тем быстрее останавливается

            velocity.x -= velocity.x * k_zameddlenia * deltaTimeSec; // замедление скорости
            velocity.z -= velocity.z * k_zameddlenia * deltaTimeSec;
    
            // velocity.y -= 9.8 * 10.0 * deltaTimeSec; // 100.0 = mass

            // if ( moveForward ) controls.moveForward(.25 * keyE);
            // if ( moveBackward ) controls.moveForward(-.25);
            // if ( moveLeft ) controls.moveRight(-.25);
            // if ( moveRight ) controls.moveRight(.25);

            let k_uskorenia = 100 ; // кэффицинет ускорения , чем больше тем больше скорость

            if ( moveForward ) velocity.z -= k_uskorenia * deltaTimeSec * keyE; // нарастание скорости
            if ( moveBackward ) velocity.z += k_uskorenia * deltaTimeSec;
            if ( moveLeft ) velocity.x -= k_uskorenia * deltaTimeSec;
            if ( moveRight ) velocity.x += k_uskorenia * deltaTimeSec;

            controls.getObject().translateX( velocity.x * deltaTimeSec );
            controls.getObject().translateY( velocity.y * deltaTimeSec );
            controls.getObject().translateZ( velocity.z * deltaTimeSec );


            if ( controls.getObject().position.y < 2 ) { // позиция по высоте
                velocity.y = 0; //
                controls.getObject().position.y = 2; // 
                canJump = true;  //               

            }

            console.log(`velocity.x = ${velocity.x}`);
            console.log(`velocity.y = ${velocity.y}`);
            console.log(`velocity.z = ${velocity.z}`);
            console.log(controls.getObject().position.x);
            console.log(controls.getObject().position.y);
            console.log(controls.getObject().position.z);
            
        }

        stats.update();   
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
        // camera.rotateY(0.005);
        }

    animate();

}

init();