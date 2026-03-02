// Author: Arunakemi c:

// Fisher-Yates Shuffle
// Taken from: https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array
const Shuffle = (arr : any[]) => {
  let i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
// Utils
const Hide = (e : HTMLElement)=>{
    e.style.visibility = 'hidden'
}
const Show = (e : HTMLElement)=>{
    e.style.visibility = 'visible'
}


// HTML References
let cardSleep = [document.getElementById("cardSleep") as HTMLImageElement, 0, 0]
let cardAwake = document.getElementById("cardAwake") as HTMLImageElement
cardAwake.style.zIndex = '9000'
;(cardSleep[0] as HTMLImageElement).style.zIndex = '9000'
let cards = [
    [document.getElementById("card01") as HTMLImageElement, 0, 0],
    [document.getElementById("card02") as HTMLImageElement, 0, 0],
    [document.getElementById("card03") as HTMLImageElement, 0, 0],
    [document.getElementById("card04") as HTMLImageElement, 0, 0]
]
let bttnDir = [ 
    document.getElementById("bttnUp") as HTMLButtonElement, 
    document.getElementById("bttnRight") as HTMLButtonElement, 
    document.getElementById("bttnDown") as HTMLButtonElement, 
    document.getElementById("bttnLeft") as HTMLButtonElement
]
let bttnSleep = document.getElementById("bttnSleep") as HTMLButtonElement
let bttnWake = document.getElementById("bttnWake") as HTMLButtonElement

let cardIndex = 0
let lastDir = 0
const TransformCards = ()=>{
    console.log('transforming')
    ;(cardSleep[0] as HTMLImageElement).style.transform = `translate(${(cardSleep[1] as number)*50}%,${(cardSleep[2] as number)*50}%)`
    for(let i=0; i<cards.length; i++)
    { 
        ;(cards[i][0] as HTMLImageElement).style.transform = `translate(${(cards[i][1] as number)*50}%,${(cards[i][2] as number)*50}%)` 
    }
}
const Sleep = () => {

    Shuffle(cards)
    for(let i=0; i<cards.length; i++)
    { (cards[i][0] as HTMLImageElement).style.zIndex = 1000 - i * 100 + '' }
    cardIndex = 0
    lastDir = 0

    Hide(bttnSleep)
    Hide(cardAwake)
    for(let i=0;i<bttnDir.length;i++)
    { Show(bttnDir[i]) }
    Show(cardSleep[0] as HTMLImageElement)
}
const WakeUp = () => {

    cardSleep[1] = 0
    cardSleep[2] = 0
    for(let i=0; i<cards.length; i++)
    { 
        cards[i][1] = 0 
        cards[i][2] = 0 
    }
    TransformCards()

    Hide(cardSleep[0] as HTMLImageElement)
    Hide(bttnWake)

    Show(bttnSleep)
    Show(cardAwake)
}
const Move = (dir : number)=>{

    const odd = dir % 2 == 0
    let x = odd? 0 : (dir - 2)
    let y = odd? (dir - 1)*-1 : 0
    ;(cardSleep[1] as number) += x
    ;(cardSleep[2] as number) += y
    for(let i=0; i<cardIndex; i++)
    {
        ;(cards[i][1] as number) += x
        ;(cards[i][2] as number) += y
    }
    TransformCards()

    bttnDir[lastDir].disabled = false
    let disableDir = dir - 2 < 0? dir + 2 : dir -2
    console.log(disableDir)
    bttnDir[disableDir].disabled = true
    lastDir = disableDir 

    cardIndex++
    if(cardIndex >= cards.length)
    {
        for(let i=0;i<bttnDir.length;i++)
        { Hide(bttnDir[i]) }
        bttnDir[lastDir].disabled = false
        Show(bttnWake)
    }
}
bttnSleep.onclick = Sleep
bttnWake.onclick = WakeUp
for(let i=0;i<bttnDir.length;i++)
{
    bttnDir[i].onclick = ()=>{ Move(i) }
}
for(let i=0;i<bttnDir.length;i++)
{ Hide(bttnDir[i]) }
WakeUp()