"use strict"

import{
    players
}   from './wch2025/wch2025.mjs';

const div = document.querySelector('#cards')

let updatePlayer = -1;

let deletePlayer = -1;

const updateDialog = document.querySelector('#update-dialog')

const deleteDialog = document.querySelector('#delete-dialog')

const closeBtn = document.querySelector('#close-dialog')

function generateParagraph(text, tomb){
    const p = document.createElement('p')
    p.classList.add('flex','flex-col','justify-around','!indent-[0]','text-center',...tomb ?? '')
    p.textContent = text
    return p
}

function generateDiv(h4){
    const div = document.createElement('div');
    div.append(h4)
    div.classList.add('flex-div',)
    return div;
}

function generateh4(text){
    const h4 = document.createElement('h4');
    h4.textContent = text
    h4.classList.add('basis-full','mt-[3rem]',)
    return h4;
}

function generatecard(){
    const div = document.querySelector('#cards');
    const u15wmn = generateDiv(generateh4('U15 LÁNYOK'))
    const u19wmn = generateDiv(generateh4('U19 LÁNYOK'))
    const u15mn = generateDiv(generateh4('U15 FIÚK'))
    const u19mn = generateDiv(generateh4('U19 FIÚK'))
    const captain = generateDiv(generateh4('SZÖVETSÉGI KAPITÁNYOK'))

    div.replaceChildren()

    for(const [index, player] of players.entries())
        {
            const card = document.createElement("div")
            const image = document.createElement("img")
            const grid = document.createElement('div')
            
            grid.classList.add('grid','m-5','mx-auto','gap-1','grid-cols-2',)

            grid.append(
                generateParagraph(player.name),
                generateParagraph("Legjobb eredmény: " +  player.best),
                generateParagraph(player.team,['col-span-full'])

            )
        
            card.classList.add('card','text-black','basis-md')
            image.classList.add('h-[460px]','overflow-hidden','object-cover')

            if (player.img == '') {
                image.src = 'img/anonymus.webp'
            }
            else image.src = player.img
            
            image.alt = image.tittle = player.name
        
            card.append(image, grid)

            if (player.type == 'u15' && player.gender == 'nő') {
                u15wmn.classList.add('u15', 'nő')
                u15wmn.append(card)
            }
            else if (player.type == 'u19' && player.gender == 'nő')
            {
                u19wmn.classList.add('u19', 'nő')
                u19wmn.append(card)
            }
            else if (player.type == 'u15' && player.gender == 'férfi')
            {
                u15mn.classList.add('u15', 'férfi')
                u15mn.append(card)
            }
            else if (player.type == 'u19' && player.gender == 'férfi')
            {
                u19mn.classList.add('u19', 'férfi')
                u19mn.append(card)
            }
            else{
                captain.append(card)
                grid.removeChild(grid.children[1])
                grid.children[1].classList.add('flex','flex-col','justify-around')
            }
            
        }

    div.append(u15wmn,u19wmn, u15mn, u19mn, captain)
        
}

generatecard();

function generateLi(text, tomb){
    const li = document.createElement('li')
    li.textContent = text
    li.classList.add(...tomb ?? '')
    return li;
}

function generateList() {
    const errorlist = document.querySelector('#error-list')

    for(const player of players)
    {
        errorlist.classList.add('grid','grid-cols-2','m-5','mx-auto','gap-1','text-center',)
        
        errorlist.append(
        generateLi(player.type +" " + player.gender +" "+ player.name, ['last:col-span-full'])
        )
    }
    
}

generateList()


document.querySelector('#close-delete').addEventListener('click', () => {
    updatePlayer = -1;
    deleteDialog.close();
});

document.querySelector('#close-button').addEventListener('click', () => {
    closeBtn.close();
});

