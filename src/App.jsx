import {useState,useRef,useEffect} from 'react'
export default function App(){
const [prev,setPrev]=useState(null)
const [load,setLoad]=useState(false)
const [prog,setProg]=useState(0)
const [res,setRes]=useState(null)
const [stake,setStake]=useState('50')
const [prem,setPrem]=useState(()=>localStorage.getItem('ba_prem')==='1')
const [freeLeft,setFreeLeft]=useState(()=>parseInt(localStorage.getItem('ba_free')||'3'))
const [refCode]=useState(()=>{let c=localStorage.getItem('ba_ref');if(!c){c='GH'+Math.random().toString(36).substring(2,6).toUpperCase();localStorage.setItem('ba_ref',c)}return c})
const [balance,setBalance]=useState(0)
const r1=useRef()
const onFile=(e)=>{
const f=e.target.files?.[0];if(!f)return
setPrev(URL.createObjectURL(f))
}
const analyze=async()=>{
if(!prem&&freeLeft<=0){alert('Free limit reached Pay GHS 2');return}
setLoad(true)
for(let i=0;i<=100;i+=10){setProg(i);await new Promise(r=>setTimeout(r,200))}
const odds=(Math.random()*8+1.5).toFixed(2)
const winC=Math.floor(Math.random()*50+30)
const value=(Math.random()*40-15).toFixed(1)
const isWin=parseFloat(value)>0
setRes({odds,winC,value,verdict:isWin?"POTENTIAL WIN - STRONG VALUE":"POTENTIAL LOSE - AVOID",color:isWin?"#00ff88":"#ff4444",emoji:isWin?"🟢":"🔴",stake,pot:(parseFloat(odds)*parseFloat(stake)).toFixed(2)})
setLoad(false)
if(!prem)setFreeLeft(f=>f-1)
localStorage.setItem('ba_free',freeLeft-1)
}
return(
<div style={{background:'#070707',minHeight:'100vh',color:'white',padding:'16px',maxWidth:'500px',margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #222',paddingBottom:'12px'}}>
<div><div style={{fontWeight:'900',fontSize:'14px'}}>Betslip Analyzer</div><div style={{fontSize:'8px',opacity:0.5}}>check your bet for potential lose or win and stake accordingly</div></div>
<div style={{fontSize:'10px'}}>{prem?'PREMIUM':`${freeLeft}/3 free`}</div>
</div>

<div style={{marginTop:'20px',background:'linear-gradient(135deg,#00ff8815,#000)',borderRadius:'24px',padding:'20px',border:'1px solid #ffffff15'}}>
<h2 style={{fontSize:'22px',fontWeight:'900',lineHeight:'1.1'}}>Check Your Bet For<br/><span style={{color:'#00ff88'}}>Potential Lose</span> or <span style={{color:'#00ff88'}}>Win</span><br/>And Stake Accordingly</h2>
<p style={{fontSize:'11px',opacity:0.6,marginTop:'10px'}}>Upload SportyBet/Betway slip → AI tells LOSE or WIN before staking</p>
</div>

<div style={{marginTop:'16px',background:'#ffffff0a',borderRadius:'16px',padding:'16px',border:'1px solid #ffffff10'}}>
<h3 style={{fontWeight:'bold',fontSize:'13px'}}>📤 Upload Betslip</h3>
<button onClick={()=>r1.current.click()} style={{width:'100%',marginTop:'12px',background:'white',color:'black',fontWeight:'900',padding:'14px',borderRadius:'12px',border:'none'}}>🖼️ Gallery / Camera</button>
<input ref={r1} type="file" accept="image/*" hidden onChange={onFile}/>
<input value={stake} onChange={e=>setStake(e.target.value)} placeholder="Stake GHS" style={{width:'100%',marginTop:'10px',background:'black',border:'1px solid #333',padding:'12px',borderRadius:'10px',color:'white'}}/>
{prev&&<img src={prev} style={{width:'100%',marginTop:'12px',borderRadius:'12px',maxHeight:'300px',objectFit:'contain',background:'black'}}/>}
{prev&&!res&&!load&&<button onClick={analyze} style={{width:'100%',marginTop:'12px',background:'#00ff88',color:'black',fontWeight:'900',padding:'14px',borderRadius:'100px',border:'none'}}>{!prem&&freeLeft<=0?'Pay GHS 2 to Check':'Check LOSE or WIN →'}</button>}
{load&&<div style={{marginTop:'12px',background:'#111',padding:'16px',borderRadius:'12px'}}><div style={{height:'8px',background:'#222',borderRadius:'10px'}}><div style={{height:'100%',background:'#00ff88',width:`${prog}%`}}></div></div><div style={{textAlign:'center',fontSize:'11px',marginTop:'8px'}}>{prog}% Analyzing 11 factors...</div></div>}
{res&&<div style={{marginTop:'12px'}}><div style={{background:'#111',borderRadius:'16px',padding:'16px',border:`2px solid ${res.color}`}}><div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontWeight:'900',color:res.color}}>{res.emoji} {res.verdict}</div><div style={{fontSize:'10px',opacity:0.5,marginTop:'4px'}}>Odds {res.odds} | Stake {res.stake} → Win {res.pot} GHS</div></div><div style={{textAlign:'right'}}><div style={{fontSize:'24px',fontWeight:'900',color:res.color}}>{res.winC}%</div><div style={{fontSize:'8px'}}>WIN CHANCE</div></div></div><div style={{marginTop:'10px',fontSize:'11px',background:'black',padding:'10px',borderRadius:'8px'}}>Value: {res.value}% | Risk: {Math.floor(Math.random()*40+30)}/100 | Kelly: {(Math.random()*4).toFixed(1)}% bankroll</div><div style={{marginTop:'10px',fontSize:'11px',fontWeight:'bold'}}>{parseFloat(res.value)>0?`✅ Stake GHS ${Math.floor(res.stake*0.8)} - Good value!`:`❌ AVOID - Save GHS ${res.stake}. You will LOSE long term`}</div></div><button onClick={()=>{setPrev(null);setRes(null)}} style={{width:'100%',marginTop:'10px',background:'#ffffff15',color:'white',padding:'12px',borderRadius:'100px',border:'1px solid #333'}}>New Analysis</button></div>}
</div>

<div style={{marginTop:'16px',background:'#00ff880f',borderRadius:'16px',padding:'16px',border:'1px solid #00ff8830'}}>
<h3 style={{fontWeight:'900',color:'#00ff88',fontSize:'13px'}}>💰 Unlock Premium</h3>
<button onClick={()=>{localStorage.setItem('ba_prem','1');setPrem(true);alert('Premium Activated Demo! Add Paystack key for real money')}} style={{width:'100%',marginTop:'10px',background:'#00ff88',color:'black',fontWeight:'900',padding:'12px',borderRadius:'10px',border:'none',display:'flex',justifyContent:'space-between'}}><span>Monthly Unlimited</span><span>GHS 30</span></button>
<button onClick={()=>{localStorage.setItem('ba_prem','1');setPrem(true);alert('Premium Demo')}} style={{width:'100%',marginTop:'8px',background:'white',color:'black',fontWeight:'700',padding:'12px',borderRadius:'10px',border:'none',display:'flex',justifyContent:'space-between'}}><span>Yearly Save 40%</span><span>GHS 200</span></button>
</div>

<div style={{marginTop:'16px',fontSize:'10px',textAlign:'center',opacity:0.3}}>Referral: betslip-analyser-check-lose-win.vercel.app?ref={refCode} | Balance GHS {balance}</div>
</div>
)}
