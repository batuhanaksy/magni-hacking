const $ = name => document.querySelector(name)
const delay = s => new Promise(res => setTimeout(res, s * 1000));
var result = null

async function start(){
    $('#text-container').classList.remove('hidden')
    $('.spy-icon').src = 'assets/spy-icon.png'
    $('.password').classList.add('hidden')
    $('#enter').classList.add('hidden')
    
    setInformationText('Enter the password shown')
    await delay(1)
    $('#text-container').classList.add('hidden')

    var magni = getRandomNumberBetween(1000,9999)
    setInformationSayi(magni.toString())
    $('#sayi-cont').classList.remove('hidden')
    await delay(1)
    $('#sayi-cont').classList.add('hidden')

    $('#password').classList.remove('hidden')
    $('#enter').classList.remove('hidden')
    var enter = document.getElementById("enter");
    enter.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            var sa = magni
            validate(e,sa);
        }
    });
    return;
}

async function validate(e,sa) {
    $('#password').classList.add('hidden')
    $('#enter').classList.add('hidden')

    var text = e.target.value;
    if (text==sa) {
        result = true
        setInformationText('The password is correct')
        await delay(1)
    } else {
        result = false
        setInformationText('Worng password !')
        await delay(1)
    }

    fetch('https://hacking/callback', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            success: result==true
        }) 
    });
    
    $(".bg").classList.add('hidden');
    document.getElementById("enter").value = ""
}

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setInformationSayi(sayi){
    
    const capitalized = sayi
    const infosayi = `${capitalized.charAt(0)}${capitalized.substring(1)}`
    
    $("#sayi").innerHTML = infosayi
}

function setInformationText(text){
    $('#text-container').classList.remove('hidden')
    const capitalized = text
    const infoText = `<span class="capital">${capitalized.charAt(0)}</span>${capitalized.substring(1)}`
    
    $("#loading-text").innerHTML = infoText
}

window.addEventListener('message', function(event){
    if (event.data.action == "open") {
        start()
        $(".bg").classList.remove('hidden');
        
    }
})