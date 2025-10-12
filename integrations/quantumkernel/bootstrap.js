(function(){
  try {
    if (typeof qk === 'undefined') return;
    let url = null;
    try { if (typeof window !== 'undefined' && window.QK_BASE_URL) url = String(window.QK_BASE_URL); } catch(_) {}
    try { if (!url && typeof process !== 'undefined' && process.env && process.env.QK_BASE_URL) url = String(process.env.QK_BASE_URL); } catch(_) {}
    try {
      if (!url && typeof localStorage !== 'undefined') {
        const v = localStorage.getItem('QK_BASE_URL');
        if (v) url = v;
      }
    } catch(_) {}
    if (url) qk.setBaseUrl(url);
    if (qk.configure) qk.configure({ safe: true });
    if (qk.waitForReady) qk.waitForReady(3000).then(ok => { if (ok) console.log('[QK] API ready'); }).catch(()=>{});
  } catch(_) {}
})();
