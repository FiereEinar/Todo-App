(()=>{"use strict";var e={d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var a=n.getElementsByTagName("script");if(a.length)for(var o=a.length-1;o>-1&&!t;)t=a[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),e.d({},{R:()=>W});const t={events:{},subscribe:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)},unsubscribe:function(e,t){this.events[e]&&(this.events[e]=this.events[e].filter((e=>e!==t)))},publish:function(e,t){this.events[e]&&this.events[e].forEach((e=>{e(t)}))}};class n{constructor(e,t,n,a){this.title=e,this.dueDate=t,this.dueTime=n,this.projectType=a,this.done=!1,this.id=""}setId(e){this.id=e}}const a={todos:[],createTodo:(e,o,r,i)=>{if(""==e||""==o)return void console.log("cancelled");const s=new n(e,o,r,i);s.setId(a.generateId(5)),a.addTodo(s),t.publish("todoAdded",s),t.publish("todoUpdated",a.todos)},makeTodo:(e,t,o,r)=>{const i=new n(e,t,o,r);return i.setId(a.generateId(5)),i},generateId:e=>{let t="";for(let n=0;n<e;n++)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(52*Math.random()));return t+=Math.floor(9999*Math.random()),t},addTodo:e=>{a.todos.push(e)},removeTodo:e=>{a.todos=a.todos.filter((t=>t.title!==e))},getTodo:()=>a.todos,updateTodo:e=>{a.todos=e}},o=e.p+"images/0f46e2728eb984e21ce8.png",r=e.p+"images/b6ee280df76d0ad9baf6.png",i=e.p+"images/e2eafd3fc308275999c7.png",s=e.p+"images/ee8012eaa8ee3b465cc2.png";var d={};function c(){return d}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function m(e){l(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===u(e)&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function h(e,t){l(2,arguments);var n=m(e),a=m(t),o=n.getTime()-a.getTime();return o<0?-1:o>0?1:o}function f(e,t){l(2,arguments);var n,a=m(e),o=m(t),r=h(a,o),i=Math.abs(function(e,t){l(2,arguments);var n=m(e),a=m(t);return 12*(n.getFullYear()-a.getFullYear())+(n.getMonth()-a.getMonth())}(a,o));if(i<1)n=0;else{1===a.getMonth()&&a.getDate()>27&&a.setDate(30),a.setMonth(a.getMonth()-r*i);var s=h(a,o)===-r;(function(e){l(1,arguments);var t=m(e);return function(e){l(1,arguments);var t=m(e);return t.setHours(23,59,59,999),t}(t).getTime()===function(e){l(1,arguments);var t=m(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}(t).getTime()})(m(e))&&1===i&&1===h(e,o)&&(s=!1),n=r*(i-Number(s))}return 0===n?0:n}var p={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}},g="trunc";var v={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function b(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var y,T={date:b({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:b({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:b({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},w={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function M(e){return function(t,n){var a;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,r=null!=n&&n.width?String(n.width):o;a=e.formattingValues[r]||e.formattingValues[o]}else{var i=e.defaultWidth,s=null!=n&&n.width?String(n.width):e.defaultWidth;a=e.values[s]||e.values[i]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function k(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.width,o=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],r=t.match(o);if(!r)return null;var i,s=r[0],d=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(d)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(s))return n}(d):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(s))return n}(d);return i=e.valueCallback?e.valueCallback(c):c,{value:i=n.valueCallback?n.valueCallback(i):i,rest:t.slice(s.length)}}}const S={code:"en-US",formatDistance:function(e,t,n){var a,o=v[e];return a="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:T,formatRelative:function(e,t,n,a){return w[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:M({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:M({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:M({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:M({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:M({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(y={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(y.matchPattern);if(!n)return null;var a=n[0],o=e.match(y.parsePattern);if(!o)return null;var r=y.valueCallback?y.valueCallback(o[0]):o[0];return{value:r=t.valueCallback?t.valueCallback(r):r,rest:e.slice(a.length)}}),era:k({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:k({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:k({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:k({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:k({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function D(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function E(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var j=43200;function P(e,t,n){var a,o;l(2,arguments);var r=c(),i=null!==(a=null!==(o=null==n?void 0:n.locale)&&void 0!==o?o:r.locale)&&void 0!==a?a:S;if(!i.formatDistance)throw new RangeError("locale must contain formatDistance property");var s=h(e,t);if(isNaN(s))throw new RangeError("Invalid time value");var d,u,v=D(D({},n),{addSuffix:Boolean(null==n?void 0:n.addSuffix),comparison:s});s>0?(d=m(t),u=m(e)):(d=m(e),u=m(t));var b,y=function(e,t,n){l(2,arguments);var a,o=function(e,t){return l(2,arguments),m(e).getTime()-m(t).getTime()}(e,t)/1e3;return((a=null==n?void 0:n.roundingMethod)?p[a]:p[g])(o)}(u,d),T=(E(u)-E(d))/1e3,w=Math.round((y-T)/60);if(w<2)return null!=n&&n.includeSeconds?y<5?i.formatDistance("lessThanXSeconds",5,v):y<10?i.formatDistance("lessThanXSeconds",10,v):y<20?i.formatDistance("lessThanXSeconds",20,v):y<40?i.formatDistance("halfAMinute",0,v):y<60?i.formatDistance("lessThanXMinutes",1,v):i.formatDistance("xMinutes",1,v):0===w?i.formatDistance("lessThanXMinutes",1,v):i.formatDistance("xMinutes",w,v);if(w<45)return i.formatDistance("xMinutes",w,v);if(w<90)return i.formatDistance("aboutXHours",1,v);if(w<1440){var M=Math.round(w/60);return i.formatDistance("aboutXHours",M,v)}if(w<2520)return i.formatDistance("xDays",1,v);if(w<j){var k=Math.round(w/1440);return i.formatDistance("xDays",k,v)}if(w<86400)return b=Math.round(w/j),i.formatDistance("aboutXMonths",b,v);if((b=f(u,d))<12){var P=Math.round(w/j);return i.formatDistance("xMonths",P,v)}var C=b%12,L=Math.floor(b/12);return C<3?i.formatDistance("aboutXYears",L,v):C<9?i.formatDistance("overXYears",L,v):i.formatDistance("almostXYears",L+1,v)}class C{constructor(e,t,n,a){this.title=e,this.dueDate=t,this.dueTime=n,this.description=a,this.tasks=[]}addToTasks(e){this.tasks.push(e)}}const L={projectsList:[],createProject:(e,n,a,o)=>{if(""==e||""==o)return void console.log("cancelled");const r=new C(e,n,a,o);L.addToProjectsList(r),t.publish("projectsUpdated",L.projectsList)},addToProjectsList:e=>{L.projectsList.push(e)},getProjectsList:()=>L.projectsList,addTaskToProjects:e=>{L.projectsList.map((t=>{t.title==e.projectType&&t.addToTasks(e)}))}},q={renderTodo:(e,t)=>{!function(){const n=document.createElement("h1");if(0==e.length)return n.innerHTML="Nothing to see here...",void t.appendChild(n);n.innerHTML="Tasks",t.appendChild(n)}(),e.forEach((e=>{const n=document.createElement("div");n.classList.add("container"),t.appendChild(n),q.makeTaskComponent(e,n)}))},makeTaskComponent:(e,t)=>{t.id=e.id;const n=Math.floor(999*Math.random()),a=document.createElement("input");a.id="screenValue"+n,a.setAttribute("type","checkbox"),e.done?a.checked=!0:a.checked=!1,a.addEventListener("click",(()=>{e.done=!e.done,e.done?t.classList.add("done"):t.classList.remove("done")})),e.done?t.classList.add("done"):t.classList.remove("done"),t.appendChild(a);const i=document.createElement("input");i.id="name"+n,i.value=e.title,i.setAttribute("type","text"),i.disabled=!0,t.appendChild(i);const s=[e.dueDate,e.dueTime].join("T"),d=document.createElement("input");d.id="date"+n,d.value=function(e,t){return l(1,arguments),P(e,Date.now(),t)}(new Date(s),{addSuffix:!0}),d.setAttribute("type","text"),d.disabled=!0,t.appendChild(d);const c=document.createElement("input");c.id="time"+n,c.value=e.dueTime,c.setAttribute("type","time"),c.disabled=!0,t.appendChild(c);const u=document.createElement("img");u.classList.add("edit"),u.src=o,t.appendChild(u),u.addEventListener("click",(()=>{W.editTask(e)}));const m=document.createElement("img");m.classList.add("delete"),m.src=r,t.appendChild(m)},editTaskComponent:(e,t)=>{q.makeTaskComponent(e,t)},renderProjects:(e,t)=>{0!=e.length&&e.forEach((e=>{const n=document.createElement("button");n.addEventListener("click",(function(){const t=document.querySelector(".main");t.querySelectorAll("*").forEach((e=>e.remove()));const n=document.createElement("header");t.appendChild(n);const a=document.createElement("h1");a.innerHTML=e.title,n.appendChild(a);const o=document.createElement("img");o.src=s,n.appendChild(o),o.addEventListener("click",(()=>{W.showTaskDialog(e.title)}));const r=document.createElement("h5");r.innerHTML=e.description,t.appendChild(r);const i=document.createElement("p");i.innerHTML=e.dueDate,t.appendChild(i),e.tasks.length>0&&e.tasks.forEach((e=>{const t=document.querySelector(".main"),n=document.createElement("div");n.classList.add("container"),t.appendChild(n),q.makeTaskComponent(e,n)}))})),t.appendChild(n);const a=document.createElement("img");a.src=i,n.appendChild(a);const o=document.createElement("h4");o.innerHTML=e.title,n.appendChild(o)}))},renderDialogProjects:(e,t)=>{if(0==e.length)return;const n=document.createElement("legend");n.innerHTML="Select a project",t.appendChild(n);const a=document.createElement("select");function o(e){const t=document.createElement("option");t.setAttribute("value",e||"none"),t.innerHTML=e||"none",a.appendChild(t)}a.setAttribute("name","project"),t.appendChild(a),o(),e.forEach((e=>{o(e.title)}))}},W=(()=>{const e=document.querySelector(".addTaskButton"),t=document.querySelector(".closeDialog"),n=document.querySelector(".submitDialog"),o=document.querySelector(".addProjectButton"),r=document.querySelector(".navButton > img"),i=document.querySelector(".sidebar > .header img"),s=document.querySelector(".addTaskDialog"),d=document.querySelector(".addTaskDialog #title"),c=document.querySelector(".addTaskDialog #dueDate"),u=document.querySelector(".addTaskDialog #dueTime"),l=document.querySelector(".addTaskDialog h1"),m=document.querySelector(".description"),h=document.querySelector(".addTaskDialog fieldset"),f=document.querySelector(".sidebarContainer");let p="",g="";function v(e){document.querySelector(".addTaskDialog form fieldset select").querySelectorAll("option").forEach((t=>{t.value==e&&(t.selected=!0)}))}function b(){d.value="",c.value="",u.value=""}function y(){s.classList.add("active")}function T(){s.classList.remove("active")}function w(e){p="task",l.innerHTML="Add Task",M(),v(e),y()}function M(){const e=L.getProjectsList();!function(){const e=h.querySelectorAll("div");null!=e&&e.forEach((e=>e.remove()))}(),q.renderDialogProjects(e,h)}function k(e){if(null!==e){const t=e.querySelectorAll("*");null!=t&&t.forEach((e=>e.remove()))}}return r.addEventListener("click",(()=>{f.classList.add("active")})),i.addEventListener("click",(()=>{f.classList.remove("active")})),f.addEventListener("click",(()=>{f.classList.remove("active")})),e.addEventListener("click",(()=>{w()})),o.addEventListener("click",(()=>{p="project",l.innerHTML="Add Project",function(e){const t=document.createElement("label");t.setAttribute("for","description"),t.innerHTML="Description",e.appendChild(t);const n=document.createElement("textarea");n.id="description",e.appendChild(n)}(m),y()})),t.addEventListener("click",(()=>{!function(){const e=m.querySelectorAll("label, textarea");null!=e&&e.forEach((e=>e.remove()))}(),k(h),b(),T()})),n.addEventListener("click",(()=>{!function(){switch(p){case"task":!function(){const e=document.querySelector(".addTaskDialog form fieldset select");a.createTodo(d.value,c.value,u.value,e.value)}();break;case"project":!function(){const e=document.querySelector(".addTaskDialog #description");L.createProject(d.value,c.value,u.value,e.value)}();break;case"edit":!function(){const e=document.querySelector(".main"),t=a.makeTodo(d.value,c.value,u.value,select.value),n=e.querySelector("#"+g);k(n),q.editTaskComponent(t,n)}()}}(),k(h),k(m),b(),T()})),{editTask:function(e){p="edit",l.innerHTML="Edit",g=e.id,d.value=e.title,c.value=e.dueDate,u.value=e.dueTime,M(),v(e.projectType),y()},showTaskDialog:w}})();(()=>{const e=document.querySelector(".tasksButton"),n=document.querySelector(".main"),o=document.querySelector(".projectsContainer");function r(){const e=a.getTodo();i(n),q.renderTodo(e,n)}function i(e){e.querySelectorAll("*").forEach((e=>e.remove()))}t.subscribe("todoUpdated",a.updateTodo),t.subscribe("todoUpdated",r),t.subscribe("todoAdded",L.addTaskToProjects),t.subscribe("projectsUpdated",(function(){const e=L.getProjectsList();i(o),q.renderProjects(e,o)})),L.createProject("Work","2023-12-20","12:00","Create a todo app"),L.createProject("Workout","2023-12-15","08:30","Do some cardio"),a.createTodo("Test","2023-12-01","12:24","Work"),a.createTodo("Test number two","2023-12-03","12:24","Workout"),e.addEventListener("click",(()=>{r()}))})()})();