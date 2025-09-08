import * as THREE from 'three';
import { CSS3DObject, OrbitControls, WebGL, CSS3DRenderer } from 'three/examples/jsm/Addons.js';  
import { setControls } from '../three/controlsSetup';
import { randomPos } from '../three/randomPos';
// check for webgl 2
if( WebGL.isWebGL2Available() ) {
  window.Webflow ||= [];
  window.Webflow.push(() => {
    // This runs after Webflow has loaded CMS items and applied interactions
    init3D();
  });

} else {
  // maybe a better fallback here?
  console.log("you dont have openGL2");
}


async function init3D() {
  // get all the stories
  const allStories = document.querySelectorAll(".cms-data-item");
  // css to 3d
  const renderCSS = new CSS3DRenderer();
  renderCSS.setSize(window.innerWidth, window.innerHeight);
  renderCSS.domElement.style.position = 'absolute';
  renderCSS.domElement.style.top = '0px';
  
  // set up the three scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer( {
    antialias: true,
    alpha: true
  });
  // set camera position
  camera.position.set(0, 0, 50);

  renderer.setClearColor(0x000000, 0); // 0 is fully transparent
  renderer.setSize( window.innerWidth, window.innerHeight ); 
  
  // orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  
  // customize the Orbit Controls
  setControls( controls, camera );

  // add interaction events and render to 3D
  allStories.forEach((item) => {
    console.log("item: ", item)
    const cutout = item.querySelector(".cutout");
    const text = item.querySelector(".forest-text-wrapper")
    
    // handle hover on
    cutout.addEventListener("mouseover", (event) => {
      cutout.style.filter = "grayscale(0)";
      text.style.opacity = "1";
      item.style.zIndex = "999";
      cutout.style.transform = "scale(1)";
    });
    // handle hover off
    cutout.addEventListener("mouseout", (event) => {
      cutout.style.filter = "grayscale(100%)";
      text.style.opacity = "0";
      item.style.zIndex = "1";
      cutout.style.transform = "scale(0.5)";
    });
    // handle the click
    cutout.addEventListener("click", (event) => {
      const slug = item.getAttribute("data-link");
      console.log("window: ", window.location.origin)
      window.location.href = `/dahisar-stories/${slug}`;
    }); 


    const mesh = new THREE.Object3D();
    mesh.position.set(
      randomPos(-20,20),
      randomPos(-20,20),
      randomPos(-10,0)
    );
    
    // 3d render
    const item3d = new CSS3DObject(item);
    item3d.element.style.pointerEvents = "none";
    cutout.style.pointerEvents = "auto";
    item3d.scale.set(0.03, 0.03, 0.03); // shrink to 1% size
    mesh.add(item3d);
    scene.add(mesh);
  })

  // render
  const container = document.querySelector('.three-canvas');
  container.appendChild(renderer.domElement);
  container.appendChild(renderCSS.domElement);
  
  // handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderCSS.setSize(window.innerWidth, window.innerHeight);
  });


  // animation loop
  function animate() { 
    
    requestAnimationFrame( animate );

    renderCSS.render( scene, camera);
    renderer.render( scene, camera);

    // update the damping camera movement
    controls.update(); 
    
  }

  animate();
}