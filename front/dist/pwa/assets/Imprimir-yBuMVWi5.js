import{a as ae}from"./_commonjsHelpers-Bx2EM-6T.js";import{s as U}from"./index-CkwW658k.js";import{h as he}from"./moment-C5S46NFB.js";var j={},rt,Mt;function ge(){return Mt||(Mt=1,rt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),rt}var it={},D={},Rt;function _(){if(Rt)return D;Rt=1;let a;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return D.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},D.getSymbolTotalCodewords=function(n){return t[n]},D.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},D.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');a=n},D.isKanjiModeEnabled=function(){return typeof a<"u"},D.toSJIS=function(n){return a(n)},D}var ot={},$t;function Lt(){return $t||($t=1,function(a){a.L={bit:1},a.M={bit:0},a.Q={bit:3},a.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return a.L;case"m":case"medium":return a.M;case"q":case"quartile":return a.Q;case"h":case"high":return a.H;default:throw new Error("Unknown EC Level: "+r)}}a.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},a.from=function(n,e){if(a.isValid(n))return n;try{return t(n)}catch{return e}}}(ot)),ot}var st,Pt;function me(){if(Pt)return st;Pt=1;function a(){this.buffer=[],this.length=0}return a.prototype={get:function(t){const r=Math.floor(t/8);return(this.buffer[r]>>>7-t%8&1)===1},put:function(t,r){for(let n=0;n<r;n++)this.putBit((t>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},st=a,st}var at,Ft;function pe(){if(Ft)return at;Ft=1;function a(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return a.prototype.set=function(t,r,n,e){const i=t*this.size+r;this.data[i]=n,e&&(this.reservedBit[i]=!0)},a.prototype.get=function(t,r){return this.data[t*this.size+r]},a.prototype.xor=function(t,r,n){this.data[t*this.size+r]^=n},a.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},at=a,at}var lt={},xt;function ve(){return xt||(xt=1,function(a){const t=_().getSymbolSize;a.getRowColCoords=function(n){if(n===1)return[];const e=Math.floor(n/7)+2,i=t(n),l=i===145?26:Math.ceil((i-13)/(2*e-2))*2,c=[i-7];for(let o=1;o<e-1;o++)c[o]=c[o-1]-l;return c.push(6),c.reverse()},a.getPositions=function(n){const e=[],i=a.getRowColCoords(n),l=i.length;for(let c=0;c<l;c++)for(let o=0;o<l;o++)c===0&&o===0||c===0&&o===l-1||c===l-1&&o===0||e.push([i[c],i[o]]);return e}}(lt)),lt}var ct={},Dt;function ye(){if(Dt)return ct;Dt=1;const a=_().getSymbolSize,t=7;return ct.getPositions=function(n){const e=a(n);return[[0,0],[e-t,0],[0,e-t]]},ct}var dt={},Ot;function Ee(){return Ot||(Ot=1,function(a){a.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};a.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},a.from=function(e){return a.isValid(e)?parseInt(e,10):void 0},a.getPenaltyN1=function(e){const i=e.size;let l=0,c=0,o=0,s=null,d=null;for(let f=0;f<i;f++){c=o=0,s=d=null;for(let u=0;u<i;u++){let h=e.get(f,u);h===s?c++:(c>=5&&(l+=t.N1+(c-5)),s=h,c=1),h=e.get(u,f),h===d?o++:(o>=5&&(l+=t.N1+(o-5)),d=h,o=1)}c>=5&&(l+=t.N1+(c-5)),o>=5&&(l+=t.N1+(o-5))}return l},a.getPenaltyN2=function(e){const i=e.size;let l=0;for(let c=0;c<i-1;c++)for(let o=0;o<i-1;o++){const s=e.get(c,o)+e.get(c,o+1)+e.get(c+1,o)+e.get(c+1,o+1);(s===4||s===0)&&l++}return l*t.N2},a.getPenaltyN3=function(e){const i=e.size;let l=0,c=0,o=0;for(let s=0;s<i;s++){c=o=0;for(let d=0;d<i;d++)c=c<<1&2047|e.get(s,d),d>=10&&(c===1488||c===93)&&l++,o=o<<1&2047|e.get(d,s),d>=10&&(o===1488||o===93)&&l++}return l*t.N3},a.getPenaltyN4=function(e){let i=0;const l=e.data.length;for(let o=0;o<l;o++)i+=e.data[o];return Math.abs(Math.ceil(i*100/l/5)-10)*t.N4};function r(n,e,i){switch(n){case a.Patterns.PATTERN000:return(e+i)%2===0;case a.Patterns.PATTERN001:return e%2===0;case a.Patterns.PATTERN010:return i%3===0;case a.Patterns.PATTERN011:return(e+i)%3===0;case a.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(i/3))%2===0;case a.Patterns.PATTERN101:return e*i%2+e*i%3===0;case a.Patterns.PATTERN110:return(e*i%2+e*i%3)%2===0;case a.Patterns.PATTERN111:return(e*i%3+(e+i)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}a.applyMask=function(e,i){const l=i.size;for(let c=0;c<l;c++)for(let o=0;o<l;o++)i.isReserved(o,c)||i.xor(o,c,r(e,o,c))},a.getBestMask=function(e,i){const l=Object.keys(a.Patterns).length;let c=0,o=1/0;for(let s=0;s<l;s++){i(s),a.applyMask(s,e);const d=a.getPenaltyN1(e)+a.getPenaltyN2(e)+a.getPenaltyN3(e)+a.getPenaltyN4(e);a.applyMask(s,e),d<o&&(o=d,c=s)}return c}}(dt)),dt}var X={},Ut;function le(){if(Ut)return X;Ut=1;const a=Lt(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return X.getBlocksCount=function(e,i){switch(i){case a.L:return t[(e-1)*4+0];case a.M:return t[(e-1)*4+1];case a.Q:return t[(e-1)*4+2];case a.H:return t[(e-1)*4+3];default:return}},X.getTotalCodewordsCount=function(e,i){switch(i){case a.L:return r[(e-1)*4+0];case a.M:return r[(e-1)*4+1];case a.Q:return r[(e-1)*4+2];case a.H:return r[(e-1)*4+3];default:return}},X}var ut={},K={},qt;function Ce(){if(qt)return K;qt=1;const a=new Uint8Array(512),t=new Uint8Array(256);return function(){let n=1;for(let e=0;e<255;e++)a[e]=n,t[n]=e,n<<=1,n&256&&(n^=285);for(let e=255;e<512;e++)a[e]=a[e-255]}(),K.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},K.exp=function(n){return a[n]},K.mul=function(n,e){return n===0||e===0?0:a[t[n]+t[e]]},K}var zt;function we(){return zt||(zt=1,function(a){const t=Ce();a.mul=function(n,e){const i=new Uint8Array(n.length+e.length-1);for(let l=0;l<n.length;l++)for(let c=0;c<e.length;c++)i[l+c]^=t.mul(n[l],e[c]);return i},a.mod=function(n,e){let i=new Uint8Array(n);for(;i.length-e.length>=0;){const l=i[0];for(let o=0;o<e.length;o++)i[o]^=t.mul(e[o],l);let c=0;for(;c<i.length&&i[c]===0;)c++;i=i.slice(c)}return i},a.generateECPolynomial=function(n){let e=new Uint8Array([1]);for(let i=0;i<n;i++)e=a.mul(e,new Uint8Array([1,t.exp(i)]));return e}}(ut)),ut}var ft,kt;function be(){if(kt)return ft;kt=1;const a=we();function t(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=a.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(n.length+this.degree);e.set(n);const i=a.mod(e,this.genPoly),l=this.degree-i.length;if(l>0){const c=new Uint8Array(this.degree);return c.set(i,l),c}return i},ft=t,ft}var ht={},gt={},mt={},_t;function ce(){return _t||(_t=1,mt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),mt}var P={},Vt;function de(){if(Vt)return P;Vt=1;const a="[0-9]+",t="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;P.KANJI=new RegExp(r,"g"),P.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),P.BYTE=new RegExp(n,"g"),P.NUMERIC=new RegExp(a,"g"),P.ALPHANUMERIC=new RegExp(t,"g");const e=new RegExp("^"+r+"$"),i=new RegExp("^"+a+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return P.testKanji=function(o){return e.test(o)},P.testNumeric=function(o){return i.test(o)},P.testAlphanumeric=function(o){return l.test(o)},P}var Ht;function V(){return Ht||(Ht=1,function(a){const t=ce(),r=de();a.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},a.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},a.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},a.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},a.MIXED={bit:-1},a.getCharCountIndicator=function(i,l){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!t.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?i.ccBits[0]:l<27?i.ccBits[1]:i.ccBits[2]},a.getBestModeForData=function(i){return r.testNumeric(i)?a.NUMERIC:r.testAlphanumeric(i)?a.ALPHANUMERIC:r.testKanji(i)?a.KANJI:a.BYTE},a.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},a.isValid=function(i){return i&&i.bit&&i.ccBits};function n(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return a.NUMERIC;case"alphanumeric":return a.ALPHANUMERIC;case"kanji":return a.KANJI;case"byte":return a.BYTE;default:throw new Error("Unknown mode: "+e)}}a.from=function(i,l){if(a.isValid(i))return i;try{return n(i)}catch{return l}}}(gt)),gt}var jt;function Ae(){return jt||(jt=1,function(a){const t=_(),r=le(),n=Lt(),e=V(),i=ce(),l=7973,c=t.getBCHDigit(l);function o(u,h,E){for(let N=1;N<=40;N++)if(h<=a.getCapacity(N,E,u))return N}function s(u,h){return e.getCharCountIndicator(u,h)+4}function d(u,h){let E=0;return u.forEach(function(N){const I=s(N.mode,h);E+=I+N.getBitsLength()}),E}function f(u,h){for(let E=1;E<=40;E++)if(d(u,E)<=a.getCapacity(E,h,e.MIXED))return E}a.from=function(h,E){return i.isValid(h)?parseInt(h,10):E},a.getCapacity=function(h,E,N){if(!i.isValid(h))throw new Error("Invalid QR Code version");typeof N>"u"&&(N=e.BYTE);const I=t.getSymbolTotalCodewords(h),A=r.getTotalCodewordsCount(h,E),L=(I-A)*8;if(N===e.MIXED)return L;const B=L-s(N,h);switch(N){case e.NUMERIC:return Math.floor(B/10*3);case e.ALPHANUMERIC:return Math.floor(B/11*2);case e.KANJI:return Math.floor(B/13);case e.BYTE:default:return Math.floor(B/8)}},a.getBestVersionForData=function(h,E){let N;const I=n.from(E,n.M);if(Array.isArray(h)){if(h.length>1)return f(h,I);if(h.length===0)return 1;N=h[0]}else N=h;return o(N.mode,N.getLength(),I)},a.getEncodedBits=function(h){if(!i.isValid(h)||h<7)throw new Error("Invalid QR Code version");let E=h<<12;for(;t.getBCHDigit(E)-c>=0;)E^=l<<t.getBCHDigit(E)-c;return h<<12|E}}(ht)),ht}var pt={},Jt;function Te(){if(Jt)return pt;Jt=1;const a=_(),t=1335,r=21522,n=a.getBCHDigit(t);return pt.getEncodedBits=function(i,l){const c=i.bit<<3|l;let o=c<<10;for(;a.getBCHDigit(o)-n>=0;)o^=t<<a.getBCHDigit(o)-n;return(c<<10|o)^r},pt}var vt={},yt,Yt;function Ne(){if(Yt)return yt;Yt=1;const a=V();function t(r){this.mode=a.NUMERIC,this.data=r.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let e,i,l;for(e=0;e+3<=this.data.length;e+=3)i=this.data.substr(e,3),l=parseInt(i,10),n.put(l,10);const c=this.data.length-e;c>0&&(i=this.data.substr(e),l=parseInt(i,10),n.put(l,c*3+1))},yt=t,yt}var Et,Kt;function Be(){if(Kt)return Et;Kt=1;const a=V(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=a.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let i;for(i=0;i+2<=this.data.length;i+=2){let l=t.indexOf(this.data[i])*45;l+=t.indexOf(this.data[i+1]),e.put(l,11)}this.data.length%2&&e.put(t.indexOf(this.data[i]),6)},Et=r,Et}var Ct,Gt;function Le(){if(Gt)return Ct;Gt=1;const a=V();function t(r){this.mode=a.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){for(let n=0,e=this.data.length;n<e;n++)r.put(this.data[n],8)},Ct=t,Ct}var wt,Qt;function Se(){if(Qt)return wt;Qt=1;const a=V(),t=_();function r(n){this.mode=a.KANJI,this.data=n}return r.getBitsLength=function(e){return e*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let i=t.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),n.put(i,13)}},wt=r,wt}var bt={exports:{}},Zt;function Ie(){return Zt||(Zt=1,function(a){var t={single_source_shortest_paths:function(r,n,e){var i={},l={};l[n]=0;var c=t.PriorityQueue.make();c.push(n,0);for(var o,s,d,f,u,h,E,N,I;!c.empty();){o=c.pop(),s=o.value,f=o.cost,u=r[s]||{};for(d in u)u.hasOwnProperty(d)&&(h=u[d],E=f+h,N=l[d],I=typeof l[d]>"u",(I||N>E)&&(l[d]=E,c.push(d,E),i[d]=s))}if(typeof e<"u"&&typeof l[e]>"u"){var A=["Could not find a path from ",n," to ",e,"."].join("");throw new Error(A)}return i},extract_shortest_path_from_predecessor_list:function(r,n){for(var e=[],i=n;i;)e.push(i),r[i],i=r[i];return e.reverse(),e},find_path:function(r,n,e){var i=t.single_source_shortest_paths(r,n,e);return t.extract_shortest_path_from_predecessor_list(i,e)},PriorityQueue:{make:function(r){var n=t.PriorityQueue,e={},i;r=r||{};for(i in n)n.hasOwnProperty(i)&&(e[i]=n[i]);return e.queue=[],e.sorter=r.sorter||n.default_sorter,e},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var e={value:r,cost:n};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};a.exports=t}(bt)),bt.exports}var Xt;function Me(){return Xt||(Xt=1,function(a){const t=V(),r=Ne(),n=Be(),e=Le(),i=Se(),l=de(),c=_(),o=Ie();function s(A){return unescape(encodeURIComponent(A)).length}function d(A,L,B){const p=[];let M;for(;(M=A.exec(B))!==null;)p.push({data:M[0],index:M.index,mode:L,length:M[0].length});return p}function f(A){const L=d(l.NUMERIC,t.NUMERIC,A),B=d(l.ALPHANUMERIC,t.ALPHANUMERIC,A);let p,M;return c.isKanjiModeEnabled()?(p=d(l.BYTE,t.BYTE,A),M=d(l.KANJI,t.KANJI,A)):(p=d(l.BYTE_KANJI,t.BYTE,A),M=[]),L.concat(B,p,M).sort(function(m,w){return m.index-w.index}).map(function(m){return{data:m.data,mode:m.mode,length:m.length}})}function u(A,L){switch(L){case t.NUMERIC:return r.getBitsLength(A);case t.ALPHANUMERIC:return n.getBitsLength(A);case t.KANJI:return i.getBitsLength(A);case t.BYTE:return e.getBitsLength(A)}}function h(A){return A.reduce(function(L,B){const p=L.length-1>=0?L[L.length-1]:null;return p&&p.mode===B.mode?(L[L.length-1].data+=B.data,L):(L.push(B),L)},[])}function E(A){const L=[];for(let B=0;B<A.length;B++){const p=A[B];switch(p.mode){case t.NUMERIC:L.push([p,{data:p.data,mode:t.ALPHANUMERIC,length:p.length},{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.ALPHANUMERIC:L.push([p,{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.KANJI:L.push([p,{data:p.data,mode:t.BYTE,length:s(p.data)}]);break;case t.BYTE:L.push([{data:p.data,mode:t.BYTE,length:s(p.data)}])}}return L}function N(A,L){const B={},p={start:{}};let M=["start"];for(let y=0;y<A.length;y++){const m=A[y],w=[];for(let v=0;v<m.length;v++){const T=m[v],C=""+y+v;w.push(C),B[C]={node:T,lastCount:0},p[C]={};for(let b=0;b<M.length;b++){const g=M[b];B[g]&&B[g].node.mode===T.mode?(p[g][C]=u(B[g].lastCount+T.length,T.mode)-u(B[g].lastCount,T.mode),B[g].lastCount+=T.length):(B[g]&&(B[g].lastCount=T.length),p[g][C]=u(T.length,T.mode)+4+t.getCharCountIndicator(T.mode,L))}}M=w}for(let y=0;y<M.length;y++)p[M[y]].end=0;return{map:p,table:B}}function I(A,L){let B;const p=t.getBestModeForData(A);if(B=t.from(L,p),B!==t.BYTE&&B.bit<p.bit)throw new Error('"'+A+'" cannot be encoded with mode '+t.toString(B)+`.
 Suggested mode is: `+t.toString(p));switch(B===t.KANJI&&!c.isKanjiModeEnabled()&&(B=t.BYTE),B){case t.NUMERIC:return new r(A);case t.ALPHANUMERIC:return new n(A);case t.KANJI:return new i(A);case t.BYTE:return new e(A)}}a.fromArray=function(L){return L.reduce(function(B,p){return typeof p=="string"?B.push(I(p,null)):p.data&&B.push(I(p.data,p.mode)),B},[])},a.fromString=function(L,B){const p=f(L,c.isKanjiModeEnabled()),M=E(p),y=N(M,B),m=o.find_path(y.map,"start","end"),w=[];for(let v=1;v<m.length-1;v++)w.push(y.table[m[v]].node);return a.fromArray(h(w))},a.rawSplit=function(L){return a.fromArray(f(L,c.isKanjiModeEnabled()))}}(vt)),vt}var Wt;function Re(){if(Wt)return it;Wt=1;const a=_(),t=Lt(),r=me(),n=pe(),e=ve(),i=ye(),l=Ee(),c=le(),o=be(),s=Ae(),d=Te(),f=V(),u=Me();function h(y,m){const w=y.size,v=i.getPositions(m);for(let T=0;T<v.length;T++){const C=v[T][0],b=v[T][1];for(let g=-1;g<=7;g++)if(!(C+g<=-1||w<=C+g))for(let S=-1;S<=7;S++)b+S<=-1||w<=b+S||(g>=0&&g<=6&&(S===0||S===6)||S>=0&&S<=6&&(g===0||g===6)||g>=2&&g<=4&&S>=2&&S<=4?y.set(C+g,b+S,!0,!0):y.set(C+g,b+S,!1,!0))}}function E(y){const m=y.size;for(let w=8;w<m-8;w++){const v=w%2===0;y.set(w,6,v,!0),y.set(6,w,v,!0)}}function N(y,m){const w=e.getPositions(m);for(let v=0;v<w.length;v++){const T=w[v][0],C=w[v][1];for(let b=-2;b<=2;b++)for(let g=-2;g<=2;g++)b===-2||b===2||g===-2||g===2||b===0&&g===0?y.set(T+b,C+g,!0,!0):y.set(T+b,C+g,!1,!0)}}function I(y,m){const w=y.size,v=s.getEncodedBits(m);let T,C,b;for(let g=0;g<18;g++)T=Math.floor(g/3),C=g%3+w-8-3,b=(v>>g&1)===1,y.set(T,C,b,!0),y.set(C,T,b,!0)}function A(y,m,w){const v=y.size,T=d.getEncodedBits(m,w);let C,b;for(C=0;C<15;C++)b=(T>>C&1)===1,C<6?y.set(C,8,b,!0):C<8?y.set(C+1,8,b,!0):y.set(v-15+C,8,b,!0),C<8?y.set(8,v-C-1,b,!0):C<9?y.set(8,15-C-1+1,b,!0):y.set(8,15-C-1,b,!0);y.set(v-8,8,1,!0)}function L(y,m){const w=y.size;let v=-1,T=w-1,C=7,b=0;for(let g=w-1;g>0;g-=2)for(g===6&&g--;;){for(let S=0;S<2;S++)if(!y.isReserved(T,g-S)){let $=!1;b<m.length&&($=(m[b]>>>C&1)===1),y.set(T,g-S,$),C--,C===-1&&(b++,C=7)}if(T+=v,T<0||w<=T){T-=v,v=-v;break}}}function B(y,m,w){const v=new r;w.forEach(function(S){v.put(S.mode.bit,4),v.put(S.getLength(),f.getCharCountIndicator(S.mode,y)),S.write(v)});const T=a.getSymbolTotalCodewords(y),C=c.getTotalCodewordsCount(y,m),b=(T-C)*8;for(v.getLengthInBits()+4<=b&&v.put(0,4);v.getLengthInBits()%8!==0;)v.putBit(0);const g=(b-v.getLengthInBits())/8;for(let S=0;S<g;S++)v.put(S%2?17:236,8);return p(v,y,m)}function p(y,m,w){const v=a.getSymbolTotalCodewords(m),T=c.getTotalCodewordsCount(m,w),C=v-T,b=c.getBlocksCount(m,w),g=v%b,S=b-g,$=Math.floor(v/b),O=Math.floor(C/b),G=O+1,J=$-O,Q=new o(J);let Y=0;const Z=new Array(b),St=new Array(b);let tt=0;const fe=new Uint8Array(y.buffer);for(let H=0;H<b;H++){const nt=H<S?O:G;Z[H]=fe.slice(Y,Y+nt),St[H]=Q.encode(Z[H]),Y+=nt,tt=Math.max(tt,nt)}const et=new Uint8Array(v);let It=0,F,x;for(F=0;F<tt;F++)for(x=0;x<b;x++)F<Z[x].length&&(et[It++]=Z[x][F]);for(F=0;F<J;F++)for(x=0;x<b;x++)et[It++]=St[x][F];return et}function M(y,m,w,v){let T;if(Array.isArray(y))T=u.fromArray(y);else if(typeof y=="string"){let $=m;if(!$){const O=u.rawSplit(y);$=s.getBestVersionForData(O,w)}T=u.fromString(y,$||40)}else throw new Error("Invalid data");const C=s.getBestVersionForData(T,w);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!m)m=C;else if(m<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const b=B(m,w,T),g=a.getSymbolSize(m),S=new n(g);return h(S,m),E(S),N(S,m),A(S,w,0),m>=7&&I(S,m),L(S,b),isNaN(v)&&(v=l.getBestMask(S,A.bind(null,S,w))),l.applyMask(v,S),A(S,w,v),{modules:S,version:m,errorCorrectionLevel:w,maskPattern:v,segments:T}}return it.create=function(m,w){if(typeof m>"u"||m==="")throw new Error("No input text");let v=t.M,T,C;return typeof w<"u"&&(v=t.from(w.errorCorrectionLevel,t.M),T=s.from(w.version),C=l.from(w.maskPattern),w.toSJISFunc&&a.setToSJISFunction(w.toSJISFunc)),M(m,T,v,C)},it}var At={},Tt={},te;function ue(){return te||(te=1,function(a){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(i){return[i,i]}))),n.length===6&&n.push("F","F");const e=parseInt(n.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+n.slice(0,6).join("")}}a.getOptions=function(n){n||(n={}),n.color||(n.color={});const e=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,i=n.width&&n.width>=21?n.width:void 0,l=n.scale||4;return{width:i,scale:i?4:l,margin:e,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},a.getScale=function(n,e){return e.width&&e.width>=n+e.margin*2?e.width/(n+e.margin*2):e.scale},a.getImageWidth=function(n,e){const i=a.getScale(n,e);return Math.floor((n+e.margin*2)*i)},a.qrToImageData=function(n,e,i){const l=e.modules.size,c=e.modules.data,o=a.getScale(l,i),s=Math.floor((l+i.margin*2)*o),d=i.margin*o,f=[i.color.light,i.color.dark];for(let u=0;u<s;u++)for(let h=0;h<s;h++){let E=(u*s+h)*4,N=i.color.light;if(u>=d&&h>=d&&u<s-d&&h<s-d){const I=Math.floor((u-d)/o),A=Math.floor((h-d)/o);N=f[c[I*l+A]?1:0]}n[E++]=N.r,n[E++]=N.g,n[E++]=N.b,n[E]=N.a}}}(Tt)),Tt}var ee;function $e(){return ee||(ee=1,function(a){const t=ue();function r(e,i,l){e.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=l,i.width=l,i.style.height=l+"px",i.style.width=l+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}a.render=function(i,l,c){let o=c,s=l;typeof o>"u"&&(!l||!l.getContext)&&(o=l,l=void 0),l||(s=n()),o=t.getOptions(o);const d=t.getImageWidth(i.modules.size,o),f=s.getContext("2d"),u=f.createImageData(d,d);return t.qrToImageData(u.data,i,o),r(f,s,d),f.putImageData(u,0,0),s},a.renderToDataURL=function(i,l,c){let o=c;typeof o>"u"&&(!l||!l.getContext)&&(o=l,l=void 0),o||(o={});const s=a.render(i,l,o),d=o.type||"image/png",f=o.rendererOpts||{};return s.toDataURL(d,f.quality)}}(At)),At}var Nt={},ne;function Pe(){if(ne)return Nt;ne=1;const a=ue();function t(e,i){const l=e.a/255,c=i+'="'+e.hex+'"';return l<1?c+" "+i+'-opacity="'+l.toFixed(2).slice(1)+'"':c}function r(e,i,l){let c=e+i;return typeof l<"u"&&(c+=" "+l),c}function n(e,i,l){let c="",o=0,s=!1,d=0;for(let f=0;f<e.length;f++){const u=Math.floor(f%i),h=Math.floor(f/i);!u&&!s&&(s=!0),e[f]?(d++,f>0&&u>0&&e[f-1]||(c+=s?r("M",u+l,.5+h+l):r("m",o,0),o=0,s=!1),u+1<i&&e[f+1]||(c+=r("h",d),d=0)):o++}return c}return Nt.render=function(i,l,c){const o=a.getOptions(l),s=i.modules.size,d=i.modules.data,f=s+o.margin*2,u=o.color.light.a?"<path "+t(o.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",h="<path "+t(o.color.dark,"stroke")+' d="'+n(d,s,o.margin)+'"/>',E='viewBox="0 0 '+f+" "+f+'"',I='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+E+' shape-rendering="crispEdges">'+u+h+`</svg>
