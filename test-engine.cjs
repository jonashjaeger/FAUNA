const assert=require('node:assert/strict');const fs=require('node:fs');const E=require('../engine.js');
const csv=fs.readFileSync(require('node:path').join(__dirname,'../examples/illustrative_nisp.csv'),'utf8');
const {headers,rows}=E.parseCSV(csv);assert.equal(headers[0],'site');assert.equal(rows.length,18);
const {rows:normalized,errors}=E.normalize(rows,{site:'site',country:'country',region:'region',period:'period',context:'context',taxon:'taxon',nisp:'nisp',source:'source'},'long');assert.equal(errors.length,0);assert.equal(normalized.length,18);
const units=E.unitize(normalized);assert.equal(units.length,4);assert.equal(units.reduce((s,u)=>s+u.total,0),normalized.reduce((s,r)=>s+r.nisp,0));assert.equal(E.canonicalTaxon('Ovis/Capra'),'Sheep/goat');assert.equal(E.canonicalTaxon('Ovis aries'),'Sheep');assert.equal(E.canonicalTaxon('Capra hircus'),'Goat');assert.equal(E.canonicalTaxon('Caprinae'),'Caprinae');
const countries=E.aggregate(units,'country','pooled','all',['Sheep','Goat','Sheep/goat']);assert.equal(countries.length,3);for(const c of countries){let share=Object.values(c.pct).reduce((a,b)=>a+(b||0),0);assert(share<=100.001);}
const shares=E.aggregate(units,'site','pooled','selected',['Sheep','Goat','Sheep/goat']);for(const s of shares)assert(Math.abs(Object.values(s.pct).reduce((a,b)=>a+b,0)-100)<.00001);
const ratios=E.ratio(units,'country','Sheep','Cattle','pooled','share');for(const r of ratios)assert(Math.abs(r.value-100*r.A/(r.A+r.B))<1e-8);
const time=E.timeSeries(units,'taxon','Sheep',['Sheep','Cattle'],'pooled','all');assert.deepEqual(time.keys,['Sheep','Cattle']);assert.deepEqual(time.data.map(x=>x.period),['Late Iron Age','Viking Age']);
const out=E.toCSV(normalized.map(x=>({site:x.site,taxon:x.taxon,nisp:x.nisp})));assert.equal(E.parseCSV(out).rows.length,18);
let quoted=E.parseCSV('site;taxon;nisp\n"My;site";"Ovis/Capra";3');assert.equal(quoted.rows[0].site,'My;site');
let wide=[{site:'A',Sheep:'10',Goat:'0',Cattle:'8'}];let wc=E.normalize(wide,{site:'site',taxaColumns:['Sheep','Goat','Cattle']},'wide');assert.deepEqual(wc.rows.map(r=>r.nisp),[10,0,8]);
assert.equal(E.normalize([{site:'A',species:'goat',NISP:'-2'}],{site:'site',taxon:'species',nisp:'NISP'}).errors.length,1);
// Key comparative weighting contrast: large site vs small site
const sRows=[{site:'A',period:'Viking Age',country:'Denmark',region:'Zealand',taxon:'Sheep',nisp:900},{site:'A',period:'Viking Age',country:'Denmark',region:'Zealand',taxon:'Cattle',nisp:100},{site:'B',period:'Viking Age',country:'Denmark',region:'Zealand',taxon:'Sheep',nisp:1},{site:'B',period:'Viking Age',country:'Denmark',region:'Zealand',taxon:'Cattle',nisp:9}];const nu=E.unitize(sRows);const pooled=E.aggregate(nu,'country','pooled','all',['Sheep'])[0].pct.Sheep;const equal=E.aggregate(nu,'country','siteMean','all',['Sheep'])[0].pct.Sheep;assert(Math.abs(pooled-(901/1010*100))<1e-9);assert.equal(equal,50);
console.log('PASS: CSV/semicolon parsing, normalisation, taxonomic ambiguity, NISP conservation, aggregation modes, ratios, chronology, wide-format mapping, validation');
