/* ===== إعدادات الجيم (عدّل الأرقام هنا) ===== */
var CONFIG={phone:'01000000000',wa:'201000000000',instapay:'irongym@instapay',vodafone:'01000000000',address:'الإسكندرية، مصر',hours:'يوميًا من 6 ص حتى 12 م'};
/* ===== الباقات ===== */
var PLANS={
 starter:{n:'STARTER',price:450,days:30,rounds:12,label:'اشتراك شهر',lvl:1},
 pro:{n:'STARTER PRO',price:650,days:30,rounds:18,label:'اشتراك شهر',lvl:2},
 vip:{n:'VIP',price:1000,days:60,rounds:32,label:'اشتراك شهرين',lvl:3},
 premium:{n:'PREMIUM',price:1650,days:90,rounds:52,label:'اشتراك 3 شهور',lvl:4}
};
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function isoDay(off){var d=new Date();d.setDate(d.getDate()+off);return d.toISOString().slice(0,10)}
/* ===== التخزين (داخل المتصفح - نسخة تجريبية بدون سيرفر) ===== */
var DB={
 get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
 set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
 users:function(){
  var u=this.get('ig_users',null);
  if(!u){u={
   admin:{pw:'admin123',name:'الإدارة',role:'admin'},
   member:{pw:'1234',name:'أحمد محمد',phone:'01012345678',goal:'تضخيم',role:'member',
    sub:{plan:'pro',start:isoDay(-12),status:'active',amount:650,method:'فودافون كاش',tx:'DEMO',used:7},hist:[]}};
   this.set('ig_users',u)}
  return u},
 save:function(u){this.set('ig_users',u)},
 cur:function(){var k=this.get('ig_cur',null),u=this.users();return k&&u[k]?k:null},
 login:function(k){this.set('ig_cur',k)},
 logout:function(){this.set('ig_cur',null)}
};
function subInfo(s){
 var p=PLANS[s.plan],st=new Date(s.start),en=new Date(st);en.setDate(en.getDate()+p.days);
 var left=Math.ceil((en-new Date())/864e5);
 return {p:p,start:st,end:en,left:left,expired:left<=0,roundsLeft:Math.max(0,p.rounds-(s.used||0))};
}
function fmtDate(d){return d.toLocaleDateString('ar-EG',{day:'numeric',month:'long',year:'numeric'})}
function showMsg(el,t,ok){el.className='msg '+(ok?'ok':'err');el.textContent=t;el.focus&&el.focus()}
/* ===== الهيدر المشترك ===== */
(function(){
 var b=$('.burger'),m=$('.list1');
 if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  $$('a',m).forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');b.setAttribute('aria-expanded',false)})})}
 var mb=$('#memberBtn'),k=DB.cur();
 if(mb&&k){var u=DB.users()[k];mb.textContent=u.role==='admin'?'لوحة الإدارة':'لوحتي';mb.href=u.role==='admin'?'admin.html':'client.html'}
})();