`;return typeof c=="function"&&c(null,I),I},Nt}var re;function Fe(){if(re)return j;re=1;const a=ge(),t=Re(),r=$e(),n=Pe();function e(i,l,c,o,s){const d=[].slice.call(arguments,1),f=d.length,u=typeof d[f-1]=="function";if(!u&&!a())throw new Error("Callback required as last argument");if(u){if(f<2)throw new Error("Too few arguments provided");f===2?(s=c,c=l,l=o=void 0):f===3&&(l.getContext&&typeof s>"u"?(s=o,o=void 0):(s=o,o=c,c=l,l=void 0))}else{if(f<1)throw new Error("Too few arguments provided");return f===1?(c=l,l=o=void 0):f===2&&!l.getContext&&(o=c,c=l,l=void 0),new Promise(function(h,E){try{const N=t.create(c,o);h(i(N,l,o))}catch(N){E(N)}})}try{const h=t.create(c,o);s(null,i(h,l,o))}catch(h){s(h)}}return j.create=t.create,j.toCanvas=e.bind(null,r.render),j.toDataURL=e.bind(null,r.renderToDataURL),j.toString=e.bind(null,function(i,l,c){return n.render(i,c)}),j}var xe=Fe();const q=ae(xe);var R={},ie;function De(){if(ie)return R;ie=1,Object.defineProperty(R,"__esModule",{value:!0}),R.Printd=R.createIFrame=R.createLinkStyle=R.createStyle=void 0;var a=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,t=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,r=function(o){return a.test(o)||t.test(o)};function n(o,s){var d=o.createElement("style");return d.appendChild(o.createTextNode(s)),d}R.createStyle=n;function e(o,s){var d=o.createElement("link");return d.type="text/css",d.rel="stylesheet",d.href=s,d}R.createLinkStyle=e;function i(o){var s=window.document.createElement("iframe");return s.setAttribute("src","about:blank"),s.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),s.setAttribute("width","0"),s.setAttribute("height","0"),s.setAttribute("wmode","opaque"),o.appendChild(s),s}R.createIFrame=i;var l={parent:window.document.body,headElements:[],bodyElements:[]},c=function(){function o(s){this.isLoading=!1,this.hasEvents=!1,this.opts=[l,s||{}].reduce(function(d,f){return Object.keys(f).forEach(function(u){return d[u]=f[u]}),d},{}),this.iframe=i(this.opts.parent)}return o.prototype.getIFrame=function(){return this.iframe},o.prototype.print=function(s,d,f,u){if(!this.isLoading){var h=this.iframe,E=h.contentDocument,N=h.contentWindow;if(!(!E||!N)&&(this.iframe.src="about:blank",this.elCopy=s.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=u;var I=N.document;I.open(),I.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var A=this.opts,L=A.headElements,B=A.bodyElements;Array.isArray(L)&&L.forEach(function(p){return I.head.appendChild(p)}),Array.isArray(B)&&B.forEach(function(p){return I.body.appendChild(p)}),Array.isArray(d)&&d.forEach(function(p){p&&I.head.appendChild(r(p)?e(I,p):n(I,p))}),I.body.appendChild(this.elCopy),Array.isArray(f)&&f.forEach(function(p){if(p){var M=I.createElement("script");r(p)?M.src=p:M.innerText=p,I.body.appendChild(M)}}),I.close()}}},o.prototype.printURL=function(s,d){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=d,this.iframe.src=s)},o.prototype.onBeforePrint=function(s){this.onbeforeprint=s},o.prototype.onAfterPrint=function(s){this.onafterprint=s},o.prototype.launchPrint=function(s){this.isLoading||s.print()},o.prototype.addEvents=function(){var s=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return s.onLoad()},!1);var d=this.iframe.contentWindow;d&&(this.onbeforeprint&&d.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&d.addEventListener("afterprint",this.onafterprint))}},o.prototype.onLoad=function(){var s=this;if(this.iframe){this.isLoading=!1;var d=this.iframe,f=d.contentDocument,u=d.contentWindow;if(!f||!u)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return s.launchPrint(u)}}):this.launchPrint(u)}},o}();return R.Printd=c,R.default=c,R}var z=De(),Bt,oe;function Oe(){if(oe)return Bt;oe=1;class a{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","dieciséis"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(r){switch(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),r){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inválido"}}convertToText(r){if(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),!this.validateNumber(r))throw"Número inválido, no se puede convertir!";return this.getName(r)}deleteZerosLeft(r){let n=0,e=!0;for(n=0;n<r.length;n++)if(r.charAt(n)!=0){e=!1;break}return e?"0":r.substr(n)}validateNumber(r){return!(isNaN(r)||r===""||r.indexOf(".")>=0||r.indexOf("-")>=0)}getName(r){return r=this.deleteZerosLeft(r),r.length===1?this.getUnits(r):r.length===2?this.getTens(r):r.length===3?this.getHundreds(r):r.length<7?this.getThousands(r):r.length<13?this.getPeriod(r,6,"millón"):r.length<19?this.getPeriod(r,12,"billón"):"Número demasiado grande."}getUnits(r){let n=parseInt(r);return this.units[n]}getTens(r){let n=r.charAt(1);if(r<17)return this.tenToSixteen[r-10];if(r<20)return"dieci"+this.getUnits(n);switch(r){case"20":return"veinte";case"22":return"veintidós";case"23":return"veintitrés";case"26":return"veintiséis"}if(r<30)return"veinti"+this.getUnits(n);let e=this.tens[r.charAt(0)-3];return n>0&&(e+=" y "+this.getUnits(n)),e}getHundreds(r){let n="",e=r.charAt(0),i=r.substr(1);if(r==100)return"cien";switch(e){case"1":n="ciento";break;case"5":n="quinientos";break;case"7":n="setecientos";break;case"9":n="novecientos"}return n===""&&(n=this.getUnits(e)+"cientos"),i>0&&(n+=" "+this.getName(i)),n}getThousands(r){let n="mil",e=r.length-3,i=r.substr(0,e),l=r.substr(e);return i>1&&(n=this.getName(i).replace("uno","un")+" mil"),l>0&&(n+=" "+this.getName(l)),n}getPeriod(r,n,e){let i="un "+e,l=r.length-n,c=r.substr(0,l),o=r.substr(l);return c>1&&(i=this.getName(c).replace("uno","un")+" "+e.replace("ó","o")+"es"),o>0&&(i+=" "+this.getName(o)),i}}return Bt={conversorNumerosALetras:a},Bt}var Ue=Oe();const k=ae(Ue);var W={},se;function qe(){if(se)return W;se=1,Object.defineProperty(W,"__esModule",{value:!0});function a(o){switch(o){case 1:return"Un";case 2:return"Dos";case 3:return"Tres";case 4:return"Cuatro";case 5:return"Cinco";case 6:return"Seis";case 7:return"Siete";case 8:return"Ocho";case 9:return"Nueve";default:return""}}function t(o,s){return s>0?o+" y "+a(s):o}function r(o){var s=Math.floor(o/10),d=o-s*10;switch(s){case 1:switch(d){case 0:return"Diez";case 1:return"Once";case 2:return"Doce";case 3:return"Trece";case 4:return"Catorce";case 5:return"Quince";default:return"Dieci"+a(d).toLowerCase()}case 2:switch(d){case 0:return"Veinte";default:return"Veinti"+a(d).toLowerCase()}case 3:return t("Treinta",d);case 4:return t("Cuarenta",d);case 5:return t("Cincuenta",d);case 6:return t("Sesenta",d);case 7:return t("Setenta",d);case 8:return t("Ochenta",d);case 9:return t("Noventa",d);case 0:return a(d);default:return""}}function n(o){var s=Math.floor(o/100),d=o-s*100;switch(s){case 1:return d>0?"Ciento "+r(d):"Cien";case 2:return"Doscientos "+r(d);case 3:return"Trescientos "+r(d);case 4:return"Cuatrocientos "+r(d);case 5:return"Quinientos "+r(d);case 6:return"Seiscientos "+r(d);case 7:return"Setecientos "+r(d);case 8:return"Ochocientos "+r(d);case 9:return"Novecientos "+r(d);default:return r(d)}}function e(o,s,d,f){var u=Math.floor(o/s),h=o-u*s,E="";return u>0&&(u>1?E=n(u)+" "+f:E=d),h>0&&(E+=""),E}function i(o){var s=1e3,d=Math.floor(o/s),f=o-d*s,u=e(o,s,"Un Mil","Mil"),h=n(f);return u===""?h:(u+" "+h).trim()}function l(o){var s=1e6,d=Math.floor(o/s),f=o-d*s,u=e(o,s,"Un Millón de","Millones de"),h=i(f);return u===""?h:(u+" "+h).trim()}function c(o){var s={enteros:Math.floor(o),centavos:Math.round(o*100)-Math.floor(o)*100,letrasCentavos:"",letrasMonedaPlural:"Pesos",letrasMonedaSingular:"Peso",letrasMonedaCentavoPlural:"/100 M.N.",letrasMonedaCentavoSingular:"/100 M.N."};return s.centavos>=0&&(s.letrasCentavos=function(){return s.centavos>=1&s.centavos<=9?"0"+s.centavos+s.letrasMonedaCentavoSingular:s.centavos===0?"00"+s.letrasMonedaCentavoSingular:s.centavos+s.letrasMonedaCentavoPlural}()),s.enteros===0?("Cero "+s.letrasMonedaPlural+" "+s.letrasCentavos).trim():s.enteros===1?(l(s.enteros)+" "+s.letrasMonedaSingular+" "+s.letrasCentavos).trim():(l(s.enteros)+" "+s.letrasMonedaPlural+" "+s.letrasCentavos).trim()}return W.NumerosALetras=c,W}qe();class Ve{static numeroALetras(t){if(t=parseInt(t),isNaN(t)||t<0||t>1e6)return"Número fuera de rango";const r=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],n=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],e={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},i=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function l(f){if(f<10)return r[f];if(f>=10&&f<20)return e[f];if(f<100){const h=f%10;return`${n[Math.floor(f/10)]}${h>0?" y "+r[h]:""}`}if(f===100)return"cien";const u=f%100;return`${i[Math.floor(f/100)]}${u>0?" "+l(u):""}`}if(t===1e6)return"un millón";let c=Math.floor(t/1e3),o=t%1e3,s=c>0?c===1?"mil":`${l(c)} mil`:"",d=o>0?l(o):"";return(s+" "+d).trim()}static imprimirCaja(t){}static async factura(t){return new Promise(async(r,n)=>{try{const e=k.conversorNumerosALetras,i=new e,l=U().env,c=g=>Number(g||0).toFixed(2),o=g=>(g??"").toString(),s=Number(t.total??t.montoTotal??0),d=t.numeroFactura??t.numero_factura??t.id??"—",f=t.fechaEmision??(t.fecha&&t.hora?`${t.fecha} ${t.hora}`:"—"),u=t.nombre??t?.cliente?.nombre??"SN",h=t.complemento??t?.cliente?.complemento??"",E=t.ci??t?.cliente?.ci??"0",N=t.cliente_id??t?.cliente?.id??"—",I=l?.puntoVenta??0,A=t.cuf??null,L=A?A.match(/.{1,20}/g).join("<br>"):null,B=A?"FACTURA<br>CON DERECHO A CRÉDITO FISCAL":"NOTA DE VENTA",p=t.leyenda??"Ley N° 453: Puedes acceder a la reclamación cuando tus derechos han sido vulnerados.",M=Array.isArray(t.venta_detalles)?t.venta_detalles:Array.isArray(t.details)?t.details:[],y=Math.floor(s),m=Math.round((s-y)*100).toString().padStart(2,"0"),w=`Son ${i.convertToText(y)} ${m}/100 Bolivianos`;let v=null;L&&(v=await q.toDataURL(`${l.url2}consulta/QR?nit=${l.nit}&cuf=${L}&numero=${d}&t=2`,{errorCorrectionLevel:"M",type:"png",width:110,margin:0,color:{dark:"#000",light:"#FFF"}}));let T=`${this.head()}
<style>
/* Ticket 80mm ~ 300px */
.ticket { width:300px; margin:0 auto; }
.mono { font-family: "Courier New", Courier, monospace; }
.fs9 { font-size:9px; } .fs10{font-size:10px;} .fs11{font-size:11px;} .fs12{font-size:12px;}
.center{ text-align:center; } .right{ text-align:right; } .left{ text-align:left; }
hr{ border:0; border-top:1px dashed #000; margin:6px 0; }
.title{ font-weight:700; text-transform:uppercase; line-height:1.15; }
.small { font-size:8px; line-height:1.25; }

.tbl{ width:100%; border-collapse:collapse; }
.tbl td{ padding:2px 0; vertical-align:top; }

.lbl{ width:135px; font-weight:700; text-transform:uppercase; }
.val{ width:auto; }

.det-header{ font-weight:700; text-transform:uppercase; margin:4px 0; }
.item-desc{ font-weight:700; }
.item-meta{ color:#111; }

.tot td{ padding:1px 0; }
.tot .l{ width:70%; }
.tot .r{ width:30%; text-align:right; }

.qr{ display:flex; justify-content:center; margin-top:6px; }
@page { margin: 6mm; }
</style>

<div class="ticket mono fs10">
  <div class="title fs12 center">${B}</div>

  <div class="center small">
    ${o(l.razon)}<br>
    Casa Matriz<br>
    No. Punto de Venta ${I}<br>
    ${o(l.direccion)}<br>
    Tel. ${o(l.telefono)}<br>
    Oruro
  </div>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">NIT</td><td class="val">${o(l.nit)}</td></tr>
    <tr><td class="lbl">FACTURA N°</td><td class="val">${d}</td></tr>
    <tr><td class="lbl">CÓD. AUTORIZACIÓN</td><td class="val">${L??"—"}</td></tr>
  </table>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">NOMBRE/RAZÓN SOCIAL</td><td class="val">${o(u)}</td></tr>
    <tr><td class="lbl">NIT/CI/CEX</td><td class="val">${o(E)}${o(h?"-"+h:"")}</td></tr>
    <tr><td class="lbl">NRO. CLIENTE</td><td class="val">${o(N)}</td></tr>
    <tr><td class="lbl">FECHA DE EMISIÓN</td><td class="val">${o(f)}</td></tr>
  </table>

  <hr>
  <div class="det-header center">DETALLE</div>`;M.forEach(g=>{const S=g.producto_id??g.product_id??g?.producto?.id??"—",$=o(g.nombre??g.descripcion??g?.producto?.nombre??""),O=o(g.unidad??g?.producto?.unidad??""),G=Number(g.cantidad??g.qty??0),J=Number(g.precio??g.precioUnitario??0),Q=Number(g.descuento??g.montoDescuento??0),Y=g.subTotal??G*J-Q;T+=`
      <table class="tbl fs10">
        <tr>
          <td class="left item-desc" colspan="3">${S} - ${$}</td>
          <td class="right item-desc">${c(Y)}</td>
        </tr>
        <tr><td class="left item-meta" colspan="4">Unidad de Medida: ${O||"Unidad (Servicios)"}</td></tr>
        <tr>
          <td class="right" style="width:22%;">${c(G)}</td>
          <td class="center" style="width:6%;">x</td>
          <td class="right" style="width:32%;">${c(J)} - ${c(Q)}</td>
          <td class="right" style="width:40%;"></td>
        </tr>
      </table>`}),T+=`
  <hr>
  <table class="tbl tot fs10">
    <tr><td class="l left strong">TOTAL Bs</td><td class="r strong">${c(s)}</td></tr>
    <tr><td class="l left">(-) DESCUENTO Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">SUBTOTAL A PAGAR Bs</td><td class="r strong">${c(s)}</td></tr>
    <tr><td class="l left">(-) AJUSTES NO SUJETOS A IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">MONTO TOTAL A PAGAR Bs</td><td class="r strong">${c(s)}</td></tr>
    <tr><td class="l left">(-) TASAS Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left">(-) OTROS PAGOS NO SUJETO IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left">(+) AJUSTES NO SUJETOS A IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">IMPORTE BASE CRÉDITO FISCAL</td><td class="r strong">${c(s)}</td></tr>
  </table>

  <div class="fs10" style="margin-top:6px;">${w}</div>

  <hr>
  <div class="center small">
    ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
    EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY
  </div>
  <div class="center small" style="margin-top:4px;">${o(p)}</div>
  <div class="center small" style="margin-top:4px;">“Este documento es la Representación Gráfica de un<br>Documento Fiscal Digital emitido en una modalidad de facturación en línea”</div>
  ${v?`<div class="qr"><img src="${v}" alt="QR"></div>`:""}
</div>`;const C=document.getElementById("myElement");C&&(C.innerHTML=T),new z.Printd().print(C),r(v)}catch(e){n(e)}})}static async nota(t,r=!0){return new Promise(async(n,e)=>{try{const i=U().env,l=k.conversorNumerosALetras,c=new l,o=m=>Number(m||0).toFixed(2),s=m=>(m??"").toString(),d=Number(t.total??0),f=t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE VENTA",u=t.fecha_emision??t.fecha??"—",h=t.nombre??t?.cliente?.nombre??"SN",E=t.ci??t?.cliente?.ci??"0",N=t.comentario??"",I=Math.floor(d),A=Math.round((d-I)*100).toString().padStart(2,"0"),L=`Son ${c.convertToText(I)} ${A}/100 Bolivianos`,B=Array.isArray(t.venta_detalles)?t.venta_detalles:[];let p=null;d>0&&(p=await q.toDataURL(`Fecha: ${u} Monto: ${o(d)}`,{errorCorrectionLevel:"M",type:"png",width:90,margin:0,color:{dark:"#000",light:"#FFF"}}));let M=`${this.head()}
<style>
/* Ticket 80mm ~ 300px */
.ticket { width:300px; margin:0 auto; }
.mono { font-family: "Courier New", Courier, monospace; }
.fs9 { font-size:9px; } .fs10{font-size:10px;} .fs11{font-size:11px;} .fs12{font-size:12px;}
.center{ text-align:center; } .right{ text-align:right; } .left{ text-align:left; }
hr{ border:0; border-top:1px dashed #000; margin:6px 0; }
.title{ font-weight:700; text-transform:uppercase; line-height:1.15; }
.small { font-size:8px; line-height:1.25; }

.tbl{ width:100%; border-collapse:collapse; }
.tbl td{ padding:2px 0; vertical-align:top; }

.lbl{ width:110px; font-weight:700; text-transform:uppercase; }
.val{ width:auto; }

.det-header{ font-weight:700; text-transform:uppercase; margin:4px 0; }
.item-desc{ font-weight:700; }
.item-meta{ color:#111; font-size:9px; }

.tot td{ padding:1px 0; }
.tot .l{ width:70%; }
.tot .r{ width:30%; text-align:right; }

.qr{ display:flex; justify-content:center; margin-top:4px; }

/* Estilo específico para nota */
.nota-header {
  background: #f5f5f5;
  padding: 4px;
  border-radius: 3px;
  margin-bottom: 6px;
}
.product-card {
  border-bottom: 1px dashed #ddd;
  margin-bottom: 4px;
  padding-bottom: 4px;
}
@page { margin: 6mm; }
</style>

<div class="ticket mono fs10">
  <div class="title fs12 center">${f}</div>

  <div class="center small">
    ${s(i.razon)}<br>
    Casa Matriz<br>
    No. Punto de Venta ${i.puntoVenta??0}<br>
    ${s(i.direccion)}<br>
    Tel. ${s(i.telefono)}<br>
    Oruro
  </div>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">DOCUMENTO N°</td><td class="val">${s(t.id??"—")}</td></tr>
    <tr><td class="lbl">FECHA EMISIÓN</td><td class="val">${s(u)}</td></tr>
  </table>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">CLIENTE</td><td class="val">${s(h)}</td></tr>
    <tr><td class="lbl">NIT/CI</td><td class="val">${s(E)}</td></tr>
  </table>

  ${N?`<div class="nota-header fs9"><b>COMENTARIO:</b> ${N}</div>`:""}

  <hr>
  <div class="det-header center">DETALLE DE PRODUCTOS</div>`;B.forEach((m,w)=>{const v=m.producto_id??m.product_id??m?.producto?.id??"—",T=s(m.nombre??m.descripcion??m?.producto?.nombre??""),C=s(m.unidad??m?.producto?.unidad??"Unidad"),b=Number(m.cantidad??m.qty??0),g=Number(m.precio??m.precioUnitario??0),S=m.subTotal??b*g;m.visible!==0?M+=`
  <div class="product-card">
    <div class="item-desc fs10">${w+1}. ${T}</div>
    <div class="item-meta">Código: ${v} | Unidad: ${C}</div>
    <div class="fs10">
      <span style="display:inline-block; width:40%;">${o(b)} x ${o(g)}</span>
      <span style="display:inline-block; width:60%; text-align:right;">${o(S)} Bs</span>
    </div>
  </div>`:M+=`
  <div class="product-card">
    <div class="item-desc fs10">${w+1}. ${T}</div>
    <div class="item-meta">Código: ${v} | Unidad: ${C}</div>
    <div class="fs10">
      <span style="display:inline-block; width:40%;">${o(b)} unidades</span>
      <span style="display:inline-block; width:60%; text-align:right;">—</span>
    </div>
  </div>`}),M+=`
  <hr>
  <table class="tbl tot fs10">
    <tr><td class="l left"><b>SUBTOTAL Bs</b></td><td class="r"><b>${o(d)}</b></td></tr>
    ${t.descuento?`
    <tr><td class="l left">Descuento Bs</td><td class="r">${o(t.descuento)}</td></tr>
    <tr><td class="l left"><b>TOTAL Bs</b></td><td class="r"><b>${o(d-t.descuento)}</b></td></tr>
    `:""}
  </table>

  <div class="fs10" style="margin-top:6px; font-weight:bold;">${L}</div>

  <hr>
  <div class="center small">
    Este documento no es válido como factura fiscal<br>
    Para facturación solicite su documento correspondiente
  </div>

  ${p?`
  <div class="qr">
    <img src="${p}" alt="QR" style="width:90px; height:90px;">
  </div>
  <div class="center fs9" style="margin-top:2px;">
    Escanear para verificar
  </div>
  `:""}
</div>`;const y=document.getElementById("myElement");y&&(y.innerHTML=M),r&&new z.Printd().print(y),n(p)}catch(i){console.error("Error al imprimir nota:",i),e(i)}})}static cotizacion(t,r,n,e,i=!0){return(e==null||e==="")&&(e=0),new Promise((l,c)=>{const o=k.conversorNumerosALetras,d=new o().convertToText(parseInt(n)),f=he().format("YYYY-MM-DD"),u={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=U().env;q.toDataURL(`Fecha: ${f} Monto: ${parseFloat(n).toFixed(2)}`,u).then(E=>{let N=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>COTIZACION</div>
      <div class='titulo2'>${h.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${h.direccion}<br>
Tel. ${h.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${r.nombre}</td>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${f}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(I=>{N+=`<div style='font-size: 12px'><b> ${I.nombre} </b></div>`,N+=`<div><span style='font-size: 18px;font-weight: bold'>${I.cantidadVenta}</span> ${parseFloat(I.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(I.precioVenta*I.cantidadVenta).toFixed(2)}</span></div>`}),N+=`<hr>
<div>${r.comentario===""||r.comentario===null||r.comentario===void 0?"":"Comentario: "+r.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(e).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(n-e).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${d} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${E}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=N,i&&new z.Printd().print(document.getElementById("myElement")),l(E)}).catch(E=>{c(E)})})}static reciboCompra(t){return console.log("reciboCompra",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,l=new e().convertToText(parseInt(t.total)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},o=U().env;q.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,c).then(s=>{let d=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${o.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${o.direccion}<br>
    Tel. ${o.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;t.compra_detalles.forEach(u=>{d+=`<div style='font-size: 12px'><b>${u.nombre} </b></div>`,d+=`<div>${u.cantidad} ${parseFloat(u.precio).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(u.total).toFixed(2)}</span></div>`}),d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${l} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${s}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=d,new z.Printd().print(document.getElementById("myElement")),r(s)}).catch(s=>{n(s)})})}static reciboPedido(t){return console.log("reciboPedido",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,l=new e().convertToText(parseInt(t.total)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},o=U().env;q.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,c).then(s=>{let d=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE PEDIDO</div>
      <div class='titulo2'>${o.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${o.direccion}<br>
    Tel. ${o.telefono}<br>
    Oruro</div>
    <hr>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>FECHA HORA</div>
        <div class='titulo2'>${t.fecha} ${t.hora}</div>
    </div>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>ID</div>
        <div class='titulo2'>${t.id}</div>
    </div>
    <hr>
    <div class='titulo'>DETALLE</div>`;t.detalles.forEach(u=>{d+=`<div style='font-size: 12px'><b>${u.producto?.nombre} </b></div>`,d+=`<div>${u.cantidad} ${parseFloat(u.cantidad).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(u.cantidad).toFixed(2)}</span></div>`}),d+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${l} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${s}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=d,new z.Printd().print(document.getElementById("myElement")),r(s)}).catch(s=>{n(s)})})}static reciboTranferencia(t,r,n,e){return console.log("producto",t,"de",r,"ha",n,"cantidad",e),new Promise((i,l)=>{const c=k.conversorNumerosALetras,s=new c().convertToText(parseInt(e)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},f=U().env;q.toDataURL(`de: ${r} A: ${n}`,d).then(u=>{let h=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${f.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${f.direccion}<br>
    Tel. ${f.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;h+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${r} a ${n} </b></div>`,h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${e+""}</td></tr>
      </table>
      <br>
      <div>Son ${s+""} ${e+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${u}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=h,new z.Printd().print(document.getElementById("myElement")),i(u)}).catch(u=>{l(u)})})}static head(){return`<html>
<style>
      .titulo{
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      }
      .titulo2{
      font-size: 10px;
      text-align: center;
      }
            .titulo3{
      font-size: 10px;
      text-align: center;
      width:70%;
      }
            .contenido{
      font-size: 10px;
      text-align: left;
      }
      .conte2{
      font-size: 10px;
      text-align: right;
      }
      .titder{
      font-size: 12px;
      text-align: right;
      font-weight: bold;
      }
      hr{
  border-top: 1px dashed   ;
}
  table{
    width:100%
  }
  h1 {
    color: black;
    font-family: sans-serif;
  }
  </style>
<body>
<div style="width: 300px;">`}static async printFactura(t){const r=k.conversorNumerosALetras,e=new r().convertToText(parseInt(t.total)),i=U().env,l=await q.toDataURL(`${i.url2}consulta/QR?nit=${i.nit}&cuf=${t.cuf}&numero=${t.id}&t=2`,{errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}}),c=t.online?"en":"fuera de";let o=`<style>
    .titulo { font-size: 12px; text-align: center; font-weight: bold; }
    .titulo2 { font-size: 10px; text-align: center; }
    .contenido { font-size: 10px; text-align: left; }
    .conte2 { font-size: 10px; text-align: right; }
    .titder { font-size: 12px; text-align: right; font-weight: bold; }
    hr { border-top: 1px dashed; }
  </style>
  <div style='padding: 0.5cm'>
    <div class='titulo'>FACTURA CON DERECHO A CREDITO FISCAL</div>
    <div class='titulo2'>
      ${i.razon}<br>Casa Matriz<br>No. Punto de Venta 0<br>
      ${i.direccion}<br>Tel. ${i.telefono}<br>Oruro
    </div>
    <hr>
    <div class='titulo'>NIT</div><div class='titulo2'>${i.nit}</div>
    <div class='titulo'>FACTURA N°</div><div class='titulo2'>${t.id}</div>
    <div class='titulo'>CÓD. AUTORIZACIÓN</div><div class='titulo2'>${t.cuf}</div>
    <hr>
    <table>
      <tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.nombre}</td></tr>
      <tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.ci}${t.cliente.complemento?"-"+t.cliente.complemento:""}</td></tr>
      <tr><td class='titder'>COD. CLIENTE:</td><td class='contenido'>${t.cliente.id}</td></tr>
      <tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha}</td></tr>
    </table>
    <hr>
    <div class='titulo'>DETALLE</div>`;t.venta_detalles.forEach(f=>{o+=`<div style='font-size: 12px'><b>${f.id} - ${f.nombre}</b></div>
             <div>${f.cantidad} ${parseFloat(f.precio).toFixed(2)} 0.00
             <span style='float:right'>${parseFloat(f.cantidad*f.precio).toFixed(2)}</span></div>`}),o+=`<hr>
    <table style='font-size: 8px;'>
      <tr><td class='titder'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>IMPORTE BASE CRÉDITO FISCAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
    </table><br>
    <div>Son ${e} ${((parseFloat(t.total)-Math.floor(t.total))*100).toFixed(0)}/100 Bolivianos</div>
    <hr>
    <div class='titulo2' style='font-size: 9px'>ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
    EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY<br><br>
    ${t.leyenda}<br><br>
    “Este documento es la Representación Gráfica de un Documento Fiscal Digital emitido en una modalidad de facturación ${c} línea”</div>
    <div style='display: flex; justify-content: center;'>
      <img src="${l}" />
    </div>
  </div>`;const s=document.getElementById("myElement");s&&(s.innerHTML=o),new z.Printd().print(s)}}export{Ve as I};
