const personState = {
    checkList: Array(10).fill(false),
    takenCardList: Array(10).fill(false),
    deadList: Array(10).fill(0),
}

const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const personContainer = document.querySelector('.person');
const checkedText = "！";
const touchA = document.getElementById('touch-A');
const touchB = document.getElementById('touch-B');
const day = document.getElementById('day');
const writeBtn = document.getElementById('write-btn');
const logList = document.getElementById('log-list');

let modeBPage = false;
let logIndex = 0;

const changeview = () =>{
    const content = document.getElementById("content");
    if (window.innerWidth < 800){
        content.classList = 'flex-column';
    }else{
        content.classList = 'flex-row';
    }
}

changeview()
window.addEventListener('resize', changeview);



people.forEach((personName, index) => { 
    const div = document.createElement('div');
    div.id = personName;
    div.className = 'person_master_window modeA'

    createElement(div,
                  `${personName}_dead_fillter`,
                  'person_dead_fillter',
                  null,
                  'none')

    createElement(div,
                  `${personName}_name`,
                  'person_name',
                   personName,
                   null)

    createElement(div,
                  `${personName}_checked`,
                  'person_checked before modeA',
                   '',
                   null);

    const takenCard = createElement( div,
                                    `${personName}_takenCard`,
                                    'person_takenCard before  hover_big taken_card_window modeA',
                                    '身分証所持',
                                    null);
    
    const dead = createElement(      div,
                                    `${personName}_deadState`,
                                    'person_alive  hover_big deadState_window',
                                    '生存',
                                    null);

    const deadMark = document.createElement('img'); 
    deadMark.id = `${personName}_dead_mark`;
    deadMark.className = 'person_dead_mark modeA';
    deadMark.src = `../publicdomainq-0035421kjvdum.png`;
    deadMark.style.display = 'none';
    
    createOption(touchA, index);
    createOption(touchB, index);

    div.appendChild(deadMark)

    div.addEventListener('click', () => {
        checkPerson(index); 
    });

    takenCard.addEventListener('click', (event) =>{
        event.stopPropagation()
        changeTakenCard(index);    
    })

    dead.addEventListener('click', (event) =>{
        event.stopPropagation()
        changeAlive(index);    
    })
    
    personContainer.appendChild(div);
});

[touchA, touchB].forEach((element, index) =>{
    element.addEventListener('change', (event) =>{
    element.className = `${people[event.target.value]} down-box`;
})
})

// if (window.innerWidth < 800){
changeWeb();
// }


writeBtn.addEventListener('click', () =>{
    let value1 = touchA.value;
    let value2 = touchB.value;
    if(value1 !== -1 && value2 !== -1 && value1 !== value2){
        if (touchA.value > touchB.value){
            value1 = touchB.value
            value2 = touchA.value
        }
        const child = document.createElement('div'); 
        child.className = 'flex-row item-box';
        child.id = `item-box-${logIndex}`

        const logText = createElement(
                    　child, 
                      `logIndex_${logIndex}`,
                      'list_item', 
                      '',
                       null);
        
        logText.innerHTML = 
        `${day.value}日目に<span class='log-font ${people[value1]}'>${people[value1]}</span>と
        <span class='log-font ${people[value2]}'>${people[value2]}</span>が接触。`

        const childDeleteEv = createElement(
                      child, 
                      `delete_${logIndex}`,
                      'delete-item',
                       '削除',
                       null)

        childDeleteEv.onclick = () => {
            deleteLog(child);
        };

        logList.prepend(child);
        logIndex++;        
        }
})

function deleteLog(target){
    target.style.display = 'none';
}

function createElement(parent, childId, childClass, childTextContent, childDisplayStyle){
    const child = document.createElement('div'); 
    child.id = childId;
    child.className = childClass;
    child.textContent=childTextContent;
    if(childDisplayStyle !== null){
        child.style.display = childDisplayStyle;
    }
    parent.appendChild(child);
    return child;
}

function createOption(parent, value){
    const option = document.createElement('option'); 
    option.value = value;
    option.textContent = people[value];
    option.className = `options ${people[value]}`;
    parent.appendChild(option);
    return option;
}

function changeClass(element, classNameA, classNameB){
    element.classList.remove(classNameA);
    element.classList.add(classNameB)
}

function boollenChangeClass(element, bool, elementX, elementY){
    const argX = (bool === false) ? elementX : elementY;
    const argY = (bool === false) ? elementY : elementX;
    changeClass(element, argX, argY);
}

function checkPerson(index){
    const target = personState.checkList[index];
    personState.checkList[index] = (target === true) ? false : true;
    const element = document.getElementById(`${people[index]}_checked`);
    boollenChangeClass(element, target, 'before', 'after');
    element.textContent = (target === true) ? '' : `${checkedText}`;
}

function changeTakenCard(index){
    const target = personState.takenCardList[index];
    personState.takenCardList[index] = (target === true) ? false : true;
    const element = document.getElementById(`${people[index]}_takenCard`);
    boollenChangeClass(element, target, 'before', 'after');
    element.textContent = (target === true) ? '身分証所持' : '身分証盗難';
}

function changeAlive(index){
    const target = personState.deadList[index] + 1;
    personState.deadList[index] += 1;
    const element = document.getElementById(`${people[index]}_deadState`);
    const deadFillter = document.getElementById(`${people[index]}_dead_fillter`)
    const deadMark = document.getElementById(`${people[index]}_dead_mark`)
    if (target % 3 === 1){
        changeClass(element, 'person_alive', 'person_dead');
        element.textContent = '死亡';
        deadFillter.style.display = '';
        deadMark.style.display = '';
    } else if(target % 3 === 2){
        changeClass(element, 'person_dead', 'person_detention');
        element.textContent = '留置';
    } else {
        changeClass(element, 'person_detention', 'person_alive');
        element.textContent = '生存';
        deadFillter.style.display = 'none';
        deadMark.style.display = 'none';
    }    
}

function changeWeb(){
    const personList = document.getElementById('person-list');
    boollenChangeClass(personList, modeBPage, 'flex-row', 'flex-column');
    people.forEach((personName, index) => { 
        const checkedMark = document.getElementById(`${people[index]}_checked`);
        const takenCard = document.getElementById(`${people[index]}_takenCard`);
        const master = document.getElementById(personName);
        const deadMark = document.getElementById(`${personName}_dead_mark`)
        const elementList = [checkedMark, takenCard, master, deadMark];
        elementList.forEach((element, index) => {
            boollenChangeClass(element, modeBPage, 'modeA', 'modeB');
        });
        if (modeBPage === false){
            master.classList.add('flex-row');
        } else {
            master.classList.remove('flex-row');
        }
    })
    modeBPage = (modeBPage === false) ? true: false;
}
