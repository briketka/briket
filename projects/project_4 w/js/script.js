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

    let light_1 = new THREE.AmbientLight( 0x666666 );
    scene.add( light_1 );

    let light_2 = new THREE.DirectionalLight( 0xdfebff, 1 );
    light_2.position.set( 50, 200, 100 );
    light_2.position.multiplyScalar( 1.3 );
    light_2.castShadow = true;
    light_2.shadow.mapSize.width = 1024;
    light_2.shadow.mapSize.height = 1024;
    let d = 300;
    light_2.shadow.camera.left = - d;
    light_2.shadow.camera.right = d;
    light_2.shadow.camera.top = d;
    light_2.shadow.camera.bottom = - d;
    light_2.shadow.camera.far = 1000;
    scene.add( light_2 );


    // loader

    let loader = new THREE.TextureLoader();


    // obj 1

    let geometry_Obj_1 = new THREE.BoxGeometry(1,1,1);
    let material_Obj_1 = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    for (let i=0; i < geometry_Obj_1.faces.length; i++) {
        geometry_Obj_1.faces[i].color.setRGB(Math.random(),Math.random(),Math.random())
    }
    let mesh_Obj_1 = new THREE.Mesh(geometry_Obj_1,material_Obj_1);
    mesh_Obj_1.position.set(2 , 0.0 , 2 );   
    scene.add(mesh_Obj_1);


    // obj 2

    let geometry_Obj_2 = new THREE.BoxGeometry(1,1,1);
    let material_Obj_2 = new THREE.MeshLambertMaterial();
    let mesh_Obj_2 = new THREE.Mesh(geometry_Obj_2, material_Obj_2);
    mesh_Obj_2.position.set(-3 , 0.0, 4 );
    mesh_Obj_2.receiveShadow = true;
    mesh_Obj_2.castShadow = true;
    scene.add(mesh_Obj_2);


    // obj 3

    let myEve_x = 0;
    let myEve_y = 0;
    let myEve_z = 0;
   
    let points_Obj_3 = [];
    points_Obj_3.push( new THREE.Vector3( - 10, 0, 0 ) );
    points_Obj_3.push( new THREE.Vector3( -10 + myEve_x , 10 + myEve_y, 0 + myEve_z ) );
   
    let geometry_Obj_3 = new THREE.BufferGeometry().setFromPoints( points_Obj_3 );
    let material_Obj_3 = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });   
    let mash_Obj_3 = new THREE.Line( geometry_Obj_3, material_Obj_3 );
    scene.add( mash_Obj_3 );


    // obj 2

    let material_Obj_4_Array = [];

    // let texture_ft = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('img/penguins/penguins (1)/mystic_lf.jpg');
    
    let texture_ft = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('img/penguins/penguins (23)/morning_lf.jpg');
  
    // let texture_ft = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_ft.jpg');
    // let texture_bk = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_bk.jpg');
    // let texture_up = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_up.jpg');
    // let texture_dn = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_dn.jpg');
    // let texture_rt = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_rt.jpg');
    // let texture_lf = new THREE.TextureLoader().load('img/penguins/penguins (29)/quirk_lf.jpg');

   
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_up}));
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    material_Obj_4_Array.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    for(let i=0; i<6; i++) {
        material_Obj_4_Array[i].side = THREE.BackSide;
    }

    let gepmetry_Obj_4 = new THREE.BoxGeometry(2000,2000,2000);  
    let mash_Obj_4 = new THREE.Mesh(gepmetry_Obj_4 , material_Obj_4_Array);
    mash_Obj_4.position.set(0 , 0 , 0 );
    scene.add(mash_Obj_4);


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

    var geometry_Obj_5 = new THREE.SphereBufferGeometry( 0.3, 32, 16 );
    var material_Obj_5 = new THREE.MeshLambertMaterial();
    var mash_Obj_5 = new THREE.Mesh( geometry_Obj_5, material_Obj_5 );
    mash_Obj_5.castShadow = true;
    mash_Obj_5.receiveShadow = true;
    mash_Obj_5.visible = true;
    mash_Obj_5.position.set(10,2,-20);
    scene.add( mash_Obj_5 );


    // ground

    let texture_Obj_6 = loader.load( 'img/grasslight-big.jpg' );
    texture_Obj_6.wrapS = texture_Obj_6.wrapT = THREE.RepeatWrapping;
    texture_Obj_6.repeat.set( 300, 300 );
    texture_Obj_6.anisotropy = 16;
    texture_Obj_6.encoding = THREE.sRGBEncoding;
    let material_Obj_6 = new THREE.MeshLambertMaterial( { map: texture_Obj_6 } );
    let mesh_Obj_6 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), material_Obj_6 );
    mesh_Obj_6.position.y = - 0.5;
    mesh_Obj_6.rotation.x = - Math.PI / 2;
    mesh_Obj_6.receiveShadow = true;
    scene.add( mesh_Obj_6 );


    // poles

    let geometry_Obj_7 = new THREE.BoxBufferGeometry( 0.5, 100, 0.5 );
    let material_Obj_7 = new THREE.MeshLambertMaterial(); ;
    let mesh_Obj_7 = new THREE.Mesh( geometry_Obj_7 , material_Obj_7 );
    mesh_Obj_7.position.x = 0;
    mesh_Obj_7.position.y = 0;
    mesh_Obj_7.receiveShadow = true;
    mesh_Obj_7.castShadow = true;
    scene.add( mesh_Obj_7 );


    let geometry_Obj_8 = new THREE.BoxBufferGeometry( 255, 5, 5 );
    let material_Obj_8 = new THREE.MeshLambertMaterial();
    let mesh_Obj_8 = new THREE.Mesh( geometry_Obj_8, material_Obj_8 );
    mesh_Obj_8.position.y = - 250 + ( 750 / 2 );
    mesh_Obj_8.position.x = 0;
    mesh_Obj_8.receiveShadow = true;
    mesh_Obj_8.castShadow = true;
    scene.add( mesh_Obj_8 );


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
    let prised = false;

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
        case 81: // q
            prised = true;
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
            case 81: // q
            prised = false;
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
            
            }        
    }

    function f_mouseup(event) {

        if(event.which == 1) { // – левая кнопка
            
            }

        if(event.which == 2) { // – средняя кнопка
            
            }

        if(event.which == 3) { // – правая кнопка
            
            }        
    }


    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousedown', f_mousedown, false );
    document.addEventListener( 'mouseup', f_mouseup, false );
    // document.addEventListener( 'mousedown', keyE_max, false );
    // document.addEventListener( 'mouseup', keyE_min, false );


    ///////////////////////////////////////////////////////

    for ( var i = 0; i < 1000; i ++ ) {

        var geometry_Obj_9_array = [];
        let geometry_Obj_9 = new THREE.BoxGeometry( Math.random() * 1, Math.random() * 1, Math.random() * 1 );
        let material_Obj_9 = new THREE.MeshLambertMaterial();
        let mash_Obj_9 = new THREE.Mesh( geometry_Obj_9, material_Obj_9);
        mash_Obj_9.receiveShadow = true;
        mash_Obj_9.castShadow = true;
        mash_Obj_9.position.x = ( Math.random() * 2 - 1 ) * 50 ;
        mash_Obj_9.position.y = ( Math.random() * 1  ) * 100 + 1;
        mash_Obj_9.position.z = ( Math.random() * 2 - 1 ) * 50;
        scene.add( mash_Obj_9 );

        geometry_Obj_9_array.push( mash_Obj_9 );
    }

    //////////////////////////////////////////////////////////////////////////


    var prevTime = performance.now(); // для времени
    var velocity = new THREE.Vector3();  
        
    
    var myVectorEve = new THREE.Vector3();


    let h_human;

    function animate() {

        if (prised) {
            h_human = 1;
        }
        else {
            h_human = 2;
        }


        controls.getDirection(myVectorEve);
        

        if ( controls.isLocked ) {

            var time = performance.now(); //
            var deltaTimeSec = ( time - prevTime ) / 1000; //
            prevTime = time; //

            let k_zameddlenia = 10 ; // чем больше, тем быстрее останавливается

            velocity.x -= velocity.x * k_zameddlenia * deltaTimeSec; // замедление скорости
            velocity.z -= velocity.z * k_zameddlenia * deltaTimeSec;
        
            if (controls.getObject().position.y > h_human ) {
            velocity.y -= 9.8 * 10.0 * deltaTimeSec; // 100.0 = mass
        }    

        // if ( moveForward ) controls.moveForward(.25 * keyE);
        // if ( moveBackward ) controls.moveForward(-.25);
        // if ( moveLeft ) controls.moveRight(-.25);
        // if ( moveRight ) controls.moveRight(.25);

        let k_uskorenia = 100 ; // кэффицинет ускорения , чем больше тем больше скорость

        if ( moveForward ) velocity.z -= k_uskorenia * deltaTimeSec * keyE; // нарастание скорости
        if ( moveBackward ) velocity.z += k_uskorenia * deltaTimeSec * keyE;
        if ( moveLeft ) velocity.x -= k_uskorenia * deltaTimeSec * keyE;
        if ( moveRight ) velocity.x += k_uskorenia * deltaTimeSec * keyE;

        controls.getObject().translateX( velocity.x * deltaTimeSec );
        controls.getObject().translateY( velocity.y * deltaTimeSec );
        controls.getObject().translateZ( velocity.z * deltaTimeSec );

        if ( controls.getObject().position.y < h_human ) { // позиция по высоте
            velocity.y = 0; //
            controls.getObject().position.y = h_human; // 
            canJump = true;  //   
                    
            // myEve_x = camera.position.x;  

        }
            
    }

        stats.update();   
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
        // camera.rotateY(0.005);
        }

    animate();

}

init();