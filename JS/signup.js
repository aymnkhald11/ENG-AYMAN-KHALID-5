(function(){
 var m=$('#m');
 function go(){
  var n=$('#n').value.trim(),ph=$('#ph').value.trim(),k=$('#u').value.trim().toLowerCase(),p=$('#p').value,U=DB.users();
  if(!n||!ph||!k||!p)return showMsg(m,'املا كل الحقول.');
  if(!/^01\d{9}$/.test(ph))return showMsg(m,'رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01.');
  if(!/^[a-z0-9_]{3,20}$/.test(k))return showMsg(m,'اسم المستخدم من 3 إلى 20 حرف إنجليزي أو رقم أو _ بدون مسافات.');
  if(p.length<4)return showMsg(m,'كلمة المرور لازم تكون 4 حروف على الأقل.');
  if(U[k])return showMsg(m,'اسم المستخدم ده مستخدم قبل كده. اختار اسم تاني.');
  U[k]={pw:p,name:n,phone:ph,role:'member',goal:'لياقة عامة',hist:[]};DB.save(U);DB.login(k);
  location.href='buy.html';
 }
 $('#go').onclick=go;
 document.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
})();
