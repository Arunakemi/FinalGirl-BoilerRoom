/* **************************************************************************************************
        AUTHOR: @Arunakemi   
        LAST UPDATE: 02/March/2026
    ************************************************************************************************* */ 

// Utils
const DIRS = [
    { x: 0, y: 1},
    { x: -1, y: 0},
    { x: 0, y: -1},
    { x: 1, y: 0},
]
const Hide = (e : HTMLElement)=>{
    e.style.display = 'none'
}
const Show = (e : HTMLElement)=>{
    e.style.display = 'block'
}
const NewCoordElem = (e : HTMLElement) => ({
    element: e,
    x: 0,
    y: 0,
})
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

// HTML References
let cardSleep = NewCoordElem(document.getElementById("cardSleep") as HTMLImageElement)
let cardAwake = document.getElementById("cardAwake") as HTMLImageElement
cardAwake.style.zIndex = '9500'
cardSleep.element.style.zIndex = '9000'
let cards = [
    NewCoordElem(document.getElementById("card01") as HTMLImageElement),
    NewCoordElem(document.getElementById("card02") as HTMLImageElement),
    NewCoordElem(document.getElementById("card03") as HTMLImageElement),
    NewCoordElem(document.getElementById("card04") as HTMLImageElement)
]
let bttnDir = [ 
    document.getElementById("bttnUp") as HTMLButtonElement, 
    document.getElementById("bttnRight") as HTMLButtonElement, 
    document.getElementById("bttnDown") as HTMLButtonElement, 
    document.getElementById("bttnLeft") as HTMLButtonElement
]
let bttnSleep = document.getElementById("bttnSleep") as HTMLButtonElement
let bttnWake = document.getElementById("bttnWake") as HTMLButtonElement

// Main vars
let cardIndex = 0

// Functionality
const TransformCards = ()=>{
    console.log('transforming')
    cardSleep.element.style.transform = `translate(${cardSleep.x * 50}%,${cardSleep.y * 50}%)`
    for(let i=0; i<cards.length; i++)
    { 
        cards[i].element.style.transform = `translate(${cards[i].x * 50}%,${cards[i].y * 50}%)` 
    }
}
const Sleep = () => {
    Hide(bttnSleep)
    Hide(cardAwake)
    Shuffle(cards)
    for(let i=0; i<cards.length; i++)
    { cards[i].element.style.zIndex = 1000 - i * 100 + '' }
    cardIndex = 0
    for(let i=0;i<bttnDir.length;i++)
    { Show(bttnDir[i]) }
    Show(cardSleep.element)
    for(let i=0;i<bttnDir.length;i++)
    {
        bttnDir[i].disabled = false
    }
}
const WakeUp = () => {
    cardSleep.x = 0
    cardSleep.y = 0
    for(let i=0; i<cards.length; i++)
    { 
        cards[i].x = 0 
        cards[i].y = 0 
    }
    TransformCards()
    Hide(cardSleep.element)
    Hide(bttnWake)
    Show(bttnSleep)
    Show(cardAwake)
}
const CheckifInvalid = (dir : {x:number,y:number}) => {
    console.log('checking')
    let isInvalid = cardSleep.x + dir.x == 0 && cardSleep.y + dir.y == 0
    for(let i=0; i<cardIndex; i++)
    {
        isInvalid = isInvalid || (cards[i].x + dir.x == 0 && cards[i].y + dir.y == 0)
    }
    return isInvalid
}
const Move = (dir : number)=>{
    let x = DIRS[dir].x
    let y = DIRS[dir].y
    cardSleep.x += x
    cardSleep.y += y
    for(let i=0; i<cardIndex; i++)
    {
        cards[i].x += x
        cards[i].y += y
    }
    TransformCards()
    for(let i=0;i<bttnDir.length;i++)
    {
        bttnDir[i].disabled = CheckifInvalid(DIRS[i])
    }
    cardIndex++
    if(cardIndex >= cards.length)
    {
        for(let i=0;i<bttnDir.length;i++)
        { Hide(bttnDir[i]) }
        Show(bttnWake)
    }
}

// Connect events
bttnSleep.onclick = Sleep
bttnWake.onclick = WakeUp
for(let i=0;i<bttnDir.length;i++)
{
    bttnDir[i].onclick = ()=>{ Move(i) }
}

// On load Setup
for(let i=0;i<bttnDir.length;i++)
{ Hide(bttnDir[i]) }
WakeUp()