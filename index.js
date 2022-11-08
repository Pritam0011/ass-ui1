
let contryNames=[];

/* Fetching data from the server and storing it in the `contryNames` array. */
async function getCountry(){
    const contryRes=await fetch("https://assignment-intern.herokuapp.com/api/country");
    const data=await contryRes.json();
    contryNames=data.map((coun)=>{
        return coun.name;
    })  
    
}


const coninp=document.querySelector('#coninp')
coninp.addEventListener('input', onInput)
/* Listening for an input event on the input element. When the event is triggered, it calls the
`autoDel()` function to remove the datalist element from the DOM. Then it creates a new datalist
element and appends it to the DOM. */
function onInput(){
    autoDel()
    const value=coninp.value.toLowerCase();  
    newCon=[];
    contryNames.forEach((con)=>{
        if(con.substr(0, value.length).toLowerCase()===value){
            newCon.push(con);
        }
    });  
    autoCom(newCon);  
}


/* Creating a `datalist` element and appending it to the DOM. */
function autoCom(list){
        const datalist=document.createElement('datalist');
        datalist.id="conlist";
    list.forEach((con)=>{
        const option=document.createElement('option');
        option.value=`${con}`
        datalist.appendChild(option)
    })
    document.querySelector('.field').appendChild(datalist)
}

/* Removing the datalist element from the DOM. */
function autoDel(){
    const conlist=document.querySelector('#conlist');
    if(conlist) conlist.remove()
}


/////////// FORM DATA PART ///////////////

const ale=document.querySelector('.ale')
let aleTimer;
const showAle=(msg)=>{
    ale.innerHTML=`<b>${msg}</b>`
    ale.style.transform='translate(-50%,0)';
    clearTimeout(aleTimer)
    aleTimer=setTimeout(()=>{
    ale.style.transform='translate(-50%,-100px)'
    },2000)
}

const fileinp=document.querySelector('#fileinp');
const posturl=`https://assignment-intern.herokuapp.com/api/add`

const inpForm=document.querySelector('#inputForm')
inpForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const fileD=fileinp.files[0];
    upload(fileD)
})


const upload=(file)=>{
    const formData=new FormData();
    formData.append('name', inpForm.elements["name"].value)
    formData.append('dob', inpForm.elements["dob"].value)
    formData.append('country', inpForm.elements["country"].value)
    formData.append('fileinp', file);

    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
         showAle(`Upload Done`)
        }
    }
    xhr.upload.onerror=(e)=>{
    
        fileinp.value="";
        // showAle(`Check your network Connection and try again!`)
        showAle(`Error: ${xhr.statusText}`)
    }
    xhr.open('POST', posturl);
    xhr.send(formData)
}