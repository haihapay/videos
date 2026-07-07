(() => {

"use strict";

const mp4=document.getElementById("mp4");
const img=document.getElementById("img");

const output=document.getElementById("output");

const resultLink=document.getElementById("resultLink");

const btnGen=document.getElementById("btnGen");
const btnCopy=document.getElementById("btnCopy");
const btnCopyLink=document.getElementById("btnCopyLink");
const btnReset=document.getElementById("btnReset");

function encodeBase64Unicode(str){

    return btoa(unescape(encodeURIComponent(str)));

}

btnGen.addEventListener("click",()=>{

    const video=mp4.value.trim();
    const poster=img.value.trim();

    if(!video){

        alert("Please enter MP4 Video URL.");

        mp4.focus();

        return;

    }

    const data={

        u:video

    };

    if(poster){

        data.img=poster;

    }

    const token=encodeBase64Unicode(JSON.stringify(data));

    const player=
        `${location.origin}/player?url=${encodeURIComponent(token)}`;

    resultLink.value=player;

    const iframe=
`<h3 style="text-align:left;"><b>Watch the video below:</b></h3>
<div class="player-wrapper">
<iframe
src="${player}"
width="100%"
height="500"
frameborder="0"
allowfullscreen
allow="autoplay; fullscreen; picture-in-picture">
</iframe>
</div>`;

    output.value=iframe;

});

btnCopy.addEventListener("click",async()=>{

    if(!output.value){

        alert("Nothing to copy.");

        return;

    }

    try{

        await navigator.clipboard.writeText(output.value);

        alert("Embed copied.");

    }catch(e){

        output.select();

        document.execCommand("copy");

    }

});

btnCopyLink.addEventListener("click",async()=>{

    if(!resultLink.value){

        alert("Nothing to copy.");

        return;

    }

    try{

        await navigator.clipboard.writeText(resultLink.value);

        alert("Link copied.");

    }catch(e){

        resultLink.select();

        document.execCommand("copy");

    }

});

btnReset.addEventListener("click",()=>{

    mp4.value="";
    img.value="";
    output.value="";
    resultLink.value="";

    mp4.focus();

});

})();
