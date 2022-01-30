let displayblock=document.getElementById("displayelement")
let cityname=document.getElementById("place")
let recentsearches=document.getElementById("enteredprevious")
let iconcontainer=document.getElementById("iconcont")
let namelist=[];
let checkboxplace=document.getElementById("placename")
let checkboxcountry=document.getElementById("country")
let boxelement=document.getElementById("box")

let spinnerEl = document.getElementById("spinner");



const display_results=(data)=>{
    iconcontainer.textContent=''
    const {main}=data;
    const {name}=data;
    const {weather}=data;
    console.log(data)
    console.log(main)
    console.log(weather[0].description)
    spinnerEl.classList.add("d-none");
    if(checkboxplace.checked==true){

        
        let enteredname=document.getElementById("enteredname")
        enteredname.textContent="Entered Place : ";
        
      
        console.log("checkk")
        let head=document.createElement("h1");
        head.textContent="Temperature  :  "+JSON.stringify(main.temp)+" C";
        let humidity=document.createElement("h1")
        humidity.textContent="Humidity  : "+JSON.stringify(main.humidity)
        const icon="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png"
        let imageicon=document.createElement("img")
        imageicon.setAttribute("src",icon);
        imageicon.classList.add("iconstyle")
        let destext=document.createElement("h1")
        destext.textContent=weather[0].description

        let cityweather=document.createElement("h1")
        cityweather.textContent=name
        console.log(name)
        boxelement.classList.add("borderstyling")
        displayblock.appendChild(cityweather)
        iconcontainer.appendChild(imageicon)
        displayblock.appendChild(iconcontainer)
        displayblock.appendChild(head);
        
        displayblock.appendChild(humidity);
        displayblock.appendChild(destext)
    }
    else if(checkboxcountry.checked==true){
        
        let enteredname=document.getElementById("enteredname")
        enteredname.textContent="Entered Country: ";  

        let maxtemp=document.createElement("h1")
        maxtemp.textContent="Max-temp : "+JSON.stringify(main.temp_max)+" C"
        const icon="https://openweathermap.org/img/wn/"+weather[0].icon+"@2x.png"
        let imageicon=document.createElement("img")
        imageicon.setAttribute("src",icon);
        imageicon.classList.add("iconstyle")
        let mintemp=document.createElement("h1")
        mintemp.textContent="Min-temp  : "+JSON.stringify(main.temp_min)+"  C"

        let cityweather=document.createElement("h1")
        cityweather.textContent=name
        console.log(name)

        boxelement.classList.add("borderstyling")
        displayblock.appendChild(cityweather)
        iconcontainer.appendChild(imageicon)
        displayblock.appendChild(iconcontainer)
        displayblock.appendChild(maxtemp);
        
        displayblock.appendChild(mintemp);
        


    }
    

}
const displayerror=err=>{
    spinnerEl.classList.add("d-none");
    let errorhead=document.createElement("h1")
    errorhead.textContent="Enter a valid city"
    
    displayblock.appendChild(errorhead)
    
}

function display(event){
    console.log(event.key)
    if(event.key=="Enter"){
        spinnerEl.classList.remove("d-none");
        displayblock.textContent='';
        let cityname=document.getElementById("place")
        let city=cityname.value;
        let url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=c5d26f9b28871e2802fe4e16d4d1a9da&units=metric'
    fetch(url)
    .then(response => response.json())
    .then(data => {
        display_results(data)
    })
    .catch(err=>{
        displayerror(err)
    })
    displayrecent(city);

}
}


cityname.addEventListener("keydown",display)



// Queue class
class Queue
{
	
	constructor()
	{
		this.items = [];
	}
				

    enqueue(element)
    {	
        
        this.items.push(element);
    }

    dequeue()
    {
       
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

	
    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }

}

let i=0;

let myarray={
    "arrayitems":[]
};

function displayrecent(city){
    
    var stored=localStorage.getItem("storedqueue")
    let parsed=JSON.parse(stored);
    console.log(parsed)
    //console.log(stored)
  
    
    if(parsed!=null){
        var queue = new Queue();
        let storedplacesarr=(parsed.arrayitems)
        console.log(storedplacesarr)
        
        myarray["arrayitems"]=storedplacesarr;
        for(var i=(storedplacesarr.length-1);i>=0;i--){
            
            queue.enqueue(storedplacesarr[i]);
            
        }  
        recentsearches.textContent=''
        for(let j=0;j<5;j++){
            
            if(j<queue.items.length){
                let pele=document.createElement("button")
                pele.textContent=queue.items[j]+"        ";
                let idno="id"+j
                pele.setAttribute("id",idno)
                recentsearches.appendChild(pele)
                console.log(pele)
                
            }
        }
    }
    
    
    function addtoqueue(city){
    
        if(city!=null){
        myarray["arrayitems"].push(city);
        }
        //console.log(myarray)
    
        localStorage.setItem("storedqueue",JSON.stringify(myarray))
    }
    if(city!=''){
    addtoqueue(city)
    }
}

displayrecent();


recentsearches.addEventListener("click",function(event){
    let cityname=(event.target.textContent)
    if(cityname!=''){
        let cityname1=document.getElementById("place")
        cityname1.textContent=cityname;
        displayblock.textContent='';
        let url='https://api.openweathermap.org/data/2.5/weather?q='+cityname+'&appid=c5d26f9b28871e2802fe4e16d4d1a9da&units=metric'
    fetch(url)
    .then(response => response.json())
    .then(data => {
        display_results(data)
    })
    .catch(err=>{
        displayerror(err)
    })
    displayrecent(cityname);
    }
})