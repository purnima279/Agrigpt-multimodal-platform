// Webcam hand control via MediaPipe Hands. Open hand moves = rotate; pinch + move up/down = zoom.
const load=s=>new Promise((ok,no)=>{const e=document.createElement('script');e.src=s;e.onload=ok;e.onerror=no;document.head.append(e)});
export async function enableGestures(video,cb){
  const base='https://cdn.jsdelivr.net/npm/@mediapipe/';
  await load(base+'hands/hands.js');await load(base+'camera_utils/camera_utils.js');
  const hands=new Hands({locateFile:f=>base+'hands/'+f});
  hands.setOptions({maxNumHands:1,modelComplexity:0,minDetectionConfidence:.6,minTrackingConfidence:.6});
  let last=null;
  hands.onResults(r=>{const l=r.multiHandLandmarks&&r.multiHandLandmarks[0];if(!l){last=null;return}
    const pinch=Math.hypot(l[4].x-l[8].x,l[4].y-l[8].y)<.06,x=l[9].x,y=l[9].y;
    if(last){const dx=x-last.x,dy=y-last.y;pinch?cb({zoom:dy*20}):cb({rx:-dx*6,ry:dy*4})}
    last={x,y}});
  video.style.display='block';
  await new Camera(video,{onFrame:async()=>{await hands.send({image:video})},width:320,height:240}).start();
}
