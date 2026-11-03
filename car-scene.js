import * as THREE from './vendor/three.module.js';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');

function fallbackMarkup(tone) {
  return `<svg class="car-code-fallback" viewBox="0 0 1000 480" fill="none" aria-hidden="true"><defs><linearGradient id="car-metal-${tone}" x2=".3" y2="1"><stop stop-color="#e5edf1"/><stop offset=".38" stop-color="#728695"/><stop offset=".64" stop-color="#263b4b"/><stop offset="1" stop-color="#aebec8"/></linearGradient></defs><ellipse cx="520" cy="375" rx="390" ry="29" fill="#071b2b" opacity=".16"/><path d="M90 286 133 247 303 216 426 129Q455 109 508 111L653 117 769 202 885 236Q925 251 929 299L913 333 834 349 199 350 96 330Z" fill="url(#car-metal-${tone})" stroke="#dce7ee" stroke-width="3"/><path d="M329 213 445 134 507 130 648 138 731 203Z" fill="#102534" stroke="#a0b2bf" stroke-width="4"/><path d="m527 132-6 75M143 252l178-30M151 279l137-15M719 232l149 20" stroke="#eafaff" stroke-width="7" stroke-linecap="round"/><path d="m110 295 173-10-8 35-151 1Z" fill="#0a1722"/><path d="m315 239 336-14 84 20-2 66-390 6Z" stroke="#273a48" stroke-width="2"/><g fill="#131e28" stroke="#97a8b3" stroke-width="7"><ellipse cx="301" cy="330" rx="67" ry="73"/><ellipse cx="780" cy="319" rx="64" ry="70"/></g><g fill="#2a3c4a" stroke="#c9d4dc" stroke-width="13"><ellipse cx="301" cy="330" rx="40" ry="45"/><ellipse cx="780" cy="319" rx="39" ry="44"/></g></svg>`;
}

function geometryGrid(rows, cols, sample) {
  const points = [], indices = [];
  for (let i = 0; i <= rows; i++) for (let j = 0; j <= cols; j++) points.push(...sample(i / rows, j / cols));
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const a = i * (cols + 1) + j, b = a + cols + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  geo.setIndex(indices); geo.computeVertexNormals();
  return geo;
}

