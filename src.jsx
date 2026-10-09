import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MapPin, Music2, VolumeX, ArrowRight, Heart, Menu, X, ChevronLeft, ChevronRight} from 'lucide-react';
import {wedding as w} from './config';
import './style.css';
const date = new Date(w.dateISO);
function countdown(){const n=Math.max(0,date.getTime()-Date.now());return [Math.floor(n/86400000),Math.floor(n/3600000)%24,Math.floor(n/60000)%60,Math.floor(n/1000)%60]}
function App(){
 const [page,setPage]=useState(window.location.hash.slice(1)||'home'); const [coverOpen,setCoverOpen]=useState(window.location.hash.slice(1)!==''); useEffect(()=>{const onHash=()=>{setPage(window.location.hash.slice(1)||'home');window.scrollTo(0,0)};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[]); const [remaining,setRemaining]=useState(countdown()); const [menu,setMenu]=useState(false);const [music,setMusic]=useState(false);const [lightbox,setLightbox]=useState(-1);const audio=useRef(null);
 const [findGuest,setFindGuest]=useState(false);const [guestName,setGuestName]=useState('');const [nameError,setNameError]=useState('');const [form,setForm]=useState({name:'',mobile:'',attendance:'yes',guests:'1',dietary:'',message:''});const [status,setStatus]=useState('');const [sending,setSending]=useState(false);
 useEffect(()=>{const id=setInterval(()=>setRemaining(countdown()),1000);return()=>clearInterval(id)},[]);
 useEffect(()=>{function key(e){if(e.key==='Escape')setLightbox(-1);if(e.key==='ArrowRight')setLightbox(x=>x<0?x:(x+1)%w.photos.length);if(e.key==='ArrowLeft')setLightbox(x=>x<0?x:(x+w.photos.length-1)%w.photos.length)}window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 async function toggleMusic(){if(!audio.current)return;try{if(music){audio.current.pause();setMusic(false)}else{await audio.current.play();setMusic(true)}}catch{setStatus('Add public/music.mp3 to enable music.')}}
 async function submit(e){e.preventDefault();setSending(true);setStatus('');try{const res=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await res.json();if(!res.ok)throw Error(data.error||'Unable to submit RSVP');setStatus('Thank you! Your RSVP has been received.');setForm({name:'',mobile:'',attendance:'yes',guests:'1',dietary:'',message:''})}catch(err){setStatus(err.message)}finally{setSending(false)}}
 function openGuestRSVP(e){e.preventDefault();if(!guestName.trim()){setNameError('Please enter your name.');return;}setForm(f=>({...f,name:guestName.trim()}));setNameError('');setFindGuest(false);window.location.hash='rsvp';}
 const nav=[['Entourage','#entourage'],['RSVP','#rsvp'],['Details','#details'],['Q & A','#qa'],['Gallery','#gallery']];
  const weddingDate = new Date(w.dateISO);
  const dateParts = { weekday: new Intl.DateTimeFormat('en-US',{weekday:'long',timeZone:'UTC'}).format(new Date(w.dateISO.slice(0,10)+'T12:00:00Z')), month: new Intl.DateTimeFormat('en-US',{month:'long',timeZone:'UTC'}).format(new Date(w.dateISO.slice(0,10)+'T12:00:00Z')), day: w.dateISO.slice(8,10), year: w.dateISO.slice(0,4) };
  const parentNames = [['JESUS FRANCO','LEONILA FRANCO'],['OWEN GUARIN','GLORIA GUARIN']];
  return <>{!coverOpen && page==='home' && <button type="button" className="invitation-cover luxe-cover" onClick={()=>setCoverOpen(true)} aria-label="Tap to open wedding invitation">
  <span className="luxe-cover-inner">
    <span className="luxe-ornament" aria-hidden="true">✦ ───── ◇ ───── ✦</span>
    <span className="luxe-kicker">YOU ARE CORDIALLY INVITED</span>
    <span className="luxe-cover-names"><span>{w.couple[0]}</span><em>and</em><span>{w.couple[1]}</span></span>
    <span className="luxe-date">{w.dateDisplay}</span>
    <span className="luxe-divider" aria-hidden="true">◆</span>
    <span className="luxe-open">TAP TO OPEN <span aria-hidden="true">✧</span></span>
  </span>
</button>}
{(coverOpen || page!=='home') && <><header className="nav"><a href="#home" className="monogram">{w.couple.join(' & ')}</a><nav className={menu?'open':''}>{nav.map(([t,l])=><a key={l} href={l} onClick={()=>setMenu(false)}>{t}</a>)}</nav><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></header>
  <main className="wix-pages"><div style={{display:page==='home'?'block':'none'}}><section className="hero luxe-home" id="home">
  <div className="luxe-paper">
    <div className="luxe-ornament" aria-hidden="true">✦ ───── ◇ ───── ✦</div>
    <p className="luxe-kicker">YOU ARE CORDIALLY INVITED</p>
    <h1 className="luxe-names"><span>{w.couple[0]}</span><em>and</em><span>{w.couple[1]}</span></h1>
    <p className="luxe-date">{w.dateDisplay}</p>
    <div className="luxe-divider" aria-hidden="true">◆</div>
    <p className="luxe-kicker">COUNTING DOWN TO FOREVER</p>
    <div className="luxe-countdown" aria-label="Time until the wedding">
      {remaining.map((value,i)=><div key={i}><strong>{String(value).padStart(2,'0')}</strong><small>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</small></div>)}
    </div>
    <div className="luxe-divider" aria-hidden="true">◆</div>
    <div className="luxe-venues">
      {[w.ceremony,w.reception].map((v,i)=><div key={i}><h2>{i===0?'Ceremony':'Reception'}</h2><strong>{v.venue}</strong><p>{v.address}</p><p>{v.time}</p></div>)}
    </div>
    <p className="luxe-kicker">WE CAN'T WAIT TO CELEBRATE WITH YOU</p>
    <button className="luxe-rsvp" type="button" onClick={()=>setFindGuest(true)}>CONFIRM ATTENDANCE <span aria-hidden="true">↗</span></button>
  </div>
</section>
 <section className="intro section" id="story"><div className="eyebrow">THE BEGINNING OF FOREVER</div><h2>Our Love Story</h2><div className="flourish">❧</div><p>{w.heroMessage}</p><p>We cannot wait to share this beautiful moment with the people who mean the most to us.</p><Heart size={22} strokeWidth={1} className="heart"/></section>
 </div><div style={{display:page==='entourage'?'block':'none'}}><section className="section entourage wix-page" id="entourage"><div className="eyebrow">TIMBOL · GUARIN</div><h2>NUPTIALS</h2><div className="flourish">❦</div><div className="wix-entourage-list">{[
['Principal Sponsors',['Add principal sponsor names']],['Best Man',['Add best man name']],['Matron of Honor',['Add matron of honor name']],['Candle',['Add candle sponsors']],['Veil',['Add veil sponsors']],['Cord',['Add cord sponsors']],['Groomsmen',['Add groomsmen names']],['Bridesmaids',['Add bridesmaids names']],['Coin Bearer',['Add coin bearer name']],['Ring Bearer',['Add ring bearer name']],['Bible Bearer',['Add Bible bearer name']],['Flower Girls',['Add flower girls names']]
].map(([heading,names])=><div className="wix-entourage-group" key={heading}><h3>{heading}</h3>{names.map(n=><p key={n}>{n}</p>)}</div>)}</div><p className="entourage-note">Replace placeholders with your confirmed entourage names before publishing.</p></section></div><div style={{display:page==='details'?'block':'none'}}><section className="countdown section"><div className="eyebrow">COUNTING DOWN TO OUR SPECIAL DAY</div><h2>Until We Say “I Do”</h2><div className="digits">{remaining.map((v,i)=><div key={i}><strong>{String(v).padStart(2,'0')}</strong><small>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</small></div>)}</div></section>
 <section className="section details" id="details"><div className="eyebrow">YOU ARE CORDIALLY INVITED</div><h2>The Wedding Day</h2><p className="section-lead">A day filled with love, joy and beautiful memories.</p><div className="venue-grid">{[w.ceremony,w.reception].map((v,i)=><article className="venue" key={i}><div className="venue-symbol">{i?'✧':'✦'}</div><div className="eyebrow">{v.time}</div><h3>{v.title}</h3><strong>{v.venue}</strong><p>{v.address}</p><a className="text-link" href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(v.mapQuery)} target="_blank" rel="noreferrer"><MapPin size={16}/> GET DIRECTIONS</a><iframe title={v.title+' map'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={'https://maps.google.com/maps?q='+encodeURIComponent(v.mapQuery)+'&output=embed'}/></article>)}</div></section>
 <section className="section timeline"><div className="eyebrow">THE ORDER OF EVENTS</div><h2>Wedding Schedule</h2><div className="timeline-items">{w.schedule.map((s,i)=><div className="timeline-item" key={i}><time>{s.time}</time><div className="dot"/><div><h3>{s.event}</h3><p>{s.detail}</p></div></div>)}</div></section>
 </div><div style={{display:page==='qa'?'block':'none'}}><section className="section qa wix-page" id="qa"><div className="eyebrow">WEDDING INFORMATION</div><h2>Q & A</h2><div className="flourish">❦</div><div className="wix-qa-list">{[
['Can I bring a plus one?','Please confirm the number of invited guests with the couple.'],
['Are kids invited?','Please check with the couple about children attending.'],
['Is there car parking available?','Please check parking arrangements with the ceremony and reception venues.'],
['What should I do if I am unable to attend?','Please submit an RSVP and select Regretfully declines.'],
['When is the RSVP deadline?',`Please RSVP by ${new Date(w.rsvpDeadline+'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})}.`],
['Can we take pictures or videos during the ceremony?','Please follow any photography guidance shared by the couple.'],
['What kind of gift should I bring?','Gift preferences will be confirmed by the couple.'],
['What time should I arrive?',`Please plan to arrive before the ceremony at ${w.ceremony.time}.`],
['Can I share pictures on social media?','Please check with the couple before sharing ceremony photos.'],
['What is the dress code?','Formal black-tie attire. Please confirm any specific dress code requirements with the couple.'],
['Who can I contact if I have more questions?','Please contact the couple directly.']
].map(([q,a])=><article className="wix-qa-item" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section></div><div style={{display:page==='gallery'?'block':'none'}}><section className="section gallery wix-page" id="gallery"><div className="eyebrow">MOMENTS TO TREASURE</div><h2>Our Gallery</h2><p className="section-lead">A few moments from our journey together.</p><div className="photos">{w.photos.map((src,i)=><button className="photo" key={src} onClick={()=>setLightbox(i)} aria-label={'Open photo '+(i+1)}><img src={src} alt={'Couple photo '+(i+1)} onError={e=>{e.currentTarget.style.opacity='0'}}/><span>VIEW PHOTO {i+1}</span></button>)}</div><p className="photo-note">Replace the four sample photo files in public/photos with your own images.</p></section>
 </div><div style={{display:page==='rsvp'?'block':'none'}}><section className="section rsvp wix-page" id="rsvp"><div className="rsvp-panel"><div className="eyebrow">THE PLEASURE OF YOUR COMPANY</div><h2>Kindly RSVP</h2><p>We would be honoured to celebrate with you.<br/>Please respond by {new Date(w.rsvpDeadline+'T12:00:00').toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})}.</p><form onSubmit={submit}><label>FULL NAME<input required maxLength="120" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name"/></label><label>MOBILE NUMBER<input type="tel" inputMode="tel" autoComplete="tel" required maxLength="20" pattern="[+0-9() .-]{7,20}" title="Enter a valid mobile number" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} placeholder="09XX XXX XXXX"/></label><label>WILL YOU ATTEND?<select value={form.attendance} onChange={e=>setForm({...form,attendance:e.target.value})}><option value="yes">Joyfully accepts</option><option value="no">Regretfully declines</option></select></label>{form.attendance==='yes'&&<><label>NUMBER OF GUESTS (INCLUDING YOU)<select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}</select></label><label>DIETARY REQUIREMENTS<textarea maxLength="500" rows="2" value={form.dietary} onChange={e=>setForm({...form,dietary:e.target.value})} placeholder="Any allergies or dietary requirements?"/></label></>}<label>MESSAGE FOR THE COUPLE (OPTIONAL)<textarea rows="3" maxLength="1000" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Leave a little note..."/></label><button disabled={sending} className="btn gold submit" type="submit">{sending?'SENDING...':'SEND RSVP'} <ArrowRight size={16}/></button><p className="form-status" role="status">{status}</p></form></div></section></div></main>
 
 {findGuest && <div className="guest-modal-backdrop" role="presentation" onClick={()=>setFindGuest(false)}><div className="guest-modal" role="dialog" aria-modal="true" aria-labelledby="guest-title" onClick={e=>e.stopPropagation()}><button type="button" className="guest-close" onClick={()=>setFindGuest(false)} aria-label="Close">×</button><div className="guest-modal-stars">✦ ✦ ✦ ✦</div><p className="luxe-kicker">KINDLY RSVP</p><h2 id="guest-title">Find Your Name</h2><p>Enter your name to continue to your RSVP.</p><form onSubmit={openGuestRSVP}><input autoFocus value={guestName} maxLength={120} onChange={e=>{setGuestName(e.target.value);setNameError('')}} placeholder="Enter your full name" aria-label="Your full name"/><button type="submit">CONTINUE TO RSVP</button>{nameError&&<span role="alert">{nameError}</span>}</form><small>Your name will be entered into the RSVP form. This is not a guest-list lookup.</small></div></div>}
 <audio ref={audio} src={w.musicFile} loop preload="none" onEnded={()=>setMusic(false)}/><button className="music" onClick={toggleMusic} aria-label={music?'Pause background music':'Play background music'} title={music?'Pause music':'Play music'}>{music?<Music2 size={20}/>:<VolumeX size={20}/>}</button>
 {lightbox>=0&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><button className="close" onClick={()=>setLightbox(-1)} aria-label="Close"><X/></button><button onClick={()=>setLightbox((lightbox+w.photos.length-1)%w.photos.length)} aria-label="Previous photo"><ChevronLeft/></button><img src={w.photos[lightbox]} alt={'Couple photo '+(lightbox+1)}/><button onClick={()=>setLightbox((lightbox+1)%w.photos.length)} aria-label="Next photo"><ChevronRight/></button></div>}
 </>}</>}
createRoot(document.getElementById('root')).render(<App/>);
