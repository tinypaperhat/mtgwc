var f=null,h=0;
function l(b){var a=this;a.ca={name:b&&b.name?b.name:"",types:b&&b.types?b.types:[""],Q:b&&b.Q?b.Q:0,h:b&&b.h?b.h:"",V:b&&b.V?b.V:"",R:b&&b.R?b.R:"",O:b&&b.O?b.O:"",g:b&&b.g?b.g:"",r:b&&b.r?b.r:f,K:b&&b.K?b.K:f,d:b&&b.d?b.d:[f],w:b&&b.w?b.w:f};a.F=h++;a.aa=document.createElement("div");a.$=document.createElement("div");a.i=function(){return a.$};a.e=function(){return a.aa};a.getData=function(){return a.ca};a.getName=function(){return a.getData().name};a.b=function(){return a.getData().r};a.S=function(){return a.getData().d};
a.v=function(){return a.getData().g};a.k=function(){return a.getData().h};a.pa=function(){a.e().className+=" tapped";a.N=!0};a.Z=function(){a.e().className="card";a.N=!1};a.na=function(){return a.N};a.i().onmouseover=function(){document.getElementById("card-view").innerHTML='<img class="card-view" src="'+a.v()+'">'};a.e().onmouseover=function(){document.getElementById("card-view").innerHTML='<img class="card-view" src="'+a.v()+'">'}}
function m(b){var a=this;b||(b={});b.types=["Basic Land"];l.call(a,b);a.Z();a.getData().r=b.W;a.getData().K=b.W;a.getData().h=b.h;a.getData().w=function(){var b=a.b().T();b.L(a);b.U().removeChild(a.i())};a.L=function(){a.e().className="card";a.e().style.backgroundImage='url("'+a.v()+'")';a.e().ondblclick=function(){a.na()?(a.Z(),a.S().q.n()):(a.pa(),a.S().p.j())};a.b().ma().appendChild(a.e())}}m.prototype=new l;(function(b){b||(b={});b.types.unshift("Land");l.call(this,b)}).prototype=new l;
function n(b){var a=this;b||(b={});m.call(a,b);a.getData().types.push("Island");a.getData().name="Island";a.getData().g="images/card/"+a.k()+"/island.jpg";a.getData().d={p:{j:function(){a.b().a().update("island",1)}},q:{n:function(){a.b().a().update("island",-1)}}}}n.prototype=new m;
function p(b){var a=this;b||(b={});m.call(a,b);a.getData().types.push("Mountain");a.getData().name="Mountain";a.getData().g="images/card/"+a.k()+"/mountain.jpg";a.getData().d={p:{j:function(){a.b().a().update("mountain",1)}},q:{n:function(){a.b().a().update("mountain",-1)}}}}p.prototype=new m;
function q(b){var a=this;b||(b={});m.call(a,b);a.getData().types.push("Forest");a.getData().name="Forest";a.getData().g="images/card/"+a.k()+"/forest.jpg";a.getData().d={p:{j:function(){a.b().a().update("forest",1)}},q:{n:function(){a.b().a().update("forest",-1)}}}}q.prototype=new m;
function r(b){var a=this;b||(b={});m.call(a,b);a.getData().types.push("Swamp");a.getData().name="Swamp";a.getData().g="images/card/"+a.k()+"/swamp.jpg";a.getData().d={p:{j:function(){a.b().a().update("swamp",1)}},q:{n:function(){a.b().a().update("swamp",-1)}}}}r.prototype=new m;
function s(b){var a=this;b||(b={});m.call(a,b);a.getData().types.push("Plains");a.getData().name="Plains";a.getData().g="images/card/"+a.k()+"/plains.jpg";a.getData().d={p:{j:function(){a.b().a().update("plains",1)}},q:{n:function(){a.b().a().update("plains",-1)}}}}s.prototype=new m;var t={island:function(b){return new n(b)},swamp:function(b){return new r(b)},plains:function(b){return new s(b)},mountain:function(b){return new p(b)},forest:function(b){return new q(b)}},u=1;
function w(b){var a=b.split("\n");b=b.toLowerCase().split("\n");for(var c=0;c<a.length;c++)if("-"===a[c].charAt(0))if("-deckname"===b[c])c++,this.s=a[c];else if("-playername"===b[c])c++,this.C=a[c];else if("-mainboard"===b[c]){this.m=[];for(c++;c<a.length&&"-"!==a[c].charAt(0);c++)this.m.push(a[c]);c--}else if("-sideboard"===b[c]){this.o=[];for(c++;c<a.length&&"-"!==a[c].charAt(0);c++)this.o.push(a[c]);c--}this.s=this.s?this.s:"Deck";this.C=this.C?this.C:"Player 1";if(!this.m||!this.m[0])throw Error("There was a problem parsing the wcd.");
if(!this.o||!this.o[0])this.o=f}
function x(b){var a=this;a.H=b;a.G={B:0,z:0,D:0,A:0,t:0,P:0};a.f=function(){return a.H};a.a=function(){return a.G};a.update=function(b,d){switch(b){case "island":a.a().z+=d;break;case "mountain":a.a().A+=d;break;case "forest":a.a().t+=d;break;case "swamp":a.a().D+=d;break;case "plains":a.a().B+=d}var g=document.getElementById("player"+a.f().u()+"-mana-pool").getElementsByTagName("div"),k;for(k in g){var e=g[k];1===e.nodeType&&("mana-symbol mana-plains"===e.className?e.innerText=a.a().B?a.a().B:"":
"mana-symbol mana-island"===e.className?e.innerText=a.a().z?a.a().z:"":"mana-symbol mana-swamp"===e.className?e.innerText=a.a().D?a.a().D:"":"mana-symbol mana-mountain"===e.className?e.innerText=a.a().A?a.a().A:"":"mana-symbol mana-forest"===e.className?e.innerText=a.a().t?a.a().t:"":"mana-symbol mana-colorless"===e.className&&(e.innerText=a.a().P?a.a().P:""))}}}function y(b){var a=this;a.ba=[];a.H=b;a.c=function(){return a.ba};a.f=function(){return a.H};a.J=function(){return a.c().length}}
function z(b){var a=this;y.call(a,b);if(!a.f())throw Error("The Library object requires a Player object");a.I=function(b,d){d||(d=0);a.Y();a.c().splice(d,0,b)};a.M=function(){var b=a.c().pop();a.Y();return b};a.oa=function(){for(var b,d,g=a.J()-1;0<g;g--)b=Math.floor(Math.random()*(g+1)),d=a.c()[g],a.c()[g]=a.c()[b],a.c()[b]=d};a.Y=function(){document.getElementById("player"+a.f().u()+"-library-size").innerText=a.J()};(function(){for(var b=a.f().l().m,d=f,g=0,k=0,e=d=0;e<b.length;e++)if(b[e])for(var d=
b[e].split(" ",3),g=d[0],k=d[1],d=d[2],v=0;v<g;v++)if(t.hasOwnProperty(d))a.I(t[d]({W:a.f(),h:k}));else throw Error("Could not create a card called "+d);})();a.oa()}z.prototype=new y;
function A(b){var a=this;y.call(a,b);a.ea=document.getElementById("player"+a.f().u()+"-hand");a.U=function(){return a.ea};a.I=function(b){new Image;b.i().ondblclick=function(){b.getData().w()};b.i().className="card-hand";b.i().style.backgroundImage='url("'+b.v()+'")';a.U().appendChild(b.i());a.c().push(b);a.X()};a.M=function(b){b=a.c().indexOf(b);-1<b&&(a.c().splice(b,1),a.X())};a.L=function(b){-1<a.c().indexOf(b)&&(b.L(),a.M(b))};a.X=function(){document.getElementById("player"+a.f().u()+"-hand-size").innerText=
a.J()}}A.prototype=new y;
for(var B=new function(b){var a=this;if(!b)throw Error("Must provide a wcd");a.ka=function(){var b=a.la().M();b?a.T().I(b):a.ra=!0};a.F=u++;a.ga=20;a.ia=0;a.ha=document.getElementById("player"+a.F+"-play");a.u=function(){return a.F};a.wa=function(){return a.ga};a.ia=function(){return a.ua};a.ma=function(){return a.ha};a.ja=new w(b);a.l=function(){return a.ja};a.ta=a.l().C;a.qa=a.l().s;a.sa=a.l().m;a.va=a.l().o;a.fa=new z(a);a.da=new A(a);a.G=new x(a);a.la=function(){return a.fa};a.T=function(){return a.da};
a.a=function(){return a.G}}("-DECKNAME\nLands\n-PLAYERNAME\nJeff McRiffey\n-MAINBOARD\n8 urzas-saga island\n8 urzas-saga plains\n8 urzas-saga swamp\n8 urzas-saga mountain\n8 urzas-saga forest\n"),C=0;7>C;C++)B.ka();
