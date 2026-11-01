// Simple colour-based leaf damage estimator (placeholder for a trained CNN/YOLO model).
export function analyze(img){const r=_a(img);analyze.last=r;return r}
function _a(img){
  const c=document.createElement('canvas');c.width=c.height=160;const x=c.getContext('2d');x.drawImage(img,0,0,160,160);
  const d=x.getImageData(0,0,160,160).data;let g=0,b=0;
  for(let i=0;i<d.length;i+=4){const r=d[i],gr=d[i+1],bl=d[i+2];if(Math.max(r,gr,bl)-Math.min(r,gr,bl)<30)continue; // skip gray/white/black bg
    if(gr>r*1.05&&gr>bl*1.1)g++;else if(r>=gr*.85&&r>bl*1.3)b++}
  const tot=g+b;if(tot<200)return{ok:false,msg:'Could not find a leaf. Use a clearer photo.'};
  const dmg=b/tot,sev=dmg<.1?'Low':dmg<.3?'Moderate':'Severe';
  const adv={Low:'Monitor; scout again in 3 days.',Moderate:'Treat the affected zone only (targeted spraying).',Severe:'Urgent: isolate the zone, treat now, request expert review.'}[sev];
  return{ok:true,damage:dmg,sev,msg:`Estimated leaf damage ${Math.round(dmg*100)}% — ${sev}. ${adv}`};
}
