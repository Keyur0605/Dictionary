let input=document.querySelector('#input');
let searchbtn=document.querySelector('#search')
let notfound=document.querySelector('.notfound')
let apikey="22655d6e-6f9a-4ad8-8dad-828790058266"
let defbox=document.querySelector('.def')
let audiobox=document.querySelector('.audio')
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault()

    //clear data
    audiobox.innerHTML='';
    notfound.innerHTML='';
    defbox.innerHTML='';


    //get data
    let word=input.value


    //call api get data
    if(word===""){
        alert("word is required");
        return;
    }
    getdata(word)

})


 async function getdata(word){
  // api 
const responce= await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apikey}`);
  const data= await responce.json()

  //if empty result
  if(!data.length){
    notfound.innerHTML="No Result found"
    return;
  }

  //IF RESULT IS SUGGETIONS
  if(typeof(data[0])==="string"){
    let heading=document.createElement("h3")
    heading.innerText="Did You Mean?"
    notfound.appendChild(heading)
    data.forEach(element => {
      let suggetion=document.createElement('span')
      suggetion.classList.add('suggested');
      suggetion.innerHTML=element;
      notfound.appendChild(suggetion)
    
    });
    return;
  }


  //result found
   let defination=data[0].shortdef[0];
   defbox.innerHTML=defination

   //sound
   const sound=data[0].hwi.prs[0].sound.audio;
      if(sound){
        renderSound(sound)
      }
  console.log(data);
}


function renderSound(sound){
  let subfolder=sound.charAt(0)
  let soundsrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${sound}.wav?key=${apikey}`;

  let aud=document.createElement('audio')
  aud.src=soundsrc;
  aud.controls=true;
  audiobox.appendChild(aud)
  console.log(audiobox);
}