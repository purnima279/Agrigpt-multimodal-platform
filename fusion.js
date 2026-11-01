// Late-fusion of modalities: text/voice + leaf image + sensors + simulated field -> one explainable diagnosis.
const KW={
  aphid:['aphid','sticky','curl','honeydew','माहू','एफिड','ਚੇਪਾ'],
  caterpillar:['caterpillar','hole','chew','larva','इल्ली','सुंडी','ਸੁੰਡੀ'],
  locust:['locust','swarm','defoliat','टिड्डी','ਟਿੱਡੀ'],
  fungus:['spot','blight','mold','mould','rust','fung','धब्बे','फफूंद','ਧੱਬੇ','ਉੱਲੀ']};
export const NAMES={aphid:{en:'Aphids',hi:'माहू (एफिड)',pa:'ਚੇਪਾ'},caterpillar:{en:'Caterpillars',hi:'इल्ली',pa:'ਸੁੰਡੀ'},locust:{en:'Locusts',hi:'टिड्डी',pa:'ਟਿੱਡੀ'},fungus:{en:'Fungal disease',hi:'फफूंद रोग',pa:'ਉੱਲੀ ਰੋਗ'},none:{en:'No clear threat',hi:'कोई स्पष्ट खतरा नहीं',pa:'ਕੋਈ ਸਪੱਸ਼ਟ ਖ਼ਤਰਾ ਨਹੀਂ'}};
const ADV={
  aphid:{en:'Treat only the affected patch and check again in 3 days.',hi:'केवल प्रभावित हिस्से का उपचार करें और 3 दिन बाद दोबारा जाँचें।',pa:'ਸਿਰਫ਼ ਪ੍ਰਭਾਵਿਤ ਹਿੱਸੇ ਦਾ ਇਲਾਜ ਕਰੋ ਅਤੇ 3 ਦਿਨ ਬਾਅਦ ਮੁੜ ਜਾਂਚ ਕਰੋ।'},
  caterpillar:{en:'Hand-pick or spot-treat where holes appear; avoid blanket spraying.',hi:'छेद वाली जगह पर ही उपचार करें, पूरे खेत में छिड़काव न करें।',pa:'ਜਿੱਥੇ ਛੇਕ ਹਨ ਉੱਥੇ ਹੀ ਇਲਾਜ ਕਰੋ, ਪੂਰੇ ਖੇਤ ਵਿੱਚ ਛਿੜਕਾਅ ਨਾ ਕਰੋ।'},
  locust:{en:'Urgent: alert neighbours and local agriculture office; act early on the swarm front.',hi:'तुरंत पड़ोसियों और कृषि कार्यालय को सूचित करें।',pa:'ਤੁਰੰਤ ਗੁਆਂਢੀਆਂ ਅਤੇ ਖੇਤੀ ਦਫ਼ਤਰ ਨੂੰ ਸੂਚਿਤ ਕਰੋ।'},
  fungus:{en:'Improve airflow, avoid overhead irrigation, treat the hotspot only.',hi:'हवा का प्रवाह बढ़ाएँ, ऊपर से सिंचाई न करें, केवल प्रभावित जगह उपचार करें।',pa:'ਹਵਾ ਦਾ ਵਹਾਅ ਵਧਾਓ, ਉੱਪਰੋਂ ਸਿੰਚਾਈ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਪ੍ਰਭਾਵਿਤ ਥਾਂ ਦਾ ਇਲਾਜ ਕਰੋ।'},
  none:{en:'Keep monitoring.',hi:'निगरानी जारी रखें।',pa:'ਨਿਗਰਾਨੀ ਜਾਰੀ ਰੱਖੋ।'}};
export function fuse({text,image,s,field,lang}){
  const sc={aphid:.1,caterpillar:.1,locust:.1,fungus:.1},ev=[],used=[];
  const t=(text||'').toLowerCase();
  if(t){used.push('text');for(const k in KW)if(KW[k].some(w=>t.includes(w))){sc[k]+=.5;ev.push([`Words match ${k} symptoms`,.5])}}
  let sevImg=0;if(image&&image.ok){used.push('image');sevImg=image.damage;ev.push([`Leaf photo damage ${Math.round(sevImg*100)}%`,sevImg])}
  if(s){used.push('sensors');
    if(s.hum>75&&s.temp>18&&s.temp<32){sc.fungus+=.3;ev.push(['Warm + humid air favours fungus',.3])}
    if(s.temp>32&&s.hum<50){sc.aphid+=.2;sc.locust+=.2;ev.push(['Hot + dry favours aphids/locusts',.2])}
    if(s.voc>60){ev.push(['High VOC reading near crop',.1]);sc.fungus+=.1}}
  const fd=field?field.damage:0;if(field){used.push('field');if(fd>.05)ev.push([`Simulated field damage ${Math.round(fd*100)}%`,fd])}
  const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]),[top,v]=sorted[0],margin=v-sorted[1][1];
  const sev=Math.max(sevImg,fd),risk=Math.min(1,.45*sevImg+.25*fd+.3*Math.min(1,v));
  const type=v<.3&&sev<.1?'none':top;
  const conf=Math.min(.97,.35+.12*used.length+margin*.5);
  const level=sev<.1?'Low':sev<.3?'Moderate':'Severe';
  return{type,conf,level,risk,used,ev,name:NAMES[type][lang],advice:ADV[type][lang]};
}
