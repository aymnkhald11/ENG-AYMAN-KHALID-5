(function(){
 var k=DB.cur(),U=DB.users();
 if(!k){location.replace('login.html');return}
 var u=U[k];if(u.role==='admin'){location.replace('admin.html');return}
 var DAYS=['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
 var WK={
 'السبت':[['صدر: بنش بريس','4×10'],['صدر: انكلاين دمبل','4×10'],['تجميع كابل','3×12'],['تراي: بوش داون','3×12']],
 'الأحد':[['ظهر: لات بولداون','4×10'],['تجديف بار','4×10'],['سيتد رو','3×12'],['باي: دمبل كيرل','3×12']],
 'الاثنين':[['أرجل: سكوات','4×8'],['ليج بريس','4×12'],['ليج كيرل','3×12'],['سمانة','4×15']],
 'الثلاثاء':[['كتف: ضغط عسكري','4×10'],['رفرفة جانبي','4×15'],['رفرفة خلفي','3×15'],['شراجز','4×12']],
 'الأربعاء':[['صدر وتراي: ديبس','4×10'],['كروس أوفر','3×12'],['فرنش بريس','3×12'],['بطن','3×20']],
 'الخميس':[['ظهر وباي: ديدلفت','4×6'],['عقلة','3×فشل'],['هامر كيرل','3×12'],['كارديو 20 دقيقة','—']],
 'الجمعة':[['راحة','استشفاء'],['مشي خفيف أو إطالة','30 دقيقة']]};
 var ML={
 'تضخيم':[['فطار','4 بيض + شوفان + موزة'],['سناك','زبادي + مكسرات'],['غدا','أرز + صدور فراخ + سلطة'],['قبل التمرين','تمر + قهوة'],['بعد التمرين','شيك بروتين + نشويات'],['عشا','تونة أو لحم + بطاطس مشوية']],
 'تنشيف':[['فطار','3 بيض + توست أسمر'],['سناك','تفاحة + لوز'],['غدا','فراخ مشوية + خضار + أرز قليل'],['بعد التمرين','شيك بروتين'],['عشا','تونة + سلطة كبيرة']],
 'لياقة عامة':[['فطار','فول + بيض + عيش بلدي'],['سناك','فاكهة'],['غدا','فراخ أو سمك + أرز + سلطة'],['عشا','زبادي + جبنة قريش + خيار']]};
 var CL=[['الزومبا','السبت والاثنين','6:00 م'],['كروس فيت','الأحد والأربعاء','7:30 م'],['يوجا وإطالة','الثلاثاء','5:00 م'],['بوكسينج','الخميس','6:30 م']];
 var PK=[['fa-chart-line','قياس InBody','قياس شهري لتركيب الجسم',3],['fa-percent','خصم المكملات','حتى 15% على البروتين والكرياتين',3],['fa-user-check','متابعة شخصية','كابتن مخصص يتابع تقدمك',3],['fa-snowflake','تجميد الاشتراك','في السفر أو المرض بإذن الإدارة',3],['fa-hot-tub-person','الساونا','متاحة لأعضاء PREMIUM',4],['fa-user-plus','يوم تجربة لصديقك','مجانًا كل شهر',4],['fa-dumbbell','تمارين وحصص جماعية','متاحة لكل الباقات',1]];
 $('#hi').textContent='أهلًا '+(u.name||k).split(' ')[0]+' 👋';
 $('#out').onclick=function(){DB.logout();location.href='index.html'};
 var s=u.sub,st=$('#st'),ban=$('#banner');
 if(!s){
  st.className='st none';st.textContent='بدون اشتراك';
  $('#top').innerHTML='<section class="pn" style="grid-column:1/-1;text-align:center"><h2>لسه ما اشتركتش</h2><p class="mut" style="margin-bottom:16px">اختار باقتك عشان تفتحلك الجداول والمميزات.</p><a class="btn-s" href="buy.html">اشترك الآن</a></section>';
 }else{
  var i=subInfo(s),active=s.status==='active'&&!i.expired;
  var cls=s.status==='pending'?'wn':s.status==='rejected'?'bad':i.expired?'bad':'ok';
  st.className='st '+cls;st.textContent=s.status==='pending'?'قيد مراجعة الدفع':s.status==='rejected'?'تم رفض الطلب':i.expired?'الاشتراك منتهي':'اشتراك فعّال';
  if(s.status==='pending'){ban.hidden=false;ban.textContent='طلبك وصلنا وبنراجع الدفع. هيتفعل اشتراكك خلال 24 ساعة وتفتحلك كل المميزات.'}
  if(s.status==='rejected'){ban.hidden=false;ban.className='banner bad';ban.innerHTML='لم نتمكن من تأكيد الدفع. راجع بيانات التحويل وقدّم طلب جديد من زر "تجديد / ترقية".'}
  if(s.status==='active'&&i.expired){ban.hidden=false;ban.className='banner bad';ban.textContent='اشتراكك انتهى. جدده عشان ترجع للتمرين.'}
  if(active&&i.left<=7){ban.hidden=false;ban.textContent='باقي '+i.left+' أيام على انتهاء اشتراكك. جدده من زر "تجديد / ترقية".'}
  var pr=Math.max(0,Math.min(100,i.left/i.p.days*100)),rp=i.roundsLeft/i.p.rounds*100;
  $('#top').innerHTML=
   '<section class="pn"><h2><i class="fa-solid fa-id-card"></i> اشتراكي</h2><dl class="kv"><dt>الباقة</dt><dd>'+i.p.n+'</dd><dt>الهدف</dt><dd>'+esc(u.goal)+'</dd><dt>البداية</dt><dd>'+fmtDate(i.start)+'</dd><dt>الانتهاء</dt><dd>'+fmtDate(i.end)+'</dd><dt>المدفوع</dt><dd>'+esc(s.amount)+' ج.م ('+esc(s.method)+')</dd></dl></section>'+
   '<section class="pn"><h2><i class="fa-regular fa-clock"></i> الأيام المتبقية</h2><div class="big">'+(i.left>0?i.left:0)+' <small>يوم</small></div><div class="bar"><i style="width:'+pr+'%"></i></div><p class="mut">من '+i.p.days+' يوم</p></section>'+
   '<section class="pn"><h2><i class="fa-solid fa-stopwatch"></i> الـ Rounds</h2><div class="big">'+i.roundsLeft+' <small>باقي من '+i.p.rounds+'</small></div><div class="bar"><i style="width:'+rp+'%"></i></div><p class="mut">اتحضر '+(s.used||0)+' round</p></section>';
  var lvl=i.p.lvl;
  function lock(el,msg,btn){var d=document.createElement('div');d.className='lockmsg';d.innerHTML='<i class="fa-solid fa-lock"></i><p>'+msg+'</p>'+(btn?'<a class="btn-s" href="buy.html">'+btn+'</a>':'');el.classList.add('lock');el.appendChild(d)}
  if(!active){lock($('#wk'),'بتتفتح بعد تفعيل الاشتراك');lock($('#ml'),'بتتفتح بعد تفعيل الاشتراك')}
  else if(lvl<2)lock($('#ml'),'خطة الأكل متاحة من باقة STARTER PRO','ترقية الباقة');
  window._active=active;window._lvl=lvl;
 }
 function tabs(t,b,list,fn,sel){
  $(t).innerHTML=list.map(function(x,j){return '<button role="tab" aria-selected="'+(j===sel)+'">'+x+'</button>'}).join('');
  var set=function(j){$(b).innerHTML=fn(list[j]);$$('button',$(t)).forEach(function(e,q){e.setAttribute('aria-selected',q===j)})};
  $$('button',$(t)).forEach(function(e,j){e.onclick=function(){set(j)}});set(sel);
 }
 tabs('#wt','#wb',DAYS,function(d){return WK[d].map(function(x){return '<div class="row">'+x[0]+'<span>'+x[1]+'</span></div>'}).join('')},(new Date().getDay()+1)%7);
 var gs=Object.keys(ML);
 tabs('#mt','#mb',gs,function(g){return ML[g].map(function(x){return '<div class="row"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')},Math.max(0,gs.indexOf(u.goal)));
 $('#cls').innerHTML=CL.map(function(c){return '<div class="row"><b>'+c[0]+'</b><span>'+c[1]+' · '+c[2]+'</span></div>'}).join('');
 var lv=window._lvl||0,act=!!window._active;
 $('#perks').innerHTML=PK.map(function(p){var on=act&&lv>=p[3];return '<div class="perk'+(on?'':' off')+'"><i class="fa-solid '+p[0]+'"></i><div><b>'+p[1]+(on?'':' 🔒')+'</b><span>'+p[2]+'</span></div></div>'}).join('');
})();
