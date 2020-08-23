"use strict";

import * as THREE from "../lib/three/three.module.js";
// import { OrbitControls } from '../lib/three/OrbitControls.js';
import { PointerLockControls } from '../lib/three/PointerLockControls.js';
import Stats from "../lib/three/stats.module.js";

let raycaster;


function init() {
    let canvas = document.getElementById("canvas");
    let w = window.innerWidth;
    let h = window.innerHeight;
    // canvas.width = w;
    // canvas.height = h ;


    // Stats

    const stats = Stats();
    document.body.appendChild(stats.dom);


    // scene

    let scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xcce0ff ); // небо
    scene.fog = new THREE.Fog(0xcce0ff, 0, 1500); // туман
 

    // camera

    let camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 10000);
    // camera.lookAt(scene.position);
    // camera.position.z = 5;    
    camera.position.set(0, 2, 10);
    // camera.rotateY(-0.8);


    // renderer

    // let renderer = new THREE.WebGLRenderer({canvas:canvas});
    let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setPixelRatio( window.devicePixelRatio );    
    renderer.setSize(w,h);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.shadowMap.enabled = true;


    //////////////////////////////////////////////////////////////////////////    

    // controls Управление

    // OrbitControls

    // let controls = new OrbitControls(camera, renderer.domElement);
    //   // let controls = new OrbitControls(camera, canvas);
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

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    let canJump = false;
    let if_prised = false;
    let if_forse = false;

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
            // forward
            // if_forse = true;
            break;
        case 32: // space
            if ( canJump === true ) velocity.y += 35;
            canJump = false;
            break;
        case 81: // q
            // prised
            if_prised = true;
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
            // forward
            // if_forse = false;
            break;
        case 81: // q
            // prised
            if_prised = false;
            break;    
        }
    };


    ////////////////////////////////////////////////////////////////////////

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousedown', f_mousedown, false );
    document.addEventListener( 'mouseup', f_mouseup, false );

    function f_mousedown(event) {

        if(event.which == 1) { // – левая кнопка
            
        }

        if(event.which == 2) { // – средняя кнопка
            
        }

        if(event.which == 3) { // – правая кнопка
            if_forse = true;
        }        
    }

    function f_mouseup(event) {

        if(event.which == 1) { // – левая кнопка
            
        }

        if(event.which == 2) { // – средняя кнопка
            
        }

        if(event.which == 3) { // – правая кнопка
            if_forse = false;
        }        
    }

    //////////////////////////////////////////////////////////////////////////


    // lights

    let light_1 = new THREE.AmbientLight( 0x666666 );
    scene.add( light_1 );

    let light_2 = new THREE.DirectionalLight( 0xffffff, 2.0 );
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

    // MESHs

    // obj 1 Коробка цветная

    let geometry_Obj_1 = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0, 10, 10, 10);
    // let material_Obj_1 = new THREE.MeshStandardMaterial( {color: "skyblue"} );   
    let material_Obj_1 = new THREE.MeshStandardMaterial();
    let texture_Obj_1 = loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1VFlMnRT804CBmogyvvPpq3npTLG8sLkxTYtPhbaYpL4zGhu&s');
    
    texture_Obj_1.anisotropy = 16;
    texture_Obj_1.encoding = THREE.sRGBEncoding;

    material_Obj_1.map = texture_Obj_1 ;    
    material_Obj_1.roughnessMap = texture_Obj_1 ;

    let mesh_Obj_1 = new THREE.Mesh(geometry_Obj_1, material_Obj_1);
    mesh_Obj_1.position.set(5, 2, 0);   
    scene.add(mesh_Obj_1);


    // obj 2 Коробка белая

    let geometry_Obj_2 = new THREE.BoxBufferGeometry(1, 1, 1, 10, 10, 100);
    let material_Obj_2 = new THREE.MeshStandardMaterial();

    material_Obj_2.map = loader.load('img/plaster.jpg');

    material_Obj_2.anisotropy = 16;
    material_Obj_2.encoding = THREE.sRGBEncoding;

    material_Obj_2.normalMap = loader.load('img/plaster-normal.jpg');
    material_Obj_2.normalMapType = 0;

    let mesh_Obj_2 = new THREE.Mesh(geometry_Obj_2, material_Obj_2);
    mesh_Obj_2.position.set(10, 2, 0 );
    mesh_Obj_2.receiveShadow = true;
    mesh_Obj_2.castShadow = true;

    scene.add(mesh_Obj_2);

 
    // obj 3 Синяя линия
 
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
 
 
    // obj 4 Большой куб с фото неба и гор
 
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
 
    let gepmetry_Obj_4 = new THREE.BoxBufferGeometry(2000,2000,2000);  
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
 
 
    // obj 5 sphere Сфера
 
    var geometry_Obj_5 = new THREE.SphereBufferGeometry( 5, 32, 32 );
    var material_Obj_5 = new THREE.MeshStandardMaterial();
    var mesh_Obj_5 = new THREE.Mesh( geometry_Obj_5, material_Obj_5 );
    mesh_Obj_5.castShadow = true;
    mesh_Obj_5.receiveShadow = true;
    mesh_Obj_5.visible = true;
    mesh_Obj_5.position.set(15, 10, 0);

    let Obj_5_texture_map = loader.load('img/earthicefreemask.gif');
    
    // Obj_5_texture_map.anisotropy = 16;
    // Obj_5_texture_map.encoding = THREE.sRGBEncoding;
    
    material_Obj_5.map = Obj_5_texture_map;
    material_Obj_5.bumpMap = Obj_5_texture_map;
    material_Obj_5.displacementMap = Obj_5_texture_map;
    material_Obj_5.displacementScale = 0.2;   
    material_Obj_5.roughnessMap = Obj_5_texture_map;
   
        // map
        // bumpMap
        // displacementMap displacementScale = 1;
        // roughnessMap

        // aoMap
        // emissiveMap
        // normalMap   normalMapType = 1;
    
    scene.add( mesh_Obj_5 );
 
 





    /////////////////////////////////////////////////////////////////////////

    // obj 6 ground Земля - трава
 

    //return array with height data from img
    function getHeightData(img, scale) {
     
        if (scale == undefined) scale = 1;
        
            let canvas = document.createElement( 'canvas' );
            canvas.width = img.width;
            canvas.height = img.height;

            let context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
  
            let size = img.width * img.height;

            var data = new Float32Array( size );
    
            for ( var i = 0; i < size; i ++ ) {
                data[i] = 0
            }
   
            let imgd = context.getImageData(0, 0, img.width, img.height);
            var pix = imgd.data;
   
            var j=0;
            for (var i = 0; i < pix.length; i += 4) {
                var all = pix[i] + pix[i + 1] + pix[i + 2];
                data[j++] = all / (3 * scale);
            }

            return data;
        }

    let img = new Image();
    img.src = '../img/3.jpg';

    let landshaft_hiegth_array = [];


    let material_Obj_6;
    let geometry_Obj_6;
    let mesh_Obj_6

    img.onload = function() {

        landshaft_hiegth_array = getHeightData(img, 1);


        let texture_Obj_6 = loader.load( 'img/grasslight-big.jpg' );
        texture_Obj_6.wrapS  = texture_Obj_6.wrapT = THREE.RepeatWrapping;
        texture_Obj_6.repeat.set( 100, 100 );
        texture_Obj_6.anisotropy = 16;
        texture_Obj_6.encoding = THREE.sRGBEncoding;
    
        material_Obj_6 = new THREE.MeshStandardMaterial( { 
            map: texture_Obj_6,
            // displacementMap: loader.load('img/ground_map.png'),
            // displacementScale: 20.0,       
        } );
    
        // material_Obj_6.displacementMap = loader.load('img/ground_map.png');
        // material_Obj_6.displacementScale = 20.0;


        // let mesh_Obj_6 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 1, 1), material_Obj_6 );
        geometry_Obj_6 = new THREE.PlaneGeometry( 2000, 2000, 99, 99);
        
        console.log(geometry_Obj_6.vertices.length);

        for (let i = 0; i < geometry_Obj_6.vertices.length; i++) {
            // let vertex = geometry_Obj_6.vertices[i];
            // vertex.z = Math.random() * 10;
            // vertex.z = landshaft_hiegth_array[i] * 0.05;
            // geometry_Obj_6.vertices[i] = data[i] * 0.1;
            // geometry_Obj_6.vertices[i] = landshaft_hiegth_array[i] *0.0000000001;
            geometry_Obj_6.vertices[i].z = landshaft_hiegth_array[i] * 0.15;
            
            // console.log(i);           
            // console.log(landshaft_hiegth_array[i]);

        }

        mesh_Obj_6 = new THREE.Mesh( geometry_Obj_6, material_Obj_6 );

        mesh_Obj_6.position.y = - 0.0;
        mesh_Obj_6.rotation.x =  - Math.PI / 2;
        mesh_Obj_6.receiveShadow = true;

        scene.add( mesh_Obj_6 );

    };

    //////////////////////////////////////////////////////////////////////////  


    // obj 7 Вертикальный столб
 
    let geometry_Obj_7 = new THREE.BoxBufferGeometry( 0.5, 100, 0.5 );
    let material_Obj_7 = new THREE.MeshLambertMaterial(); ;
    let mesh_Obj_7 = new THREE.Mesh( geometry_Obj_7 , material_Obj_7 );
    mesh_Obj_7.position.x = 0;
    mesh_Obj_7.position.y = 0;
    mesh_Obj_7.receiveShadow = true;
    mesh_Obj_7.castShadow = true;
    scene.add( mesh_Obj_7 );
 
 
    // obj 8 Горизонтальный столб
 
    let geometry_Obj_8 = new THREE.BoxBufferGeometry( 255, 5, 5 );
    let material_Obj_8 = new THREE.MeshLambertMaterial();
    let mesh_Obj_8 = new THREE.Mesh( geometry_Obj_8, material_Obj_8 );
    mesh_Obj_8.position.y = - 250 + ( 750 / 2 );
    mesh_Obj_8.position.x = 0;
    mesh_Obj_8.receiveShadow = true;
    mesh_Obj_8.castShadow = true;
    scene.add( mesh_Obj_8 );
 
 
    // obj 9 Массив параллепипидов
 
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
 
    //////////////////////////////////////////////////////////////////////////////////

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener('resize', onWindowResize);

    let prevTime = performance.now();
    let velocity = new THREE.Vector3();           
    let h_human;
    let a=0;



    // var castFrom = new THREE.Vector3();
    // var castDirection = new THREE.Vector3(0,-1,0);

    // let raycaster = new THREE.Raycaster(camera.position.clone(), new THREE.Vector3(0, -1, 0));
    // castFrom.copy(camera.position);
    // castFrom.y += 1000;
    // raycaster.set(castFrom,castDirection);
    // // raycaster.ray.origin.copy(camera.position);

    // // let intersections = raycaster.intersectObject(terrain);
    // let intersections = raycaster.intersectObject(mesh_Obj_6);

    // if (intersections.length > 0) {
    //     // var distance = intersections[0].distance;
    //     // if(distance > 0 && distance < 10){
    //     // camera.position.y= intersections[0].point.y + 20;
    //     camera.position.y = intersections[0].point.y+20;
        
    // }


    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );



    function update() {
        // controls.update();
        stats.update();

        if ( controls.isLocked ) {

            let time = performance.now();
            var deltaTimeSec = ( time - prevTime ) / 1000;
            prevTime = time;




            raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;

					var intersections = raycaster.intersectObjects( mesh_Obj_6 );

					var onObject = intersections.length > 0;







            // if ( moveForward ) controls.moveForward(.25 );
            // if ( moveBackward ) controls.moveForward(-.25);
            // if ( moveLeft ) controls.moveRight(-.25);
            // if ( moveRight ) controls.moveRight(.25);


            let k_zameddlenie = 0.9 ; // замедление скорости

            velocity.z *= k_zameddlenie; 
            velocity.x *= k_zameddlenie;
            // velocity.y -= k_zameddlenie;

            let k_uskorenie = 1; // увеличение скорости

            if ( moveForward ) velocity.z -= k_uskorenie;   
            if ( moveBackward ) velocity.z += k_uskorenie;
            if ( moveLeft ) velocity.x -= k_uskorenie;
            if ( moveRight ) velocity.x += k_uskorenie;


            // console.log(velocity.z);

           
            // controls.moveForward( - velocity.z * deltaTimeSec * keyE);
            // controls.moveForward( - velocity.x * deltaTimeSec * keyE);

            let forse;
            if_forse ? forse = 2 : forse = 1 ;

            // console.log(forse)

            controls.getObject().translateZ( velocity.z * deltaTimeSec * forse );
            controls.getObject().translateX( velocity.x * deltaTimeSec * forse );
            // controls.getObject().translateY( velocity.y * deltaTimeSec );
            


            let eve_pos;
            if_prised ? eve_pos = 1 : eve_pos = 2 ;
        
            if (controls.getObject().position.y > eve_pos ) {
            velocity.y -= 9.8 * 10.0 * deltaTimeSec; // 100.0 = mass
            }   


            if ( controls.getObject().position.y < eve_pos ) { // позиция по высоте
                velocity.y = 0; //
                controls.getObject().position.y = eve_pos; // 
                canJump = true;  //   
            }


            a++;

            // console.log(a)
            let varV = 1 + 0.2 * Math.sin(0.01 * a * 5);
            mesh_Obj_1.scale.set(1 * varV , 1 * varV, 1 * varV);
            mesh_Obj_1.rotation.x += 0.01;
            mesh_Obj_1.rotation.y += 0.01;
            mesh_Obj_1.rotation.z += 0.01;

            mesh_Obj_2.rotation.y += 0.01;
            mesh_Obj_5.rotation.y += 0.01;

            // camera.rotateY(0.005);

            // camera.position.y = geometry_Obj_6.position.y;


        }    

    }

    function render() {
        renderer.render(scene, camera);
    }

    // function animate() {
    //     requestAnimationFrame( animate );       
    //     update();
    //     render();       
    // }

    // animate();

    renderer.setAnimationLoop( () => {
        update();
        render(); 
    });
    
}

init();