function makeCar(wash) {
  const car = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({color: wash ? 0xc3d8e4 : 0x465968, metalness:.78, roughness:.28, clearcoat:1, clearcoatRoughness:.22, side:THREE.DoubleSide});
  const chrome = new THREE.MeshStandardMaterial({color:0xc6d4dd, metalness:1, roughness:.18});
  const black = new THREE.MeshStandardMaterial({color:0x0b1219, metalness:.25, roughness:.3});
  const rubber = new THREE.MeshStandardMaterial({color:0x101317, metalness:0, roughness:.8});
  const glass = new THREE.MeshPhysicalMaterial({color:0x071722, metalness:.12, roughness:.1, clearcoat:1, side:THREE.DoubleSide});
  const lamp = new THREE.MeshStandardMaterial({color:0xe2f7ff, emissive:0xc4efff, emissiveIntensity:2, roughness:.15});
  const red = new THREE.MeshStandardMaterial({color:0xa21d21, emissive:0xc32320, emissiveIntensity:1.2, roughness:.2});
  const accent = new THREE.MeshStandardMaterial({color:wash?0x2466d8:0xc9865e, metalness:.6, roughness:.28});
  const mesh = (geo, mat, parent=car) => {const m=new THREE.Mesh(geo,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  function box(w,h,d,x,y,z,mat,parent=car){const m=mesh(new THREE.BoxGeometry(w,h,d),mat,parent);m.position.set(x,y,z);return m;}
  function line(points,radius,mat,parent=car){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,Math.max(12,points.length*8),radius,6,false),mat,parent);}
  const section = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.65,.76,.72), new THREE.Vector3(-2.35,.91,.94), new THREE.Vector3(-1.65,1.04,1.035),
    new THREE.Vector3(-.8,.99,1.015), new THREE.Vector3(0,.97,1.0), new THREE.Vector3(.85,1.01,1.03),
    new THREE.Vector3(1.65,1.08,1.06),new THREE.Vector3(2.32,.93,.98),new THREE.Vector3(2.6,.8,.8)
  ],false,'catmullrom',.4);
  function low(x) {
    let y=.33;
    for (const axle of [-1.65,1.65]) {const d=x-axle;if(Math.abs(d)<.49)y=Math.max(y,.46+Math.sqrt(.49*.49-d*d));}
    return y;
  }
  mesh(geometryGrid(128,32,(u,v)=>{const s=section.getPoint(u),z=v*2-1;return[s.x,s.y-.115*Math.pow(Math.abs(z),5),s.z*z];}),paint);
  for(const side of [-1,1]){
    mesh(geometryGrid(128,8,(u,v)=>{const s=section.getPoint(u),top=s.y-.115,bottom=Math.min(top-.025,low(s.x));return[s.x,top+(bottom-top)*v,side*(s.z+.012*Math.sin(v*Math.PI)-.035*v*v)];}),paint);
    for (const axle of [-1.65,1.65]) {
      const pts=[];for(let i=0;i<=28;i++){const a=i/28*Math.PI;pts.push([axle-Math.cos(a)*.49,.46+Math.sin(a)*.49,side*1.045]);}
      line(pts,.017,black);
    }
    line([[-1.1,.43,side*1.01],[-.7,.34,side*.985],[.4,.34,side*.985],[1.12,.44,side*1.025]],.035,black);

    line([[-.73,.89,side*1.025],[-.64,.63,side*1.025],[-.43,.4,side*.995],[.82,.4,side*1.013],[1.13,.75,side*1.043],[1.14,.91,side*1.044]],.007,black);
    box(.18,.024,.025,.65,.865,side*1.043,chrome);
    box(.24,.042,.028,-.96,.78,side*1.037,black);
    line([[-.59,1.10,side*.86],[-.62,1.12,side*1.04],[-.55,1.1,side*1.16]],.022,black);
    const mirror=mesh(new THREE.SphereGeometry(1,24,12),paint);mirror.scale.set(.17,.075,.11);mirror.position.set(-.51,1.12,side*1.17);
  }
  // A continuous glasshouse with a painted roof and separate window seals.
  const cabin = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.9,1.00,.81),new THREE.Vector3(-.67,1.19,.78),new THREE.Vector3(-.22,1.51,.685),
    new THREE.Vector3(.23,1.59,.68),new THREE.Vector3(.79,1.55,.695),new THREE.Vector3(1.26,1.33,.76),new THREE.Vector3(1.82,1.035,.84)
  ],false,'catmullrom',.4);
  const cabinStart=car.children.length;
  mesh(geometryGrid(48,20,(u,v)=>{const s=cabin.getPoint(u),z=v*2-1;return[s.x,s.y-.052*Math.pow(Math.abs(z),3),s.z*z];}),glass);
  for(const side of [-1,1]){
    mesh(geometryGrid(48,6,(u,v)=>{const s=cabin.getPoint(u);return[s.x,(s.y-.05)*(1-v)+1.005*v,side*(s.z*(1-v)+.85*v)];}),glass);
    line([[-.9,1.005,side*.82],[-.64,1.21,side*.78],[-.2,1.48,side*.69],[.25,1.555,side*.686],[.79,1.515,side*.70],[1.27,1.29,side*.77],[1.82,1.01,side*.85]],.024,paint);
    line([[-.91,1.005,side*.85],[.3,1.003,side*.855],[1.81,1.01,side*.85]],.015,chrome);
    line([[.65,1.025,side*.855],[.65,1.51,side*.71]],.036,black);
  }
  mesh(geometryGrid(24,20,(u,v)=>{const x=-.22+u*1.09,z=v*2-1;return[x,1.596-.09*Math.pow((x-.2)/.82,2)-.05*Math.pow(Math.abs(z),3),z*.679];}),paint);


  for(const part of car.children.slice(cabinStart)){const positions=part.geometry?.attributes.position;if(!positions)continue;for(let i=0;i<positions.count;i++)positions.setY(i,1+(positions.getY(i)-1)*.83);positions.needsUpdate=true;part.geometry.computeVertexNormals();}
  const samples=Array.from({length:257},(_,i)=>section.getPoint(i/256));
  function surface(x,z){let n=0;while(n<samples.length-2&&samples[n+1].x<x)n++;const a=samples[n],b=samples[n+1],f=clamp((x-a.x)/(b.x-a.x));const height=a.y+(b.y-a.y)*f,width=a.z+(b.z-a.z)*f;return height-.115*Math.pow(Math.abs(z/width),5)+.012;}
  for(const side of [-1,1])line([[-2.15,surface(-2.15,.42)+.002,side*.42],[-1.6,surface(-1.6,.49)+.002,side*.49],[-.91,surface(-.91,.57)+.002,side*.57]],.004,paint);
  // Sculpted front fascia, inset grille, double LED signatures and rear light bar.
  box(.12,.25,1.30,-2.59,.58,0,black);
  line([[-2.67,.7,-.65],[-2.69,.72,0],[-2.67,.7,.65],[-2.67,.45,.61],[-2.69,.42,0],[-2.67,.45,-.61],[-2.67,.7,-.65]],.016,chrome);
  const slats=new THREE.InstancedMesh(new THREE.BoxGeometry(.018,.2,.018),chrome,23);const tm=new THREE.Object3D();
  for(let i=0;i<23;i++){tm.position.set(-2.674,.565,-.58+i*.0527);tm.updateMatrix();slats.setMatrixAt(i,tm.matrix);}car.add(slats);
  for(const side of [-1,1]){
    mesh(geometryGrid(8,12,(u,v)=>{const x=-2.48+u*.31+v*.10,z=side*(.50+v*.39);return[x,surface(x,z),z];}),black);
    const led=[];const secondary=[];for(let i=0;i<=10;i++){const z=side*(.53+i*.035),x=-2.46+i*.009;led.push([x,surface(x,z)+.008,z]);secondary.push([x+.10,surface(x+.10,z)+.008,z]);}line(led,.012,lamp);line(secondary,.006,lamp);
    line([[2.54,.77,side*.82],[2.62,.78,side*.52],[2.63,.78,side*.08]],.025,red);
    const tip=mesh(new THREE.CylinderGeometry(.07,.07,.16,20),chrome);tip.rotation.z=Math.PI/2;tip.position.set(2.58,.37,side*.67);
  }
  box(.065,.13,1.35,2.55,.48,0,black);
  line([[-2.64,.36,-.84],[-2.72,.34,0],[-2.64,.36,.84]],.028,black);
  // Four tyres, machined split-spoke rims, visible discs, hubs and calipers.
  const wheels=[];
  for(const x of [-1.65,1.65])for(const side of [-1,1]){
    const w=new THREE.Group();w.position.set(x,.46,side*1.035);if(side<0)w.rotation.y=Math.PI;car.add(w);wheels.push(w);
    mesh(new THREE.TorusGeometry(.345,.102,16,64),rubber,w);
    const inner=mesh(new THREE.CylinderGeometry(.322,.322,.17,48),black,w);inner.rotation.x=Math.PI/2;
    const rim=mesh(new THREE.TorusGeometry(.313,.025,12,64),chrome,w);rim.position.z=.106;
    const lip=mesh(new THREE.TorusGeometry(.283,.01,8,48),chrome,w);lip.position.z=.112;
    const disc=mesh(new THREE.CylinderGeometry(.263,.263,.018,48),chrome,w);disc.rotation.x=Math.PI/2;disc.position.z=.06;
    const holes=new THREE.InstancedMesh(new THREE.CircleGeometry(.009,6),black,24);
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2;tm.position.set(Math.cos(a)*.227,Math.sin(a)*.227,.072);tm.rotation.set(0,0,0);tm.scale.set(1,1,1);tm.updateMatrix();holes.setMatrixAt(i,tm.matrix);}w.add(holes);
    const spokes=new THREE.InstancedMesh(new THREE.BoxGeometry(.045,.24,.043),chrome,10);
    for(let i=0;i<10;i++){const a=i/10*Math.PI*2+.16;tm.position.set(Math.sin(a)*.17,Math.cos(a)*.17,.119);tm.rotation.set(0,0,-a+.16);tm.updateMatrix();spokes.setMatrixAt(i,tm.matrix);}w.add(spokes);
    const hub=mesh(new THREE.CylinderGeometry(.073,.073,.045,32),chrome,w);hub.rotation.x=Math.PI/2;hub.position.z=.125;
    const cap=mesh(new THREE.CylinderGeometry(.046,.046,.012,24),black,w);cap.rotation.x=Math.PI/2;cap.position.z=.151;
    box(.06,.16,.04,.21,.04,.084,accent,w);
  }
  return {car,wheels,paint};
}

