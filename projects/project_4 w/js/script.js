"use strict";

import * as THREE from "../lib/three/three.module.js";
// import { OrbitControls } from '../lib/three/OrbitControls.js';
import { PointerLockControls } from '../lib/three/PointerLockControls.js';
import Stats from "../lib/three/stats.module.js";
import { GLTFLoader } from "../loaders/GLTFLoader.js";

function init() {

    //----------------------------------------------------------------------//

    let canvas;
    let w;
    let h;

    let stats;

    let scene;
    let camera;
    let renderer;

    let textureLoader;
    let gltfLoader;

    //----------------------------------------------------------------------//

    function createCanvas() {
        canvas = document.getElementById("canvas");
        w = window.innerWidth;
        h = window.innerHeight;
        // canvas.width = w;
        // canvas.height = h ; 
    }

    function createStats() {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    function createScene() {
        scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xcce0ff); // небо
        scene.fog = new THREE.Fog(0xcce0ff, 0.1, 1500); // туман             
        // scene.fog = new THREE.Fog(0x000000, 0.1, 1500)
    }

    function createCamera() {
        camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 10000);
        camera.position.set( 0, 2.0, 10);
        // camera.position.z = 5;
        // camera.rotateY(-0.8);
        // camera.lookAt(scene.position);            
        // camera.lookAt(new THREE.Vector3(10, 20, 0));        
    }

    function creatRenderer() {
        // let renderer = new THREE.WebGLRenderer({canvas: canvas});
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        renderer.setSize(w, h);        
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.gammaOutput = true;


        renderer.gammaFactor = 1.2;
        renderer.outputEncoding = THREE.sRGBEncoding;


        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.physicallyCorrectLights = true;



        // renderer.preserveDrawingBuffer = true;
        // renderer.alpha = true;

        // renderer.autoClearColor = false;
    }

    function createLoader() {
        textureLoader = new THREE.TextureLoader();
        
        // gltfLoader = new THREE.GLTFLoader();
        gltfLoader = new GLTFLoader();
    }

    //////////////////////////////////////////////////////////////////////////

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener('resize', onWindowResize);

    //////////////////////////////////////////////////////////////////////////  

    //----------------------------------------------------------------------//

    let controls;

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    let canJump = false;
    let if_prised = false;
    let if_forse = false;

    //----------------------------------------------------------------------//

    function createControls() {
       
        //---OrbitControls---//
        // controls = new OrbitControls(camera, renderer.domElement);
        // // let controls = new OrbitControls(camera, canvas);
        // controls.maxPolarAngle = Math.PI / 2 - 0.001;
        // // controls.minDistance = 0.0;
        // // controls.maxDistance = 1000;
       
        //---PointerLockControls---//
        const menuPanel = document.getElementById('menuPanel');
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', function () { controls.lock(); }, false);

        controls = new PointerLockControls( camera, document.body );
        controls.addEventListener('lock', () => menuPanel.style.display = 'none');
        controls.addEventListener('unlock', () => menuPanel.style.display = 'block');

        // controls.target.set(3, 2, 0);

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
    }

    //----------------------------------------------------------------------//   

    let light_Directional_1;   
    let light_Ambient_1;
    let light_HemisphereLight_1;

    //----------------------------------------------------------------------//

    function createLights() {
        // DirectionalLight - представляет источник прямого (направленного) освещения — поток параллельных лучей в направлении объекта 
        // AmbientLight - представляет общее освещение, применяемое ко всем объектам сцены.   
        // HemisphereLight - представляет полусферическое освещение        
        // AreaLight - представляет пространственный источник света, имеющий размеры — ширину и высоту и ориентированный в пространстве   
        // SpotLight - представляет прожектор


        light_Directional_1 = new THREE.DirectionalLight(0xffffff, 2, 100);
        // light_Directional_1 = new THREE.DirectionalLight( 0xffffff, 2.0 );
        light_Directional_1.position.set(1000, 1000, 500);
        light_Directional_1.position.multiplyScalar( 1.3 );
        light_Directional_1.castShadow = true;
        light_Directional_1.shadow.mapSize.width = 1024;
        light_Directional_1.shadow.mapSize.height = 1024;
        let d = 300;
        light_Directional_1.shadow.camera.left = - d;
        light_Directional_1.shadow.camera.right = d;
        light_Directional_1.shadow.camera.top = d;
        light_Directional_1.shadow.camera.bottom = - d;
        light_Directional_1.shadow.camera.near = 1;
        light_Directional_1.shadow.camera.far = 1000;
        scene.add(light_Directional_1);
    

        light_Ambient_1 = new THREE.AmbientLight( 0xffffff , 0.01);
        // light_Ambient_1 = new THREE.AmbientLight( 0x666666 );     
        scene.add(light_Ambient_1); 

        light_HemisphereLight_1 = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
        light_HemisphereLight_1.position.set(1000, 1000, 0);        
        scene.add(light_HemisphereLight_1);
    }

    //----------------------------------------------------------------------//

    let grid_1;
    let mesh_line_1;
    let mesh_plane_1;
    let mesh_plane_2; 
    let mesh_cube_1;
    let mesh_cube_2;
    let mesh_cube_3;
    let mesh_cube_4;
    let mesh_sphere_1;   
    let mesh_bar_1;
    let mesh_bar_2;
    let mesh_bar_3_array = [];

    let mesh_plane;

    let mesh_cube_1_1;
    let mesh_cube_2_1;
    let mesh_cube_3_1;
    let mesh_cube_4_1;

    let train;

    const mixers = [];




    //----------------------------------------------------------------------//    

    function createMeshs() {


        function createMeshsGrids() {
            grid_1 = new THREE.GridHelper(1000, 1000, 0xfffff, 0x0f0f3f);
            grid_1.position.set(0, 0 , 0);
            scene.add(grid_1);
        }


        function createMeshsPlanes() {
            let texture_plane = textureLoader.load('img/texture_1.jpg');
            texture_plane.encoding = THREE.sRGBEncoding;
            texture_plane.anisotropy = 16;
            texture_plane.wrapS = texture_plane.wrapT = THREE.RepeatWrapping;
            texture_plane.repeat.set(5, 5);

            let material_plane = new THREE.MeshStandardMaterial();
            material_plane.map = texture_plane;

            let geometry_plane = new THREE.PlaneBufferGeometry(10, 10, 10, 10);

            mesh_plane = new THREE.Mesh(geometry_plane, material_plane);
            mesh_plane.rotateX( - Math.PI / 2);

            scene.add(mesh_plane);

            mesh_plane.castShadow = true;
            mesh_plane.receiveShadow = true; 




            let texture_plane_1 = textureLoader.load('img/texture_1.jpg');
            texture_plane_1.encoding = THREE.sRGBEncoding;
            texture_plane_1.anisotropy = 16;
            texture_plane_1.wrapS = texture_plane_1.wrapT = THREE.RepeatWrapping;
            texture_plane_1.repeat.set(5, 5);
    
            let material_plane_1 = new THREE.MeshStandardMaterial();
            // let material_plane_1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            material_plane_1.map = texture_plane_1;
    
            let geometry_plane_1 = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
    
            mesh_plane_1 = new THREE.Mesh(geometry_plane_1, material_plane_1);
            mesh_plane_1.rotateX( - Math.PI / 2);
    
            scene.add(mesh_plane_1);
       
            mesh_plane_1.castShadow = true;
            mesh_plane_1.receiveShadow = true; 

        }


        function createMeshsLines() {
            let material_line_1 = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });
    
            let myEve_x = 0;
            let myEve_y = 0;
            let myEve_z = 0;
    
            let points_line_1 = [];
            points_line_1.push( new THREE.Vector3( - 10, 0, 0 ) );
            points_line_1.push( new THREE.Vector3( -10 + myEve_x , 10 + myEve_y, 0 + myEve_z ) );
    
            let geometry_line_1 = new THREE.BufferGeometry().setFromPoints( points_line_1);
    
            mesh_line_1 = new THREE.Line(geometry_line_1, material_line_1);
            
            scene.add(mesh_line_1);
        }


        function createMeshsCubes() {

            let texture_cub_1_1 = textureLoader.load('img/texture_2.jpg');
            texture_cub_1_1.encoding = THREE.sRGBEncoding;
            texture_cub_1_1.anisotropy = 16;
            texture_cub_1_1.wrapS = texture_cub_1_1.wrapT = THREE.RepeatWrapping;
            texture_cub_1_1.repeat.set(1, 1);
            texture_cub_1_1.rotation = THREE.MathUtils.degToRad(0);
            // texture_ground.center.set(.5, .5);
            // texture_ground.offset.set(0.5, 0.25);
            
            let material_cub_1_1 = new THREE.MeshPhongMaterial({ map: texture_cub_1_1 });

            // material_cub_1_1.transparent = true;       
            // material_cub_1_1.opacity = 0.5;
            // material_cub_1_1.alphaTest = 1.0;

            let geometry_cub_1_1 = new THREE.BoxBufferGeometry(0.7, 0.7, 0.7, 10, 10, 10);

            mesh_cube_1_1 = new THREE.Mesh(geometry_cub_1_1, material_cub_1_1);
            mesh_cube_1_1.position.set(0, 0, 0);
            mesh_cube_1_1.rotation.y = 0.7;
            // mesh_cube_1_1.position.y = 1;

            mesh_cube_1_1.castShadow = true;
            mesh_cube_1_1.receiveShadow = true;

            scene.add(mesh_cube_1_1);






            mesh_cube_2_1 = mesh_cube_1_1.clone();
            mesh_cube_2_1.position.set(2, 0, 0);
            scene.add(mesh_cube_2_1);


            mesh_cube_3_1 = mesh_cube_1_1.clone();
            mesh_cube_3_1.position.set(4, 0, 0);
            scene.add(mesh_cube_3_1); 

            mesh_cube_4_1 = mesh_cube_1_1.clone();
            mesh_cube_4_1.position.set(6, 0, 0);
            scene.add(mesh_cube_4_1);       


            train = new THREE.Group();
            scene.add( train );

            train.add(mesh_cube_1_1, mesh_cube_2_1, mesh_cube_3_1, mesh_cube_4_1);

            train.position.set(3, 5, 0);
            train.rotateY(45);



            let texture_cub_1 = textureLoader.load('img/texture_2.jpg');
            texture_cub_1.encoding = THREE.sRGBEncoding;
            texture_cub_1.anisotropy = 16;
            texture_cub_1.wrapS = texture_cub_1.wrapT = THREE.RepeatWrapping;
            texture_cub_1.repeat.set(1, 1);
            texture_cub_1.rotation = THREE.MathUtils.degToRad(45);
            // texture_ground.center.set(.5, .5);
            // texture_ground.offset.set(0.5, 0.25);
              
            let material_cub_1 = new THREE.MeshPhongMaterial({ map: texture_cub_1 });
    
            let geometry_cub_1 = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0, 10, 10, 10);
    
            mesh_cube_1 = new THREE.Mesh(geometry_cub_1, material_cub_1);
            mesh_cube_1.position.set(3, 2, 0);
            // mesh_cube_1.position.y = 1;
            mesh_cube_1.rotation.y = 45.0;
    
            scene.add(mesh_cube_1);
    
            //..........................//
    
            let texture_cube_2 = textureLoader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1VFlMnRT804CBmogyvvPpq3npTLG8sLkxTYtPhbaYpL4zGhu&s');
            texture_cube_2.encoding = THREE.sRGBEncoding;
            texture_cube_2.anisotropy = 16;
    
            let geometry_cube_2 = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0, 10, 10, 10);
            
            // let material_cub_2 = new THREE.MeshStandardMaterial( {color: "skyblue"} );   
            let material_cube_2 = new THREE.MeshStandardMaterial();
            material_cube_2.map = texture_cube_2;    
            material_cube_2.roughnessMap = texture_cube_2;
    
            mesh_cube_2 = new THREE.Mesh(geometry_cube_2, material_cube_2);
            mesh_cube_2.position.set(6, 2, 0);
    
            scene.add(mesh_cube_2);
    
            //..........................//
    
            let material_cube_3 = new THREE.MeshStandardMaterial();
            material_cube_3.map = textureLoader.load('img/plaster.jpg');
            material_cube_3.encoding = THREE.sRGBEncoding;
            material_cube_3.anisotropy = 16;
            material_cube_3.normalMap = textureLoader.load('img/plaster-normal.jpg');
            material_cube_3.normalMapType = 0;
    
            let geometry_cube_3 = new THREE.BoxBufferGeometry(1, 1, 1, 10, 10, 100);
    
            mesh_cube_3 = new THREE.Mesh(geometry_cube_3, material_cube_3);
            mesh_cube_3.position.set(9, 2, 0 );
            mesh_cube_3.receiveShadow = true;
            mesh_cube_3.castShadow = true;
    
            scene.add(mesh_cube_3);
    
            //..........................//
    
            // cube_4 Большой куб с фото неба и гор
        
            let material_cube_4_Array = [];
        
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
        
            
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_ft}));
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_bk}));
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_up}));
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_dn}));
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_rt}));
            material_cube_4_Array.push(new THREE.MeshBasicMaterial({map: texture_lf}));
        
            for(let i=0; i<6; i++) {
                material_cube_4_Array[i].side = THREE.BackSide;
            }
        
            let geometry_cube_4 = new THREE.BoxBufferGeometry(2000,2000,2000);
    
            mesh_cube_4 = new THREE.Mesh(geometry_cube_4 , material_cube_4_Array);
            mesh_cube_4.position.set(0 , 0 , 0);
    
            scene.add(mesh_cube_4);
        }


        function createMeshsSpheres() {
            let texture_sphere_1 = textureLoader.load('img/earthicefreemask.gif');
            // texture_sphere_1.anisotropy = 16;
            // texture_sphere_1.encoding = THREE.sRGBEncoding;
    
            var material_sphere_1 = new THREE.MeshStandardMaterial();
            material_sphere_1.map = texture_sphere_1;
            material_sphere_1.bumpMap = texture_sphere_1;
            material_sphere_1.displacementMap = texture_sphere_1;
            material_sphere_1.displacementScale = 0.2;   
            material_sphere_1.roughnessMap = texture_sphere_1;        
            
            var geometry_sphere_1 = new THREE.SphereBufferGeometry(100, 32, 32);
    
            mesh_sphere_1 = new THREE.Mesh(geometry_sphere_1, material_sphere_1);
            mesh_sphere_1.castShadow = true;
            mesh_sphere_1.receiveShadow = true;
            mesh_sphere_1.visible = true;
            mesh_sphere_1.position.set(250, 500, -700);
    
            scene.add(mesh_sphere_1);
        }


        function createMeshsBars() {
        
            let material_bar_1 = new THREE.MeshLambertMaterial();

            let geometry_bar_1 = new THREE.BoxBufferGeometry(0.5, 100, 0.5);
                    
            mesh_bar_1 = new THREE.Mesh(geometry_bar_1 , material_bar_1 );        
            mesh_bar_1.position.x = 0;
            mesh_bar_1.position.y = 50;
            mesh_bar_1.receiveShadow = true;
            mesh_bar_1.castShadow = true;

            scene.add(mesh_bar_1);

            //..........................//

            let material_bar_2 = new THREE.MeshLambertMaterial();
        
            let geometry_bar_2 = new THREE.BoxBufferGeometry(255, 5, 5);
                    
            mesh_bar_2 = new THREE.Mesh(geometry_bar_2, material_bar_2);
            mesh_bar_2.position.y = - 250 + ( 750 / 2 );
            mesh_bar_2.position.x = 0;
            mesh_bar_2.receiveShadow = true;
            mesh_bar_2.castShadow = true;

            scene.add(mesh_bar_2);



            for ( var i = 0; i < 1000; i ++ ) {
    
                let material_bar_3 = new THREE.MeshLambertMaterial();
    
                let geometry_bar_3 = new THREE.BoxBufferGeometry( Math.random() * 10, Math.random() * 10, Math.random() * 10 );
    
                let mesh_bar_3 = new THREE.Mesh( geometry_bar_3, material_bar_3);
                mesh_bar_3.receiveShadow = true;
                mesh_bar_3.castShadow = true;
                mesh_bar_3.position.x = ( Math.random() * 2 - 1 ) * 1000 ;
                mesh_bar_3.position.y = ( Math.random() * 1  ) * 1000 + 1;
                mesh_bar_3.position.z = ( Math.random() * 2 - 1 ) * 1000;
                scene.add(mesh_bar_3);
        
                mesh_bar_3_array.push(mesh_bar_3);
            }
        }


        // let map = textureLoader.load("img/name.png");
        // let bumpMap = textureLoader.load("img/name.png");
        // let normalMap = textureLoader.load("img/name.jpg"); // normalMapType = 1;
        // let displacementMap = textureLoader.load("img/name.png"); // displacementScale = 1;
        // let emissiveMap = textureLoader.load("img/name.jpg");
        // let alphaMap = textureLoader.load("img/name.png");
        // let aoMap = THREE.ImageUtils.loadTexture("img/name.jpg");

        // MeshBasicMaterial — просто назначает любой цвет примитиву
        // MeshNormalMaterial — материал со свойствами shading, совмещает в себе смешение цветов.
        // MeshDepthMaterial — материал со свойствами wireframe, выглядит черно-белым
        // MeshLambertMaterial — материал для не блестящих поверхностей
        // MeshPhongMaterial — материал для блестящих поверхностей
        // MeshFaceMaterial — может комбинировать другие виды материалов назначать на каждый полигон свой материал.

        // let material = new THREE.MeshStandardMaterial( {color: "skyblue"} );

        // let material = [
        //     new THREE.MeshStandardMaterial({map: texture}),
        //     new THREE.MeshStandardMaterial({map: texture}),
        //     new THREE.MeshStandardMaterial({map: texture}),
        //     new THREE.MeshStandardMaterial({map: texture}),
        //     new THREE.MeshStandardMaterial({map: texture}),
        //     new THREE.MeshStandardMaterial({map: texture})
        // ];


        // material.bumpMap = plane_bumpMap;
        // material.side = 2;

        // mesh.material.map = myMap;
        // mesh.position.y = - 0.1;
        // mesh.rotation.x = - Math.PI / 2;
        // mesh.receiveShadow = true;






        // Земля - трава
    
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
        let material_plane_2;
        let geometry_plane_2;

        img.onload = function() {

            landshaft_hiegth_array = getHeightData(img, 1);

            let texture_plane_2 = textureLoader.load('img/grasslight-big.jpg');
            texture_plane_2.wrapS  = texture_plane_2.wrapT = THREE.RepeatWrapping;
            texture_plane_2.repeat.set( 100, 100 );
            texture_plane_2.anisotropy = 16;
            texture_plane_2.encoding = THREE.sRGBEncoding;
        
            material_plane_2 = new THREE.MeshStandardMaterial( { 
                map: texture_plane_2,
                // displacementMap: loader.load('img/ground_map.png'),
                // displacementScale: 20.0,       
            } );       
            // material_plane_2.displacementMap = loader.load('img/ground_map.png');
            // material_plane_2.displacementScale = 20.0;

            geometry_plane_2 = new THREE.PlaneGeometry( 2000, 2000, 99, 99);
            for (let i = 0; i < geometry_plane_2.vertices.length; i++) {
                // let vertex = geometry_plane_2.vertices[i];
                // vertex.z = Math.random() * 10;
                // vertex.z = landshaft_hiegth_array[i] * 0.05;
                // geometry_plane_2.vertices[i] = data[i] * 0.1;
                // geometry_plane_2.vertices[i] = landshaft_hiegth_array[i] *0.0000000001;
                geometry_plane_2.vertices[i].z = landshaft_hiegth_array[i] * 0.15;
            }

            // mesh_plane_2 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100, 1, 1), material_plane_2 );
            mesh_plane_2 = new THREE.Mesh(geometry_plane_2, material_plane_2);
            mesh_plane_2.position.y = - 0.0;
            mesh_plane_2.rotation.x =  - Math.PI / 2;
            mesh_plane_2.receiveShadow = true;

            scene.add(mesh_plane_2);
        };


        createMeshsGrids();
        createMeshsPlanes();
        createMeshsLines();
        createMeshsCubes();
        createMeshsSpheres();
        createMeshsBars();
    
    }


    function createModels() {

        function loadModels() {

            const onLoad = ( gltf, position ) => {
          
                // const model = gltf.scene.children[ 0 ];
                const model = gltf.scene;

                // model.position.copy( position );
          
                // const animation = gltf.animations[ 0 ];
            
                // const mixer = new THREE.AnimationMixer( model );
                // mixers.push( mixer );
            
                // const action = mixer.clipAction( animation );
                // action.play();

                scene.add( model );



                model.scale.set(0.01, 0.01, 0.01);
                     
            };

            const onProgress = () => {};
            
            const onError = ( errorMessage ) => { console.log( errorMessage ); };

            const parrotPosition = new THREE.Vector3( 3, 2.5, 0 );
            gltfLoader.load( 'models/Parrot.glb', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );
            
            // console.log(scene)
            // console.log(scene.children)
            // console.log(mixers)
            // console.log(animationmixer);

            const flamingoPosition = new THREE.Vector3( 4, 2.5, 0 );
            gltfLoader.load( 'models/Flamingo.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );
            
            const storkPosition = new THREE.Vector3( 5, 2.5, 0 );
            gltfLoader.load( 'models/Stork.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );
        }
        
        loadModels();

    }
    
    //----------------------------------------------------------------------//

    let antiGravitPoint = [];
    let antiGravitPoint_n = 100;
    let antiGravitPoint_rMax = 100;

    let mesh_pointStay;

    //----------------------------------------------------------------------//

    class AntigravitPoint {
        constructor (myMesh) {
            this.myMesh = myMesh;
            this.periodPulse = 0.01 * Math.random();
        }
    }

    function antiGravitPointCreate() {   

        for (let i = 0; i < antiGravitPoint_n; i++) {
    
            let point = new THREE.Vector3(
                Math.floor(1000 * (2 * Math.random() - 1)),
                Math.floor(1000 * Math.random()),
                Math.floor(1000 * (2 * Math.random() - 1)),
            );
    
            // antiGravitPoint.push(new AntiGravitPoint(1));

            var material_sphere = new THREE.MeshStandardMaterial({color: 0xffff00});           
            var geometry_sphere = new THREE.SphereBufferGeometry(
                antiGravitPoint_rMax,
                32, 32);
            let mesh_sphere = new THREE.Mesh(geometry_sphere, material_sphere);
            mesh_sphere.position.copy(point);
            // mesh_sphere.position.set(10, 10, 10);
            antiGravitPoint.push(new AntigravitPoint(mesh_sphere));
            // scene.add(mesh_sphere);
            scene.add(antiGravitPoint[i].myMesh);

        }
                
        // console.log(antiGravitPoint)            

    }

        
    function createPointStay() {
        
        let material_pointStay = new THREE.MeshStandardMaterial({color: 0xff0000});           
        let geometry_pointStay = new THREE.SphereBufferGeometry(3, 32, 32);
        mesh_pointStay = new THREE.Mesh(geometry_pointStay, material_pointStay);
        mesh_pointStay.position.set(0, 15, -30);
        scene.add(mesh_pointStay);

    }   
    

    ////////////////////////////////////////////////////
 
    createCanvas();
    createStats();
    createScene();
    createCamera();
    creatRenderer();
    createControls();
    createLoader();
    createLights();
    createMeshs();

    createModels();
    antiGravitPointCreate();
    createPointStay();

    //----------------------------------------------------------------------// 

    let prevTime = performance.now();
    let velocity = new THREE.Vector3();           
    let h_human;
    let pulse = 0;

    let clock = new THREE.Clock();
    
    //----------------------------------------------------------------------//


    function update_controls() {

        let time = performance.now();
        var deltaTimeSec = ( time - prevTime ) / 1000;
        prevTime = time;


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

    }


    function update_cube() {

        pulse++;

        let varV = 0 + 1.0 * Math.sin(0.001 * pulse * 5);
        mesh_cube_1.scale.set(1 * varV , 1 * varV, 1 * varV);
        
        mesh_cube_1.rotation.x += 0.01;
        mesh_cube_1.rotation.y += 0.01;
        mesh_cube_1.rotation.z += 0.01;

        mesh_cube_2.rotation.x += 0.012;
        mesh_cube_2.rotation.y += 0.012;
        mesh_cube_2.rotation.z += 0.012;

        mesh_cube_3.rotation.x += 0.009;
        mesh_cube_3.rotation.y += 0.009;
        mesh_cube_3.rotation.z += 0.009;

    }


    function update_sphere() {

        mesh_sphere_1.rotation.y += 0.005;

    }


    function update_model() {

        const delta = clock.getDelta();

        for ( const mixer of mixers ) {
          
            mixer.update( delta );
          
        }
    }


    function update_train() {

        train.rotation.y += 0.03;

    }


    function update_antiGravitPoint() {
        
        for (let i = 0; i < antiGravitPoint.length; i++) {

                 let varV = 1 + 1.0 * Math.sin(antiGravitPoint[i].periodPulse * pulse);
                 antiGravitPoint[i].myMesh.scale.set(1 * varV , 1 * varV, 1 * varV);

        }

    }


    let vector_direct_pointStay = new THREE.Vector3((2 * Math.random() - 1), (2 * Math.random() - 1), (2 * Math.random() - 1));
    // console.log(vector_direct_pointStay)
    vector_direct_pointStay.normalize();
    vector_direct_pointStay.multiplyScalar(0.1);
    
    //    console.log(vector_direct_pointStay)

    function update_pointStay() {

        // let delt = new THREE.Vector3()

        // delt = mesh_sphere_1.position.sub(mesh_pointStay.position);
        // delt.subVectors(mesh_sphere_1.position, mesh_pointStay.position).normalize();
        // delt.multiplyScalar(0.1)

        // mesh_pointStay.position.add(delt)
        // mesh_pointStay.position.add(vector_direct_pointStay)   
        
        // console.log(delt)

        let vector_let = new THREE.Vector3();
        let delta_kv = new THREE.Vector3();
        
     
        for (let i = 0; i < antiGravitPoint.length; i++) {
            
            vector_let.subVectors(antiGravitPoint[0].myMesh.position, mesh_pointStay.position).normalize();
            console.log(vector_let)
            
            // vector_let.negate();
            // vector_let.normalize();

            // delta_kv = mesh_pointStay.position.distanceToSquared( antiGravitPoint[i].myMesh.position )

            // vector_let.multiplyScalar(1 / delta_kv * 0.0000000000000001 * antiGravitPoint[i].myMesh.scale)



            // mesh_pointStay.position.add(vector_let);
            
        }


        mesh_pointStay.position.add(vector_direct_pointStay);
        // console.log(vector_direct_pointStay);
        
    }


    function update() {

        // controls.update();
        stats.update();

        if ( controls.isLocked ) {
           
            update_controls(); 
            update_model();
            update_cube();
            update_sphere();
            update_train();
            update_antiGravitPoint();
            update_pointStay()
 
          

            // camera.rotateY(0.005);
            // camera.position.y = geometry_Obj_6.position.y;

            // console.log(antiGravitPoint.length) 

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