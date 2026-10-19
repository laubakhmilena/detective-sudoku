// Presentation only: the engine still uses each object's original type and cell.
(() => {
 const variants = {
  'station:clock':'station-clock', 'station:suitcase':'blue-suitcase',
  'museum:statue':'stone-lion', 'resort:tree':'snow-fir',
  'laboratory:shelf':'reagent-shelf', 'theatre:display':'costume-rail'
 };
 globalThis.DS.sceneArt = {
  object: (p,o) => 'assets/objects/'+(variants[p.id+':'+o.type]||o.type)+'.svg',
  files: Object.values(variants).map(name=>'assets/objects/'+name+'.svg')
 };
})();
