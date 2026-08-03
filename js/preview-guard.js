if(sessionStorage.getItem('ametist-preview-access')!=='granted'){
  const root=document.body.dataset.root||'';
  location.replace(`${root}index.html`);
}
