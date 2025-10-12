(function(){
  const state = { baseUrl: 'http://localhost:8000', safe: true };

  function resolveBaseUrl(){
    try {
      if (typeof window !== 'undefined' && window.QK_BASE_URL) return String(window.QK_BASE_URL);
      if (typeof process !== 'undefined' && process.env && process.env.QK_BASE_URL) return String(process.env.QK_BASE_URL);
      if (typeof localStorage !== 'undefined') {
        const v = localStorage.getItem('QK_BASE_URL');
        if (v) return v;
      }
    } catch(_) {}
    return state.baseUrl;
  }

  function setBaseUrl(u){
    state.baseUrl = String(u).replace(/\/$/, '');
    try { if (typeof localStorage !== 'undefined') localStorage.setItem('QK_BASE_URL', state.baseUrl); } catch(_) {}
  }

  function configure(opts){ if (opts && typeof opts.safe === 'boolean') state.safe = opts.safe; }

  async function http(method, path, body){
    const url = resolveBaseUrl().replace(/\/$/, '') + path;
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
      if(!res.ok){ const text = await res.text().catch(()=> ''); if (state.safe) return { success:false, error:`HTTP ${res.status} ${res.statusText}: ${text}` }; throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`); }
      return await res.json();
    } catch(e) { if (state.safe) return { success:false, error:(e&&e.message)?e.message:String(e) }; throw e; }
  }

  async function waitForReady(timeoutMs=5000){
    const start = Date.now(); let delay = 200;
    while ((Date.now()-start) < timeoutMs){
      const r = await http('GET','/status');
      if (r && r.success) return true;
      await new Promise(r => setTimeout(r, delay));
      delay = Math.min(delay*2, 1000);
    }
    return false;
  }

  const api = {
    setBaseUrl,
    configure,
    getBaseUrl: () => resolveBaseUrl(),
    waitForReady,
    status(){ return http('GET','/status'); },
    components(){ return http('GET','/components'); },
    qkdGenerateKey(a,b,k=256,e=false){ return http('POST','/qkd/generate-key',{alice_id:a,bob_id:b,key_length:k,eavesdropper:e}); },
    entanglementCreate(a,b,t=true,f=null){ return http('POST','/entanglement/create',{node_a:a,node_b:b,use_telecom:t,target_fidelity:f}); },
    entanglementList(){ return http('GET','/entanglement/list'); },
    sendMessage(s,t,e=true,w=null){ return http('POST','/network/message',{source:s,target:t,use_entanglement:e,preferred_wavelength:w}); },
  };
  if (typeof window !== 'undefined') window.qk = api;
  if (typeof global !== 'undefined') global.qk = api;
})();
