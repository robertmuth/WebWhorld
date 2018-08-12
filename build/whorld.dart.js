(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isa=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isx)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="a"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="n"){processStatics(init.statics[b2]=b3.n,b4)
delete b3.n}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(c0,c1,c2,c3,c4){var g=0,f=g,e=c1[g],d
if(typeof e=="string")d=c1[++g]
else{d=e
e=c2}if(typeof d=="number"){f=d
d=c1[++g]}c0[c2]=c0[e]=d
var a0=[d]
d.$stubName=c2
c4.push(c2)
for(g++;g<c1.length;g++){d=c1[g]
if(typeof d!="function")break
if(!c3)d.$stubName=c1[++g]
a0.push(d)
if(d.$stubName){c0[d.$stubName]=d
c4.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=c1[g]
var a2=c1[g]
c1=c1.slice(++g)
var a3=c1[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=c1[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=c1[2]
if(typeof b3=="number")c1[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof c1[b4]=="number")c1[b4]=c1[b4]+b
b4++}for(var a1=0;a1<b2;a1++){c1[b4]=c1[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,c1,c3,c2,a4)
c0[c2].$getter=d
d.$getterStub=true
if(c3)c4.push(a2)
c0[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}var b6=c1.length>b5
if(b6){a0[0].$reflectable=1
a0[0].$reflectionInfo=c1
for(var a1=1;a1<a0.length;a1++){a0[a1].$reflectable=2
a0[a1].$reflectionInfo=c1}var b7=c3?init.mangledGlobalNames:init.mangledNames
var b8=c1[b5]
var b9=b8
if(a2)b7[a2]=b9
if(a7)b9+="="
else if(!a8)b9+=":"+(a5+b0)
b7[c2]=b9
a0[0].$reflectionName=b9
for(var a1=b5+1;a1<c1.length;a1++)c1[a1]=c1[a1]+b
a0[0].$metadataIndex=b5+1
if(b0)c0[b8+"*"]=a0[f]}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.cK"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.cK"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.cK(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bW=function(){}
var dart=[["","",,H,{"^":"",ki:{"^":"a;a"}}],["","",,J,{"^":"",
cR:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bY:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cP==null){H.jp()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(P.dM("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cf()]
if(v!=null)return v
v=H.jw(a)
if(v!=null)return v
if(typeof a=="function")return C.J
y=Object.getPrototypeOf(a)
if(y==null)return C.u
if(y===Object.prototype)return C.u
if(typeof w=="function"){Object.defineProperty(w,$.$get$cf(),{value:C.l,enumerable:false,writable:true,configurable:true})
return C.l}return C.l},
x:{"^":"a;",
E:function(a,b){return a===b},
gv:function(a){return H.aA(a)},
h:["bL",function(a){return"Instance of '"+H.aZ(a)+"'"}],
aN:["bK",function(a,b){H.i(b,"$iscc")
throw H.d(P.dm(a,b.gbl(),b.gbw(),b.gbn(),null))},null,"gbp",5,0,null,0],
gaQ:function(a){return new H.bO(H.es(a))},
"%":"CanvasGradient|CanvasPattern|Client|DOMError|MediaError|Navigator|NavigatorConcurrentHardware|NavigatorUserMediaError|OverconstrainedError|PositionError|PushMessageData|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGL2RenderingContext|WebGLRenderingContext|WindowClient|WorkerLocation|WorkerNavigator"},
fv:{"^":"x;",
h:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iscI:1},
fx:{"^":"x;",
E:function(a,b){return null==b},
h:function(a){return"null"},
gv:function(a){return 0},
gaQ:function(a){return C.N},
aN:[function(a,b){return this.bK(a,H.i(b,"$iscc"))},null,"gbp",5,0,null,0],
$isn:1},
cg:{"^":"x;",
gv:function(a){return 0},
h:["bM",function(a){return String(a)}]},
h4:{"^":"cg;"},
bP:{"^":"cg;"},
bf:{"^":"cg;",
h:function(a){var z=a[$.$get$bA()]
if(z==null)return this.bM(a)
return"JavaScript function for "+H.b(J.aS(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isaV:1},
ax:{"^":"x;$ti",
k:function(a,b){H.m(b,H.e(a,0))
if(!!a.fixed$length)H.K(P.O("add"))
a.push(b)},
by:function(a,b){var z
if(!!a.fixed$length)H.K(P.O("removeAt"))
z=a.length
if(b>=z)throw H.d(P.bn(b,null,null))
return a.splice(b,1)[0]},
Z:function(a,b){var z
if(!!a.fixed$length)H.K(P.O("remove"))
for(z=0;z<a.length;++z)if(J.cS(a[z],b)){a.splice(z,1)
return!0}return!1},
be:function(a,b){var z
H.o(b,"$isp",[H.e(a,0)],"$asp")
if(!!a.fixed$length)H.K(P.O("addAll"))
for(z=J.aQ(b);z.u();)a.push(z.gA())},
bk:function(a,b,c){var z=H.e(a,0)
return new H.co(a,H.c(b,{func:1,ret:c,args:[z]}),[z,c])},
aM:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.B(z,y,H.b(a[y]))
return z.join(b)},
J:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
bI:function(a,b,c){var z=a.length
if(b>z)throw H.d(P.Z(b,0,a.length,"start",null))
if(c<b||c>a.length)throw H.d(P.Z(c,b,a.length,"end",null))
if(b===c)return H.v([],[H.e(a,0)])
return H.v(a.slice(b,c),[H.e(a,0)])},
h:function(a){return P.cd(a,"[","]")},
gD:function(a){return new J.eU(a,a.length,0,[H.e(a,0)])},
gv:function(a){return H.aA(a)},
gj:function(a){return a.length},
B:function(a,b,c){H.y(b)
H.m(c,H.e(a,0))
if(!!a.immutable$list)H.K(P.O("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aJ(a,b))
if(b>=a.length||b<0)throw H.d(H.aJ(a,b))
a[b]=c},
$isA:1,
$isp:1,
$isl:1,
n:{
fu:function(a,b){return J.be(H.v(a,[b]))},
be:function(a){H.b8(a)
a.fixed$length=Array
return a}}},
kh:{"^":"ax;$ti"},
eU:{"^":"a;a,b,c,0d,$ti",
gA:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bD:{"^":"x;",
gcW:function(a){return a===0?1/a<0:a<0},
aS:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(P.O(""+a+".toInt()"))},
aK:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.d(P.O(""+a+".ceil()"))},
cQ:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(P.O(""+a+".floor()"))},
L:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(P.O(""+a+".round()"))},
d2:function(a,b){var z
if(b>20)throw H.d(P.Z(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gcW(a))return"-"+z
return z},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
F:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
af:function(a,b){return(a|0)===a?a/b|0:this.cv(a,b)},
cv:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(P.O("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
aG:function(a,b){var z
if(a>0)z=this.cs(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
cs:function(a,b){return b>31?0:a>>>b},
M:function(a,b){if(typeof b!=="number")throw H.d(H.ac(b))
return a<b},
$isb5:1,
$isM:1},
dd:{"^":"bD;",$isE:1},
dc:{"^":"bD;"},
bE:{"^":"x;",
bj:function(a,b){if(b<0)throw H.d(H.aJ(a,b))
if(b>=a.length)H.K(H.aJ(a,b))
return a.charCodeAt(b)},
au:function(a,b){if(b>=a.length)throw H.d(H.aJ(a,b))
return a.charCodeAt(b)},
aI:function(a,b,c){if(c>b.length)throw H.d(P.Z(c,0,b.length,null,null))
return new H.iH(b,a,c)},
bg:function(a,b){return this.aI(a,b,0)},
w:function(a,b){H.k(b)
if(typeof b!=="string")throw H.d(P.cV(b,null,null))
return a+b},
aU:function(a,b){if(typeof b==="string")return H.v(a.split(b),[P.f])
else if(b instanceof H.df&&b.gci().exec("").length-2===0)return H.v(a.split(b.b),[P.f])
else return this.cb(a,b)},
cb:function(a,b){var z,y,x,w,v,u,t
z=H.v([],[P.f])
for(y=J.eL(b,a),y=y.gD(y),x=0,w=1;y.u();){v=y.gA()
u=v.gaV(v)
t=v.gaL()
w=t-u
if(w===0&&x===u)continue
C.a.k(z,this.a2(a,x,u))
x=t}if(x<a.length||w>0)C.a.k(z,this.W(a,x))
return z},
bH:function(a,b,c){var z
if(c>a.length)throw H.d(P.Z(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
an:function(a,b){return this.bH(a,b,0)},
a2:function(a,b,c){H.y(c)
if(c==null)c=a.length
if(b<0)throw H.d(P.bn(b,null,null))
if(b>c)throw H.d(P.bn(b,null,null))
if(c>a.length)throw H.d(P.bn(c,null,null))
return a.substring(b,c)},
W:function(a,b){return this.a2(a,b,null)},
d3:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.au(z,0)===133){x=J.fy(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.bj(z,w)===133?J.fz(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
cN:function(a,b,c){if(c>a.length)throw H.d(P.Z(c,0,a.length,null,null))
return H.jE(a,b,c)},
h:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
$isdp:1,
$isf:1,
n:{
de:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
fy:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.au(a,b)
if(y!==32&&y!==13&&!J.de(y))break;++b}return b},
fz:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.bj(a,z)
if(y!==32&&y!==13&&!J.de(y))break}return b}}}}],["","",,H,{"^":"",A:{"^":"p;"},cl:{"^":"A;$ti",
gD:function(a){return new H.cm(this,this.gj(this),0,[H.aM(this,"cl",0)])}},cm:{"^":"a;a,b,c,0d,$ti",
gA:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.bw(z)
x=y.gj(z)
if(this.b!==x)throw H.d(P.aU(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.J(z,w);++this.c
return!0}},di:{"^":"p;a,b,$ti",
gD:function(a){return new H.dj(J.aQ(this.a),this.b,this.$ti)},
gj:function(a){return J.aR(this.a)},
$asp:function(a,b){return[b]},
n:{
fH:function(a,b,c,d){H.o(a,"$isp",[c],"$asp")
H.c(b,{func:1,ret:d,args:[c]})
if(!!J.u(a).$isA)return new H.fe(a,b,[c,d])
return new H.di(a,b,[c,d])}}},fe:{"^":"di;a,b,$ti",$isA:1,
$asA:function(a,b){return[b]}},dj:{"^":"db;0a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gA())
return!0}this.a=null
return!1},
gA:function(){return this.a},
$asdb:function(a,b){return[b]}},co:{"^":"cl;a,b,$ti",
gj:function(a){return J.aR(this.a)},
J:function(a,b){return this.b.$1(J.eM(this.a,b))},
$asA:function(a,b){return[b]},
$ascl:function(a,b){return[b]},
$asp:function(a,b){return[b]}},bB:{"^":"a;$ti"},ct:{"^":"a;a",
gv:function(a){var z=this._hashCode
if(z!=null)return z
z=536870911&664597*J.a6(this.a)
this._hashCode=z
return z},
h:function(a){return'Symbol("'+H.b(this.a)+'")'},
E:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ct){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
$isaB:1}}],["","",,H,{"^":"",
ev:function(a){var z=J.u(a)
return!!z.$isc7||!!z.$isC||!!z.$isdg||!!z.$isda||!!z.$isD||!!z.$iscv||!!z.$isdO}}],["","",,H,{"^":"",
c4:function(a){var z,y
z=H.k(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
ji:[function(a){return init.types[H.y(a)]},null,null,4,0,null,7],
js:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.u(a).$isa7},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aS(a)
if(typeof z!=="string")throw H.d(H.ac(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
hd:function(a,b){var z,y
if(typeof a!=="string")H.K(H.ac(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.j(z,3)
y=H.k(z[3])
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return},
hc:function(a){var z,y
if(typeof a!=="string")H.K(H.ac(a))
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=J.c6(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
aZ:function(a){var z,y,x
z=H.h6(a)
y=H.ae(a)
x=H.cQ(y,0,null)
return z+x},
h6:function(a){var z,y,x,w,v,u,t,s,r
z=J.u(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.C||!!z.$isbP){u=C.q(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.c4(w.length>1&&C.e.au(w,0)===36?C.e.W(w,1):w)},
dq:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
hf:function(a){var z,y,x,w
z=H.v([],[P.E])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.ar)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.d(H.ac(w))
if(w<=65535)C.a.k(z,w)
else if(w<=1114111){C.a.k(z,55296+(C.f.aG(w-65536,10)&1023))
C.a.k(z,56320+(w&1023))}else throw H.d(H.ac(w))}return H.dq(z)},
he:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.d(H.ac(x))
if(x<0)throw H.d(H.ac(x))
if(x>65535)return H.hf(a)}return H.dq(a)},
I:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
hb:function(a){return a.b?H.I(a).getUTCFullYear()+0:H.I(a).getFullYear()+0},
ha:function(a){return a.b?H.I(a).getUTCMonth()+1:H.I(a).getMonth()+1},
h9:function(a){return a.b?H.I(a).getUTCDate()+0:H.I(a).getDate()+0},
bj:function(a){return a.b?H.I(a).getUTCHours()+0:H.I(a).getHours()+0},
bl:function(a){return a.b?H.I(a).getUTCMinutes()+0:H.I(a).getMinutes()+0},
bm:function(a){return a.b?H.I(a).getUTCSeconds()+0:H.I(a).getSeconds()+0},
bk:function(a){return a.b?H.I(a).getUTCMilliseconds()+0:H.I(a).getMilliseconds()+0},
dr:function(a,b,c){var z,y,x
z={}
H.o(c,"$isN",[P.f,null],"$asN")
z.a=0
y=[]
x=[]
z.a=b.length
C.a.be(y,b)
z.b=""
if(c!=null&&c.a!==0)c.C(0,new H.h8(z,x,y))
return J.eQ(a,new H.fw(C.L,""+"$"+z.a+z.b,0,y,x,0))},
h7:function(a,b){var z,y
z=b instanceof Array?b:P.bH(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.h5(a,z)},
h5:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.u(a)["call*"]
if(y==null)return H.dr(a,b,null)
x=H.dt(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.dr(a,b,null)
b=P.bH(b,!0,null)
for(u=z;u<v;++u)C.a.k(b,init.metadata[x.cO(0,u)])}return y.apply(a,b)},
P:function(a){throw H.d(H.ac(a))},
j:function(a,b){if(a==null)J.aR(a)
throw H.d(H.aJ(a,b))},
aJ:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.as(!0,b,"index",null)
z=H.y(J.aR(a))
if(!(b<0)){if(typeof z!=="number")return H.P(z)
y=b>=z}else y=!0
if(y)return P.bd(b,a,"index",null,z)
return P.bn(b,"index",null)},
ac:function(a){return new P.as(!0,a,null,null)},
d:function(a){var z
if(a==null)a=new P.cq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eF})
z.name=""}else z.toString=H.eF
return z},
eF:[function(){return J.aS(this.dartException)},null,null,0,0,null],
K:function(a){throw H.d(a)},
ar:function(a){throw H.d(P.aU(a))},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jH(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.f.aG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cj(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dn(H.b(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$dy()
u=$.$get$dz()
t=$.$get$dA()
s=$.$get$dB()
r=$.$get$dF()
q=$.$get$dG()
p=$.$get$dD()
$.$get$dC()
o=$.$get$dI()
n=$.$get$dH()
m=v.H(y)
if(m!=null)return z.$1(H.cj(H.k(y),m))
else{m=u.H(y)
if(m!=null){m.method="call"
return z.$1(H.cj(H.k(y),m))}else{m=t.H(y)
if(m==null){m=s.H(y)
if(m==null){m=r.H(y)
if(m==null){m=q.H(y)
if(m==null){m=p.H(y)
if(m==null){m=s.H(y)
if(m==null){m=o.H(y)
if(m==null){m=n.H(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dn(H.k(y),m))}}return z.$1(new H.hE(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.du()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.as(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.du()
return a},
aN:function(a){var z
if(a==null)return new H.e3(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.e3(a)},
jg:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.B(0,a[y],a[x])}return b},
jr:[function(a,b,c,d,e,f){H.i(a,"$isaV")
switch(H.y(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.d(new P.i5("Unsupported number of arguments for wrapped closure"))},null,null,24,0,null,8,9,10,11,12,13],
aI:function(a,b){var z
H.y(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.jr)
a.$identity=z
return z},
f0:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.u(d).$isl){z.$reflectionInfo=d
x=H.dt(z).r}else x=d
w=e?Object.create(new H.hs().constructor.prototype):Object.create(new H.c8(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.a1
if(typeof u!=="number")return u.w()
$.a1=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.cZ(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.ji,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.cX:H.c9
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.cZ(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
eY:function(a,b,c,d){var z=H.c9
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cZ:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.f_(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eY(y,!w,z,b)
if(y===0){w=$.a1
if(typeof w!=="number")return w.w()
$.a1=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.aT
if(v==null){v=H.bz("self")
$.aT=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a1
if(typeof w!=="number")return w.w()
$.a1=w+1
t+=w
w="return function("+t+"){return this."
v=$.aT
if(v==null){v=H.bz("self")
$.aT=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
eZ:function(a,b,c,d){var z,y
z=H.c9
y=H.cX
switch(b?-1:a){case 0:throw H.d(H.ho("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
f_:function(a,b){var z,y,x,w,v,u,t,s
z=$.aT
if(z==null){z=H.bz("self")
$.aT=z}y=$.cW
if(y==null){y=H.bz("receiver")
$.cW=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eZ(w,!u,x,b)
if(w===1){z="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
y=$.a1
if(typeof y!=="number")return y.w()
$.a1=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
y=$.a1
if(typeof y!=="number")return y.w()
$.a1=y+1
return new Function(z+y+"}")()},
cK:function(a,b,c,d,e,f,g){var z,y
z=J.be(H.b8(b))
H.y(c)
y=!!J.u(d).$isl?J.be(d):d
return H.f0(a,z,c,y,!!e,f,g)},
k:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.d(H.a_(a,"String"))},
cL:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a_(a,"double"))},
jC:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a_(a,"num"))},
jd:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.d(H.a_(a,"bool"))},
y:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.d(H.a_(a,"int"))},
eB:function(a,b){throw H.d(H.a_(a,H.k(b).substring(3)))},
jD:function(a,b){var z=J.bw(b)
throw H.d(H.eX(a,z.a2(b,3,z.gj(b))))},
i:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.u(a)[b])return a
H.eB(a,b)},
a0:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.u(a)[b]
else z=!0
if(z)return a
H.jD(a,b)},
b8:function(a){if(a==null)return a
if(!!J.u(a).$isl)return a
throw H.d(H.a_(a,"List"))},
jv:function(a,b){var z
if(a==null)return a
z=J.u(a)
if(!!z.$isl)return a
if(z[b])return a
H.eB(a,b)},
cM:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.y(z)]
else return a.$S()}return},
aK:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cM(J.u(a))
if(z==null)return!1
y=H.ew(z,null,b,null)
return y},
c:function(a,b){var z,y
if(a==null)return a
if($.cF)return a
$.cF=!0
try{if(H.aK(a,b))return a
z=H.aO(b)
y=H.a_(a,z)
throw H.d(y)}finally{$.cF=!1}},
bt:function(a,b){if(a!=null&&!H.cJ(a,b))H.K(H.a_(a,H.aO(b)))
return a},
eg:function(a){var z,y
z=J.u(a)
if(!!z.$ish){y=H.cM(z)
if(y!=null)return H.aO(y)
return"Closure"}return H.aZ(a)},
jF:function(a){throw H.d(new P.f6(H.k(a)))},
cO:function(a){return init.getIsolateTag(a)},
en:function(a){return new H.bO(a)},
v:function(a,b){a.$ti=b
return a},
ae:function(a){if(a==null)return
return a.$ti},
kS:function(a,b,c){return H.aP(a["$as"+H.b(c)],H.ae(b))},
b7:function(a,b,c,d){var z
H.k(c)
H.y(d)
z=H.aP(a["$as"+H.b(c)],H.ae(b))
return z==null?null:z[d]},
aM:function(a,b,c){var z
H.k(b)
H.y(c)
z=H.aP(a["$as"+H.b(b)],H.ae(a))
return z==null?null:z[c]},
e:function(a,b){var z
H.y(b)
z=H.ae(a)
return z==null?null:z[b]},
aO:function(a){var z=H.ap(a,null)
return z},
ap:function(a,b){var z,y
H.o(b,"$isl",[P.f],"$asl")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.c4(a[0].builtin$cls)+H.cQ(a,1,b)
if(typeof a=="function")return H.c4(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.y(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.j(b,y)
return H.b(b[y])}if('func' in a)return H.iY(a,b)
if('futureOr' in a)return"FutureOr<"+H.ap("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
iY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.f]
H.o(b,"$isl",z,"$asl")
if("bounds" in a){y=a.bounds
if(b==null){b=H.v([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.k(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.j(b,r)
t=C.e.w(t,b[r])
q=y[u]
if(q!=null&&q!==P.a)t+=" extends "+H.ap(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.ap(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.ap(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.ap(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.jf(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.k(z[l])
n=n+m+H.ap(i[h],b)+(" "+H.b(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
cQ:function(a,b,c){var z,y,x,w,v,u
H.o(c,"$isl",[P.f],"$asl")
if(a==null)return""
z=new P.bM("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.ap(u,c)}v="<"+z.h(0)+">"
return v},
es:function(a){var z,y,x,w
z=J.u(a)
if(!!z.$ish){y=H.cM(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.ae(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
aP:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
am:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ae(a)
y=J.u(a)
if(y[b]==null)return!1
return H.ek(H.aP(y[d],z),null,c,null)},
o:function(a,b,c,d){var z,y
H.k(b)
H.b8(c)
H.k(d)
if(a==null)return a
z=H.am(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.cQ(c,0,null)
throw H.d(H.a_(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
j7:function(a,b,c,d,e){var z
H.k(c)
H.k(d)
H.k(e)
z=H.Q(a,null,b,null)
if(!z)H.jG("TypeError: "+H.b(c)+H.aO(a)+H.b(d)+H.aO(b)+H.b(e))},
jG:function(a){throw H.d(new H.dJ(H.k(a)))},
ek:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.Q(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.Q(a[y],b,c[y],d))return!1
return!0},
kQ:function(a,b,c){return a.apply(b,H.aP(J.u(b)["$as"+H.b(c)],H.ae(b)))},
ex:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="a"||a.builtin$cls==="n"||a===-1||a===-2||H.ex(z)}return!1},
cJ:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="a"||b.builtin$cls==="n"||b===-1||b===-2||H.ex(b)
return z}z=b==null||b===-1||b.builtin$cls==="a"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.cJ(a,"type" in b?b.type:null))return!0
if('func' in b)return H.aK(a,b)}y=J.u(a).constructor
x=H.ae(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.Q(y,null,b,null)
return z},
m:function(a,b){if(a!=null&&!H.cJ(a,b))throw H.d(H.a_(a,H.aO(b)))
return a},
Q:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="a"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="a"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.Q(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="n")return!0
if('func' in c)return H.ew(a,b,c,d)
if('func' in a)return c.builtin$cls==="aV"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.Q("type" in a?a.type:null,b,x,d)
else if(H.Q(a,b,x,d))return!0
else{if(!('$is'+"W" in y.prototype))return!1
w=y.prototype["$as"+"W"]
v=H.aP(w,z?a.slice(1):null)
return H.Q(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.ek(H.aP(r,z),b,u,d)},
ew:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.Q(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.Q(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.Q(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.Q(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.jB(m,b,l,d)},
jB:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.Q(c[w],d,a[w],b))return!1}return!0},
kR:function(a,b,c){Object.defineProperty(a,H.k(b),{value:c,enumerable:false,writable:true,configurable:true})},
jw:function(a){var z,y,x,w,v,u
z=H.k($.et.$1(a))
y=$.bV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c_[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.k($.ej.$2(a,z))
if(z!=null){y=$.bV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c_[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c1(x)
$.bV[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.c_[z]=x
return x}if(v==="-"){u=H.c1(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eA(a,x)
if(v==="*")throw H.d(P.dM(z))
if(init.leafTags[z]===true){u=H.c1(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eA(a,x)},
eA:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cR(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c1:function(a){return J.cR(a,!1,null,!!a.$isa7)},
jA:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.c1(z)
else return J.cR(z,c,null,null)},
jp:function(){if(!0===$.cP)return
$.cP=!0
H.jq()},
jq:function(){var z,y,x,w,v,u,t,s
$.bV=Object.create(null)
$.c_=Object.create(null)
H.jl()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eC.$1(v)
if(u!=null){t=H.jA(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jl:function(){var z,y,x,w,v,u,t
z=C.G()
z=H.aH(C.D,H.aH(C.I,H.aH(C.p,H.aH(C.p,H.aH(C.H,H.aH(C.E,H.aH(C.F(C.q),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.et=new H.jm(v)
$.ej=new H.jn(u)
$.eC=new H.jo(t)},
aH:function(a,b){return a(b)||b},
jE:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
f3:{"^":"hF;a,$ti"},
f2:{"^":"a;$ti",
h:function(a){return P.bI(this)},
$isN:1},
f4:{"^":"f2;a,b,c,$ti",
gj:function(a){return this.a},
cg:function(a){return this.b[H.k(a)]},
C:function(a,b){var z,y,x,w,v
z=H.e(this,1)
H.c(b,{func:1,ret:-1,args:[H.e(this,0),z]})
y=this.c
for(x=y.length,w=0;w<x;++w){v=y[w]
b.$2(v,H.m(this.cg(v),z))}}},
fw:{"^":"a;a,b,c,d,e,f",
gbl:function(){var z=this.a
return z},
gbw:function(){var z,y,x,w
if(this.c===1)return C.r
z=this.d
y=z.length-this.e.length-this.f
if(y===0)return C.r
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.j(z,w)
x.push(z[w])}x.fixed$length=Array
x.immutable$list=Array
return x},
gbn:function(){var z,y,x,w,v,u,t,s,r
if(this.c!==0)return C.t
z=this.e
y=z.length
x=this.d
w=x.length-y-this.f
if(y===0)return C.t
v=P.aB
u=new H.bF(0,0,[v,null])
for(t=0;t<y;++t){if(t>=z.length)return H.j(z,t)
s=z[t]
r=w+t
if(r<0||r>=x.length)return H.j(x,r)
u.B(0,new H.ct(s),x[r])}return new H.f3(u,[v,null])},
$iscc:1},
hi:{"^":"a;a,b,c,d,e,f,r,0x",
cO:[function(a,b){var z
H.y(b)
z=this.d
if(typeof b!=="number")return b.M()
if(b<z)return
return this.b[3+b-z]},null,"gd9",5,0,null,14],
n:{
dt:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.be(z)
y=z[0]
x=z[1]
return new H.hi(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
h8:{"^":"h:30;a,b,c",
$2:function(a,b){var z
H.k(a)
z=this.a
z.b=z.b+"$"+H.b(a)
C.a.k(this.b,a)
C.a.k(this.c,b);++z.a}},
hC:{"^":"a;a,b,c,d,e,f",
H:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
n:{
a4:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.v([],[P.f])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hC(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bN:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dE:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fT:{"^":"F;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+z+"' on null"},
n:{
dn:function(a,b){return new H.fT(a,b==null?null:b.method)}}},
fB:{"^":"F;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
n:{
cj:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fB(a,y,z?null:b.receiver)}}},
hE:{"^":"F;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jH:{"^":"h:2;a",
$1:function(a){if(!!J.u(a).$isF)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
e3:{"^":"a;a,0b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isL:1},
h:{"^":"a;",
h:function(a){return"Closure '"+H.aZ(this).trim()+"'"},
gbE:function(){return this},
$isaV:1,
gbE:function(){return this}},
dw:{"^":"h;"},
hs:{"^":"dw;",
h:function(a){var z,y
z=this.$static_name
if(z==null)return"Closure of unknown static method"
y="Closure '"+H.c4(z)+"'"
return y}},
c8:{"^":"dw;a,b,c,d",
E:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c8))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.a6(z):H.aA(z)
return(y^H.aA(this.b))>>>0},
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+("Instance of '"+H.aZ(z)+"'")},
n:{
c9:function(a){return a.a},
cX:function(a){return a.c},
bz:function(a){var z,y,x,w,v
z=new H.c8("self","target","receiver","name")
y=J.be(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
dJ:{"^":"F;a",
h:function(a){return this.a},
n:{
a_:function(a,b){return new H.dJ("TypeError: "+H.b(P.au(a))+": type '"+H.eg(a)+"' is not a subtype of type '"+b+"'")}}},
eW:{"^":"F;a",
h:function(a){return this.a},
n:{
eX:function(a,b){return new H.eW("CastError: "+H.b(P.au(a))+": type '"+H.eg(a)+"' is not a subtype of type '"+b+"'")}}},
hn:{"^":"F;a",
h:function(a){return"RuntimeError: "+H.b(this.a)},
n:{
ho:function(a){return new H.hn(a)}}},
bO:{"^":"a;a,0b,0c,0d",
gU:function(){var z=this.b
if(z==null){z=H.aO(this.a)
this.b=z}return z},
h:function(a){var z=this.gU()
return z},
gv:function(a){var z=this.d
if(z==null){z=C.e.gv(this.gU())
this.d=z}return z},
E:function(a,b){if(b==null)return!1
return b instanceof H.bO&&this.gU()===b.gU()}},
bF:{"^":"cn;a,0b,0c,0d,0e,0f,r,$ti",
gj:function(a){return this.a},
gK:function(a){return new H.bG(this,[H.e(this,0)])},
gd4:function(a){var z=H.e(this,0)
return H.fH(new H.bG(this,[z]),new H.fA(this),z,H.e(this,1))},
I:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.ca(z,b)}else{y=this.cT(b)
return y}},
cT:function(a){var z=this.d
if(z==null)return!1
return this.ai(this.a9(z,J.a6(a)&0x3ffffff),a)>=0},
i:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aa(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.aa(w,b)
x=y==null?null:y.b
return x}else return this.cU(b)},
cU:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a9(z,J.a6(a)&0x3ffffff)
x=this.ai(y,a)
if(x<0)return
return y[x].b},
B:function(a,b,c){var z,y,x,w,v,u
H.m(b,H.e(this,0))
H.m(c,H.e(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.aB()
this.b=z}this.b1(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aB()
this.c=y}this.b1(y,b,c)}else{x=this.d
if(x==null){x=this.aB()
this.d=x}w=J.a6(b)&0x3ffffff
v=this.a9(x,w)
if(v==null)this.aF(x,w,[this.aC(b,c)])
else{u=this.ai(v,b)
if(u>=0)v[u].b=c
else v.push(this.aC(b,c))}}},
Z:function(a,b){var z=this.cV(b)
return z},
cV:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a9(z,a.gv(a)&0x3ffffff)
x=this.ai(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cA(w)
return w.b},
ah:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.aA()}},
C:function(a,b){var z,y
H.c(b,{func:1,ret:-1,args:[H.e(this,0),H.e(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(P.aU(this))
z=z.c}},
b1:function(a,b,c){var z
H.m(b,H.e(this,0))
H.m(c,H.e(this,1))
z=this.aa(a,b)
if(z==null)this.aF(a,b,this.aC(b,c))
else z.b=c},
aA:function(){this.r=this.r+1&67108863},
aC:function(a,b){var z,y
z=new H.fC(H.m(a,H.e(this,0)),H.m(b,H.e(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.aA()
return z},
cA:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.aA()},
ai:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.cS(a[y].a,b))return y
return-1},
h:function(a){return P.bI(this)},
aa:function(a,b){return a[b]},
a9:function(a,b){return a[b]},
aF:function(a,b,c){a[b]=c},
cc:function(a,b){delete a[b]},
ca:function(a,b){return this.aa(a,b)!=null},
aB:function(){var z=Object.create(null)
this.aF(z,"<non-identifier-key>",z)
this.cc(z,"<non-identifier-key>")
return z},
$isdh:1},
fA:{"^":"h;a",
$1:[function(a){var z=this.a
return z.i(0,H.m(a,H.e(z,0)))},null,null,4,0,null,15,"call"],
$S:function(){var z=this.a
return{func:1,ret:H.e(z,1),args:[H.e(z,0)]}}},
fC:{"^":"a;a,b,0c,0d"},
bG:{"^":"A;a,$ti",
gj:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.fD(z,z.r,this.$ti)
y.c=z.e
return y}},
fD:{"^":"a;a,b,0c,0d,$ti",
gA:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.aU(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jm:{"^":"h:2;a",
$1:function(a){return this.a(a)}},
jn:{"^":"h:14;a",
$2:function(a,b){return this.a(a,b)}},
jo:{"^":"h:19;a",
$1:function(a){return this.a(H.k(a))}},
df:{"^":"a;a,b,0c,0d",
h:function(a){return"RegExp/"+this.a+"/"},
gcj:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ce(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gci:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ce(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
aI:function(a,b,c){if(c>b.length)throw H.d(P.Z(c,0,b.length,null,null))
return new H.hJ(this,b,c)},
bg:function(a,b){return this.aI(a,b,0)},
cf:function(a,b){var z,y
z=this.gcj()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.iu(this,y)},
$isdp:1,
n:{
ce:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(P.cb("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
iu:{"^":"a;a,b",
gaV:function(a){return this.b.index},
gaL:function(){var z=this.b
return z.index+z[0].length}},
hJ:{"^":"fs;a,b,c",
gD:function(a){return new H.hK(this.a,this.b,this.c)},
$asp:function(){return[P.dk]}},
hK:{"^":"a;a,b,c,0d",
gA:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.cf(z,y)
if(x!=null){this.d=x
w=x.gaL()
this.c=x.b.index===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
hw:{"^":"a;aV:a>,b,c",
gaL:function(){return this.a+this.c.length}},
iH:{"^":"p;a,b,c",
gD:function(a){return new H.iI(this.a,this.b,this.c)},
$asp:function(){return[P.dk]}},
iI:{"^":"a;a,b,c,0d",
u:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.hw(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gA:function(){return this.d}}}],["","",,H,{"^":"",
jf:function(a){return J.fu(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
bx:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
ab:function(a,b,c){H.b8(b)
if(a>>>0!==a||a>=c)throw H.d(H.aJ(b,a))},
km:{"^":"x;",$iseV:1,"%":"ArrayBuffer"},
fQ:{"^":"x;",$isdK:1,"%":"DataView;ArrayBufferView;cp|dZ|e_|dl|e0|e1|ak"},
cp:{"^":"fQ;",
gj:function(a){return a.length},
$isa7:1,
$asa7:I.bW},
dl:{"^":"e_;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
B:function(a,b,c){H.y(b)
H.cL(c)
H.ab(b,a,a.length)
a[b]=c},
$isA:1,
$asA:function(){return[P.b5]},
$asbB:function(){return[P.b5]},
$asG:function(){return[P.b5]},
$isp:1,
$asp:function(){return[P.b5]},
$isl:1,
$asl:function(){return[P.b5]},
"%":"Float64Array"},
ak:{"^":"e1;",$isA:1,
$asA:function(){return[P.E]},
$asbB:function(){return[P.E]},
$asG:function(){return[P.E]},
$isp:1,
$asp:function(){return[P.E]},
$isl:1,
$asl:function(){return[P.E]}},
fP:{"^":"dl;","%":"Float32Array"},
kn:{"^":"ak;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"Int16Array"},
ko:{"^":"ak;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"Int32Array"},
kp:{"^":"ak;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"Int8Array"},
kq:{"^":"ak;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
kr:{"^":"ak;",
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
ks:{"^":"ak;",
gj:function(a){return a.length},
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kt:{"^":"ak;",
gj:function(a){return a.length},
i:function(a,b){H.ab(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
dZ:{"^":"cp+G;"},
e_:{"^":"dZ+bB;"},
e0:{"^":"cp+G;"},
e1:{"^":"e0+bB;"}}],["","",,P,{"^":"",
hM:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.j8()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aI(new P.hO(z),1)).observe(y,{childList:true})
return new P.hN(z,y,x)}else if(self.setImmediate!=null)return P.j9()
return P.ja()},
kH:[function(a){self.scheduleImmediate(H.aI(new P.hP(H.c(a,{func:1,ret:-1})),0))},"$1","j8",4,0,4],
kI:[function(a){self.setImmediate(H.aI(new P.hQ(H.c(a,{func:1,ret:-1})),0))},"$1","j9",4,0,4],
kJ:[function(a){P.cu(C.z,H.c(a,{func:1,ret:-1}))},"$1","ja",4,0,4],
cu:function(a,b){var z
H.c(b,{func:1,ret:-1})
z=C.f.af(a.a,1000)
return P.iN(z<0?0:z,b)},
eb:function(a,b){if(H.aK(a,{func:1,args:[P.a,P.L]}))return b.bx(a,null,P.a,P.L)
if(H.aK(a,{func:1,args:[P.a]})){b.toString
return H.c(a,{func:1,ret:null,args:[P.a]})}throw H.d(P.cV(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
j_:function(){var z,y
for(;z=$.aG,z!=null;){$.b2=null
y=z.b
$.aG=y
if(y==null)$.b1=null
z.a.$0()}},
kO:[function(){$.cG=!0
try{P.j_()}finally{$.b2=null
$.cG=!1
if($.aG!=null)$.$get$cw().$1(P.em())}},"$0","em",0,0,0],
ef:function(a){var z=new P.dP(H.c(a,{func:1,ret:-1}))
if($.aG==null){$.b1=z
$.aG=z
if(!$.cG)$.$get$cw().$1(P.em())}else{$.b1.b=z
$.b1=z}},
j3:function(a){var z,y,x
H.c(a,{func:1,ret:-1})
z=$.aG
if(z==null){P.ef(a)
$.b2=$.b1
return}y=new P.dP(a)
x=$.b2
if(x==null){y.b=z
$.b2=y
$.aG=y}else{y.b=x.b
x.b=y
$.b2=y
if(y.b==null)$.b1=y}},
eE:function(a){var z,y
z={func:1,ret:-1}
H.c(a,z)
y=$.q
if(C.d===y){P.al(null,null,C.d,a)
return}y.toString
P.al(null,null,y,H.c(y.aJ(a),z))},
ee:function(a){var z,y,x,w
H.c(a,{func:1})
if(a==null)return
try{a.$0()}catch(x){z=H.ag(x)
y=H.aN(x)
w=$.q
w.toString
P.b3(null,null,w,z,H.i(y,"$isL"))}},
kM:[function(a){},"$1","jb",4,0,9],
j0:[function(a,b){var z=$.q
z.toString
P.b3(null,null,z,a,b)},function(a){return P.j0(a,null)},"$2","$1","jc",4,2,6],
kN:[function(){},"$0","el",0,0,0],
hA:function(a,b){var z,y
z={func:1,ret:-1}
H.c(b,z)
y=$.q
if(y===C.d){y.toString
return P.cu(a,b)}return P.cu(a,H.c(y.aJ(b),z))},
b3:function(a,b,c,d,e){var z={}
z.a=d
P.j3(new P.j1(z,e))},
ec:function(a,b,c,d,e){var z,y
H.c(d,{func:1,ret:e})
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
ed:function(a,b,c,d,e,f,g){var z,y
H.c(d,{func:1,ret:f,args:[g]})
H.m(e,g)
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
j2:function(a,b,c,d,e,f,g,h,i){var z,y
H.c(d,{func:1,ret:g,args:[h,i]})
H.m(e,h)
H.m(f,i)
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
al:function(a,b,c,d){var z
H.c(d,{func:1,ret:-1})
z=C.d!==c
if(z){if(z){c.toString
z=!1}else z=!0
d=!z?c.aJ(d):c.cE(d,-1)}P.ef(d)},
hO:{"^":"h:5;a",
$1:[function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()},null,null,4,0,null,2,"call"]},
hN:{"^":"h:18;a,b,c",
$1:function(a){var z,y
this.a.a=H.c(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hP:{"^":"h:1;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
hQ:{"^":"h:1;a",
$0:[function(){this.a.$0()},null,null,0,0,null,"call"]},
iM:{"^":"a;a,0b,c",
bZ:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aI(new P.iO(this,b),0),a)
else throw H.d(P.O("`setTimeout()` not found."))},
n:{
iN:function(a,b){var z=new P.iM(!0,0)
z.bZ(a,b)
return z}}},
iO:{"^":"h:0;a,b",
$0:[function(){var z=this.a
z.b=null
z.c=1
this.b.$0()},null,null,0,0,null,"call"]},
hS:{"^":"dS;a,$ti"},
aD:{"^":"hV;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r,$ti",
aD:function(){},
aE:function(){}},
dR:{"^":"a;T:c<,$ti",
gab:function(){return this.c<4},
cd:function(){var z=this.r
if(z!=null)return z
z=new P.J(0,$.q,[null])
this.r=z
return z},
bc:function(a){var z,y
H.o(a,"$isaD",this.$ti,"$asaD")
z=a.fr
y=a.dy
if(z==null)this.d=y
else z.dy=y
if(y==null)this.e=z
else y.fr=z
a.fr=a
a.dy=a},
ct:function(a,b,c,d){var z,y,x,w,v,u
z=H.e(this,0)
H.c(a,{func:1,ret:-1,args:[z]})
H.c(c,{func:1,ret:-1})
if((this.c&4)!==0){if(c==null)c=P.el()
z=new P.i1($.q,0,c,this.$ti)
z.cp()
return z}y=$.q
x=d?1:0
w=this.$ti
v=new P.aD(0,this,y,x,w)
v.bY(a,b,c,d,z)
v.fr=v
v.dy=v
H.o(v,"$isaD",w,"$asaD")
v.dx=this.c&1
u=this.e
this.e=v
v.dy=null
v.fr=u
if(u==null)this.d=v
else u.dy=v
if(this.d===v)P.ee(this.a)
return v},
ck:function(a){var z=this.$ti
a=H.o(H.o(a,"$isa3",z,"$asa3"),"$isaD",z,"$asaD")
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.bc(a)
if((this.c&2)===0&&this.d==null)this.at()}return},
ar:["bP",function(){if((this.c&4)!==0)return new P.bL("Cannot add new events after calling close")
return new P.bL("Cannot add new events while doing an addStream")}],
k:[function(a,b){H.m(b,H.e(this,0))
if(!this.gab())throw H.d(this.ar())
this.ae(b)},"$1","gcC",5,0,9],
bi:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.gab())throw H.d(this.ar())
this.c|=4
z=this.cd()
this.X()
return z},
b7:function(a){var z,y,x,w
H.c(a,{func:1,ret:-1,args:[[P.S,H.e(this,0)]]})
z=this.c
if((z&2)!==0)throw H.d(P.br("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.dx
if((z&1)===x){y.dx=z|2
a.$1(y)
z=y.dx^=1
w=y.dy
if((z&4)!==0)this.bc(y)
y.dx&=4294967293
y=w}else y=y.dy}this.c&=4294967293
if(this.d==null)this.at()},
at:function(){if((this.c&4)!==0&&this.r.a===0)this.r.as(null)
P.ee(this.b)},
$isaE:1},
iJ:{"^":"dR;a,b,c,0d,0e,0f,0r,$ti",
gab:function(){return P.dR.prototype.gab.call(this)&&(this.c&2)===0},
ar:function(){if((this.c&2)!==0)return new P.bL("Cannot fire new event. Controller is already firing an event")
return this.bP()},
ae:function(a){var z
H.m(a,H.e(this,0))
z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.b0(a)
this.c&=4294967293
if(this.d==null)this.at()
return}this.b7(new P.iK(this,a))},
X:function(){if(this.d!=null)this.b7(new P.iL(this))
else this.r.as(null)}},
iK:{"^":"h;a,b",
$1:function(a){H.o(a,"$isS",[H.e(this.a,0)],"$asS").b0(this.b)},
$S:function(){return{func:1,ret:P.n,args:[[P.S,H.e(this.a,0)]]}}},
iL:{"^":"h;a",
$1:function(a){H.o(a,"$isS",[H.e(this.a,0)],"$asS").c5()},
$S:function(){return{func:1,ret:P.n,args:[[P.S,H.e(this.a,0)]]}}},
hU:{"^":"a;$ti",
cL:[function(a,b){var z
if(a==null)a=new P.cq()
z=this.a
if(z.a!==0)throw H.d(P.br("Future already completed"))
$.q.toString
z.c0(a,b)},function(a){return this.cL(a,null)},"cK","$2","$1","gcJ",4,2,6]},
hL:{"^":"hU;a,$ti",
cI:function(a,b){var z
H.bt(b,{futureOr:1,type:H.e(this,0)})
z=this.a
if(z.a!==0)throw H.d(P.br("Future already completed"))
z.as(b)}},
aa:{"^":"a;0a,b,c,d,e,$ti",
cY:function(a){if(this.c!==6)return!0
return this.b.b.aP(H.c(this.d,{func:1,ret:P.cI,args:[P.a]}),a.a,P.cI,P.a)},
cS:function(a){var z,y,x,w
z=this.e
y=P.a
x={futureOr:1,type:H.e(this,1)}
w=this.b.b
if(H.aK(z,{func:1,args:[P.a,P.L]}))return H.bt(w.d1(z,a.a,a.b,null,y,P.L),x)
else return H.bt(w.aP(H.c(z,{func:1,args:[P.a]}),a.a,null,y),x)}},
J:{"^":"a;T:a<,b,0co:c<,$ti",
bD:function(a,b,c){var z,y,x,w
z=H.e(this,0)
H.c(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.q
if(y!==C.d){y.toString
H.c(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.eb(b,y)}H.c(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.J(0,$.q,[c])
w=b==null?1:3
this.a7(new P.aa(x,w,a,b,[z,c]))
return x},
aR:function(a,b){return this.bD(a,null,b)},
d5:function(a){var z,y
H.c(a,{func:1})
z=$.q
y=new P.J(0,z,this.$ti)
if(z!==C.d){z.toString
H.c(a,{func:1,ret:null})}z=H.e(this,0)
this.a7(new P.aa(y,8,a,null,[z,z]))
return y},
cr:function(a){H.m(a,H.e(this,0))
this.a=4
this.c=a},
a7:function(a){var z,y
z=this.a
if(z<=1){a.a=H.i(this.c,"$isaa")
this.c=a}else{if(z===2){y=H.i(this.c,"$isJ")
z=y.a
if(z<4){y.a7(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.al(null,null,z,H.c(new P.i9(this,a),{func:1,ret:-1}))}},
ba:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.i(this.c,"$isaa")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.i(this.c,"$isJ")
y=u.a
if(y<4){u.ba(a)
return}this.a=y
this.c=u.c}z.a=this.ad(a)
y=this.b
y.toString
P.al(null,null,y,H.c(new P.ih(z,this),{func:1,ret:-1}))}},
ac:function(){var z=H.i(this.c,"$isaa")
this.c=null
return this.ad(z)},
ad:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
b5:function(a){var z,y,x,w
z=H.e(this,0)
H.bt(a,{futureOr:1,type:z})
y=this.$ti
x=H.am(a,"$isW",y,"$asW")
if(x){z=H.am(a,"$isJ",y,null)
if(z)P.bS(a,this)
else P.dV(a,this)}else{w=this.ac()
H.m(a,z)
this.a=4
this.c=a
P.aF(this,w)}},
a8:[function(a,b){var z
H.i(b,"$isL")
z=this.ac()
this.a=8
this.c=new P.R(a,b)
P.aF(this,z)},function(a){return this.a8(a,null)},"d8","$2","$1","gc8",4,2,6,3,1,4],
as:function(a){var z
H.bt(a,{futureOr:1,type:H.e(this,0)})
z=H.am(a,"$isW",this.$ti,"$asW")
if(z){this.c2(a)
return}this.a=1
z=this.b
z.toString
P.al(null,null,z,H.c(new P.ib(this,a),{func:1,ret:-1}))},
c2:function(a){var z=this.$ti
H.o(a,"$isW",z,"$asW")
z=H.am(a,"$isJ",z,null)
if(z){if(a.a===8){this.a=1
z=this.b
z.toString
P.al(null,null,z,H.c(new P.ig(this,a),{func:1,ret:-1}))}else P.bS(a,this)
return}P.dV(a,this)},
c0:function(a,b){var z
this.a=1
z=this.b
z.toString
P.al(null,null,z,H.c(new P.ia(this,a,b),{func:1,ret:-1}))},
$isW:1,
n:{
dV:function(a,b){var z,y,x
b.a=1
try{a.bD(new P.ic(b),new P.id(b),null)}catch(x){z=H.ag(x)
y=H.aN(x)
P.eE(new P.ie(b,z,y))}},
bS:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.i(a.c,"$isJ")
if(z>=4){y=b.ac()
b.a=a.a
b.c=a.c
P.aF(b,y)}else{y=H.i(b.c,"$isaa")
b.a=2
b.c=a
a.ba(y)}},
aF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.i(y.c,"$isR")
y=y.b
u=v.a
t=v.b
y.toString
P.b3(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.aF(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.i(r,"$isR")
y=y.b
u=r.a
t=r.b
y.toString
P.b3(null,null,y,u,t)
return}o=$.q
if(o==null?q!=null:o!==q)$.q=q
else o=null
y=b.c
if(y===8)new P.ik(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.ij(x,b,r).$0()}else if((y&2)!==0)new P.ii(z,x,b).$0()
if(o!=null)$.q=o
y=x.b
if(!!J.u(y).$isW){if(y.a>=4){n=H.i(t.c,"$isaa")
t.c=null
b=t.ad(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.bS(y,t)
return}}m=b.b
n=H.i(m.c,"$isaa")
m.c=null
b=m.ad(n)
y=x.a
u=x.b
if(!y){H.m(u,H.e(m,0))
m.a=4
m.c=u}else{H.i(u,"$isR")
m.a=8
m.c=u}z.a=m
y=m}}}},
i9:{"^":"h:1;a,b",
$0:function(){P.aF(this.a,this.b)}},
ih:{"^":"h:1;a,b",
$0:function(){P.aF(this.b,this.a.a)}},
ic:{"^":"h:5;a",
$1:function(a){var z=this.a
z.a=0
z.b5(a)}},
id:{"^":"h:26;a",
$2:[function(a,b){this.a.a8(a,H.i(b,"$isL"))},function(a){return this.$2(a,null)},"$1",null,null,null,4,2,null,3,1,4,"call"]},
ie:{"^":"h:1;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
ib:{"^":"h:1;a,b",
$0:function(){var z,y,x
z=this.a
y=H.m(this.b,H.e(z,0))
x=z.ac()
z.a=4
z.c=y
P.aF(z,x)}},
ig:{"^":"h:1;a,b",
$0:function(){P.bS(this.b,this.a)}},
ia:{"^":"h:1;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
ik:{"^":"h:0;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.bB(H.c(w.d,{func:1}),null)}catch(v){y=H.ag(v)
x=H.aN(v)
if(this.d){w=H.i(this.a.a.c,"$isR").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.i(this.a.a.c,"$isR")
else u.b=new P.R(y,x)
u.a=!0
return}if(!!J.u(z).$isW){if(z instanceof P.J&&z.gT()>=4){if(z.gT()===8){w=this.b
w.b=H.i(z.gco(),"$isR")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.aR(new P.il(t),null)
w.a=!1}}},
il:{"^":"h:11;a",
$1:function(a){return this.a}},
ij:{"^":"h:0;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
x.toString
w=H.e(x,0)
v=H.m(this.c,w)
u=H.e(x,1)
this.a.b=x.b.b.aP(H.c(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.ag(t)
y=H.aN(t)
x=this.a
x.b=new P.R(z,y)
x.a=!0}}},
ii:{"^":"h:0;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.i(this.a.a.c,"$isR")
w=this.c
if(w.cY(z)&&w.e!=null){v=this.b
v.b=w.cS(z)
v.a=!1}}catch(u){y=H.ag(u)
x=H.aN(u)
w=H.i(this.a.a.c,"$isR")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.R(y,x)
s.a=!0}}},
dP:{"^":"a;a,0b"},
a2:{"^":"a;$ti",
gj:function(a){var z,y
z={}
y=new P.J(0,$.q,[P.E])
z.a=0
this.Y(new P.hu(z,this),!0,new P.hv(z,y),y.gc8())
return y}},
hu:{"^":"h;a,b",
$1:[function(a){H.m(a,H.aM(this.b,"a2",0));++this.a.a},null,null,4,0,null,2,"call"],
$S:function(){return{func:1,ret:P.n,args:[H.aM(this.b,"a2",0)]}}},
hv:{"^":"h:1;a,b",
$0:[function(){this.b.b5(this.a.a)},null,null,0,0,null,"call"]},
a3:{"^":"a;$ti"},
dS:{"^":"iE;a,$ti",
gv:function(a){return(H.aA(this.a)^892482866)>>>0},
E:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.dS))return!1
return b.a===this.a}},
hV:{"^":"S;$ti",
b9:function(){return this.x.ck(this)},
aD:function(){H.o(this,"$isa3",[H.e(this.x,0)],"$asa3")},
aE:function(){H.o(this,"$isa3",[H.e(this.x,0)],"$asa3")}},
S:{"^":"a;T:e<,$ti",
bY:function(a,b,c,d,e){var z,y,x,w,v
z=H.aM(this,"S",0)
H.c(a,{func:1,ret:-1,args:[z]})
y=a==null?P.jb():a
x=this.d
x.toString
this.a=H.c(y,{func:1,ret:null,args:[z]})
w=b==null?P.jc():b
if(H.aK(w,{func:1,ret:-1,args:[P.a,P.L]}))this.b=x.bx(w,null,P.a,P.L)
else if(H.aK(w,{func:1,ret:-1,args:[P.a]}))this.b=H.c(w,{func:1,ret:null,args:[P.a]})
else H.K(P.ah("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
H.c(c,{func:1,ret:-1})
v=c==null?P.el():c
this.c=H.c(v,{func:1,ret:-1})},
ag:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.b3()
z=this.f
return z==null?$.$get$bC():z},
b3:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.b9()},
b0:function(a){var z,y
z=H.aM(this,"S",0)
H.m(a,z)
y=this.e
if((y&8)!==0)return
if(y<32)this.ae(a)
else this.b2(new P.i_(a,[z]))},
c5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.X()
else this.b2(C.x)},
aD:function(){},
aE:function(){},
b9:function(){return},
b2:function(a){var z,y
z=[H.aM(this,"S",0)]
y=H.o(this.r,"$iscB",z,"$ascB")
if(y==null){y=new P.cB(0,z)
this.r=y}z=y.c
if(z==null){y.c=a
y.b=a}else{z.sak(a)
y.c=a}z=this.e
if((z&64)===0){z=(z|64)>>>0
this.e=z
if(z<128)this.r.aT(this)}},
ae:function(a){var z,y
z=H.aM(this,"S",0)
H.m(a,z)
y=this.e
this.e=(y|32)>>>0
this.d.bC(this.a,a,z)
this.e=(this.e&4294967263)>>>0
this.c4((y&4)!==0)},
X:function(){var z,y
z=new P.hT(this)
this.b3()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.u(y).$isW&&y!==$.$get$bC())y.d5(z)
else z.$0()},
c4:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.aD()
else this.aE()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.aT(this)},
$isa3:1,
$isaE:1},
hT:{"^":"h:0;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.aO(z.c)
z.e=(z.e&4294967263)>>>0}},
iE:{"^":"a2;$ti",
Y:function(a,b,c,d){H.c(a,{func:1,ret:-1,args:[H.e(this,0)]})
H.c(c,{func:1,ret:-1})
return this.a.ct(H.c(a,{func:1,ret:-1,args:[H.e(this,0)]}),d,c,!0===b)}},
cz:{"^":"a;0ak:a@,$ti"},
i_:{"^":"cz;b,0a,$ti",
bv:function(a){H.o(a,"$isaE",this.$ti,"$asaE").ae(this.b)}},
i0:{"^":"a;",
bv:function(a){a.X()},
gak:function(){return},
sak:function(a){throw H.d(P.br("No events after a done."))},
$iscz:1,
$ascz:I.bW},
ix:{"^":"a;T:a<,$ti",
aT:function(a){var z
H.o(a,"$isaE",this.$ti,"$asaE")
z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eE(new P.iy(this,a))
this.a=1}},
iy:{"^":"h:1;a,b",
$0:function(){var z,y,x,w,v
z=this.a
y=z.a
z.a=0
if(y===3)return
x=H.o(this.b,"$isaE",[H.e(z,0)],"$asaE")
w=z.b
v=w.gak()
z.b=v
if(v==null)z.c=null
w.bv(x)}},
cB:{"^":"ix;0b,0c,a,$ti"},
i1:{"^":"a;a,T:b<,c,$ti",
cp:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.al(null,null,z,H.c(this.gcq(),{func:1,ret:-1}))
this.b=(this.b|2)>>>0},
ag:function(){return $.$get$bC()},
X:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
z=this.c
if(z!=null)this.a.aO(z)},"$0","gcq",0,0,0],
$isa3:1},
R:{"^":"a;a,b",
h:function(a){return H.b(this.a)},
$isF:1},
iR:{"^":"a;",$iskG:1},
j1:{"^":"h:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cq()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.h(0)
throw x}},
iz:{"^":"iR;",
aO:function(a){var z,y,x
H.c(a,{func:1,ret:-1})
try{if(C.d===$.q){a.$0()
return}P.ec(null,null,this,a,-1)}catch(x){z=H.ag(x)
y=H.aN(x)
P.b3(null,null,this,z,H.i(y,"$isL"))}},
bC:function(a,b,c){var z,y,x
H.c(a,{func:1,ret:-1,args:[c]})
H.m(b,c)
try{if(C.d===$.q){a.$1(b)
return}P.ed(null,null,this,a,b,-1,c)}catch(x){z=H.ag(x)
y=H.aN(x)
P.b3(null,null,this,z,H.i(y,"$isL"))}},
cE:function(a,b){return new P.iB(this,H.c(a,{func:1,ret:b}),b)},
aJ:function(a){return new P.iA(this,H.c(a,{func:1,ret:-1}))},
cF:function(a,b){return new P.iC(this,H.c(a,{func:1,ret:-1,args:[b]}),b)},
bB:function(a,b){H.c(a,{func:1,ret:b})
if($.q===C.d)return a.$0()
return P.ec(null,null,this,a,b)},
aP:function(a,b,c,d){H.c(a,{func:1,ret:c,args:[d]})
H.m(b,d)
if($.q===C.d)return a.$1(b)
return P.ed(null,null,this,a,b,c,d)},
d1:function(a,b,c,d,e,f){H.c(a,{func:1,ret:d,args:[e,f]})
H.m(b,e)
H.m(c,f)
if($.q===C.d)return a.$2(b,c)
return P.j2(null,null,this,a,b,c,d,e,f)},
bx:function(a,b,c,d){return H.c(a,{func:1,ret:b,args:[c,d]})}},
iB:{"^":"h;a,b,c",
$0:function(){return this.a.bB(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
iA:{"^":"h:0;a,b",
$0:function(){return this.a.aO(this.b)}},
iC:{"^":"h;a,b,c",
$1:[function(a){var z=this.c
return this.a.bC(this.b,H.m(a,z),z)},null,null,4,0,null,16,"call"],
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
a8:function(a,b,c){H.b8(a)
return H.o(H.jg(a,new H.bF(0,0,[b,c])),"$isdh",[b,c],"$asdh")},
bh:function(a,b){return new H.bF(0,0,[a,b])},
ck:function(a,b,c,d){return new P.ir(0,0,[d])},
ft:function(a,b,c){var z,y
if(P.cH(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b4()
C.a.k(y,a)
try{P.iZ(a,z)}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=P.dv(b,H.jv(z,"$isp"),", ")+c
return y.charCodeAt(0)==0?y:y},
cd:function(a,b,c){var z,y,x
if(P.cH(a))return b+"..."+c
z=new P.bM(b)
y=$.$get$b4()
C.a.k(y,a)
try{x=z
x.sG(P.dv(x.gG(),a,", "))}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=z
y.sG(y.gG()+c)
y=z.gG()
return y.charCodeAt(0)==0?y:y},
cH:function(a){var z,y
for(z=0;y=$.$get$b4(),z<y.length;++z)if(a===y[z])return!0
return!1},
iZ:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gA())
C.a.k(b,w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.j(b,-1)
v=b.pop()
if(0>=b.length)return H.j(b,-1)
u=b.pop()}else{t=z.gA();++x
if(!z.u()){if(x<=4){C.a.k(b,H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.j(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gA();++x
for(;z.u();t=s,s=r){r=z.gA();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2;--x}C.a.k(b,"...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.k(b,q)
C.a.k(b,u)
C.a.k(b,v)},
bI:function(a){var z,y,x
z={}
if(P.cH(a))return"{...}"
y=new P.bM("")
try{C.a.k($.$get$b4(),a)
x=y
x.sG(x.gG()+"{")
z.a=!0
J.eN(a,new P.fF(z,y))
z=y
z.sG(z.gG()+"}")}finally{z=$.$get$b4()
if(0>=z.length)return H.j(z,-1)
z.pop()}z=y.gG()
return z.charCodeAt(0)==0?z:z},
ir:{"^":"im;a,0b,0c,0d,0e,0f,r,$ti",
gD:function(a){var z=new P.is(this,this.r,this.$ti)
z.c=this.e
return z},
gj:function(a){return this.a},
cM:function(a,b){var z
if((b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return H.i(z[b],"$isbU")!=null}else return this.c9(b)},
c9:function(a){var z=this.d
if(z==null)return!1
return this.az(this.b8(z,a),a)>=0},
k:function(a,b){var z
H.m(b,H.e(this,0))
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null){z=P.dY()
this.c=z}return this.c7(z,b)}else return this.c6(b)},
c6:function(a){var z,y,x
H.m(a,H.e(this,0))
z=this.d
if(z==null){z=P.dY()
this.d=z}y=this.b6(a)
x=z[y]
if(x==null)z[y]=[this.aw(a)]
else{if(this.az(x,a)>=0)return!1
x.push(this.aw(a))}return!0},
Z:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bb(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bb(this.c,b)
else return this.cl(b)},
cl:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=this.b8(z,a)
x=this.az(y,a)
if(x<0)return!1
this.b4(y.splice(x,1)[0])
return!0},
ah:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.av()}},
c7:function(a,b){H.m(b,H.e(this,0))
if(H.i(a[b],"$isbU")!=null)return!1
a[b]=this.aw(b)
return!0},
bb:function(a,b){var z
if(a==null)return!1
z=H.i(a[b],"$isbU")
if(z==null)return!1
this.b4(z)
delete a[b]
return!0},
av:function(){this.r=this.r+1&67108863},
aw:function(a){var z,y
z=new P.bU(H.m(a,H.e(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.av()
return z},
b4:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.av()},
b6:function(a){return J.a6(a)&0x3ffffff},
b8:function(a,b){return a[this.b6(b)]},
az:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
n:{
dY:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bU:{"^":"a;a,0b,0c"},
is:{"^":"a;a,b,0c,0d,$ti",
gA:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.aU(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=H.m(z.a,H.e(this,0))
this.c=z.b
return!0}}}},
im:{"^":"hp;"},
fs:{"^":"p;"},
fE:{"^":"it;",$isA:1,$isp:1,$isl:1},
G:{"^":"a;$ti",
gD:function(a){return new H.cm(a,this.gj(a),0,[H.b7(this,a,"G",0)])},
J:function(a,b){return this.i(a,b)},
bk:function(a,b,c){var z=H.b7(this,a,"G",0)
return new H.co(a,H.c(b,{func:1,ret:c,args:[z]}),[z,c])},
cR:function(a,b,c,d){var z,y,x
H.m(b,d)
H.c(c,{func:1,ret:d,args:[d,H.b7(this,a,"G",0)]})
z=this.gj(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.i(a,x))
if(z!==this.gj(a))throw H.d(P.aU(a))}return y},
h:function(a){return P.cd(a,"[","]")}},
cn:{"^":"az;"},
fF:{"^":"h:12;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
az:{"^":"a;$ti",
C:function(a,b){var z,y
H.c(b,{func:1,ret:-1,args:[H.b7(this,a,"az",0),H.b7(this,a,"az",1)]})
for(z=J.aQ(this.gK(a));z.u();){y=z.gA()
b.$2(y,this.i(a,y))}},
gj:function(a){return J.aR(this.gK(a))},
h:function(a){return P.bI(a)},
$isN:1},
iP:{"^":"a;$ti"},
fG:{"^":"a;$ti",
C:function(a,b){this.a.C(0,H.c(b,{func:1,ret:-1,args:[H.e(this,0),H.e(this,1)]}))},
gj:function(a){return this.a.a},
h:function(a){return P.bI(this.a)},
$isN:1},
hF:{"^":"iQ;$ti"},
hq:{"^":"a;$ti",
h:function(a){return P.cd(this,"{","}")},
$isA:1,
$isp:1},
hp:{"^":"hq;"},
it:{"^":"a+G;"},
iQ:{"^":"fG+iP;$ti"}}],["","",,P,{"^":"",
bZ:function(a,b,c){var z
H.k(a)
z=H.hd(a,c)
if(z!=null)return z
throw H.d(P.cb(a,null,null))},
an:function(a,b){var z
H.k(a)
z=H.hc(a)
if(z!=null)return z
throw H.d(P.cb("Invalid double",a,null))},
ff:function(a){if(a instanceof H.h)return a.h(0)
return"Instance of '"+H.aZ(a)+"'"},
bH:function(a,b,c){var z,y
z=H.v([],[c])
for(y=J.aQ(a);y.u();)C.a.k(z,H.m(y.gA(),c))
return z},
hx:function(a,b,c){var z,y
z=P.E
a=H.o(H.o(a,"$isp",[z],"$asp"),"$isax",[z],"$asax")
y=a.length
c=P.hh(b,c,y,null,null,null)
return H.he(b>0||c<y?C.a.bI(a,b,c):a)},
hj:function(a,b,c){return new H.df(a,H.ce(a,!1,!0,!1))},
au:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aS(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ff(a)},
af:function(a){H.bx(H.b(a))},
fS:{"^":"h:13;a,b",
$2:function(a,b){var z,y,x
H.i(a,"$isaB")
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.b(a.a)
z.a=x+": "
z.a+=H.b(P.au(b))
y.a=", "}},
cI:{"^":"a;"},
"+bool":0,
at:{"^":"a;a,b",
gcZ:function(){return this.a},
bS:function(a,b){var z
if(Math.abs(this.a)<=864e13)z=!1
else z=!0
if(z)throw H.d(P.ah("DateTime is outside valid range: "+this.gcZ()))},
E:function(a,b){if(b==null)return!1
if(!(b instanceof P.at))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){var z=this.a
return(z^C.f.aG(z,30))&1073741823},
h:function(a){var z,y,x,w,v,u,t
z=P.f7(H.hb(this))
y=P.bb(H.ha(this))
x=P.bb(H.h9(this))
w=P.bb(H.bj(this))
v=P.bb(H.bl(this))
u=P.bb(H.bm(this))
t=P.f8(H.bk(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
n:{
f7:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
f8:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bb:function(a){if(a>=10)return""+a
return"0"+a}}},
b5:{"^":"M;"},
"+double":0,
bc:{"^":"a;a",
M:function(a,b){return C.f.M(this.a,H.i(b,"$isbc").a)},
E:function(a,b){if(b==null)return!1
if(!(b instanceof P.bc))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
h:function(a){var z,y,x,w,v
z=new P.fd()
y=this.a
if(y<0)return"-"+new P.bc(0-y).h(0)
x=z.$1(C.f.af(y,6e7)%60)
w=z.$1(C.f.af(y,1e6)%60)
v=new P.fc().$1(y%1e6)
return""+C.f.af(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)}},
fc:{"^":"h:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fd:{"^":"h:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
F:{"^":"a;"},
cq:{"^":"F;",
h:function(a){return"Throw of null."}},
as:{"^":"F;a,b,c,d",
gay:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gax:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gay()+y+x
if(!this.a)return w
v=this.gax()
u=P.au(this.b)
return w+v+": "+H.b(u)},
n:{
ah:function(a){return new P.as(!1,null,null,a)},
cV:function(a,b,c){return new P.as(!0,a,b,c)}}},
ds:{"^":"as;e,f,a,b,c,d",
gay:function(){return"RangeError"},
gax:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
n:{
bn:function(a,b,c){return new P.ds(null,null,!0,a,b,"Value not in range")},
Z:function(a,b,c,d,e){return new P.ds(b,c,!0,a,d,"Invalid value")},
hh:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.Z(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.Z(b,a,c,"end",f))
return b}return c}}},
fp:{"^":"as;e,j:f>,a,b,c,d",
gay:function(){return"RangeError"},
gax:function(){if(J.eH(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
n:{
bd:function(a,b,c,d,e){var z=H.y(e!=null?e:J.aR(b))
return new P.fp(b,z,!0,a,c,"Index out of range")}}},
fR:{"^":"F;a,b,c,d,e",
h:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=new P.bM("")
z.a=""
x=this.c
if(x!=null)for(w=x.length,v=0,u="",t="";v<w;++v,t=", "){s=x[v]
y.a=u+t
u=y.a+=H.b(P.au(s))
z.a=", "}x=this.d
if(x!=null)x.C(0,new P.fS(z,y))
r=this.b.a
q=P.au(this.a)
p=y.h(0)
x="NoSuchMethodError: method not found: '"+H.b(r)+"'\nReceiver: "+H.b(q)+"\nArguments: ["+p+"]"
return x},
n:{
dm:function(a,b,c,d,e){return new P.fR(a,b,c,d,e)}}},
hG:{"^":"F;a",
h:function(a){return"Unsupported operation: "+this.a},
n:{
O:function(a){return new P.hG(a)}}},
hD:{"^":"F;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
n:{
dM:function(a){return new P.hD(a)}}},
bL:{"^":"F;a",
h:function(a){return"Bad state: "+this.a},
n:{
br:function(a){return new P.bL(a)}}},
f1:{"^":"F;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.au(z))+"."},
n:{
aU:function(a){return new P.f1(a)}}},
du:{"^":"a;",
h:function(a){return"Stack Overflow"},
$isF:1},
f6:{"^":"F;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
i5:{"^":"a;a",
h:function(a){return"Exception: "+this.a}},
fi:{"^":"a;a,b,c",
h:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.e.a2(x,0,75)+"..."
return y+"\n"+x},
n:{
cb:function(a,b,c){return new P.fi(a,b,c)}}},
E:{"^":"M;"},
"+int":0,
p:{"^":"a;$ti",
gj:function(a){var z,y
z=this.gD(this)
for(y=0;z.u();)++y
return y},
J:function(a,b){var z,y,x
if(b<0)H.K(P.Z(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.u();){x=z.gA()
if(b===y)return x;++y}throw H.d(P.bd(b,this,"index",null,y))},
h:function(a){return P.ft(this,"(",")")}},
db:{"^":"a;$ti"},
l:{"^":"a;$ti",$isA:1,$isp:1},
"+List":0,
N:{"^":"a;$ti"},
n:{"^":"a;",
gv:function(a){return P.a.prototype.gv.call(this,this)},
h:function(a){return"null"}},
"+Null":0,
M:{"^":"a;"},
"+num":0,
a:{"^":";",
E:function(a,b){return this===b},
gv:function(a){return H.aA(this)},
h:["bO",function(a){return"Instance of '"+H.aZ(this)+"'"}],
aN:[function(a,b){H.i(b,"$iscc")
throw H.d(P.dm(this,b.gbl(),b.gbw(),b.gbn(),null))},null,"gbp",5,0,null,0],
gaQ:function(a){return new H.bO(H.es(this))},
toString:function(){return this.h(this)}},
dk:{"^":"a;"},
L:{"^":"a;"},
f:{"^":"a;",$isdp:1},
"+String":0,
bM:{"^":"a;G:a@",
gj:function(a){return this.a.length},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
n:{
dv:function(a,b,c){var z=J.aQ(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gA())
while(z.u())}else{a+=H.b(z.gA())
for(;z.u();)a=a+c+H.b(z.gA())}return a}}},
aB:{"^":"a;"}}],["","",,W,{"^":"",
je:function(){return document},
d6:[function(a){H.i(a,"$isV")
return"wheel"},null,null,4,0,null,5],
fl:function(a,b,c){return W.fn(a,null,null,b,null,null,null,c).aR(new W.fm(),P.f)},
fn:function(a,b,c,d,e,f,g,h){var z,y,x,w,v
z=W.aX
y=new P.J(0,$.q,[z])
x=new P.hL(y,[z])
w=new XMLHttpRequest()
C.B.d_(w,"GET",a,!0)
z=W.a9
v={func:1,ret:-1,args:[z]}
W.U(w,"load",H.c(new W.fo(w,x),v),!1,z)
W.U(w,"error",H.c(x.gcJ(),v),!1,z)
w.send()
return y},
fq:function(a){var z,y
y=document.createElement("input")
z=H.i(y,"$isY")
return z},
fU:function(a,b,c,d){var z=new Option(a,b,c,!1)
return z},
cs:function(a){var z=new Path2D()
return z},
bT:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dX:function(a,b,c,d){var z,y
z=W.bT(W.bT(W.bT(W.bT(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
iV:function(a){if(a==null)return
return W.cy(a)},
bs:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.cy(a)
if(!!J.u(z).$isV)return z
return}else return H.i(a,"$isV")},
ei:function(a,b){var z
H.c(a,{func:1,ret:-1,args:[b]})
z=$.q
if(z===C.d)return a
return z.cF(a,b)},
eD:function(a){return document.querySelector(a)},
X:{"^":"ai;","%":"HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jK:{"^":"X;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},
jL:{"^":"X;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},
c7:{"^":"x;",$isc7:1,"%":";Blob"},
ca:{"^":"X;0l:height=,0m:width=",
bG:function(a,b,c){return a.getContext(b)},
bF:function(a,b){return this.bG(a,b,null)},
$isca:1,
"%":"HTMLCanvasElement"},
cY:{"^":"x;",$iscY:1,"%":"CanvasRenderingContext2D"},
jM:{"^":"D;0j:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jN:{"^":"hW;0j:length=",
a_:function(a,b){var z=a.getPropertyValue(this.c1(a,b))
return z==null?"":z},
c1:function(a,b){var z,y
z=$.$get$d_()
y=z[b]
if(typeof y==="string")return y
y=this.cu(a,b)
z[b]=y
return y},
cu:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.f9()+b
if(z in a)return z
return b},
gl:function(a){return a.height},
gaj:function(a){return a.left},
gV:function(a){return a.top},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
f5:{"^":"a;",
gl:function(a){return this.a_(a,"height")},
gaj:function(a){return this.a_(a,"left")},
gV:function(a){return this.a_(a,"top")},
gm:function(a){return this.a_(a,"width")}},
jO:{"^":"D;",
gbr:function(a){return new W.b0(a,"mousedown",!1,[W.H])},
gbs:function(a){return new W.b0(a,"mousemove",!1,[W.H])},
gbt:function(a){return new W.b0(a,"mouseup",!1,[W.H])},
gbu:function(a){return new W.b0(a,H.k(W.d6(a)),!1,[W.aC])},
"%":"Document|HTMLDocument|XMLDocument"},
jP:{"^":"x;",
h:function(a){return String(a)},
"%":"DOMException"},
fa:{"^":"x;",
h:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
E:function(a,b){var z
if(b==null)return!1
z=H.am(b,"$isbo",[P.M],"$asbo")
if(!z)return!1
z=J.ad(b)
return a.left===z.gaj(b)&&a.top===z.gV(b)&&a.width===z.gm(b)&&a.height===z.gl(b)},
gv:function(a){return W.dX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.height},
gaj:function(a){return a.left},
gV:function(a){return a.top},
gm:function(a){return a.width},
gq:function(a){return a.x},
gt:function(a){return a.y},
$isbo:1,
$asbo:function(){return[P.M]},
"%":";DOMRectReadOnly"},
i8:{"^":"fE;a,$ti",
gj:function(a){return this.a.length},
i:function(a,b){var z=this.a
if(b<0||b>=z.length)return H.j(z,b)
return H.m(z[b],H.e(this,0))},
$isd5:1},
ai:{"^":"D;",
h:function(a){return a.localName},
gbr:function(a){return new W.bR(a,"mousedown",!1,[W.H])},
gbs:function(a){return new W.bR(a,"mousemove",!1,[W.H])},
gbt:function(a){return new W.bR(a,"mouseup",!1,[W.H])},
gbu:function(a){return new W.bR(a,H.k(W.d6(a)),!1,[W.aC])},
$isai:1,
"%":";Element"},
jQ:{"^":"X;0l:height=,0m:width=","%":"HTMLEmbedElement"},
C:{"^":"x;",
gal:function(a){return W.bs(a.target)},
$isC:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
V:{"^":"x;",
bf:["bJ",function(a,b,c,d){H.c(c,{func:1,args:[W.C]})
if(c!=null)this.c_(a,b,c,!1)}],
c_:function(a,b,c,d){return a.addEventListener(b,H.aI(H.c(c,{func:1,args:[W.C]}),1),!1)},
cm:function(a,b,c,d){return a.removeEventListener(b,H.aI(H.c(c,{func:1,args:[W.C]}),1),!1)},
$isV:1,
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest|MediaStream|ServiceWorker;EventTarget"},
av:{"^":"c7;",$isav:1,"%":"File"},
k8:{"^":"i7;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bd(b,a,null,null,null))
return a[b]},
J:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isA:1,
$asA:function(){return[W.av]},
$isa7:1,
$asa7:function(){return[W.av]},
$asG:function(){return[W.av]},
$isp:1,
$asp:function(){return[W.av]},
$isl:1,
$asl:function(){return[W.av]},
$asaw:function(){return[W.av]},
"%":"FileList"},
fg:{"^":"V;",
gbA:function(a){var z,y
z=a.result
if(!!J.u(z).$iseV){y=new Uint8Array(z,0)
return y}return z},
"%":"FileReader"},
kb:{"^":"X;0j:length=","%":"HTMLFormElement"},
aX:{"^":"fk;",
da:function(a,b,c,d,e,f){return a.open(b,c)},
d_:function(a,b,c,d){return a.open(b,c,d)},
$isaX:1,
"%":"XMLHttpRequest"},
fm:{"^":"h:15;",
$1:function(a){return H.i(a,"$isaX").responseText}},
fo:{"^":"h:16;a,b",
$1:function(a){var z,y,x,w,v
H.i(a,"$isa9")
z=this.a
y=z.status
if(typeof y!=="number")return y.d7()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.b
if(y)v.cI(0,z)
else v.cK(a)}},
fk:{"^":"V;","%":";XMLHttpRequestEventTarget"},
ke:{"^":"X;0l:height=,0m:width=","%":"HTMLIFrameElement"},
da:{"^":"x;0l:height=,0m:width=",$isda:1,"%":"ImageData"},
kf:{"^":"X;0l:height=,0m:width=","%":"HTMLImageElement"},
Y:{"^":"X;0l:height=,0m:width=",$isY:1,"%":"HTMLInputElement"},
bg:{"^":"dL;",$isbg:1,"%":"KeyboardEvent"},
kj:{"^":"x;",
h:function(a){return String(a)},
"%":"Location"},
fI:{"^":"X;","%":"HTMLAudioElement;HTMLMediaElement"},
kl:{"^":"V;",
bf:function(a,b,c,d){H.c(c,{func:1,args:[W.C]})
if(b==="message")a.start()
this.bJ(a,b,c,!1)},
"%":"MessagePort"},
H:{"^":"dL;",
gbq:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.aY(a.offsetX,a.offsetY,[P.M])
else{z=a.target
if(!J.u(W.bs(z)).$isai)throw H.d(P.O("offsetX is only supported on elements"))
y=H.i(W.bs(z),"$isai")
z=a.clientX
x=a.clientY
w=[P.M]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.o(new P.aY(u,v,w),"$isaY",w,"$asaY")
if(typeof z!=="number")return z.ao()
if(typeof x!=="number")return x.ao()
return new P.aY(C.c.aS(z-u),C.c.aS(x-v),w)}},
$isH:1,
"%":";DragEvent|MouseEvent"},
D:{"^":"V;",
h:function(a){var z=a.nodeValue
return z==null?this.bL(a):z},
$isD:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
ku:{"^":"iw;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bd(b,a,null,null,null))
return a[b]},
J:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isA:1,
$asA:function(){return[W.D]},
$isa7:1,
$asa7:function(){return[W.D]},
$asG:function(){return[W.D]},
$isp:1,
$asp:function(){return[W.D]},
$isl:1,
$asl:function(){return[W.D]},
$asaw:function(){return[W.D]},
"%":"NodeList|RadioNodeList"},
kv:{"^":"X;0l:height=,0m:width=","%":"HTMLObjectElement"},
h0:{"^":"x;",$ish0:1,"%":"Path2D"},
kx:{"^":"H;0l:height=,0m:width=","%":"PointerEvent"},
a9:{"^":"C;",$isa9:1,"%":"ProgressEvent|ResourceProgressEvent"},
bq:{"^":"X;0j:length=",$isbq:1,"%":"HTMLSelectElement"},
kA:{"^":"iD;",
i:function(a,b){return a.getItem(H.k(b))},
C:function(a,b){var z,y
H.c(b,{func:1,ret:-1,args:[P.f,P.f]})
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gK:function(a){var z=H.v([],[P.f])
this.C(a,new W.ht(z))
return z},
gj:function(a){return a.length},
$asaz:function(){return[P.f,P.f]},
$isN:1,
$asN:function(){return[P.f,P.f]},
"%":"Storage"},
ht:{"^":"h:17;a",
$2:function(a,b){return C.a.k(this.a,a)}},
dL:{"^":"C;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
kF:{"^":"fI;0l:height=,0m:width=","%":"HTMLVideoElement"},
aC:{"^":"H;",
gcP:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(P.O("deltaY is not supported"))},
$isaC:1,
"%":"WheelEvent"},
cv:{"^":"V;",
bz:function(a,b){H.c(b,{func:1,ret:-1,args:[P.M]})
this.ce(a)
return this.cn(a,W.ei(b,P.M))},
cn:function(a,b){return a.requestAnimationFrame(H.aI(H.c(b,{func:1,ret:-1,args:[P.M]}),1))},
ce:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gV:function(a){return W.iV(a.top)},
$iscv:1,
$isdN:1,
"%":"DOMWindow|Window"},
dO:{"^":"V;",$isdO:1,"%":"DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
dQ:{"^":"D;",$isdQ:1,"%":"Attr"},
kK:{"^":"fa;",
h:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
E:function(a,b){var z
if(b==null)return!1
z=H.am(b,"$isbo",[P.M],"$asbo")
if(!z)return!1
z=J.ad(b)
return a.left===z.gaj(b)&&a.top===z.gV(b)&&a.width===z.gm(b)&&a.height===z.gl(b)},
gv:function(a){return W.dX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.height},
gm:function(a){return a.width},
gq:function(a){return a.x},
gt:function(a){return a.y},
"%":"ClientRect|DOMRect"},
kL:{"^":"iT;",
gj:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bd(b,a,null,null,null))
return a[b]},
J:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isA:1,
$asA:function(){return[W.D]},
$isa7:1,
$asa7:function(){return[W.D]},
$asG:function(){return[W.D]},
$isp:1,
$asp:function(){return[W.D]},
$isl:1,
$asl:function(){return[W.D]},
$asaw:function(){return[W.D]},
"%":"MozNamedAttrMap|NamedNodeMap"},
hR:{"^":"cn;",
C:function(a,b){var z,y,x,w,v
H.c(b,{func:1,ret:-1,args:[P.f,P.f]})
for(z=this.gK(this),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.ar)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gK:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.v([],[P.f])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.j(z,w)
v=H.i(z[w],"$isdQ")
if(v.namespaceURI==null)C.a.k(y,v.name)}return y},
$asaz:function(){return[P.f,P.f]},
$asN:function(){return[P.f,P.f]}},
dU:{"^":"hR;a",
i:function(a,b){return this.a.getAttribute(H.k(b))},
gj:function(a){return this.gK(this).length}},
dT:{"^":"cn;a",
i:function(a,b){return this.a.a.getAttribute("data-"+this.aH(H.k(b)))},
C:function(a,b){this.a.C(0,new W.hY(this,H.c(b,{func:1,ret:-1,args:[P.f,P.f]})))},
gK:function(a){var z=H.v([],[P.f])
this.a.C(0,new W.hZ(this,z))
return z},
gj:function(a){return this.gK(this).length},
cw:function(a,b){var z,y,x
z=H.v(a.split("-"),[P.f])
for(y=1;y<z.length;++y){x=z[y]
if(x.length>0)C.a.B(z,y,x[0].toUpperCase()+J.cU(x,1))}return C.a.aM(z,"")},
bd:function(a){return this.cw(a,!1)},
aH:function(a){var z,y,x,w,v
for(z=a.length,y=0,x="";y<z;++y){w=a[y]
v=w.toLowerCase()
x=(w!==v&&y>0?x+"-":x)+v}return x.charCodeAt(0)==0?x:x},
$asaz:function(){return[P.f,P.f]},
$asN:function(){return[P.f,P.f]}},
hY:{"^":"h:3;a,b",
$2:function(a,b){if(J.aL(a).an(a,"data-"))this.b.$2(this.a.bd(C.e.W(a,5)),b)}},
hZ:{"^":"h:3;a,b",
$2:function(a,b){if(J.aL(a).an(a,"data-"))C.a.k(this.b,this.a.bd(C.e.W(a,5)))}},
b0:{"^":"a2;a,b,c,$ti",
Y:function(a,b,c,d){var z=H.e(this,0)
H.c(a,{func:1,ret:-1,args:[z]})
H.c(c,{func:1,ret:-1})
return W.U(this.a,this.b,a,!1,z)}},
bR:{"^":"b0;a,b,c,$ti"},
i2:{"^":"a2;a,b,c,$ti",
Y:function(a,b,c,d){var z,y,x,w
z=H.e(this,0)
H.c(a,{func:1,ret:-1,args:[z]})
H.c(c,{func:1,ret:-1})
y=this.$ti
x=new W.iF(new H.bF(0,0,[[P.a2,z],[P.a3,z]]),y)
x.a=new P.iJ(null,x.gcH(x),0,y)
for(z=this.a,z=new H.cm(z,z.gj(z),0,[H.e(z,0)]),w=this.c;z.u();)x.k(0,new W.b0(z.d,w,!1,y))
z=x.a
z.toString
return new P.hS(z,[H.e(z,0)]).Y(a,b,c,d)},
cX:function(a){return this.Y(a,null,null,null)}},
i3:{"^":"a3;a,b,c,d,e,$ti",
ag:function(){if(this.b==null)return
this.cB()
this.b=null
this.d=null
return},
cz:function(){var z=this.d
if(z!=null&&this.a<=0)J.eK(this.b,this.c,z,!1)},
cB:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
H.c(z,{func:1,args:[W.C]})
if(y)J.eJ(x,this.c,z,!1)}},
n:{
U:function(a,b,c,d,e){var z=c==null?null:W.ei(new W.i4(c),W.C)
z=new W.i3(0,a,b,z,!1,[e])
z.cz()
return z}}},
i4:{"^":"h:7;a",
$1:[function(a){return this.a.$1(H.i(a,"$isC"))},null,null,4,0,null,5,"call"]},
iF:{"^":"a;0a,b,$ti",
k:function(a,b){var z,y,x
H.o(b,"$isa2",this.$ti,"$asa2")
z=this.b
if(z.I(0,b))return
y=this.a
x=H.e(b,0)
y=H.c(y.gcC(y),{func:1,ret:-1,args:[x]})
H.c(new W.iG(this,b),{func:1,ret:-1})
z.B(0,b,W.U(b.a,b.b,y,!1,x))},
bi:[function(a){var z,y
for(z=this.b,y=z.gd4(z),y=new H.dj(J.aQ(y.a),y.b,[H.e(y,0),H.e(y,1)]);y.u();)y.a.ag()
z.ah(0)
this.a.bi(0)},"$0","gcH",1,0,0]},
iG:{"^":"h:0;a,b",
$0:function(){var z,y
z=this.a
y=z.b.Z(0,H.o(this.b,"$isa2",[H.e(z,0)],"$asa2"))
if(y!=null)y.ag()
return}},
aw:{"^":"a;$ti",
gD:function(a){return new W.fh(a,this.gj(a),-1,[H.b7(this,a,"aw",0)])}},
fh:{"^":"a;a,b,c,0d,$ti",
u:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.eI(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gA:function(){return this.d}},
hX:{"^":"a;a",
gV:function(a){return W.cy(this.a.top)},
$isV:1,
$isdN:1,
n:{
cy:function(a){if(a===window)return H.i(a,"$isdN")
else return new W.hX(a)}}},
hW:{"^":"x+f5;"},
i6:{"^":"x+G;"},
i7:{"^":"i6+aw;"},
iv:{"^":"x+G;"},
iw:{"^":"iv+aw;"},
iD:{"^":"x+az;"},
iS:{"^":"x+G;"},
iT:{"^":"iS+aw;"}}],["","",,P,{"^":"",
d4:function(){var z=$.d3
if(z==null){z=J.c5(window.navigator.userAgent,"Opera",0)
$.d3=z}return z},
f9:function(){var z,y
z=$.d0
if(z!=null)return z
y=$.d1
if(y==null){y=J.c5(window.navigator.userAgent,"Firefox",0)
$.d1=y}if(y)z="-moz-"
else{y=$.d2
if(y==null){y=!P.d4()&&J.c5(window.navigator.userAgent,"Trident/",0)
$.d2=y}if(y)z="-ms-"
else z=P.d4()?"-o-":"-webkit-"}$.d0=z
return z}}],["","",,P,{"^":"",dg:{"^":"x;",$isdg:1,"%":"IDBKeyRange"},kE:{"^":"C;0al:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
iU:[function(a,b,c,d){var z,y,x
H.jd(b)
H.b8(d)
if(b){z=[c]
C.a.be(z,d)
d=z}y=P.bH(J.eP(d,P.jt(),null),!0,null)
H.i(a,"$isaV")
x=H.h7(a,y)
return P.e5(x)},null,null,16,0,null,17,18,19,20],
cD:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.ag(z)}return!1},
e8:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
e5:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.u(a)
if(!!z.$isaj)return a.a
if(H.ev(a))return a
if(!!z.$isdK)return a
if(!!z.$isat)return H.I(a)
if(!!z.$isaV)return P.e7(a,"$dart_jsFunction",new P.iW())
return P.e7(a,"_$dart_jsObject",new P.iX($.$get$cC()))},"$1","ju",4,0,2,6],
e7:function(a,b,c){var z
H.c(c,{func:1,args:[,]})
z=P.e8(a,b)
if(z==null){z=c.$1(a)
P.cD(a,b,z)}return z},
e4:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&H.ev(a))return a
else if(a instanceof Object&&!!J.u(a).$isdK)return a
else if(a instanceof Date){z=H.y(a.getTime())
y=new P.at(z,!1)
y.bS(z,!1)
return y}else if(a.constructor===$.$get$cC())return a.o
else return P.eh(a)},"$1","jt",4,0,31,6],
eh:function(a){if(typeof a=="function")return P.cE(a,$.$get$bA(),new P.j4())
if(a instanceof Array)return P.cE(a,$.$get$cx(),new P.j5())
return P.cE(a,$.$get$cx(),new P.j6())},
cE:function(a,b,c){var z
H.c(c,{func:1,args:[,]})
z=P.e8(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.cD(a,b,z)}return z},
aj:{"^":"a;a",
i:["bN",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.d(P.ah("property is not a String or num"))
return P.e4(this.a[b])}],
gv:function(a){return 0},
E:function(a,b){if(b==null)return!1
return b instanceof P.aj&&this.a===b.a},
h:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.ag(y)
z=this.bO(this)
return z}},
cG:function(a,b){var z,y
if(typeof a!=="string"&&!0)throw H.d(P.ah("method is not a String or num"))
z=this.a
if(b==null)y=null
else{y=H.e(b,0)
y=P.bH(new H.co(b,H.c(P.ju(),{func:1,ret:null,args:[y]}),[y,null]),!0,null)}return P.e4(z[a].apply(z,y))},
bh:function(a){return this.cG(a,null)}},
ci:{"^":"aj;a"},
ch:{"^":"iq;a,$ti",
c3:function(a){var z=a<0||a>=this.gj(this)
if(z)throw H.d(P.Z(a,0,this.gj(this),null,null))},
i:function(a,b){if(typeof b==="number"&&b===C.f.aS(b))this.c3(H.y(b))
return H.m(this.bN(0,b),H.e(this,0))},
gj:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.d(P.br("Bad JsArray length"))},
$isA:1,
$isp:1,
$isl:1},
iW:{"^":"h:2;",
$1:function(a){var z
H.i(a,"$isaV")
z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.iU,a,!1)
P.cD(z,$.$get$bA(),a)
return z}},
iX:{"^":"h:2;a",
$1:function(a){return new this.a(a)}},
j4:{"^":"h:20;",
$1:function(a){return new P.ci(a)}},
j5:{"^":"h:33;",
$1:function(a){return new P.ch(a,[null])}},
j6:{"^":"h:22;",
$1:function(a){return new P.aj(a)}},
iq:{"^":"aj+G;"}}],["","",,P,{"^":"",
hg:function(a){return C.n},
dW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ip:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
io:{"^":"a;",
bo:function(){return Math.random()},
$isky:1},
aY:{"^":"a;q:a>,t:b>,$ti",
h:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
E:function(a,b){var z,y,x
if(b==null)return!1
z=H.am(b,"$isaY",[P.M],null)
if(!z)return!1
z=this.a
y=J.ad(b)
x=y.gq(b)
if(z==null?x==null:z===x){z=this.b
y=y.gt(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){var z,y
z=J.a6(this.a)
y=J.a6(this.b)
return P.ip(P.dW(P.dW(0,z),y))}}}],["","",,P,{"^":"",jR:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEBlendElement"},jS:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEColorMatrixElement"},jT:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEComponentTransferElement"},jU:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFECompositeElement"},jV:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEConvolveMatrixElement"},jW:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEDiffuseLightingElement"},jX:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEDisplacementMapElement"},jY:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEFloodElement"},jZ:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEGaussianBlurElement"},k_:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEImageElement"},k0:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEMergeElement"},k1:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEMorphologyElement"},k2:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFEOffsetElement"},k3:{"^":"z;0q:x=,0t:y=","%":"SVGFEPointLightElement"},k4:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFESpecularLightingElement"},k5:{"^":"z;0q:x=,0t:y=","%":"SVGFESpotLightElement"},k6:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFETileElement"},k7:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFETurbulenceElement"},k9:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGFilterElement"},ka:{"^":"aW;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGForeignObjectElement"},fj:{"^":"aW;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aW:{"^":"z;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kg:{"^":"aW;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGImageElement"},kk:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGMaskElement"},kw:{"^":"z;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGPatternElement"},kz:{"^":"fj;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGRectElement"},z:{"^":"ai;","%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},kB:{"^":"aW;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGSVGElement"},hy:{"^":"aW;","%":"SVGTextPathElement;SVGTextContentElement"},kC:{"^":"hy;0q:x=,0t:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},kD:{"^":"aW;0l:height=,0m:width=,0q:x=,0t:y=","%":"SVGUseElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,A,{"^":"",
jj:function(a){var z,y
z=C.k.cR(H.o(a,"$isp",[P.a],"$asp"),0,new A.jk(),P.E)
if(typeof z!=="number")return H.P(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
jk:{"^":"h:23;",
$2:function(a,b){var z,y
H.y(a)
z=J.a6(b)
if(typeof a!=="number")return a.w()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",w:{"^":"a;a",
P:function(a,b){var z=this.a
C.k.B(z,0,a)
C.k.B(z,1,b)},
a1:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
h:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+"]"},
E:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.w){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gv:function(a){return A.jj(this.a)},
ao:function(a,b){var z=new T.w(new Float32Array(2))
z.a1(this)
z.aW(b)
return z},
w:function(a,b){var z=new T.w(new Float32Array(2))
z.a1(this)
z.k(0,b)
return z},
N:function(a,b){var z=new T.w(new Float32Array(2))
z.a1(this)
z.a0(0,b)
return z},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
k:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
aW:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
bm:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]*z[0]
y[1]=y[1]*z[1]},
a0:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
gq:function(a){return this.a[0]},
gt:function(a){return this.a[1]},
n:{
hI:function(a,b){var z=new T.w(new Float32Array(2))
z.P(a,b)
return z}}}}],["","",,G,{"^":"",
fW:function(){var z,y,x
z=H.i(document.querySelector("#patch"),"$isbq")
for(y=$.$get$ba(),y=new H.bG(y,[H.e(y,0)]),y=y.gD(y);y.u();){x=y.d
z.appendChild(W.fU(x,x,null,!1))}y=P.f
x=new S.fV("whorld",P.bh(y,S.bi),P.bh(y,[P.N,P.f,P.f]))
x.ap("hideAbout","B","false",!0)
x.R("randomSeed","I","0")
x.ap("logLevel","I","0",!0)
x.R("patch","O","Default")
x.R("zoom","D","1.0")
x.R("zoomCenterX","D","0.0")
x.R("zoomCenterY","D","0.0")
x.R("maxRings","I","50")
$.B=x
x.bQ("Standard",P.bh(y,y))
$.bv=$.B.a4("logLevel")
$.B.bV()
y=$.B
y.aq("hideAbout","B")
if(y.b.i(0,"hideAbout").a3()==="true")P.hA(C.A,new G.fX())},
fX:{"^":"h:0;",
$0:function(){document.querySelector(".about").hidden=!0
return}}}],["","",,N,{"^":"",
T:function(a){if(a>=10)return""+a
return"0"+a},
bQ:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
e2:function(a){var z=new P.at(Date.now(),!1)
return a+":"+N.T(H.bj(z))+":"+N.T(H.bl(z))+":"+N.T(H.bm(z))+"."+N.bQ(H.bk(z))+": "},
ay:function(a){var z=$.bv
if(typeof z!=="number")return z.am()
if(z>0)P.af(N.e2("I")+a)}}],["","",,S,{"^":"",
h1:function(){var z,y,x,w,v,u,t
z=C.a.aM(H.v(["art","muth","org"],[P.f]),".")
y=window.location.host
x=window.location.pathname
w=W.fl(C.e.w(C.e.w("http://"+z+"/",y)+"/",x),null,null).aR(new S.h2(),-1)
v=new S.h3()
u=H.e(w,0)
t=$.q
if(t!==C.d)v=P.eb(v,t)
w.a7(new P.aa(new P.J(0,t,[u]),2,null,v,[u,u]))},
h2:{"^":"h:24;",
$1:function(a){H.k(a)
return P.af("")}},
h3:{"^":"h:5;",
$1:[function(a){P.af(J.aS(a))},null,null,4,0,null,1,"call"]},
bi:{"^":"a;a,b,c,d",
a3:function(){var z,y
z=this.d
if(z==="B")return J.aS(H.a0(this.a,"$isY").checked)
else{y=this.a
if(z==="O")return H.a0(y,"$isbq").value
else return H.a0(y,"$isY").value}},
a6:function(a){var z,y
z=this.d
if(z==="B")H.a0(this.a,"$isY").checked=a==="true"
else{y=this.a
if(z==="O")H.a0(y,"$isbq").value=a
else H.a0(y,"$isY").value=a}},
a5:function(a){var z=this.c
N.ay("Saving "+z+" "+H.b(a))
window.localStorage.setItem(z,a)}},
fV:{"^":"a;a,b,c",
ap:function(a,b,c,d){var z,y,x,w
z="#"+a
y=document.querySelector(z)
if(y==null&&d){y=W.fq(null)
y.type=$.$get$e9().i(0,b)}if(y==null)throw H.d("Missing widget for options "+a)
z=this.a+":"+a
x=new S.bi(y,c,z,b)
if(window.localStorage.getItem(z)==null)x.a5(c)
w=window.localStorage.getItem(z)
N.ay("Loading "+z+" -> ["+H.b(w)+"]")
x.a6(w)
this.b.B(0,a,x)},
R:function(a,b,c){return this.ap(a,b,c,!1)},
aq:function(a,b){var z=this.b
if(!z.I(0,a))throw H.d("unknown options "+a)
if(z.i(0,a).d!==b)throw H.d("bad type "+b+" for options "+a)},
a4:function(a){var z,y
this.aq(a,"I")
z=this.b
y=H.a0(z.i(0,a).a,"$isY").valueAsNumber
if(typeof y!=="number")return y.N()
if(isNaN(y))return P.bZ(z.i(0,a).b,null,null)
return C.c.cQ(y)},
S:function(a){var z,y
this.aq(a,"D")
z=this.b
y=H.a0(z.i(0,a).a,"$isY").valueAsNumber
if(typeof y!=="number")return y.N()
if(isNaN(y))return P.an(z.i(0,a).b,null)
return y},
bW:function(){this.b.C(0,new S.fZ())},
aY:function(a){var z
H.k(a)
z=this.c
if(!z.I(0,a)){z="Unknown Setting ["+H.b(a)+"]"
P.af(N.e2("E")+z)
return}N.ay("Setting "+H.b(a))
z.i(0,a).C(0,new S.h_(this))
window.location.hash=C.e.w("#",a)},
O:function(a,b){var z
H.k(a)
H.k(b)
z=this.b
z.i(0,a).a5(b)
z.i(0,a).a6(b)},
bQ:function(a,b){var z=P.f
H.o(b,"$isN",[z,z],"$asN")
b.C(0,new S.fY(this,a))
this.c.B(0,a,b)},
bV:function(){var z,y,x,w,v,u,t,s,r,q,p,o
S.h1()
z=window.location.hash
if(z==="")return
y=J.cU(z,1).split("&")
for(x=y.length,w=this.b,v=0;v<x;++v){u=J.eR(y[v],"=")
t=u.length
if(t===1){if(0>=t)return H.j(u,0)
t="SetSetting "+H.b(u[0])
s=$.bv
if(typeof s!=="number")return s.am()
if(s>0){r=new P.at(Date.now(),!1)
H.bx("I:"+N.T(H.bj(r))+":"+N.T(H.bl(r))+":"+N.T(H.bm(r))+"."+N.bQ(H.bk(r))+": "+t)}if(0>=u.length)return H.j(u,0)
this.aY(u[0])}else if(t===2){if(0>=t)return H.j(u,0)
t="SetSetting "+H.b(u[0])+"="
if(1>=u.length)return H.j(u,1)
t+=H.b(u[1])
s=$.bv
if(typeof s!=="number")return s.am()
if(s>0){r=new P.at(Date.now(),!1)
H.bx("I:"+N.T(H.bj(r))+":"+N.T(H.bl(r))+":"+N.T(H.bm(r))+"."+N.bQ(H.bk(r))+": "+t)}t=u.length
if(0>=t)return H.j(u,0)
s=u[0]
if(1>=t)return H.j(u,1)
t=u[1]
H.k(s)
H.k(t)
q=w.i(0,s).c
p="Saving "+q+" "+H.b(t)
o=$.bv
if(typeof o!=="number")return o.am()
if(o>0){r=new P.at(Date.now(),!1)
H.bx("I:"+N.T(H.bj(r))+":"+N.T(H.bl(r))+":"+N.T(H.bm(r))+"."+N.bQ(H.bk(r))+": "+p)}window.localStorage.setItem(q,t)
w.i(0,s).a6(t)}}}},
fZ:{"^":"h:25;",
$2:function(a,b){H.k(a)
H.i(b,"$isbi")
b.a5(b.a3())}},
h_:{"^":"h:3;a",
$2:function(a,b){var z
H.k(a)
H.k(b)
N.ay("["+H.b(a)+"] "+H.b(a)+" -> "+H.b(b))
z=this.a.b
z.i(0,a).a5(b)
z.i(0,a).a6(b)}},
fY:{"^":"h:3;a,b",
$2:function(a,b){H.k(a)
H.k(b)
if(!this.a.b.I(0,a))throw H.d("missing setting "+H.b(a)+" in "+this.b)}}}],["","",,A,{"^":"",
t:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.f
y=P.bh(z,null)
x=H.v(a.split("\n"),[z])
w=C.a.by(x,0)
if(J.c6(w)!=="WHORLD1")P.af("#@@ bad header: ["+w+"]")
for(z=x.length,v=0;v<x.length;x.length===z||(0,H.ar)(x),++v){u=J.c6(x[v])
if(u.length===0)continue
t=C.e.aU(u,P.hj("\\s+",!0,!1))
s=t.length
if(s!==0){if(0>=s)return H.j(t,0)
s=J.eS(t[0],"#")}else s=!0
if(s)continue
r=C.a.by(t,0)
s=$.$get$ez()
if(!s.I(0,r)){H.bx("@@ bad param: ["+H.b(r)+"]")
continue}switch(s.i(0,r)){case C.j:if(0>=t.length)return H.j(t,0)
y.B(0,r,1===P.bZ(t[0],null,null))
break
case C.m:if(0>=t.length)return H.j(t,0)
y.B(0,r,P.bZ(t[0],null,null))
break
case C.h:if(0>=t.length)return H.j(t,0)
y.B(0,r,P.an(t[0],null))
break
case C.b:if(t.length===4)C.a.k(t,"0.5")
if(0>=t.length)return H.j(t,0)
s=P.an(t[0],null)
if(1>=t.length)return H.j(t,1)
q=P.bZ(t[1],null,null)
if(2>=t.length)return H.j(t,2)
p=P.an(t[2],null)
if(3>=t.length)return H.j(t,3)
o=P.an(t[3],null)
if(4>=t.length)return H.j(t,4)
y.B(0,r,new A.bJ(s,q,p,o,P.an(t[4],null),1,0,0))
break
case C.v:if(0>=t.length)return H.j(t,0)
s=P.an(t[0],null)
if(1>=t.length)return H.j(t,1)
q=P.an(t[1],null)
p=new Float32Array(2)
C.k.B(p,0,s)
C.k.B(p,1,q)
y.B(0,r,new T.w(p))
break}}return y},
bJ:{"^":"a;a,b,c,d,e,f,r,x",
bT:function(a,b){var z,y,x,w
z=this.d
if(typeof z!=="number")return H.P(z)
y=a*z/50
switch(this.b){case 0:x=C.i.F(y*2+0.5,2)
z=x*2
return x<1?z-1:3-z
case 1:return Math.sin(C.i.F(y,1)*3.141592653589793*2)
case 2:return C.i.F(y,1)*2-1
case 3:return 1-C.i.F(y,1)*2
case 4:return C.i.F(y,1)<0.5?1:-1
case 5:z=C.i.F(y,1)
w=this.e
if(typeof w!=="number")return H.P(w)
return z<w?1:-1
case 6:x=C.i.F(y,1)
if(x<0.5&&this.f>0.5)this.r=b.bo()
this.f=x
return this.r
case 7:x=C.i.F(y,1)
if(x<0.5&&this.f>0.5){this.x=this.r
this.r=b.bo()}this.f=x
return this.r*x+this.x*(1-x)
default:return 0}},
n:{
bK:function(a,b,c,d,e){return new A.bJ(a,b,c,d,e,1,0,0)}}},
b_:{"^":"a;a,b",
h:function(a){return this.b}},
cr:{"^":"a;a",
S:function(a){var z=this.a
if(z.I(0,a))return H.cL(z.i(0,a))
z=$.$get$c2()
if(z.I(0,a))return H.cL(z.i(0,a))
return 0},
a4:function(a){var z=this.a
if(z.I(0,a))return H.y(z.i(0,a))
z=$.$get$c2()
if(z.I(0,a))return H.y(z.i(0,a))
return 0},
p:function(a,b,c){var z,y,x,w
z=H.i(this.a.i(0,a),"$isbJ")
if(z==null)z=H.i($.$get$c2().i(0,a),"$isbJ")
if(z!=null){y=z.a
x=z.bT(b,c)
w=z.c
if(typeof w!=="number")return H.P(w)
if(typeof y!=="number")return y.w()
return y+x*w}return 0},
aZ:function(a,b,c){var z,y
z=Math.max(Math.pow(2,this.p("AspectRatio",a,b)),1e-9)
y=z>1?z:1
c.P(y,z<1?1/z:1)},
aX:function(a,b){return Math.max(Math.pow(2,this.p("StarFactor",a,b)),0.01)},
n:{
r:function(a){return new A.cr(a)}}},
hr:{"^":"a;a,0b,c,0d,0e,0f,0r,0x,0y,0z,0Q,0ch,0cx,0cy,0db,0dx,dy,0fr"}}],["","",,L,{}],["","",,R,{"^":"",
cA:function(a){var z,y,x
z=H.v([],[P.f])
for(y=$.$get$e6(),x=new H.bG(y,[H.e(y,0)]),x=x.gD(x);x.u();)C.a.k(z,y.i(0,x.d).i(0,a))
return z},
hB:function(){var z,y,x,w,v,u
z=document.documentElement
y=z==null
if(y)H.K(P.ah("object cannot be a num, string, bool, or null"))
x=H.i(P.eh(P.e5(z)),"$isaj")
for(z=R.cA("l"),y=z.length,w=!1,v=0;v<z.length;z.length===y||(0,H.ar)(z),++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.K(P.ah("property is not a String or num"))
if(u in x.a&&x.i(0,u)!=null)w=!0}if(!w)for(z=R.cA("r"),y=z.length,v=0;v<y;++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.K(P.ah("property is not a String or num"))
if(u in x.a){x.bh(u)
break}}else for(z=R.cA("x"),y=z.length,v=0;v<y;++v){u=z[v]
x.toString
if(typeof u!=="string"&&!0)H.K(P.ah("property is not a String or num"))
if(u in x.a){x.bh(u)
break}}},
hH:function(a,b,c){var z=$.cN+1
$.cN=z
if(a-$.er<1000)return
z=$.eo*0.1+0.9*(z*1000/1000)
$.eo=z
b.textContent=C.c.d2(z,2)+"\n"+c
$.cN=0
$.er=a}}],["","",,Q,{"^":"",
b9:function(a,b,c){var z,y
H.o(c,"$isl",[T.w],"$asl")
z=b-1
if(z<0||z>=c.length)return H.j(c,z)
z=c[z].a
a.moveTo(z[0],z[1])
for(y=0;y<b;++y){if(y>=c.length)return H.j(c,y)
z=c[y].a
a.lineTo(z[0],z[1])}},
eT:function(a,b,c){var z,y,x,w,v,u
H.o(c,"$isl",[T.w],"$asl")
z=c.length
y=z-2
if(y<0)return H.j(c,y)
y=c[y].a
a.moveTo(y[0],y[1])
for(x=0;x<b;x+=3){z=C.f.F(x-1+b,b)
y=c.length
if(z>=y)return H.j(c,z)
w=c[z]
if(x>=y)return H.j(c,x)
v=c[x]
z=C.f.F(x+1,b)
if(z>=y)return H.j(c,z)
y=w.a
u=v.a
z=c[z].a
a.bezierCurveTo(C.c.L(y[0]),C.c.L(y[1]),C.c.L(u[0]),C.c.L(u[1]),C.c.L(z[0]),C.c.L(z[1]))}},
d7:function(a,b,c,d,e,f){var z,y
z=[T.w]
H.o(d,"$isl",z,"$asl")
H.o(f,"$isl",z,"$asl")
y=W.cs(null)
if(c>0)Q.b9(y,c,d)
Q.b9(y,e,f)
a.fillStyle=b
a.fill(y,"evenodd")},
d8:function(a,b,c,d,e,f,g,h){var z,y
z=[T.w]
H.o(f,"$isl",z,"$asl")
H.o(h,"$isl",z,"$asl")
y=W.cs(null)
if(e>0)Q.b9(y,e,f)
Q.b9(y,g,h)
a.fillStyle=b
a.fill(y,"evenodd")
a.strokeStyle=c
a.lineWidth=d
a.stroke(y)},
kc:[function(a){var z,y
H.i(a,"$isa9")
z=$.c3
P.af("Content: "+H.b((z&&C.o).gbA(z)))
z=$.$get$ba()
y=$.c3
z.B(0,"Custom",new A.cr(A.t(H.k((y&&C.o).gbA(y)))))
$.B.O("patch","Custom")},"$1","jI",4,0,32],
kd:[function(a){var z,y,x
z=H.i(J.eO(a),"$isY")
P.af("Reading file: "+H.b(z.files)+" "+H.b(a))
y=new FileReader()
$.c3=y
x=W.a9
W.U(y,"load",H.c(Q.jI(),{func:1,ret:-1,args:[x]}),!1,x)
x=$.c3
y=z.files
if(0>=y.length)return H.j(y,0)
x.readAsText(y[0])},"$1","jJ",4,0,7],
d9:function(a,b){var z,y
N.ay("HandleCommand: "+H.b(a)+" "+H.b(b))
switch(a){case"A":z=document.querySelector(".about")
z.hidden=!z.hidden
break
case"C":z=document.querySelector(".config")
z.hidden=!z.hidden
break
case"Z":$.B.O("zoom","1.0")
$.B.O("zoomCenterX","0.0")
$.B.O("zoomCenterY","0.0")
break
case"P":z=document.querySelector(".performance")
z.hidden=!z.hidden
break
case"R":$.B.bW()
window.location.hash=""
window.location.reload()
break
case"A+":document.querySelector(".about").hidden=!1
break
case"A-":document.querySelector(".about").hidden=!0
break
case"F":R.hB()
break
case"C-":document.querySelector(".config").hidden=!0
break
case"C+":document.querySelector(".config").hidden=!1
break
case"X":y=H.a0(document.querySelector("#preset"),"$isbq").value
$.B.aY(y)
break
case"\x1b":case"E":z=[Q.bp]
$.aq=new Q.dx(H.v([],z),H.v([],z))
$.a5=0
$.ao=C.n
break}},
fr:function(a,b,c){var z,y,x
H.o(b,"$isl",[T.w],"$asl")
for(z=b.length,y=0;y<a;++y){if(y>=z)return H.j(b,y)
x=b[y].a
if(Math.abs(x[0])<c&&Math.abs(x[1])<c)return!0}return!1},
fb:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=H.v([],[Q.bp])
for(y=$.$get$aq().a,x=y.length,w=[T.w],v=null,u=0;u<y.length;y.length===x||(0,H.ar)(y),++u){t=y[u]
if(!t.bX(b,$.$get$eu(),c,d)){C.a.k(z,t)
continue}s=t.c
r=s.e
if(typeof r!=="number")return r.d6()
if((r&4)!==0)a.globalCompositeOperation="difference"
else a.globalCompositeOperation="source-over"
if((r&1)!==0)if((r&2)!==0){q=s.c
p=s.b
o=s.r
if(v==null)Q.d8(a,q,e,C.c.aK(p),0,H.v([],w),s.f,o)
else{p=C.c.aK(p)
n=v.c
Q.d8(a,q,e,p,n.f,n.r,s.f,o)}}else{q=s.c
p=s.r
if(v==null)Q.d7(a,q,0,H.v([],w),s.f,p)
else{o=v.c
Q.d7(a,q,o.f,o.r,s.f,p)}}else{q=s.b
if(q>0){p=s.c
q=C.c.aK(q)
o=s.f
n=s.r
m=s.a
l=W.cs(null)
if(m)Q.eT(l,o,n)
else Q.b9(l,o,n)
a.strokeStyle=p
a.lineWidth=q
a.stroke(l)}}v=t}return z},
kP:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.jC(a)
z=$.$get$ba().i(0,$.B.b.i(0,"patch").a3())
if(typeof a!=="number")return a.w()
$.ea=a+0
$.a5=$.a5+1
y=$.B.S("zoom")
x=$.B.S("zoomCenterX")
w=$.B.S("zoomCenterY")
v=$.$get$bu()
u=v.width
if(typeof u!=="number")return u.w()
v=v.height
if(typeof v!=="number")return v.w()
t=new Float32Array(2)
new T.w(t).P(u,v)
v=Math.max(t[0],t[1])
if(typeof y!=="number")return H.P(y)
s=v*0.5*y
r=0.3*z.p("RingGrowth",$.a5,$.$get$ao())
q=z.p("RingSpacing",$.a5,$.$get$ao())
p=$.a5-1
for(v=-q,o=r;o>0;o=m){u=$.$get$by()
n=u.a
m=o+n
if(m<=0){u.a=n+o
break}p+=-n/r
u.a=v
$.$get$aq().cD(s,z,p,$.$get$ao(),u,null).a.b_(0,r*($.a5-p),null)}v=$.$get$bu()
l=H.i((v&&C.y).bF(v,"2d"),"$iscY")
l.globalCompositeOperation="source-over"
l.setTransform(1,0,0,1,0,0)
v=$.a5
u=$.$get$ao()
k=z.p("BkHue",v,u)
j=z.p("BkSaturation",v,u)
i=z.p("BkLightness",v,u)
h="hsl("+H.b(k)+", "+H.b(j)+"%, "+H.b(i)+"%)"
u=t[0]
v=t[1]
l.fillStyle=h
l.fillRect(0,0,u,v)
v=t[0]
if(typeof x!=="number")return H.P(x)
t=t[1]
if(typeof w!=="number")return H.P(w)
l.translate(0.5*v+x,0.5*t+w)
l.scale(y,y)
g=Q.fb(l,s,$.a5,$.$get$ao(),h)
t=$.$get$by()
t.c=t.c+z.p("ColorSpeed",$.a5,$.$get$ao())*0.3
f=new T.w(new Float32Array(2))
for(v=$.$get$aq().a,u=v.length,e=0;e<u;++e)f=v[e].a.c
for(v=$.$get$aq().a,u=v.length,e=0;e<v.length;v.length===u||(0,H.ar)(v),++e){d=v[e]
t=z.S("Trail")
if(typeof t!=="number")return H.P(t)
d.a.b_(1-t,r,f)}$.$get$aq().d0(g)
C.w.bz(window,Q.eG())
c=H.v(["Rings: "+$.$get$aq().a.length,"hue: "+H.b($.$get$by().c)],[P.f])
R.hH($.ea,$.$get$eq(),C.a.aM(c,"\n"))
if($.b6.a.cM(0,0)){v=$.b6.d
if(v!==0){u=$.B
if(typeof v!=="number")return H.P(v)
u.O("zoomCenterX",H.b(x+v))}v=$.b6.e
if(v!==0){u=$.B
if(typeof v!=="number")return H.P(v)
u.O("zoomCenterY",H.b(w+v))}}v=$.b6.f
if(v!==0){if(typeof v!=="number")return v.N()
v=y+v*0.01*y
if(v>0)$.B.O("zoom",H.b(v))}v=$.b6
v.e=0
v.d=0
v.f=0
v.c.ah(0)
v.b.ah(0)},"$1","eG",4,0,21,21],
ey:function(){var z,y,x,w,v
G.fW()
z=document
y=z.body
y.toString
x=W.bg
W.U(y,"keydown",H.c(new Q.jx(),{func:1,ret:-1,args:[x]}),!1,x)
$.b6=Q.fK($.$get$bu())
x=$.$get$ep()
x.toString
y=W.C
w={func:1,ret:-1,args:[y]}
W.U(x,"change",H.c(Q.jJ(),w),!1,y)
x=new Q.jz()
W.U(window,"resize",H.c(x,w),!1,y)
x.$1(null)
z=z.body
x=W.ai
z.toString
H.j7(x,x,"The type argument '","' is not a subtype of the type variable bound '","' of type variable 'T' in 'querySelectorAll'.")
z=z.querySelectorAll("button")
N.ay("found "+z.length+" buttons")
new W.i2(H.o(new W.i8(z,[x]),"$isd5",[x],"$asd5"),!1,"click",[W.H]).cX(new Q.jy())
v=$.$get$ba().i(0,$.B.b.i(0,"patch").a3())
$.$get$by().d=v.S("Hue")
C.w.bz(window,Q.eG())},
fJ:{"^":"a;a,b,c,d,e,f,r,x",
bU:function(a){var z,y,x
if(a==null)a=document
z=J.ad(a)
y=z.gbs(a)
x=H.e(y,0)
W.U(y.a,y.b,H.c(new Q.fL(this),{func:1,ret:-1,args:[x]}),!1,x)
x=z.gbr(a)
y=H.e(x,0)
W.U(x.a,x.b,H.c(new Q.fM(this),{func:1,ret:-1,args:[y]}),!1,y)
y=z.gbt(a)
x=H.e(y,0)
W.U(y.a,y.b,H.c(new Q.fN(this),{func:1,ret:-1,args:[x]}),!1,x)
z=z.gbu(a)
x=H.e(z,0)
W.U(z.a,z.b,H.c(new Q.fO(this),{func:1,ret:-1,args:[x]}),!1,x)},
n:{
fK:function(a){var z=P.E
z=new Q.fJ(P.ck(null,null,null,z),P.ck(null,null,null,z),P.ck(null,null,null,z),0,0,0,0,0)
z.bU(a)
return z}}},
fL:{"^":"h:8;a",
$1:function(a){var z,y
H.i(a,"$isH")
a.preventDefault()
z=this.a
y=J.ad(a)
z.r=H.y(y.gbq(a).a)
z.x=H.y(y.gbq(a).b)
z.d=a.movementX
z.e=a.movementY}},
fM:{"^":"h:8;a",
$1:function(a){var z
H.i(a,"$isH")
a.preventDefault()
P.af("BUTTON "+H.b(a.button))
z=this.a
z.a.k(0,a.button)
z.b.k(0,a.button)}},
fN:{"^":"h:8;a",
$1:function(a){var z
H.i(a,"$isH")
a.preventDefault()
z=this.a
z.a.Z(0,a.button)
z.c.k(0,a.button)}},
fO:{"^":"h:27;a",
$1:function(a){H.i(a,"$isaC")
a.preventDefault()
this.a.f=H.y(C.O.gcP(a))}},
hl:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
b_:function(a,b,c){var z
if(c!=null){z=this.c
this.c=z.w(0,c.ao(0,z).N(0,a))}this.b+=b
this.a=this.a+this.e*b
this.d=this.d.w(0,this.f.N(0,b))
return this.c},
bR:function(a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
H.o(a5,"$isl",[T.w],"$asl")
z=this.b
y=new T.w(new Float32Array(2))
a1.aZ(a2,a3,y)
x=new T.w(new Float32Array(2))
x.a1(this.r)
x.bm(y)
w=this.d.w(0,this.c)
v=a1.p("SkewAngle",a2,a3)
u=Math.sin(v)
t=Math.cos(v)
s=new T.w(new Float32Array(2))
s.P(u,t)
s.a0(0,a1.p("SkewRadius",a2,a3))
s.a0(0,z)
w=w.w(0,s)
r=2*(this.y+C.c.L(a1.p("PolySides",a2,a3)))
q=x.N(0,z)
p=x.N(0,z*this.x*a1.aX(a2,a3))
o=this.a+a1.p("RotateSpeed",a2,a3)/5*180
n=this.Q+6.283185307179586/r*a1.p("Pinwheel",a2,a3)
m=a4?r*3:r
for(;a5.length<m;)C.a.k(a5,new T.w(new Float32Array(2)))
for(u=!a4,l=0;l<r;++l){k=6.283185307179586*l/r+o
t=l%2!==0
if(t){k+=n
j=p}else j=q
s=a5.length
if(a4){i=3*l
if(i>=s)return H.j(a5,i)
h=a5[i]
g=i+1
if(g>=s)return H.j(a5,g)
f=a5[g]
i+=2
if(i>=s)return H.j(a5,i)
e=a5[i]}else{if(l>=s)return H.j(a5,l)
f=a5[l]
h=null
e=null}s=Math.sin(k)
i=Math.cos(k)
g=f.a
g[0]=s
g[1]=i
f.bm(j)
f.k(0,w)
if(u)continue
if(t){d=this.cx+a1.p("OddCurve",a2,a3)
c=d*(this.db+a1.p("OddShear",a2,a3))}else{d=this.ch+a1.p("EvenCurve",a2,a3)
c=d*(this.cy+a1.p("EvenShear",a2,a3))}t=new Float32Array(2)
t[1]=g[1]
t[0]=g[0]
new T.w(t).aW(w)
s=g[0]
i=t[1]
b=g[1]
a=t[0]
a0=h.a
a0[0]=s-i*d
a0[1]=b+a*d
a=g[0]
b=t[1]
g=g[1]
t=t[0]
a0=e.a
a0[0]=a+b*c
a0[1]=g+t*c}return m}},
hm:{"^":"a;0a,0b,0c,0d,0e,0f"},
hk:{"^":"a;a,b,c,d,e,f,r"},
bp:{"^":"a;a,b,c",
bX:function(a,b,c,d){var z,y,x,w,v
z=this.a
if(z.z&&z.b<=0)return!1
y=this.c
y.a=z.ch!==0||z.cx!==0||b.p("EvenCurve",c,d)!==0||b.p("OddCurve",c,d)!==0
x=this.b
w=x.d
v=b.p("LineWidth",c,d)
if(typeof w!=="number")return w.w()
y.b=w+v
y.e=x.e
v=y.r
y.f=z.bR(b,c,d,y.a,v)
z=x.f
if(typeof z!=="number")return z.M()
y.d=z<0?1:1-(c-z)*0.01
y.c="hsla("+H.b(x.a)+", "+H.b(x.b)+"%, "+H.b(x.c)+"%, "+H.b(y.d)+")"
return y.d>0&&Q.fr(y.f,v,a)}},
dx:{"^":"a;a,b",
cD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
z=this.b
if(z.length>0)y=z.pop()
else{z=new Float32Array(2)
x=new Float32Array(2)
w=new Float32Array(2)
v=new T.w(new Float32Array(2))
v.P(1,1)
y=new Q.bp(new Q.hl(0,0,new T.w(z),new T.w(x),0,new T.w(w),v,1,4,!1,0,0,0,0,0),new Q.hm(),new Q.hk(!1,1,"",1,0,0,H.v([],[T.w])))}z=y.b
z.a=C.c.F(e.c,360)
z.b=100*b.p("Saturation",c,d)
z.c=100*b.p("Lightness",c,d)
z.d=b.p("LineWidth",c,d)
z.e=b.a4("DrawMode")
z.f=-1
z=y.a
u=b.p("RingGrowth",c,d)
z.e=b.p("RotateSpeed",c,d)
x=u<0
z.z=x
z.a=0
if(x)z.b=a
else z.b=0
b.aZ(c,d,z.r)
t=b.p("SkewAngle",c,d)
x=z.f
x.P(Math.sin(t),Math.cos(t))
x.a0(0,b.p("SkewRadius",c,d))
z.d=new T.w(new Float32Array(2))
x=C.c.L(b.p("PolySides",c,d))
z.y=x
z.x=Math.cos(3.141592653589793/x)*b.aX(c,d)
z.Q=3.141592653589793/z.y*b.p("Pinwheel",c,d)
z.ch=b.p("EvenCurve",c,d)
z.cx=b.p("OddCurve",c,d)/z.x
z.cy=b.p("EvenShear",c,d)
z.db=b.p("OddShear",c,d)
s=$.B.a4("maxRings")
x=this.a
if(z.z){C.a.k(x,y)
z=x.length
if(typeof s!=="number")return H.P(s)
if(z>s)for(w=z-s,r=0;r<w;++r){if(r>=z)return H.j(x,r)
v=x[r].b
q=v.f
if(typeof q!=="number")return q.M()
if(q<0)v.f=c}}else{H.m(y,H.e(x,0))
x.splice(0,0,y)
z=x.length
if(typeof s!=="number")return H.P(s)
if(z>s)for(r=s;r<z;++r){if(r<0)return H.j(x,r)
w=x[r].b
v=w.f
if(typeof v!=="number")return v.M()
if(v<0)w.f=c}}return y},
d0:function(a){var z,y,x,w,v
H.o(a,"$isl",[Q.bp],"$asl")
for(z=a.length,y=this.a,x=this.b,w=0;w<a.length;a.length===z||(0,H.ar)(a),++w){v=a[w]
C.a.Z(y,v)
C.a.k(x,v)}},
gj:function(a){return this.a.length},
n:{
hz:function(){var z=[Q.bp]
return new Q.dx(H.v([],z),H.v([],z))}}},
jx:{"^":"h:28;",
$1:function(a){var z,y
H.i(a,"$isbg")
N.ay("key pressed "+H.b(a.keyCode)+" "+J.cT(W.bs(a.target)).h(0))
z=J.cT(W.bs(a.target)).gU()
y=C.M.gU()
if(z===y)return
Q.d9(P.hx(H.v([a.keyCode],[P.E]),0,null),"")}},
jz:{"^":"h:7;",
$1:function(a){var z,y,x
z=window.innerWidth
y=window.innerHeight
x=$.$get$bu()
x.width=z
x.height=y
P.af("size change "+H.b(z)+" "+H.b(y))}},
jy:{"^":"h:29;",
$1:[function(a){var z,y,x
H.i(a,"$isC")
z=J.ad(a)
y=H.a0(z.gal(a),"$isai")
y.toString
x=y.getAttribute("data-"+new W.dT(new W.dU(y)).aH("cmd"))
z=H.a0(z.gal(a),"$isai")
z.toString
Q.d9(x,z.getAttribute("data-"+new W.dT(new W.dU(z)).aH("param")))},null,null,4,0,null,22,"call"]}},1]]
setupProgram(dart,0,0)
J.u=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dd.prototype
return J.dc.prototype}if(typeof a=="string")return J.bE.prototype
if(a==null)return J.fx.prototype
if(typeof a=="boolean")return J.fv.prototype
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
return a}if(a instanceof P.a)return a
return J.bY(a)}
J.bw=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
return a}if(a instanceof P.a)return a
return J.bY(a)}
J.bX=function(a){if(a==null)return a
if(a.constructor==Array)return J.ax.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
return a}if(a instanceof P.a)return a
return J.bY(a)}
J.jh=function(a){if(typeof a=="number")return J.bD.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bP.prototype
return a}
J.aL=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bP.prototype
return a}
J.ad=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bf.prototype
return a}if(a instanceof P.a)return a
return J.bY(a)}
J.cS=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.u(a).E(a,b)}
J.eH=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.jh(a).M(a,b)}
J.eI=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.js(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bw(a).i(a,b)}
J.eJ=function(a,b,c,d){return J.ad(a).cm(a,b,c,d)}
J.eK=function(a,b,c,d){return J.ad(a).bf(a,b,c,d)}
J.eL=function(a,b){return J.aL(a).bg(a,b)}
J.c5=function(a,b,c){return J.bw(a).cN(a,b,c)}
J.eM=function(a,b){return J.bX(a).J(a,b)}
J.eN=function(a,b){return J.bX(a).C(a,b)}
J.a6=function(a){return J.u(a).gv(a)}
J.aQ=function(a){return J.bX(a).gD(a)}
J.aR=function(a){return J.bw(a).gj(a)}
J.cT=function(a){return J.u(a).gaQ(a)}
J.eO=function(a){return J.ad(a).gal(a)}
J.eP=function(a,b,c){return J.bX(a).bk(a,b,c)}
J.eQ=function(a,b){return J.u(a).aN(a,b)}
J.eR=function(a,b){return J.aL(a).aU(a,b)}
J.eS=function(a,b){return J.aL(a).an(a,b)}
J.cU=function(a,b){return J.aL(a).W(a,b)}
J.aS=function(a){return J.u(a).h(a)}
J.c6=function(a){return J.aL(a).d3(a)}
I.c0=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.y=W.ca.prototype
C.o=W.fg.prototype
C.B=W.aX.prototype
C.C=J.x.prototype
C.a=J.ax.prototype
C.i=J.dc.prototype
C.f=J.dd.prototype
C.c=J.bD.prototype
C.e=J.bE.prototype
C.J=J.bf.prototype
C.k=H.fP.prototype
C.u=J.h4.prototype
C.l=J.bP.prototype
C.O=W.aC.prototype
C.w=W.cv.prototype
C.x=new P.i0()
C.n=new P.io()
C.d=new P.iz()
C.z=new P.bc(0)
C.A=new P.bc(4e6)
C.D=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.E=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.p=function(hooks) { return hooks; }

C.F=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.G=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.H=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.I=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.r=I.c0([])
C.K=H.v(I.c0([]),[P.aB])
C.t=new H.f4(0,{},C.K,[P.aB,null])
C.L=new H.ct("call")
C.M=H.en(W.Y)
C.N=H.en(P.n)
C.b=new A.b_(0,"ValueType.OSCILLATOR")
C.h=new A.b_(1,"ValueType.DOUBLE")
C.m=new A.b_(2,"ValueType.INT")
C.j=new A.b_(3,"ValueType.BOOL")
C.v=new A.b_(4,"ValueType.POINT")
$.a1=0
$.aT=null
$.cW=null
$.cF=!1
$.et=null
$.ej=null
$.eC=null
$.bV=null
$.c_=null
$.cP=null
$.aG=null
$.b1=null
$.b2=null
$.cG=!1
$.q=C.d
$.d3=null
$.d2=null
$.d1=null
$.d0=null
$.B=null
$.bv=0
$.cN=0
$.er=0
$.eo=1
$.b6=null
$.c3=null
$.ea=0
$.a5=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bA","$get$bA",function(){return H.cO("_$dart_dartClosure")},"cf","$get$cf",function(){return H.cO("_$dart_js")},"dy","$get$dy",function(){return H.a4(H.bN({
toString:function(){return"$receiver$"}}))},"dz","$get$dz",function(){return H.a4(H.bN({$method$:null,
toString:function(){return"$receiver$"}}))},"dA","$get$dA",function(){return H.a4(H.bN(null))},"dB","$get$dB",function(){return H.a4(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dF","$get$dF",function(){return H.a4(H.bN(void 0))},"dG","$get$dG",function(){return H.a4(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dD","$get$dD",function(){return H.a4(H.dE(null))},"dC","$get$dC",function(){return H.a4(function(){try{null.$method$}catch(z){return z.message}}())},"dI","$get$dI",function(){return H.a4(H.dE(void 0))},"dH","$get$dH",function(){return H.a4(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cw","$get$cw",function(){return P.hM()},"bC","$get$bC",function(){var z=new P.J(0,C.d,[P.n])
z.cr(null)
return z},"b4","$get$b4",function(){return[]},"d_","$get$d_",function(){return{}},"cx","$get$cx",function(){return H.cO("_$dart_dartObject")},"cC","$get$cC",function(){return function DartObject(a){this.o=a}},"e9","$get$e9",function(){var z=P.f
return P.a8(["B","checkbox","I","number","D","number","O","text","S","text"],z,z)},"ez","$get$ez",function(){return P.a8(["RingGrowth",C.b,"RingSpacing",C.b,"PolySides",C.b,"RotateSpeed",C.b,"AspectRatio",C.b,"SkewRadius",C.b,"SkewAngle",C.b,"StarFactor",C.b,"ColorSpeed",C.b,"Lightness",C.b,"Saturation",C.b,"BkHue",C.b,"BkLightness",C.b,"BkSaturation",C.b,"Pinwheel",C.b,"LineWidth",C.b,"EvenCurve",C.b,"OddCurve",C.b,"EvenShear",C.b,"OddShear",C.b,"Origin",C.v,"DrawMode",C.m,"OrgMotion",C.m,"Hue",C.h,"Mirror",C.j,"Reverse",C.j,"Convex",C.j,"InvertColor",C.j,"LoopHue",C.j,"Pause",C.j,"Speed",C.h,"Damping",C.h,"Trail",C.h,"Tempo",C.h,"HueLoopLength",C.h,"CanvasScale",C.h,"Copies",C.h,"Spread",C.h],P.f,A.b_)},"c2","$get$c2",function(){return P.a8(["Origin",T.hI(0.5,0.5),"Speed",1,"Damping",0.186261,"Trail",0,"Tempo",100,"HueLoopLength",30,"CanvasScale",1.4,"Copies",1,"Spread",100,"ColorSpeed",A.bK(1,0,0,0,0),"Lightness",A.bK(0.5,0,0,0,0),"Saturation",A.bK(1,0,0,0,0),"LineWidth",A.bK(1,0,0,0,0)],P.f,null)},"ba","$get$ba",function(){return P.a8(["Patch051027162927",A.r(A.t("WHORLD1\nRingGrowth\t1.98555\t0\t0\t0\t0.5\nRingSpacing\t1.32869\t1\t0.816508\t0.0513552\t0.5\nPolySides\t6.35549\t6\t1.60272\t0.0105447\t0.5\nRotateSpeed\t0\t1\t0.00390654\t0.0108408\t0.5\nAspectRatio\t0.141144\t0\t0.0470359\t0.0179249\t0.5\nSkewRadius\t0.00150761\t1\t0\t0\t0.5\nSkewAngle\t1.99912\t0\t0\t0\t0.5\nStarFactor\t0\t1\t1.28137\t0.06019\t0.5\nColorSpeed\t0.525678\t0\t0.0340734\t0.0031829\t0.590814\nLightness\t0.5\t0\t0.282611\t0.366203\t0.5\nSaturation\t0.77848\t1\t0.172286\t0.216979\t0.5\nBkHue\t0\t0\t68.6007\t0.00278207\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t0.27434\t0\t0\t0\t0.5\nPinwheel\t0.172063\t1\t1.43199\t0.249578\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t.5\t.5\nDrawMode\t0\nMirror\t0\n\n")),"Bands",A.r(A.t("WHORLD1\nRingGrowth\t1.49\t0\t0\t0\nRingSpacing\t1\t1\t0\t0\nPolySides\t5\t6\t1\t0.01\nRotateSpeed\t0\t0\t0.00349066\t0.02\nAspectRatio\t0.2\t0\t0.33\t0.007\nSkewRadius\t0.25\t0\t0.24\t0.044\nSkewAngle\t0\t0\t3.14159\t0.02\nStarFactor\t0.25\t4\t0.5\t1.5\nColorSpeed\t1.5\t0\t0\t0\nLightness\t0.5\t0\t0.3\t0.02\nSaturation\t0.7\t0\t0.3\t0.03\nBkHue\t0\t0\t180\t0.01\nBkLightness\t0.15\t1\t0.15\t0.001\nBkSaturation\t0.5\t0\t0\t0\n\n")),"BullLotus2",A.r(A.t("WHORLD1\nRingGrowth\t1.05262\t0\t0\t0\t0.5\nRingSpacing\t3.60144\t3\t-0.710135\t0.0483642\t0.5\nPolySides\t38.9406\t2\t1.0007\t0.00101505\t0.5\nRotateSpeed\t0.000219459\t0\t0.000124516\t0.00973083\t0.5\nAspectRatio\t-0.0102057\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0.00383339\t0\t0\t0\t0.5\nStarFactor\t0\t2\t1.89868\t0.0493362\t0.5\nColorSpeed\t1.39518\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0.112653\t0.0299771\t0.5\nSaturation\t0.993278\t0\t0.206053\t0.147368\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n")),"BullLotus5Edit",A.r(A.t("WHORLD1\nRingGrowth\t2.23933\t0\t0\t0\t0.5\nRingSpacing\t16.5\t2\t15\t0.027\t0.5\nPolySides\t40\t2\t0\t0\t0.5\nRotateSpeed\t0.000282205\t0\t0.000443739\t0.005\t0.5\nAspectRatio\t0\t0\t2\t0.008\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0.00252492\t0\t0\t0\t0.5\nStarFactor\t0\t2\t0.85\t0.0324\t0.5\nColorSpeed\t1.56797\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0.0413519\t0.127\t0.5\nSaturation\t0.96\t0\t0.0343638\t0.136\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t1\t2\t0.05\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n")),"Bullseye",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t17.549\t0\t0\t0\t0.5\nPolySides\t50\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t0\t0\t0\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t1.58\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.702479 0.161371\nDrawMode\t3\nMirror\t0\n\n")),"Cross",A.r(A.t("WHORLD1\nRingGrowth\t2\t1\t0\t0\t0.5\nRingSpacing\t6\t1\t2\t0.12\t0.5\nPolySides\t4\t6\t0\t0\t0.5\nRotateSpeed\t0\t1\t0.00436332\t0.01\t0.5\nAspectRatio\t0.25\t1\t0.25\t0.023\t0.5\nSkewRadius\t0\t1\t0\t0\t0.5\nSkewAngle\t0\t1\t0\t0\t0.5\nStarFactor\t0\t1\t2\t0.02\t0.5\nPinwheel\t0\t1\t3\t0.01\t0.5\nColorSpeed\t0.53\t1\t0.3\t0.013\t0.5\nLightness\t0.5\t1\t0.25\t0.051\t0.5\nSaturation\t0.8\t1\t0.2\t0.062\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t0\t0\t0\t0\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t0\n\n")),"Default",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t5\t0\t0\t0\t0.5\nPolySides\t5\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t0\t0\t0\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t0.5\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n")),"FishEye",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t20\t0\t0\t0\t0.5\nPolySides\t50\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0.00174533\t0.02\t0.5\nAspectRatio\t0\t0\t1\t0.075\t0.5\nSkewRadius\t0.336\t0\t0\t0\t0.5\nSkewAngle\t0\t2\t3.14159\t0.005\t0.5\nStarFactor\t0.6\t5\t0.6\t0.05\t0.2\nColorSpeed\t0.25\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t15\t1\t15\t0.087\t0.5\nOrigin\t0.839734 0.851508\nDrawMode\t4\nMirror\t0\n\n")),"Frosty",A.r(A.t("WHORLD1\nRingGrowth\t2\t0\t0\t0\t0.5\nRingSpacing\t1\t0\t0\t0\t0.5\nPolySides\t7\t6\t3\t0.011\t0.5\nRotateSpeed\t0\t1\t0.00174533\t0.022\t0.5\nAspectRatio\t1\t1\t0\t0\t0.5\nSkewRadius\t0.1\t0\t0\t0\t0.5\nSkewAngle\t3.14159\t0\t0\t0\t0.5\nStarFactor\t0\t1\t1\t0.22\t0.5\nColorSpeed\t0.5\t0\t0\t0\t0.85\nLightness\t0.5\t0\t0.5\t0.44\t0.5\nSaturation\t0.75\t1\t0.25\t0.55\t0.5\nBkHue\t0\t2\t180\t0.005\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t0.5\t0\t0\t0\t0.5\nPinwheel\t1\t1\t1\t0.33\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n")),"Good2",A.r(A.t("WHORLD1\nRingGrowth\t2.07\t1\t0\t0\t0.5\nRingSpacing\t5\t1\t1\t1\t0.5\nPolySides\t5\t6\t0\t0\t0.5\nRotateSpeed\t0\t1\t0.02\t0.01\t0.5\nAspectRatio\t0.378512\t1\t0\t0\t0.5\nSkewRadius\t0.5\t1\t0.4\t0.005\t0.5\nSkewAngle\t0\t1\t6\t0.001\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nColorSpeed\t0.5\t1\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t0\n\n")),"Kaleid",A.r(A.t("WHORLD1\nRingGrowth\t2.77\t0\t0\t0\t0.5\nRingSpacing\t1\t0\t1\t1\t0.5\nPolySides\t5\t6\t2\t0.15\t0.5\nRotateSpeed\t0\t0\t0.01\t0.02\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t0\t0\t0\t0.5\nStarFactor\t0\t0\t1\t0.2\t0.5\nColorSpeed\t1.78\t1\t1\t0.55\t0.5\nLightness\t0.5\t1\t0.2\t0.66\t0.5\nSaturation\t0.75\t1\t0.25\t0.77\t0.5\nBkHue\t0\t0\t180\t0.008\t0.5\nBkLightness\t0.327\t0\t0\t0\t0.5\nBkSaturation\t0.376\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n")),"LotusLight",A.r(A.t("WHORLD1\nRingGrowth\t2.28\t0\t0\t0\nRingSpacing\t2.641\t4\t-1\t0.05\nPolySides\t6\t6\t3\t0.01\nRotateSpeed\t0.001\t0\t0.01\t0.01\nAspectRatio\t-0.03\t0\t0\t0\nSkewRadius\t0\t0\t0\t0\nSkewAngle\t0.09423\t0\t0\t0\nColorSpeed\t1.39\t0\t0\t0\nStarFactor\t0\t4\t2\t0.05\nLightness\t0.5\t0\t0.333\t0.18\nSaturation\t0.75\t0\t0.25\t0.15\n\n")),"LwLotusCross",A.r(A.t("WHORLD1\nRingGrowth\t2.01476\t1\t0\t0\t0.5\nRingSpacing\t20\t3\t0.017365\t0.109267\t0.5\nPolySides\t4.91617\t6\t0.273202\t0.00112491\t0.5\nRotateSpeed\t0.000246803\t1\t0.00724144\t0.01\t0.5\nAspectRatio\t0.201754\t0\t0.158727\t0.0136412\t0.5\nSkewRadius\t0\t1\t0\t0\t0.5\nSkewAngle\t0.00106403\t0\t0\t0\t0.5\nStarFactor\t0\t2\t2\t0.0439015\t0.5\nColorSpeed\t1.15641\t0\t0.00834071\t0.00940117\t0.5\nLightness\t0.5\t1\t0.305253\t0.112349\t0.5\nSaturation\t0.757764\t0\t0.202977\t0.0818844\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t0.234901\t0\t0\t0\t0.5\nPinwheel\t0\t1\t2.09827\t0.00895993\t0.5\nLineWidth\t1\t0\t5\t0.1\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t0\nMirror\t0\n\n")),"LwLotusCross2",A.r(A.t("WHORLD1\nRingGrowth\t2.01476\t1\t0\t0\t0.5\nRingSpacing\t9.474\t3\t0.017365\t0.109267\t0.5\nPolySides\t4.91617\t6\t0.273202\t0.00112491\t0.5\nRotateSpeed\t0.000246803\t1\t0.00724144\t0.01\t0.5\nAspectRatio\t0.201754\t0\t0.158727\t0.0136412\t0.5\nSkewRadius\t0\t1\t0\t0\t0.5\nSkewAngle\t0.00106403\t0\t0\t0\t0.5\nStarFactor\t0\t2\t2\t0.0439015\t0.5\nColorSpeed\t1.15641\t0\t0.00834071\t0.00940117\t0.5\nLightness\t0.5\t1\t0.305253\t0.112349\t0.5\nSaturation\t0.757764\t0\t0.202977\t0.0818844\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t0.234901\t0\t0\t0\t0.5\nPinwheel\t0\t1\t2.09827\t0.00895993\t0.5\nLineWidth\t1\t0\t5\t0.1\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t0\nMirror\t1\n\n")),"LwPinwheelFabColor",A.r(A.t("WHORLD1\nRingGrowth\t4.26\t3\t0\t0\t0\nRingSpacing\t10.025\t1\t2.01151\t0.0297525\t0.785607\nPolySides\t4\t6\t2.4084\t0.00591842\t0.896542\nRotateSpeed\t0\t1\t0.0160956\t0.0446944\t0.556169\nAspectRatio\t0.504\t1\t0.550768\t0.035963\t0.0668966\nSkewRadius\t0.1713\t1\t0.0268654\t0.006708\t0.563494\nSkewAngle\t0\t0\t3.14159\t0.00612964\t0.788995\nStarFactor\t1.664\t1\t0.608341\t0.0280618\t0.32844\nColorSpeed\t1.08899\t1\t2.66094\t0.0968657\t0.615986\nLightness\t0.578085\t0\t0.362835\t0.0472671\t0.672933\nSaturation\t0.844258\t0\t0.144963\t0.0645985\t0.103061\nBkHue\t0\t0\t180\t0.0473189\t0.0162664\nBkLightness\t0.209281\t0\t0.100192\t0.0618213\t0.248543\nBkSaturation\t0.230735\t1\t0.463713\t0.0387066\t0.16953\nPinwheel\t0.948973\t1\t0.853328\t0.0013037\t0.412732\nLineWidth\t8\t0\t7\t0.1\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t6\nMirror\t1\n\n")),"LwPinwheelFabColor2",A.r(A.t("WHORLD1\nRingGrowth\t4.26\t3\t0\t0\t0\nRingSpacing\t10.025\t1\t2.01151\t0.0297525\t0.785607\nPolySides\t4\t6\t2.4084\t0.00591842\t0.896542\nRotateSpeed\t0\t1\t0.0160956\t0.0446944\t0.556169\nAspectRatio\t0.504\t1\t0.550768\t0.035963\t0.0668966\nSkewRadius\t0.1713\t1\t0.0268654\t0.006708\t0.563494\nSkewAngle\t0\t0\t3.14159\t0.00612964\t0.788995\nStarFactor\t1.664\t1\t0.608341\t0.0280618\t0.32844\nColorSpeed\t1.08899\t1\t2.66094\t0.0968657\t0.615986\nLightness\t0.578085\t0\t0.362835\t0.0472671\t0.672933\nSaturation\t0.844258\t0\t0.144963\t0.0645985\t0.103061\nBkHue\t0\t0\t180\t0.0473189\t0.0162664\nBkLightness\t0.209281\t0\t0.100192\t0.0618213\t0.248543\nBkSaturation\t0.230735\t1\t0.463713\t0.0387066\t0.16953\nPinwheel\t0.948973\t1\t0.853328\t0.0013037\t0.412732\nLineWidth\t14.357\t0\t12\t0.1\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t6\nMirror\t1\n\n")),"MercedesBent",A.r(A.t("WHORLD1\nRingGrowth\t2.28\t0\t0\t0\t0.5\nRingSpacing\t2.641\t4\t-1\t0.05\t0.5\nPolySides\t3\t6\t0\t0\t0.5\nRotateSpeed\t0.001\t0\t0.01\t0.01\t0.5\nAspectRatio\t-0.03\t0\t1\t0.02\t0.5\nSkewRadius\t0\t0\t0.05\t0.03\t0.5\nSkewAngle\t0\t0\t0.0174533\t0.04\t0.5\nStarFactor\t0\t4\t2\t0.05\t0.5\nPinwheel\t0\t0\t1\t0.09\t0.5\nColorSpeed\t1.39\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nOrigin\t0.49922\t0.100756\nDrawMode\t4\nMirror\t1\n\n")),"Mercedes",A.r(A.t("WHORLD1\nRingGrowth\t2.28\t0\t0\t0\t0.5\nRingSpacing\t2.641\t4\t-1\t0.05\t0.5\nPolySides\t3\t6\t0\t0\t0.5\nRotateSpeed\t0.001\t0\t0.01\t0.01\t0.5\nAspectRatio\t-0.03\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0.09423\t0\t0\t0\t0.5\nStarFactor\t0\t4\t2\t0.05\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nColorSpeed\t1.39\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nOrigin\t0.5\t0.5\nDrawMode\t0\n\n")),"PinwheelFabColor",A.r(A.t("WHORLD1\nRingGrowth\t2\t3\t0\t0\t0\nRingSpacing\t3\t1\t2.01151\t0.0297525\t0.785607\nPolySides\t4\t6\t2.4084\t0.00591842\t0.896542\nRotateSpeed\t0\t1\t0.0160956\t0.0446944\t0.556169\nAspectRatio\t0.504\t1\t0.550768\t0.035963\t0.0668966\nSkewRadius\t0.1713\t1\t0.0268654\t0.006708\t0.563494\nSkewAngle\t0\t0\t3.14159\t0.00612964\t0.788995\nStarFactor\t1.664\t1\t0.608341\t0.0280618\t0.32844\nPinwheel\t0.948973\t1\t0.853328\t0.0013037\t0.412732\nColorSpeed\t1.08899\t1\t2.66094\t0.0968657\t0.615986\nLightness\t0.578085\t0\t0.362835\t0.0472671\t0.672933\nSaturation\t0.844258\t0\t0.144963\t0.0645985\t0.103061\nBkHue\t0\t0\t180\t0.0473189\t0.0162664\nBkLightness\t0.209281\t0\t0.100192\t0.0618213\t0.248543\nBkSaturation\t0.230735\t1\t0.463713\t0.0387066\t0.16953\n\n")),"Pinwheel",A.r(A.t("WHORLD1\nRingGrowth\t1.49\t0\t0\t0\nRingSpacing\t1.75\t1\t0.5\t0.07\nPolySides\t16\t6\t13\t0.06\nRotateSpeed\t0\t0\t0.0148353\t0.01\nAspectRatio\t0.333\t1\t0.333\t0.005\nSkewRadius\t0\t0\t0.2\t0.0023\nSkewAngle\t0\t4\t3.14159\t0.0012\nStarFactor\t0\t0\t1\t0.1\nColorSpeed\t1\t1\t0.5\t0.044\nLightness\t0.55\t1\t0.15\t0.03\nSaturation\t0.8\t1\t0.2\t0.06\nBkHue\t0\t0\t180\t0.01\nBkLightness\t0.1\t0\t0\t0\nBkSaturation\t1\t0\t0\t0\n\n")),"Raindrops",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t20\t0\t0\t0\t0.5\nPolySides\t50\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t0\t0\t0\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t0.1\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t10\t1\t10\t0.087\t0.5\nOrigin\t0.702479 0.161371\nDrawMode\t2\nMirror\t0\n\n")),"Ramps",A.r(A.t("WHORLD1\nRingGrowth\t2\t0\t0\t0\t0.5\nRingSpacing\t10\t3\t10\t0.21\t0.5\nPolySides\t5\t2\t2\t0.001\t0.5\nRotateSpeed\t0\t3\t0.00349066\t0.02\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t3\t3.14159\t0.004\t0.5\nStarFactor\t0\t2\t1\t0.03\t0.5\nColorSpeed\t0.5\t2\t0.3\t0.04\t0.5\nLightness\t0.5\t0\t0.3\t0.05\t0.5\nSaturation\t0.7\t0\t0.3\t0.06\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t1\t1\t0.04\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t3\nMirror\t0\n\n")),"RealPinwheel",A.r(A.t("WHORLD1\nRingGrowth\t1.8\t0\t0\t0\nRingSpacing\t3.5\t0\t1\t0.04\nPolySides\t5\t6\t2\t0.009\nRotateSpeed\t0\t0\t0.0122173\t0.01\nAspectRatio\t0\t0\t0\t0\nSkewRadius\t0\t0\t0\t0\nSkewAngle\t0\t0\t0\t0\nStarFactor\t0\t0\t1.5\t0.03\nPinwheel\t0\t0\t1\t0.01\nColorSpeed\t0.7\t0\t0\t0\nLightness\t0.5\t0\t0.1\t0.05\nSaturation\t0.9\t0\t0.1\t0.06\nBkHue\t0\t0\t0\t0\nBkLightness\t0\t0\t0\t0\nBkSaturation\t1\t0\t0\t0\n\n")),"Saturn",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t20\t0\t0\t0\t0.5\nPolySides\t50\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0.158\t0\t0\t0\t0.5\nSkewAngle\t0\t2\t3.14159\t0.01\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t0.1\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t10\t1\t10\t0.087\t0.5\nOrigin\t0.5 0.5\nDrawMode\t2\nMirror\t0\n\n")),"Shimmer",A.r(A.t("WHORLD1\nRingGrowth\t1.49\t0\t0\t0\nRingSpacing\t1\t1\t0\t0\nPolySides\t5\t6\t1\t0.01\nRotateSpeed\t0\t0\t0.00174533\t0.02\nAspectRatio\t0.2\t0\t0.33\t0.007\nSkewRadius\t0.25\t0\t0.24\t0.044\nSkewAngle\t0\t0\t3.14159\t0.02\nStarFactor\t0.25\t0\t0.75\t0.5\nColorSpeed\t1.5\t0\t0\t0\nLightness\t0.5\t0\t0.3\t0.02\nSaturation\t0.7\t0\t0.3\t0.03\nBkHue\t0\t0\t180\t0.01\nBkLightness\t0.1\t1\t0.2\t0.001\nBkSaturation\t0.45\t0\t0\t0\n\n")),"Stars",A.r(A.t("WHORLD1\nRingGrowth\t2\t0\t0\t0\nRingSpacing\t3\t0\t1\t1\nPolySides\t5\t2\t2\t0.005\nRotateSpeed\t0\t0\t0.01\t0.02\nAspectRatio\t0\t0\t0\t0\nSkewRadius\t0\t0\t0\t0\nSkewAngle\t0\t0\t0\t0\nColorSpeed\t1\t0\t0\t0\nStarFactor\t0\t0\t1\t0.2\n\n")),"Streaming",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t5\t0\t0\t0\t0.5\nPolySides\t50\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t2\t0\t0\t0\t0.5\nSkewAngle\t0\t2\t3.14159\t1\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t0.75\t1\t0.25\t0.011\t0.5\nLightness\t0.5\t1\t0.25\t0.041\t0.5\nSaturation\t0.75\t1\t0.25\t0.061\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.40625 0.477865\nDrawMode\t1\nMirror\t0\n\n")),"Tentacles",A.r(A.t("WHORLD1\nRingGrowth\t1.29\t0\t0\t0\nRingSpacing\t3\t0\t0\t0\nPolySides\t5\t6\t2\t0.017\nRotateSpeed\t0\t0\t0.0349066\t0.01\nAspectRatio\t0\t0\t2\t0.05\nSkewRadius\t0\t0\t0.5\t0.0052\nSkewAngle\t0\t0\t0.0174533\t0.03\nStarFactor\t0\t1\t0.2\t0.03\nColorSpeed\t0.5\t0\t0.1\t0.044\nLightness\t0.5\t0\t0\t0\nSaturation\t1\t0\t0\t0\nBkHue\t0\t0\t180\t0.017\nBkLightness\t0.1\t0\t0.1\t0.09\nBkSaturation\t0.7\t0\t0\t0\n\n")),"Wormhole",A.r(A.t("WHORLD1\nRingGrowth\t2\t0\t0\t0\t0.5\nRingSpacing\t40\t3\t20\t0.014\t0.5\nPolySides\t7\t6\t4\t0.003\t0.5\nRotateSpeed\t0\t0\t0.00174533\t0.01\t0.5\nAspectRatio\t0\t0\t1.5\t0.005\t0.5\nSkewRadius\t0\t0\t0.3\t0.02\t0.5\nSkewAngle\t0\t2\t3.14159\t0.001\t0.5\nStarFactor\t0\t1\t2\t0.0444\t0.5\nColorSpeed\t0.25\t0\t0\t0\t0.5\nLightness\t0.5\t1\t0.25\t0.0555\t0.5\nSaturation\t0.75\t1\t0.25\t0.0111\t0.5\nBkHue\t0\t2\t180\t0.005\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t1\t2\t0.0333\t0.5\nLineWidth\t20\t2\t20\t0.017\t0.5\nOrigin\t0.5 0.5\nDrawMode\t2\nMirror\t0\n\n")),"Custom",A.r(A.t("WHORLD1\nRingGrowth\t1\t0\t0\t0\t0.5\nRingSpacing\t5\t0\t0\t0\t0.5\nPolySides\t5\t0\t0\t0\t0.5\nRotateSpeed\t0\t0\t0\t0\t0.5\nAspectRatio\t0\t0\t0\t0\t0.5\nSkewRadius\t0\t0\t0\t0\t0.5\nSkewAngle\t0\t0\t0\t0\t0.5\nStarFactor\t0\t0\t0\t0\t0.5\nColorSpeed\t0.5\t0\t0\t0\t0.5\nLightness\t0.5\t0\t0\t0\t0.5\nSaturation\t1\t0\t0\t0\t0.5\nBkHue\t0\t0\t0\t0\t0.5\nBkLightness\t0\t0\t0\t0\t0.5\nBkSaturation\t1\t0\t0\t0\t0.5\nPinwheel\t0\t0\t0\t0\t0.5\nLineWidth\t1\t0\t0\t0\t0.5\nOrigin\t0.5 0.5\nDrawMode\t0\nMirror\t0\n\n"))],P.f,A.cr)},"e6","$get$e6",function(){var z=P.f
return P.a8(["std",P.a8(["r","requestFullscreen","x","exitFullscreen","e","fullscreenEnabled","l","fullscreenElement"],z,z),"ms",P.a8(["r","msRequestFullscreen","x","msExitFullscreen","e","msFullscreenEnabled","l","msFullscreenElement"],z,z),"webkit",P.a8(["r","webkitRequestFullscreen","x","webkitExitFullscreen","e","webkitFullscreenEnabled","l","webkitFullscreenElement"],z,z),"moz",P.a8(["r","mozRequestFullScreen","x","mozCancelFullScreen","e","mozFullScreenEnabled","l","mozFullScreenElement"],z,z)],z,[P.N,P.f,P.f])},"eq","$get$eq",function(){return W.eD("#fps")},"bu","$get$bu",function(){return H.i(W.eD("#area"),"$isca")},"ep","$get$ep",function(){return H.i(W.je().getElementById("loadfile"),"$isY")},"ao","$get$ao",function(){return P.hg(null)},"eu","$get$eu",function(){return A.r(P.bh(P.f,null))},"aq","$get$aq",function(){return Q.hz()},"by","$get$by",function(){return new A.hr(0,0,0)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["invocation","error","_",null,"stackTrace","e","o","index","closure","numberOfArguments","arg1","arg2","arg3","arg4","parameter","each","arg","callback","captureThis","self","arguments","timeMs","ev"]
init.types=[{func:1,ret:-1},{func:1,ret:P.n},{func:1,args:[,]},{func:1,ret:P.n,args:[P.f,P.f]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:P.n,args:[,]},{func:1,ret:-1,args:[P.a],opt:[P.L]},{func:1,ret:-1,args:[W.C]},{func:1,ret:P.n,args:[W.H]},{func:1,ret:-1,args:[P.a]},{func:1,ret:P.f,args:[P.E]},{func:1,ret:[P.J,,],args:[,]},{func:1,ret:P.n,args:[,,]},{func:1,ret:P.n,args:[P.aB,,]},{func:1,args:[,P.f]},{func:1,ret:P.f,args:[W.aX]},{func:1,ret:P.n,args:[W.a9]},{func:1,ret:-1,args:[P.f,P.f]},{func:1,ret:P.n,args:[{func:1,ret:-1}]},{func:1,args:[P.f]},{func:1,ret:P.ci,args:[,]},{func:1,ret:-1,args:[P.M]},{func:1,ret:P.aj,args:[,]},{func:1,ret:P.E,args:[P.E,P.a]},{func:1,ret:-1,args:[P.f]},{func:1,ret:P.n,args:[P.f,S.bi]},{func:1,ret:P.n,args:[,],opt:[,]},{func:1,ret:P.n,args:[W.aC]},{func:1,ret:P.n,args:[W.bg]},{func:1,ret:P.n,args:[W.C]},{func:1,ret:P.n,args:[P.f,,]},{func:1,ret:P.a,args:[,]},{func:1,ret:-1,args:[W.a9]},{func:1,ret:[P.ch,,],args:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.jF(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.c0=a.c0
Isolate.bW=a.bW
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(Q.ey,[])
else Q.ey([])})})()
//# sourceMappingURL=whorld.dart.js.map
