# Creates the demo user for the store screenshots: python3 store/capture/seed.py es|en
# Needs the API on localhost:8080. See store/README.md.
import json, sys, urllib.request, uuid
API="http://localhost:8080/v1"
lang=sys.argv[1]
T={
 "es":dict(name="Sofía",bank="Banco",cash="Efectivo",sav="Ahorros",food="Comida",bills="Servicios",trip="Viaje a la playa",
   salary="Sueldo",bus="Bus",sweets="Venta de postres",movie="Cine",market="Mercado",light="Luz y agua",lunch="Almuerzo",internet="Internet",gift="Regalo de cumpleaños",pharm="Farmacia",
   ferr="Ferretería Central",ferrD="Pintura y materiales",juan="Juan",juanD="Préstamo para la moto",carla="Carla",carlaD="Torta para su fiesta",pedro="Pedro",pedroD="Préstamo",
   pay1="Primer abono",pay2="Abono",inc="Gasolina que me prestó",biz="Postres Rosa",fam="Familia"),
 "en":dict(name="Sofia",bank="Bank",cash="Cash",sav="Savings",food="Food",bills="Bills",trip="Beach trip",
   salary="Paycheck",bus="Bus",sweets="Dessert sale",movie="Movies",market="Groceries",light="Power and water",lunch="Lunch",internet="Internet",gift="Birthday gift",pharm="Pharmacy",
   ferr="Central Hardware",ferrD="Paint and supplies",juan="John",juanD="Motorbike loan",carla="Carla",carlaD="Cake for her party",pedro="Peter",pedroD="Loan",
   pay1="First payment",pay2="Payment",inc="Gas money he lent me",biz="Rosa's Desserts",fam="Family"),
}[lang]
tok=None
def call(method,path,body=None):
    req=urllib.request.Request(API+path,method=method,data=json.dumps(body).encode() if body is not None else None,
        headers={"content-type":"application/json","accept-language":lang,**({"authorization":"Bearer "+tok} if tok else {})})
    try:
        with urllib.request.urlopen(req) as r: 
            t=r.read(); d=json.loads(t) if t else None
            return d['data'] if isinstance(d,dict) and 'data' in d and len(d)<=2 else d
    except urllib.error.HTTPError as e:
        print(method,path,e.code,e.read().decode()); raise
email=f"demo-{lang}@intenli.test"; pw="DemoPass2026!"
r=call("POST","/auth/register",dict(email=email,password=pw,name=T["name"],base_currency="USD"))
tok=r.get("access_token") or r["tokens"]["access_token"] if isinstance(r,dict) else None
call("PATCH","/users/me",dict(onboarded=True,locale=lang))
ws=call("GET","/workspaces"); ws=ws if isinstance(ws,list) else ws.get("workspaces") or ws.get("items")
W=ws[0]["id"]; P=f"/workspaces/{W}"
cats=call("GET",P+"/categories"); cats=cats if isinstance(cats,list) else cats.get("categories") or cats.get("items")
C={c["icon"]:c["id"] for c in cats}
def acct(n,t,o): a=call("POST",P+"/accounts",dict(name=n,type=t,currency="USD",opening_balance=o)); return a["id"]
bank=acct(T["bank"],"BANK","2850.00"); cash=acct(T["cash"],"CASH","180.00"); sav=acct(T["sav"],"SAVINGS","3200.00")
def box(**k):
    b=call("POST",P+"/boxes",k); return b.get("id") or b.get("box",{}).get("id")
food=box(kind="BUDGET",name=T["food"],icon="utensils",monthly_amount="300.00",category_ids=[C["utensils"]],deposit=True)
bills=box(kind="BUDGET",name=T["bills"],icon="zap",monthly_amount="90.00",category_ids=[C["zap"]],deposit=True)
def tx(typ,day,time,desc,amt,acc,cat=None,bx=None):
    call("POST",P+"/transactions",dict(type=typ,occurred_on=day,occurred_time=time,description=desc,amount=amt,account_id=acc,category_id=cat,box_id=bx))
tx("INCOME","2026-11-01","09:00",T["salary"],"1500.00",bank,C["briefcase"])
tx("EXPENSE","2026-11-03","18:40",T["market"],"58.35",bank,C["utensils"],food)
tx("EXPENSE","2026-11-06","10:10",T["light"],"42.15",bank,C["zap"],bills)
tx("EXPENSE","2026-11-08","13:00",T["lunch"],"46.55",cash,C["utensils"],food)
tx("EXPENSE","2026-11-10","20:30",T["internet"],"29.99",bank,C["repeat"])
tx("INCOME","2026-11-12","16:00",T["sweets"],"95.00",cash,C["store"])
tx("EXPENSE","2026-11-14","19:30",T["market"],"64.90",bank,C["utensils"],food)
tx("EXPENSE","2026-11-15","21:00",T["movie"],"15.99",bank,C["clapperboard"])
tx("EXPENSE","2026-11-17","11:20",T["pharm"],"12.40",cash,C["heart-pulse"])
tx("EXPENSE","2026-11-18","15:45",T["gift"],"35.00",bank,C["heart-handshake"])
tx("INCOME","2026-11-19","11:00",T["sweets"],"95.00",cash,C["store"])
tx("EXPENSE","2026-11-20","08:15",T["bus"],"6.75",cash,C["bus"])
def debt(**k):
    o=call("POST",P+"/obligations",k); return o.get("id") or o["obligation"]["id"]
call("POST",P+"/obligations",dict(origin="PURCHASE",direction="PAYABLE",contact_name=T["ferr"],currency="USD",amount="180.00",category_id=C["sofa"],description=T["ferrD"],occurred_on="2026-11-11",due_on="2026-11-25"))
juan=debt(origin="LOAN_BORROWED",direction="PAYABLE",contact_name=T["juan"],currency="USD",amount="450.00",account_id=bank,description=T["juanD"],occurred_on="2026-10-05",due_on="2026-12-05")
call("POST",P+f"/obligations/{juan}/increases",dict(kind="MONEY",amount="50.00",occurred_on="2026-10-20",description=T["inc"],account_id=cash))
call("POST",P+f"/obligations/{juan}/payments",dict(account_id=bank,amount="100.00",paid_on="2026-11-02",description=T["pay1"]))
call("POST",P+f"/obligations/{juan}/payments",dict(account_id=cash,amount="50.00",paid_on="2026-11-16",paid_time="17:30",description=T["pay2"]))
call("POST",P+"/obligations",dict(origin="SALE",direction="RECEIVABLE",contact_name=T["carla"],currency="USD",amount="60.00",category_id=C["store"],description=T["carlaD"],occurred_on="2026-11-13",due_on="2026-11-27"))
call("POST",P+"/obligations",dict(origin="LOAN_LENT",direction="RECEIVABLE",contact_name=T["pedro"],currency="USD",amount="75.00",account_id=cash,description=T["pedroD"],occurred_on="2026-11-09",due_on="2026-12-01"))
trip=box(kind="SAVINGS",name=T["trip"],icon="plane",goal_amount="1200.00",goal_date="2027-02-15")
call("POST",P+f"/boxes/{trip}/allocations",dict(amount="420.00",occurred_on="2026-11-02"))
call("POST","/workspaces",dict(name=T["biz"],type="BUSINESS",base_currency="USD"))
call("POST","/workspaces",dict(name=T["fam"],type="SHARED",base_currency="USD"))
print("ok",lang,W)
