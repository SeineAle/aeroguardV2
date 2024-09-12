// import React, { useEffect, useState } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const ModelViewer = () => {
//   const [model, setModel] = useState(null);
//   const [graph, setGraph] = useState({ nodes: [], edges: [] });
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [spheres, setSpheres] = useState([]);
//   const [isPanelOpen, setIsPanelOpen] = useState(true);

//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();
//   let camera, scene, renderer;

//   const parseGltf = (gltf) => {
//     const graph = { nodes: [], edges: [] };
//     const proximityThreshold = 0.25;

//     gltf.scene.traverse((node) => {
//       if (node.isMesh) {
//         const position = new THREE.Vector3();
//         node.getWorldPosition(position);
//         const id = `${position.x.toString()}_${position.y.toString()}_${position.z.toString()}`;
//         let isClose = false;

//         for (const existingNode of graph.nodes) {
//           if (position.distanceTo(existingNode.position) < proximityThreshold) {
//             isClose = true;
//             break;
//           }
//         }

//         if (!isClose) {
//           graph.nodes.push({
//             id: node.uuid,
//             position: position.clone(),
//             info_id: id,
//           });
//         }
//       }
//     });

//     return graph;
//   };

//   useEffect(() => {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     // Enable alpha to make the background transparent
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//     // Set the renderer size and append to the DOM
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.domElement.style.position = 'absolute'; // Ensure it fits within the container
//     renderer.domElement.style.top = '0';
//     renderer.domElement.style.left = '0';
//     renderer.domElement.style.width = '100%';
//     renderer.domElement.style.height = '100%';

//     const viewerElement = document.getElementById('viewer');
//     viewerElement.style.position = 'relative';
//     viewerElement.style.overflow = 'hidden'; // Prevent scrollbars
//     viewerElement.style.width = '100%';
//     viewerElement.style.height = '100vh'; // Ensure it takes full viewport height
//     viewerElement.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;

//     // Add Video as Background
//     const video = document.createElement('video');
//     video.src = '../Assets/sky.mp4'; // Replace with your video path
//     video.loop = true;
//     video.muted = true;

//     // Play the video once it's loaded
//     video.addEventListener('loadeddata', () => {
//       video.play();
//     });

//     // Add appropriate styling for video to fill the background
//     const backgroundDiv = document.getElementById('background-video');
//     backgroundDiv.appendChild(video);
//     video.style.position = 'absolute';
//     video.style.top = 0;
//     video.style.left = 0;
//     video.style.width = '100%';
//     video.style.height = '100%';
//     video.style.objectFit = 'cover';
//     video.style.zIndex = '-1'; // Ensure the video stays behind other elements

//     const loader = new GLTFLoader();
//     loader.load('/airplane/scene.gltf', (gltf) => {
//       const graph_ = parseGltf(gltf);
//       setGraph(graph_);

//       gltf.scene.traverse((node) => {
//         if (node.isMesh) {
//           node.material = new THREE.MeshLambertMaterial({
//             color: 0xffffff,
//             transparent: true,
//             opacity: 0.5, // Keep the model semi-transparent
//           });
//         }
//       });

//       scene.add(gltf.scene);
//       setModel(gltf.scene);
//     });

//     const light = new THREE.AmbientLight(0x404040); // soft white light
//     scene.add(light);

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Click handler
//     const handleMouseClick = (event) => {
//       event.preventDefault();

//       // Get the mouse position in normalized device coordinates (NDC)
//       const rect = renderer.domElement.getBoundingClientRect();
//       mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//       // Update raycaster with mouse position and camera
//       raycaster.setFromCamera(mouse, camera);

//       // Intersect the spheres
//       const intersects = raycaster.intersectObjects(spheres);

//       if (intersects.length > 0) {
//         const selectedSphere = intersects[0].object;

//         // Reset the previous selected node's color and size
//         spheres.forEach((sphere) => {
//           sphere.material.color.set(0xffff00); // Set color back to yellow
//           sphere.scale.set(1, 1, 1); // Reset the size
//         });

//         // Update the clicked node's color to red and enlarge it
//         selectedSphere.material.color.set(0xff0000);
//         selectedSphere.scale.set(1.5, 1.5, 1.5); // Increase size

//         setSelectedNode(selectedSphere.userData.id);
//         setIsPanelOpen(true); // Reopen the panel when a sphere is clicked
//       }
//     };

//     renderer.domElement.addEventListener('click', handleMouseClick);

//     // Clean up on component unmount
//     return () => {
//       renderer.domElement.removeEventListener('click', handleMouseClick);
//     };
//   }, [spheres]);

//   useEffect(() => {
//     if (model) {
//       if (isPanelOpen) {
//         model.scale.set(0.7, 0.7, 0.7); // Shrink the model to 70% of its original size
//         model.position.set(-1.5, 0, 0); // Move it slightly to the left
//       } else {
//         model.scale.set(1, 1, 1); // Reset to original size
//         model.position.set(0, 0, 0); // Center the model
//       }
//     }
//   }, [model, isPanelOpen]);

//   useEffect(() => {
//     if (model && graph.nodes.length > 0) {
//       const newSpheres = graph.nodes.map((node) => {
//         const geometry = new THREE.SphereGeometry(0.05, 32, 32);
//         const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Initial color yellow
//         const sphere = new THREE.Mesh(geometry, material);

//         sphere.position.copy(node.position);
//         sphere.userData = { id: node.info_id };

//         return sphere;
//       });

//       newSpheres.forEach((sphere) => {
//         model.add(sphere);
//       });

//       setSpheres(newSpheres);
//     }
//   }, [model, graph]);

//   const handlePanelClose = () => {
//     setIsPanelOpen(false); // Close the side panel
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-200">
//       {/* Navbar */}
//       <nav className="bg-gray-800 text-white p-4 fixed w-full z-10">
//         <h1 className="text-xl">3D Model Viewer</h1>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-1 mt-36"> {/* Adjusted top margin for the navbar */}
//         {/* Model and Video Section */}
//         <div
//           id="model-container"
//           className={`relative ${isPanelOpen ? 'w-3/4' : 'w-full'} h-full bg-transparent transition-all duration-300`}
//           style={{ zIndex: '1' }}
//         >
//           <div
//             id="background-video"
//             className="absolute w-full h-full z-0"
//             style={{ overflow: 'hidden' }}
//           ></div>
//           <div
//             id="viewer"
//             className="relative w-full h-full"
//           ></div>
//         </div>

//         {/* Side Panel */}
//         {isPanelOpen && (
//           <div className="w-1/4 p-4 bg-white shadow-md z-10 relative transition-all duration-300">
//             <h3 className="text-lg font-semibold">Node Information</h3>
//             <button
//               onClick={handlePanelClose}
//               className="absolute top-2 right-2 text-red-500"
//             >
//               &#x2716; {/* Cross/close button */}
//             </button>
//             {selectedNode ? (
//               <div>
//                 <p className="mt-2 text-sm">
//                   <strong>Node ID:</strong> {selectedNode}
//                 </p>
//               </div>
//             ) : (
//               <p className="mt-2 text-sm">Click on a sphere to view node details</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModelViewer;
