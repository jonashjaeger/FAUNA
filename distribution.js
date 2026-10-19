/* FAUNA v1.3: comparative distributions. Descriptive analysis, not hypothesis testing. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.FaunaDistributions=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const finite=x=>typeof x==='number'&&Number.isFinite(x);
const numeric=(v,defaultValue)=>Number.isFinite(Number(v))?Number(v):defaultValue;
function quantile(values,q){if(!values.length)return null;const a=values.slice().sort((x,y)=>x-y),p=(a.length-1)*q,i=Math.floor(p),f=p-i;return a[i]+(a[Math.min(a.length-1,i+1)]-a[i])*f;}
function focusTaxa(focus){if(focus==='All caprines')return ['Sheep','Goat','Sheep/goat'];if(focus==='Identified sheep + goat')return ['Sheep','Goat'];return [focus];}
function calcUnit(unit,focus,denominator='all'){
 const target=focusTaxa(focus).reduce((s,t)=>s+(unit.counts[t]||0),0);
 let denom=unit.total;
 if(denominator==='livestock'){denom=['Sheep','Goat','Sheep/goat','Cattle','Pig'].reduce((s,t)=>s+(unit.counts[t]||0),0);}
 return {target,denominator:denom,value:denom>0?100*target/denom:null};
}
function summarize(points,cap=1000){
 const valid=points.filter(p=>finite(p.value)&&p.denominator>0);
 const n=valid.length,denom=valid.reduce((s,p)=>s+p.denominator,0),target=valid.reduce((s,p)=>s+p.target,0);
 const unweighted=n?valid.reduce((s,p)=>s+p.value,0)/n:null;
 const cappedDenom=valid.reduce((s,p)=>s+Math.min(p.denominator,cap),0);
 const capped=n&&cappedDenom?valid.reduce((s,p)=>s+p.value*Math.min(p.denominator,cap),0)/cappedDenom:null;
 const pooled=denom?100*target/denom:null;
 const maxDenom=n?Math.max(...valid.map(p=>p.denominator)):0;
 return {n,nisp:denom,target,pooled,equal:unweighted,capped,median:quantile(valid.map(p=>p.value),.5),q25:quantile(valid.map(p=>p.value),.25),q75:quantile(valid.map(p=>p.value),.75),min:n?Math.min(...valid.map(p=>p.value)):null,max:n?Math.max(...valid.map(p=>p.value)):null,largestShare:denom?100*maxDenom/denom:null,points:valid};
}
function analyze(units,opts={}){
 const minNISP=Math.max(0,numeric(opts.minNISP,0));const cap=Math.max(1,numeric(opts.cap,1000));
 const countries=(opts.countries||[]).filter(Boolean);const periods=(opts.periods||[]).filter(Boolean);
 const eligible=units.filter(u=>u.total>=minNISP&&(!countries.length||countries.includes(u.country))&&(!periods.length||periods.includes(u.period)));
 const focus=opts.focus||'All caprines',denominator=opts.denominator||'all';
 const points=eligible.map(u=>({id:u.id,site:u.site,assemblage:u.assemblage||'',context:u.context||'',country:u.country,region:u.region,period:u.period,nisp:u.total,...calcUnit(u,focus,denominator)}));
 const keys=new Map();for(const p of points){const key=JSON.stringify([p.country,p.period]);if(!keys.has(key))keys.set(key,[]);keys.get(key).push(p);}
 const groups=[...keys].map(([key,items])=>{const [country,period]=JSON.parse(key);return {country,period,...summarize(items,cap)};});
 return {groups,points,eligibleUnits:eligible.length,excludedUnits:units.length-eligible.length,minNISP,cap,focus,denominator};
}
return {quantile,focusTaxa,calcUnit,summarize,analyze};
});
