// Takes the raw store screenshots: node store/capture/capture.mjs <es|en> <out dir> [phone|tablet]
// Needs the API on :8080 and the app web build on :8081. See store/README.md.
import { chromium } from "playwright";
const [lang, out, mode="phone"] = process.argv.slice(2);
const API="http://localhost:8080/v1"; const email=`demo-${lang}@intenli.test`, password="DemoPass2026!";
const login = await (await fetch(API+"/auth/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email,password})})).json();
const H={authorization:"Bearer "+login.access_token};
const ws=(await (await fetch(API+"/workspaces",{headers:H})).json()).data; const W=ws.find(w=>w.type==="PERSONAL").id;
const obs=(await (await fetch(`${API}/workspaces/${W}/obligations`,{headers:H})).json()).data;
const juan=obs.find(o=>/Juan|John/.test(o.contact_name||o.contact?.name||JSON.stringify(o)));
const b = await chromium.launch();
const vp = mode==="tablet"?{width:1280,height:720}:{width:390,height:844};
const c = await b.newContext({viewport:vp,deviceScaleFactor:2,locale:lang==="es"?"es-EC":"en-US",timezoneId:"America/Guayaquil",colorScheme:"light"});
const p = await c.newPage();
await p.goto("http://localhost:8081/sign-in"); await p.waitForTimeout(2500);
await p.fill("input[type=email]",email); await p.fill("input[type=password]",password); await p.keyboard.press("Enter");
await p.waitForTimeout(4000);
const shots = { home:"/", debts:"/obligations", accounts:"/accounts", activity:"/activity", debt:`/obligations/${juan.id}` };
for (const [name,path] of Object.entries(shots)) {
  await p.goto("http://localhost:8081"+path); await p.waitForTimeout(3500);
  // Web only: the Fab measures its label without the synthetic bold, so a long label gets cut ("Agreg..."). Let it size to its text.
  await p.evaluate(()=>{ for (const f of document.querySelectorAll('div[style*="bottom: 24px"][style*="border-radius: 16px"]')) { f.style.width='auto'; for (const d of f.querySelectorAll('div')) { d.style.maxWidth='none'; d.style.overflow='visible'; d.style.textOverflow='clip'; if (!d.childElementCount && d.style.opacity!=='0') d.style.width='auto'; } } }); await p.waitForTimeout(300);
  await p.screenshot({path:`${out}/${name}.png`});
}
if (mode==="phone") {
  await p.goto("http://localhost:8081/"); await p.waitForTimeout(3000);
  await p.getByText("Personal",{exact:true}).first().click(); await p.waitForTimeout(1500);
  await p.screenshot({path:`${out}/spaces.png`});
}
await b.close();