function mountCar(host) {
  const wash=host.dataset.carScene==='wash';
  host.style.cssText+=';position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  host.innerHTML=fallbackMarkup(wash?'wash':'service');
  const fallback=host.firstElementChild;fallback.style.cssText='width:100%;height:100%;display:block;';
  let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{host.dataset.renderState='fallback';return;}
  const canvas=renderer.domElement;canvas.setAttribute('aria-hidden','true');canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;pointer-events:none;';host.append(canvas);
  renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),1.75));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=wash?1.08:1.15;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  const scene=new THREE.Scene();const {car,wheels}=makeCar(wash);scene.add(car);
  const environment=new THREE.Scene();environment.background=new THREE.Color(wash?0x768b9c:0x59626c);
  const panels=[];
  for(const [x,y,z,w,h,intensity] of [[0,6,0,12,5,3],[-5,3,4,5,7,3.5],[3,3,-4,4,6,2.3],[5,1,5,3,5,1.5]]){
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color().setScalar(intensity),side:THREE.DoubleSide}));panel.position.set(x,y,z);panel.lookAt(0,.7,0);environment.add(panel);panels.push(panel);
  }
  const generator=new THREE.PMREMGenerator(renderer);const environmentMap=generator.fromScene(environment,.12,.1,30);scene.environment=environmentMap.texture;scene.environmentIntensity=.85;generator.dispose();for(const p of panels){p.geometry.dispose();p.material.dispose();}
  scene.add(new THREE.HemisphereLight(0xdfefff,0x263749,1.0));
  const key=new THREE.DirectionalLight(0xfff2df,2.6);key.position.set(-3,6,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=4;key.shadow.camera.bottom=-4;key.shadow.normalBias=.03;key.shadow.bias=-.0003;scene.add(key);
  const rim=new THREE.DirectionalLight(wash?0x8dcfff:0x8fbdd3,1.9);rim.position.set(3,3,-5);scene.add(rim);
  const warm=new THREE.PointLight(wash?0xccefff:0xffb379,20,12,2);warm.position.set(-1,2.5,3);scene.add(warm);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(18,14),new THREE.ShadowMaterial({opacity:wash?.19:.34}));ground.rotation.x=-Math.PI/2;ground.position.y=.01;ground.receiveShadow=true;scene.add(ground);
  const camera=new THREE.PerspectiveCamera(32,1,.1,60);const hero=host.closest('.hero')||host.parentElement;
  let w=1,h=1,hostLeft=0,viewportWidth=1,sectionTop=0,sectionHeight=800,sectionLeft=0,sectionWidth=1,visible=true,enabled=true,contextLost=false,disposed=false;
  let target=0,current=0,px=0,py=0,currentX=0,currentY=0,renderFrame=0,last=0;
  const targetPoint=new THREE.Vector3(0,.77,0);
  const fitCorners=[];car.updateMatrixWorld(true);car.traverse(part=>{if(!part.isMesh||part.isInstancedMesh)return;part.geometry.computeBoundingBox();const b=part.geometry.boundingBox;for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])fitCorners.push(new THREE.Vector3(x,y,z).applyMatrix4(part.matrixWorld));});const projected=new THREE.Vector3();
  function policy(){enabled=!reduced.matches&&!document.documentElement.hasAttribute('data-motion-off')&&!document.documentElement.classList.contains('motion-paused');if(!enabled){target=0;current=0;px=py=currentX=currentY=0;}else target=clamp((scrollY-sectionTop)/Math.max(350,sectionHeight*.6));request();}
  function resize(){const box=host.getBoundingClientRect();w=Math.max(box.width,1);h=Math.max(box.height,1);hostLeft=box.left;viewportWidth=innerWidth;if(canvas.width!==Math.floor(w*renderer.getPixelRatio())||canvas.height!==Math.floor(h*renderer.getPixelRatio()))renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();const b=hero.getBoundingClientRect();sectionTop=b.top+scrollY;sectionHeight=b.height;sectionLeft=b.left;sectionWidth=Math.max(b.width,1);onScroll();}
  function onScroll(){if(enabled)target=clamp((scrollY-sectionTop)/Math.max(350,sectionHeight*.6));request();}
  function move(event){if(!enabled||!fine.matches||event.pointerType==='touch')return;px=clamp((event.clientX-sectionLeft)/sectionWidth)*2-1;py=clamp((event.clientY-(sectionTop-scrollY))/sectionHeight)*2-1;request();}
  function leave(){px=py=0;request();}
  function request(){if(!disposed&&!renderFrame&&visible&&!document.hidden&&!contextLost)renderFrame=requestAnimationFrame(frame);}
  function stop(){cancelAnimationFrame(renderFrame);renderFrame=0;last=0;}
  function frame(time){
    renderFrame=0;
    if(!visible||document.hidden||contextLost){stop();return;}
    const delta=last?Math.min(50,time-last):16;last=time;const lerp=1-Math.exp(-delta/90);
    current+=(target-current)*lerp;currentX+=(px-currentX)*lerp;currentY+=(py-currentY)*lerp;
    const distance=8.3;
    const angle=-.68+current*.65+currentX*.045;
    camera.position.set(Math.sin(angle)*distance,1.95+current*.72+currentY*.10,Math.cos(angle)*distance);
    camera.lookAt(targetPoint);car.rotation.y=current*.07;car.position.y=Math.sin(current*Math.PI)*.035;
    camera.clearViewOffset();camera.zoom=1;camera.updateProjectionMatrix();camera.updateMatrixWorld();car.updateMatrix();
    let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
    for(const corner of fitCorners){projected.copy(corner).applyMatrix4(car.matrix).project(camera);minX=Math.min(minX,projected.x);maxX=Math.max(maxX,projected.x);minY=Math.min(minY,projected.y);maxY=Math.max(maxY,projected.y);}
    const visibleLeft=Math.max(0,-hostLeft),visibleRight=Math.min(w,viewportWidth-hostLeft),visibleWidth=Math.max(1,visibleRight-visibleLeft);
    const screenCenter=(visibleLeft+visibleRight)/2-w/2;
    camera.zoom=Math.min(1.94*visibleWidth/w/(maxX-minX),1.86/(maxY-minY));
    camera.setViewOffset(w,h,(minX+maxX)*camera.zoom*w/4-screenCenter,-(minY+maxY)*camera.zoom*h/4,w,h);camera.updateProjectionMatrix();
    key.position.x=-4+current*7;warm.position.x=-3+current*6;warm.intensity=(wash?15:22)+Math.sin(current*Math.PI)*15;
    for(let i=0;i<wheels.length;i++)wheels[i].rotation.z=-current*.35;
    renderer.render(scene,camera);
    if(host.dataset.renderState!=='ready'){host.dataset.renderState='ready';canvas.style.opacity='1';fallback.hidden=true;fallback.style.display='none';if(location.hostname==='127.0.0.1')console.info(`Procedural car: ${renderer.info.render.calls} draw calls, ${renderer.info.render.triangles} triangles, DPR ${renderer.getPixelRatio()}`);}
    if(Math.abs(target-current)+Math.abs(px-currentX)+Math.abs(py-currentY)>=.0006)request();else last=0;
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resizeObserver.observe(hero);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){onScroll();request();}else stop();},{rootMargin:'100px'});intersection.observe(host);
  const mutations=new MutationObserver(policy);mutations.observe(document.documentElement,{attributes:true,attributeFilter:['class','data-motion-off']});
  const visibility=()=>{if(document.hidden)stop();else{resize();policy();}};
  const lost=event=>{event.preventDefault();contextLost=true;stop();canvas.style.opacity='0';fallback.hidden=false;fallback.style.display='block';host.dataset.renderState='fallback';};
  const restored=()=>{contextLost=false;resize();policy();};
  canvas.addEventListener('webglcontextlost',lost);canvas.addEventListener('webglcontextrestored',restored);
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',resize,{passive:true});
  hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',leave,{passive:true});
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',policy);
  const pageshow=()=>{resize();policy();};window.addEventListener('pageshow',pageshow);
  window.addEventListener('pagehide',event=>{stop();if(event.persisted)return;disposed=true;resizeObserver.disconnect();intersection.disconnect();mutations.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',resize);window.removeEventListener('pageshow',pageshow);hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',policy);const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();environmentMap.dispose();renderer.dispose();},{once:false});
  resize();policy();
}

document.querySelectorAll('[data-car-scene]').forEach(host=>{try{mountCar(host);}catch(error){host.dataset.renderState='fallback';console.warn('3D scene unavailable; using vector car.',error.message);}});
