(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var o=n.getElementsByTagName("script");if(o.length)for(var a=o.length-1;a>-1&&!t;)t=o[a--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.d({},{R:()=>Y});const t={events:{},subscribe:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},unsubscribe:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter((e=>e!==t)))},publish:function(e,t){this.events[e]&&this.events[e].forEach((e=>{e(t)}))}};class n{constructor(e,t,n,o){this.title=e,this.dueDate=t,this.dueTime=n,this.projectType=o,this.done=!1,this.id=""}setId(e){this.id=e}}const o={todos:[],createTodo:(e,a,r,i)=>{if(""==e||""==a)return void console.log("cancelled");const d=new n(e,a,r,i);d.setId(o.generateId(5)),o.addTodo(d),t.publish("todoAdded",d),t.publish("todoUpdated",o.todos)},makeTodo:(e,t,a,r)=>{const i=new n(e,t,a,r);return i.setId(o.generateId(5)),i},generateId:e=>{let t="";for(let n=0;n<e;n++)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(52*Math.random()));return t+=Math.floor(9999*Math.random()),t},removeTasksFromProjects:e=>{o.todos=o.todos.filter((t=>t.projectType!==e.title)),console.log(o.todos),t.publish("todoUpdated",o.todos)},addTodo:e=>{o.todos.push(e)},removeTodo:e=>{o.todos=o.todos.filter((t=>t.id!==e.id)),t.publish("todoDeleted",e),t.publish("todoUpdated",o.todos)},getTodo:()=>o.todos,updateTodo:e=>{o.todos=e}};class a{constructor(e,t,n,o){this.title=e,this.dueDate=t,this.dueTime=n,this.description=o,this.tasks=[]}addToTasks(e){this.tasks.push(e)}updateTasks(e){this.tasks=e}removeTask(e){this.tasks=this.tasks.filter((t=>t.id!=e.id))}}const r={projectsList:[],createProject:(e,n,o,i)=>{if(""==e||""==i)return void console.log("cancelled");const d=new a(e,n,o,i);r.addToProjectsList(d),t.publish("projectsUpdated",r.projectsList)},addToProjectsList:e=>{r.projectsList.push(e)},getProjectsList:()=>r.projectsList,deleteProject:e=>{o.removeTasksFromProjects(e),r.projectsList=r.projectsList.filter((t=>t.title!=e.title)),console.log(r.projectsList),t.publish("projectsUpdated",r.projectsList)},addTaskToProjects:e=>{r.projectsList.map((t=>{t.title==e.projectType&&t.addToTasks(e)}))},removeTaskToProjects:e=>{r.projectsList.map((t=>{t.title==e.projectType&&t.removeTask(e)}))}},i=e.p+"images/0f46e2728eb984e21ce8.png",d=e.p+"images/b6ee280df76d0ad9baf6.png",s=e.p+"images/e2eafd3fc308275999c7.png",c=e.p+"images/ee8012eaa8ee3b465cc2.png",u=e.p+"images/9cbfa10524aa02ef2f6c.png",l=e.p+"images/87b20e1984bc83841fc2.png";var m={};function h(){return m}function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function f(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function g(e){f(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===p(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function v(e,t){f(2,arguments);var n=g(e),o=g(t),a=n.getTime()-o.getTime();return a<0?-1:a>0?1:a}function T(e,t){f(2,arguments);var n,o=g(e),a=g(t),r=v(o,a),i=Math.abs(function(e,t){f(2,arguments);var n=g(e),o=g(t);return 12*(n.getFullYear()-o.getFullYear())+(n.getMonth()-o.getMonth())}(o,a));if(i<1)n=0;else{1===o.getMonth()&&o.getDate()>27&&o.setDate(30),o.setMonth(o.getMonth()-r*i);var d=v(o,a)===-r;(function(e){f(1,arguments);var t=g(e);return function(e){f(1,arguments);var t=g(e);return t.setHours(23,59,59,999),t}(t).getTime()===function(e){f(1,arguments);var t=g(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}(t).getTime()})(g(e))&&1===i&&1===v(e,a)&&(d=!1),n=r*(i-Number(d))}return 0===n?0:n}var b={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},y="trunc";var k={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function w(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var M,E={date:w({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:w({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:w({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},D={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function L(e){return function(t,n){var o;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&e.formattingValues){var a=e.defaultFormattingWidth||e.defaultWidth,r=null!=n&&n.width?String(n.width):a;o=e.formattingValues[r]||e.formattingValues[a]}else{var i=e.defaultWidth,d=null!=n&&n.width?String(n.width):e.defaultWidth;o=e.values[d]||e.values[i]}return o[e.argumentCallback?e.argumentCallback(t):t]}}function S(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=n.width,a=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],r=t.match(a);if(!r)return null;var i,d=r[0],s=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(s)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(d))return n}(s):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(d))return n}(s);return i=e.valueCallback?e.valueCallback(c):c,{value:i=n.valueCallback?n.valueCallback(i):i,rest:t.slice(d.length)}}}const j={code:"en-US",formatDistance:function(e,t,n){var o,a=k[e];return o="string"==typeof a?a:1===t?a.one:a.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+o:o+" ago":o},formatLong:E,formatRelative:function(e,t,n,o){return D[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),o=n%100;if(o>20||o<10)switch(o%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:L({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:L({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:L({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:L({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:L({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(M={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(M.matchPattern);if(!n)return null;var o=n[0],a=e.match(M.parsePattern);if(!a)return null;var r=M.valueCallback?M.valueCallback(a[0]):a[0];return{value:r=t.valueCallback?t.valueCallback(r):r,rest:e.slice(o.length)}}),era:S({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:S({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:S({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:S({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:S({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function C(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function P(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var q=1440,W=2520,x=43200,A=86400;function H(e,t,n){var o,a;f(2,arguments);var r=h(),i=null!==(o=null!==(a=null==n?void 0:n.locale)&&void 0!==a?a:r.locale)&&void 0!==o?o:j;if(!i.formatDistance)throw new RangeError("locale must contain formatDistance property");var d=v(e,t);if(isNaN(d))throw new RangeError("Invalid time value");var s,c,u=C(C({},n),{addSuffix:Boolean(null==n?void 0:n.addSuffix),comparison:d});d>0?(s=g(t),c=g(e)):(s=g(e),c=g(t));var l,m=function(e,t,n){f(2,arguments);var o,a=function(e,t){return f(2,arguments),g(e).getTime()-g(t).getTime()}(e,t)/1e3;return((o=null==n?void 0:n.roundingMethod)?b[o]:b[y])(a)}(c,s),p=(P(c)-P(s))/1e3,k=Math.round((m-p)/60);if(k<2)return null!=n&&n.includeSeconds?m<5?i.formatDistance("lessThanXSeconds",5,u):m<10?i.formatDistance("lessThanXSeconds",10,u):m<20?i.formatDistance("lessThanXSeconds",20,u):m<40?i.formatDistance("halfAMinute",0,u):m<60?i.formatDistance("lessThanXMinutes",1,u):i.formatDistance("xMinutes",1,u):0===k?i.formatDistance("lessThanXMinutes",1,u):i.formatDistance("xMinutes",k,u);if(k<45)return i.formatDistance("xMinutes",k,u);if(k<90)return i.formatDistance("aboutXHours",1,u);if(k<q){var w=Math.round(k/60);return i.formatDistance("aboutXHours",w,u)}if(k<W)return i.formatDistance("xDays",1,u);if(k<x){var M=Math.round(k/q);return i.formatDistance("xDays",M,u)}if(k<A)return l=Math.round(k/x),i.formatDistance("aboutXMonths",l,u);if((l=T(c,s))<12){var E=Math.round(k/x);return i.formatDistance("xMonths",E,u)}var D=l%12,L=Math.floor(l/12);return D<3?i.formatDistance("aboutXYears",L,u):D<9?i.formatDistance("overXYears",L,u):i.formatDistance("almostXYears",L+1,u)}function F(e,t){return f(1,arguments),H(e,Date.now(),t)}const X={renderTodo:(e,t)=>{!function(){const n=document.createElement("h1");if(0==e.length)return n.innerHTML="Nothing to see here...",void t.appendChild(n);n.innerHTML="Tasks",t.appendChild(n)}(),e.forEach((e=>{const n=document.createElement("div");n.classList.add("container"),t.appendChild(n),X.makeTaskComponent(e,n)}))},makeTaskComponent:(e,t)=>{t.id=e.id;const n=document.createElement("input");n.id=e.id,n.setAttribute("type","checkbox"),e.done?n.checked=!0:n.checked=!1,n.addEventListener("click",(()=>{e.done=!e.done,e.done?t.classList.add("done"):t.classList.remove("done")})),e.done?t.classList.add("done"):t.classList.remove("done"),t.appendChild(n);const a=document.createElement("p");a.innerHTML=e.title,a.title="Title",t.appendChild(a);const r=document.createElement("p"),s=[e.dueDate,e.dueTime].join("T");r.innerHTML=F(new Date(s),{addSuffix:!0}),r.title="Due date",t.appendChild(r);const c=document.createElement("p");c.innerHTML=e.dueTime,c.title="Time",t.appendChild(c);const l=document.createElement("p");l.innerHTML=e.projectType,l.title="Project",t.appendChild(l);const m=document.createElement("img");m.classList.add("edit"),m.src=i,m.title="Edit",t.appendChild(m),m.addEventListener("click",(()=>{Y.editTask(e)}));const h=document.createElement("img");h.classList.add("delete"),h.src=d,h.title="Delete",t.appendChild(h),h.addEventListener("click",(()=>{o.removeTodo(e)}));const p=document.createElement("img");p.classList.add("expand"),p.src=u,p.title="Expand",t.appendChild(p),p.addEventListener("click",(()=>{!function(){const t=document.querySelector(".main"),n=document.createElement("div");n.classList.add("expanded"),t.appendChild(n),X.makeExpandedTaskComponent(e,n)}()}))},makeExpandedTaskComponent:(e,t)=>{t.id=e.id;const n=document.createElement("img");n.classList.add("backButton"),n.src=l,n.title="Back",t.appendChild(n),n.addEventListener("click",(()=>{X.removeExpandedComponent()}));const a=document.createElement("input");a.id=e.id+e.title,a.innerHTML="Checkbox",a.setAttribute("type","checkbox"),e.done?a.checked=!0:a.checked=!1,a.addEventListener("click",(()=>{e.done=!e.done,e.done?t.classList.add("done"):t.classList.remove("done")})),e.done?t.classList.add("done"):t.classList.remove("done"),t.appendChild(a);const r=document.createElement("p");r.innerHTML="Title: "+e.title,r.title="Title",t.appendChild(r);const s=document.createElement("p"),c=[e.dueDate,e.dueTime].join("T");s.innerHTML="Due: "+F(new Date(c),{addSuffix:!0}),s.title="Due date",t.appendChild(s);const u=document.createElement("p");u.innerHTML="Time: "+e.dueTime,u.title="Time",t.appendChild(u);const m=document.createElement("p");m.innerHTML="Project Type: "+e.projectType,m.title="Project",t.appendChild(m);const h=document.createElement("img");h.classList.add("edit"),h.src=i,h.title="Edit",t.appendChild(h),h.addEventListener("click",(()=>{Y.editTask(e)}));const p=document.createElement("img");p.classList.add("delete"),p.src=d,p.title="Delete",t.appendChild(p),p.addEventListener("click",(()=>{o.removeTodo(e)}))},editTaskComponent:(e,t)=>{X.makeTaskComponent(e,t)},removeExpandedComponent:()=>{document.querySelectorAll(".main > .expanded").forEach((e=>e.remove()))},renderProjects:(e,t)=>{0!=e.length&&e.forEach((e=>{const n=document.createElement("button");n.addEventListener("click",(()=>{!function(){const t=document.querySelector(".main");t.querySelectorAll("*").forEach((e=>e.remove()));const n=document.createElement("header");t.appendChild(n);const o=document.createElement("h1");o.innerHTML=e.title,n.appendChild(o);const a=document.createElement("div");n.appendChild(a);const i=document.createElement("img");i.src=c,a.appendChild(i),i.addEventListener("click",(()=>{Y.showTaskDialog(e.title)}));const s=document.createElement("img");s.src=d,a.appendChild(s),s.addEventListener("click",(()=>{r.deleteProject(e)}));const u=document.createElement("h5");u.innerHTML=e.description,t.appendChild(u);const l=document.createElement("p");l.innerHTML=e.dueDate,t.appendChild(l),e.tasks.length>0&&e.tasks.forEach((e=>{const t=document.querySelector(".main"),n=document.createElement("div");n.classList.add("container"),t.appendChild(n),X.makeTaskComponent(e,n)}))}()})),t.appendChild(n);const o=document.createElement("img");o.src=s,n.appendChild(o);const a=document.createElement("h4");a.innerHTML=e.title,n.appendChild(a)}))},renderDialogProjects:(e,t)=>{const n=document.createElement("legend");n.innerHTML="Select a project",t.appendChild(n);const o=document.createElement("select");function a(e){const t=document.createElement("option");t.setAttribute("value",e||"none"),t.innerHTML=e||"none",o.appendChild(t)}o.setAttribute("name","project"),t.appendChild(o),a(),0!=e.length&&e.forEach((e=>{a(e.title)}))}};function N(e){f(1,arguments);var t=g(e);return t.setHours(0,0,0,0),t}const Y=(()=>{const e=document.querySelector(".addTaskButton"),t=document.querySelector(".closeDialog"),n=document.querySelector(".submitDialog"),a=document.querySelector(".addProjectButton"),i=document.querySelector(".navButton > img"),d=document.querySelector(".sidebar > .header img"),s=document.querySelector(".addTaskDialog"),c=document.querySelector(".addTaskDialog #title"),u=document.querySelector(".addTaskDialog #dueDate"),l=document.querySelector(".addTaskDialog #dueTime"),m=document.querySelector(".addTaskDialog h1"),h=document.querySelector(".description"),p=document.querySelector(".addTaskDialog fieldset"),f=document.querySelector(".sidebarContainer");let g="",v="";function T(e){const t=document.querySelector(".addTaskDialog form fieldset select");null!==t&&t.querySelectorAll("option").forEach((t=>{t.value==e&&(t.selected=!0)}))}function b(){c.value="",u.value="",l.value=""}function y(){s.classList.add("active")}function k(){s.classList.remove("active")}function w(e){g="task",m.innerHTML="Add Task",M(),T(e),y()}function M(){const e=r.getProjectsList();!function(){const e=p.querySelectorAll("div");null!=e&&e.forEach((e=>e.remove()))}(),X.renderDialogProjects(e,p)}function E(e){if(null!==e){const t=e.querySelectorAll("*");null!=t&&t.forEach((e=>e.remove()))}}return i.addEventListener("click",(()=>{f.classList.add("active")})),d.addEventListener("click",(()=>{f.classList.remove("active")})),f.addEventListener("click",(()=>{f.classList.remove("active")})),e.addEventListener("click",(()=>{w()})),a.addEventListener("click",(()=>{g="project",m.innerHTML="Add Project",function(e){const t=document.createElement("label");t.setAttribute("for","description"),t.innerHTML="Description",e.appendChild(t);const n=document.createElement("textarea");n.id="description",e.appendChild(n)}(h),y()})),t.addEventListener("click",(()=>{!function(){const e=h.querySelectorAll("label, textarea");null!=e&&e.forEach((e=>e.remove()))}(),E(p),b(),k()})),n.addEventListener("click",(()=>{!function(){switch(g){case"task":!function(){const e=document.querySelector(".addTaskDialog form fieldset select");o.createTodo(c.value,u.value,l.value,e.value)}();break;case"project":!function(){const e=document.querySelector(".addTaskDialog #description");r.createProject(c.value,u.value,l.value,e.value)}();break;case"edit":!function(){const e=document.querySelector(".addTaskDialog form fieldset select"),t=document.querySelector(".main"),n=o.makeTodo(c.value,u.value,l.value,e.value),a=t.querySelector("#"+v);E(a),X.editTaskComponent(n,a)}()}}(),E(p),E(h),b(),k()})),{editTask:function(e){g="edit",m.innerHTML="Edit",v=e.id,c.value=e.title,u.value=e.dueDate,l.value=e.dueTime,M(),T(e.projectType),y()},showTaskDialog:w}})();(()=>{const e=document.querySelector(".tasksButton"),n=document.querySelector(".main"),a=document.querySelector(".projectsContainer"),i=document.querySelector(".sidebar > .nav > .todayButton"),d=document.querySelector(".sidebar > .nav > .upcomingButton");function s(e){c(n),X.renderTodo(e,n)}function c(e){let t=e.querySelectorAll("*");null!=t&&t.forEach((e=>e.remove()))}t.subscribe("todoUpdated",o.updateTodo),t.subscribe("todoUpdated",s),t.subscribe("todoAdded",r.addTaskToProjects),t.subscribe("projectsUpdated",(function(){const e=r.getProjectsList();c(a),X.renderProjects(e,a)})),t.subscribe("todoDeleted",r.removeTaskToProjects),r.createProject("Work","2023-12-20","12:00","Create a todo app"),r.createProject("Workout","2023-12-15","08:30","Do some cardio"),o.createTodo("Test","2023-12-01","12:24","Work"),o.createTodo("Test number two","2024-01-10","12:24","Workout"),o.createTodo("Tes Tes","2024-04-03","12:24","Work"),o.createTodo("More Tests","2023-12-09","12:24","Workout"),o.createTodo("Another!!","2023-12-17","12:24","Workout"),o.createTodo("School activity","2024-04-03","12:24","none"),o.createTodo("Practice","2023-12-03","12:24","none"),e.addEventListener("click",(()=>{s(o.getTodo())})),i.addEventListener("click",(()=>{s(function(e){const t=[];return e.map((e=>{(function(e){return f(1,arguments),function(e,t){f(2,arguments);var n=N(e),o=N(t);return n.getTime()===o.getTime()}(e,Date.now())})(new Date(e.dueDate))&&t.push(e)})),t}(o.getTodo()))})),d.addEventListener("click",(()=>{s(function(e){const t=[];return e.map((e=>{const n=function(e){return f(1,arguments),g(e).getTime()>Date.now()}(new Date(e.dueDate));n&&t.push(e)})),t}(o.getTodo()))}))})()})();