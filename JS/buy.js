(function(){
 var m=$('#m'),k=DB.cur(),U=DB.users(),me=k?U[k]:null;
 var qp=new URLSearchParams(location.search).get('plan');
 var sel=PLANS[qp]?qp:'pro';
 $('#pp').innerHTML=Object.keys(PLANS).map(function(id){var p=PLANS[id];
  return '<div class="pp"><input type="radio" name="plan" id="pl-'+id+'" value="'+id+'"'+(id===sel?' checked':'')+'><label for="pl-'+id+'"><b>'+p.n+'</b><span>'+p.label+' · '+p.rounds+' round</span><em>'+p.price+' ج.م</em></label></div>'}).join('');
 $('#start').value=isoDay(0);
 if(me){ // مسجل دخول: نخفي بيانات الحساب ونملا الباقي
  $('#acc').style.display='none';$('#payT').textContent='3. الدفع';
  $('#n').value=me.name||'';$('#ph').value=me.phone||'';
  if(me.goal)$('#goal').value=me.goal;
 }
 function plan(){return PLANS[$('input[name=plan]:checked').value]}
 var amtTouched=false;$('#amt').addEventListener('input',function(){amtTouched=true});
 function upd(){
  var p=plan(),meth=$('#meth').value;
  if(!amtTouched)$('#amt').value=p.price;
  $('#sum').innerHTML='<dt>الباقة</dt><dd>'+p.n+'</dd><dt>المدة</dt><dd>'+p.label+'</dd><dt>الحصص</dt><dd>'+p.rounds+' round</dd>';
  $('#tot').textContent='الإجمالي: '+p.price+' ج.م';
  $('#payInfo').innerHTML=meth==='فودافون كاش'?'حوّل <b>'+p.price+' ج.م</b> على فودافون كاش: <b dir="ltr">'+CONFIG.vodafone+'</b> ثم اكتب بياناتك فوق.':
   meth==='إنستاباي'?'حوّل <b>'+p.price+' ج.م</b> على إنستاباي: <b dir="ltr">'+CONFIG.instapay+'</b> ثم اكتب بياناتك فوق.':
   'ادفع <b>'+p.price+' ج.م</b> كاش في استقبال الجيم خلال 48 ساعة من التسجيل.';
 }
 $$('input[name=plan]').forEach(function(r){r.onchange=upd});$('#meth').onchange=upd;upd();
 $('#go').onclick=function(){
  var n=$('#n').value.trim(),ph=$('#ph').value.trim(),amt=+$('#amt').value,meth=$('#meth').value,from=$('#from').value.trim(),tx=$('#tx').value.trim(),key=k;
  if(!n||!ph)return showMsg(m,'اكتب اسمك ورقم موبايلك.');
  if(!/^01\d{9}$/.test(ph))return showMsg(m,'رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01.');
  if(!amt||amt<0)return showMsg(m,'اكتب المبلغ المدفوع.');
  if(meth!=='كاش في الجيم'&&!from&&!tx)return showMsg(m,'اكتب رقم المحوّل منه أو رقم العملية عشان نراجع الدفع.');
  if(!me){
   key=$('#u').value.trim().toLowerCase();var pw=$('#pw').value;
   if(!/^[a-z0-9_]{3,20}$/.test(key))return showMsg(m,'اسم المستخدم من 3 إلى 20 حرف إنجليزي أو رقم أو _ بدون مسافات.');
   if(pw.length<4)return showMsg(m,'كلمة المرور لازم تكون 4 حروف على الأقل.');
   if(U[key])return showMsg(m,'اسم المستخدم ده مستخدم قبل كده. اختار اسم تاني أو سجّل دخول.');
   U[key]={pw:pw,role:'member',hist:[]};
  }
  var u=U[key];u.name=n;u.phone=ph;u.age=$('#age').value;u.goal=$('#goal').value;
  if(u.sub)(u.hist=u.hist||[]).push(u.sub);
  u.sub={plan:plan()&&$('input[name=plan]:checked').value,start:$('#start').value||isoDay(0),status:'pending',amount:amt,method:meth,from:from,tx:tx,used:0,at:new Date().toISOString()};
  DB.save(U);DB.login(key);
  $('#wrap').innerHTML='<div class="ok-box"><i class="fa-solid fa-circle-check"></i><h2>تم استلام طلب اشتراكك</h2><p class="sub">هتتفعل عضويتك بعد مراجعة الدفع. تقدر تتابع حالتك من لوحتك.</p><a class="btn-main" style="display:inline-flex;align-items:center;justify-content:center;max-width:260px" href="client.html">الذهاب للوحتي</a></div>';
  window.scrollTo(0,0);
 };
})();
