(function(){
  const state = { baseUrl: 'http://localhost:8000' };
  async function http(method, path, body){
    const res = await fetch(state.baseUrl.replace(/\/$/, '') + path, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    if(!res.ok){ const text = await res.text().catch(()=> ''); throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`); }
    return res.json();
  }
  const api = {
    setBaseUrl(u){ state.baseUrl = u; },
    status(){ return http('GET','/status'); },
    components(){ return http('GET','/components'); },
    qkdGenerateKey(a,b,k=256,e=false){ return http('POST','/qkd/generate-key',{alice_id:a,bob_id:b,key_length:k,eavesdropper:e}); },
    entanglementCreate(a,b,t=true,f=null){ return http('POST','/entanglement/create',{node_a:a,node_b:b,use_telecom:t,target_fidelity:f}); },
    entanglementList(){ return http('GET','/entanglement/list'); },
    sendMessage(s,t,e=true,w=null){ return http('POST','/network/message',{source:s,target:t,use_entanglement:e,preferred_wavelength:w}); },
  };
  window.qk = api;
})();
