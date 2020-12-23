'use strict';(function(){const input=document.querySelector('#gdoc-search-input');const results=document.querySelector('#gdoc-search-results');let showParent=false
input.addEventListener('focus',init);input.addEventListener('keyup',search);function init(){input.removeEventListener('focus',init);input.required=true;loadScript('/js/flexsearch-ad47a5e1ee.min.js');loadScript('/js/en.search-data.min.e8080d8e685fcd82412b1f8f17b5bdbe0833ca6c96a3904bdf0f94fcc51e2f6a.js',function(){input.required=false;search();});loadScript('/js/groupBy-62b30ac391.min.js');}
function search(){while(results.firstChild){results.removeChild(results.firstChild);}
if(!input.value){console.log("empty")
results.classList.remove("has-hits");return;}
let searchHits=window.geekdocSearchIndex.search(input.value,10);console.log(searchHits.length);if(searchHits.length<1){return results.classList.remove("has-hits");}
results.classList.add("has-hits");if(showParent){searchHits=groupBy(searchHits,hit=>hit.parent);}
const items=[];for(const section in searchHits){const item=document.createElement('li');if(showParent){const title=item.appendChild(document.createElement('span'));title.textContent=section;}
const subList=item.appendChild(document.createElement('ul'));createLinks(searchHits[section],subList);items.push(item);}
items.forEach(item=>{results.appendChild(item);})}
function createLinks(pages,target){const items=[];for(const page of pages){const item=document.createElement("li"),entry=item.appendChild(document.createElement("span")),a=entry.appendChild(document.createElement("a"));entry.classList.add("flex")
a.href=page.href;a.textContent=page.title;a.classList.add("gdoc-search__entry")
if(target){target.appendChild(item);continue}
items.push(item);}
return items;}
function loadScript(src,callback){const script=document.createElement('script');script.defer=true;script.async=false;script.src=src;script.onload=callback;document.head.appendChild(script);}})();