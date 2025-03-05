import{a as b,S as L,i as h}from"./assets/vendor-06b1bbdf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const v="https://pixabay.com/api/",S="43437392-3f8254e7ae10b5746fbcc03c6",m=async(o,t)=>{try{return(await b.get(v,{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",page:t,per_page:15,safesearch:!0}})).data}catch(s){throw console.log(s),new Error("Sorry, there are no images matching your search query. Please try again!")}},q=document.querySelector(".gallery"),w=new L(".gallery a",{}),p=o=>{const t=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:a,comments:y,downloads:f})=>`
      <div class='card'>
      <a class="card-item" href="${i}">
        <img class="card-image" src="${s}" alt="${e}" loading="lazy" />
        
        <div class="card-info">
          <p><b>Likes:</b> ${r}</p>
          <p><b>Views:</b> ${a}</p>
          <p><b>Comments:</b> ${y}</p>
          <p><b>Downloads:</b> ${f}</p>
        </div>
      </a>
      </div>

    `).join("");q.insertAdjacentHTML("beforeend",t),w.refresh()},g=document.querySelector(".search-form"),P=document.querySelector(".search-input"),l=document.querySelector(".loader"),d=document.querySelector(".backdrop"),u=document.querySelector(".load-more");g.addEventListener("submit",E);u.addEventListener("click",$);let n=1,c=null;async function E(o){if(o.preventDefault(),gallery.innerHTML="",c=P.value.trim(),c!==""){l.classList.remove("hidden"),d.classList.remove("hidden");try{const t=await m(c,n);t.hits.length===0?h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3}):(p(t.hits),t.total>=15&&u.classList.remove("hidden")),l.classList.add("hidden"),d.classList.add("hidden")}catch(t){console.log(t)}g.reset()}}async function $(){l.classList.remove("hidden"),d.classList.remove("hidden"),n+=1;try{const o=await m(c,n);p(o.hits);const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),l.classList.add("hidden"),d.classList.add("hidden"),Math.ceil(o.totalHits/15)===n&&(u.classList.add("hidden"),h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3}))}catch(o){console.log(o)}}
//# sourceMappingURL=commonHelpers.js.map
