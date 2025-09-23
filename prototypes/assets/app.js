function $(s,root=document){return root.querySelector(s)};function $all(s,root=document){return Array.from(root.querySelectorAll(s))}
function toast(msg){const a=$('.toast-area')||Object.assign(document.body.appendChild(document.createElement('div')),{className:'toast-area'});const t=document.createElement('div');t.className='toast';t.textContent=msg;a.appendChild(t);setTimeout(()=>t.remove(),2500)}
function format(n){return n.toLocaleString(undefined,{maximumFractionDigits:2})}

function initNav(){const path=location.pathname.split('/').pop()||'index.html';$all('nav a').forEach(a=>{if(a.getAttribute('href')===path)a.classList.add('active')})}

function initTransactions(){const r=$('[data-page="transactions"]');if(!r)return;const rows=$all('tbody tr',r);const q=$('#tx-search',r);const typeSel=$('#tx-type',r);const from=$('#tx-from',r);const to=$('#tx-to',r);
function apply(){const query=q.value.toLowerCase();const type=typeSel.value;const fromD=from.value?new Date(from.value):null;const toD=to.value?new Date(to.value):null;rows.forEach(tr=>{const t=tr.dataset.type;const d=new Date(tr.dataset.date);const text=tr.textContent.toLowerCase();let ok=true;if(type && type!==t) ok=false; if(query && !text.includes(query)) ok=false; if(fromD && d<fromD) ok=false; if(toD && d>toD) ok=false; tr.style.display=ok?'':'none'})}
[q,typeSel,from,to].forEach(el=>el.addEventListener('input',apply));$('#tx-clear',r).addEventListener('click',()=>{q.value='';typeSel.value='';from.value='';to.value='';apply();toast('Filters cleared')});apply()}

function initAnomalies(){const r=$('[data-page="anomalies"]');if(!r)return;$('#resolve-all',r).addEventListener('click',()=>{$all('tbody tr',r).forEach(tr=>{tr.dataset.status='resolved';tr.querySelector('.status').textContent='Resolved';tr.querySelector('.status').className='status badge success'});toast('All anomalies resolved')});$all('.resolve',r).forEach(btn=>btn.addEventListener('click',e=>{const tr=e.target.closest('tr');tr.dataset.status='resolved';tr.querySelector('.status').textContent='Resolved';tr.querySelector('.status').className='status badge success';toast('Issue resolved')}))}

function initWallets(){const r=$('[data-page="wallets"]');if(!r)return;$('#connect-form',r).addEventListener('submit',e=>{e.preventDefault();const n=$('#w-name',r).value.trim();const t=$('#w-type',r).value; if(!n){toast('Enter account name');return} const tbody=$('#wallet-rows',r);const tr=document.createElement('tr');tr.innerHTML=`<td>${n}</td><td>${t}</td><td><span class="badge success">Connected</span></td><td>${new Date().toISOString().slice(0,10)}</td>`;tbody.prepend(tr);e.target.reset();toast('Wallet connected')})}

function initIRS(){const r=$('[data-page="irs"]');if(!r)return;$('#gen8949',r).addEventListener('click',()=>{toast('Generating Form 8949...');setTimeout(()=>toast('Form 8949 ready to review'),1200)})}

function initRules(){const r=$('[data-page="rules"]');if(!r)return;$('#new-rule',r).addEventListener('click',()=>{const tbody=$('#rule-rows',r);const id=tbody.children.length+1;const tr=document.createElement('tr');tr.innerHTML=`<td>R-${id}</td><td>Amount > $10k</td><td>Flag as Large Trade</td><td><button class="danger">Delete</button></td>`;tbody.appendChild(tr);toast('Rule added')});$all('#rule-rows .danger',r).forEach(b=>b.addEventListener('click',e=>{e.target.closest('tr').remove();toast('Rule removed')}))}

function initExports(){const r=$('[data-page="exports"]');if(!r)return;$('#run-export',r).addEventListener('click',()=>{const log=$('#export-log',r);log.textContent='Starting export...';let i=0;const steps=['Bundling data...','Calculating gains...','Generating CSV...','Uploading...','Done'];const int=setInterval(()=>{log.textContent=steps[i++];if(i>=steps.length){clearInterval(int);toast('Export completed')}} ,600)})}

function initGainLoss(){const r=$('[data-page="gainloss"]');if(!r)return;const method=$('#method',r);const out=$('#gl-summary',r);$('#calc',r).addEventListener('click',()=>{const gain=Math.random()*5000-1000;out.textContent=`Method: ${method.value.toUpperCase()} • Net ${gain>=0?'Gain':'Loss'}: $${format(Math.abs(gain))}`;toast('Calculation complete')})}

document.addEventListener('DOMContentLoaded',()=>{initNav();initTransactions();initAnomalies();initWallets();initIRS();initRules();initExports();initGainLoss();});
