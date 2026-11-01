// Simulated IoT stream (replace with MQTT/WebSocket from NodeMCU/Arduino nodes).
export const sensors={temp:27,hum:60,moist:45,voc:20};
const walk=(v,s,lo,hi)=>Math.min(hi,Math.max(lo,v+(Math.random()-.5)*s));
export function tick(){sensors.temp=walk(sensors.temp,1,10,45);sensors.hum=walk(sensors.hum,3,15,98);sensors.moist=walk(sensors.moist,2,5,95);sensors.voc=walk(sensors.voc,4,0,100);return sensors}
export function preset(name){Object.assign(sensors,name=='humid'?{temp:26,hum:90,moist:80,voc:25}:{temp:37,hum:30,moist:15,voc:30})}
