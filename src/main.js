import * as THREE from 'three';
import { OrbitControls, WebGL } from 'three/examples/jsm/Addons.js';  
import { getStories } from "../helpers/fetch";


// check for webgl 2
if( WebGL.isWebGL2Available() ) {
  
  init3D();

} else {
  // maybe a better fallback here?
  console.log("you dont have openGL2");
}


async function init3D() {
  // get the story data
  // const allStories = await getStories();
  // console.log("stories", allStories);

  // get all the stories
  const allStories = document.querySelectorAll(".cms-data-item");

  // add interaction events
  allStories.forEach((item) => {
    const cutout = item.querySelector(".cutout");
    const chapter = item.querySelector(".forest-chapter");
    const title = item.querySelector(".forest-title");
    
    // handle hover on
    item.addEventListener("mouseover", (event) => {
      cutout.style.filter = "grayscale(0)";
      chapter.style.opacity = "1";
      title.style.opacity = "1";
      cutout.style.transform = "scale(1)";
    });
    // handle hover off
    item.addEventListener("mouseout", (event) => {
      cutout.style.filter = "grayscale(100%)";
      chapter.style.opacity = "0";
      title.style.opacity = "0";
      cutout.style.transform = "scale(0.5)";
    });
    // handle the click
    item.addEventListener("mouseout", (event) => {
      cutout.style.filter = "grayscale(100%)";
      chapter.style.opacity = "0";
      title.style.opacity = "0";
      cutout.style.transform = "scale(0.5)";
    }); 
  })

}