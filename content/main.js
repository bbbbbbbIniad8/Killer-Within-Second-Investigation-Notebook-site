const personState = {
    checkList: Array(10).fill(false),
    takenCardList: Array(10).fill(false),
    deadList: Array(10).fill(0),
}

const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const personContainer = document.querySelector('.person');
const checkedText = "！"

let smartphonePage = false;

people.forEach((personName, index) => { 
    const div = document.createElement('div');
    div.id = personName;
    div.className = 'person_master_window PC'

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
                  'person_checked_before PC',
                   '',
                   null);

    const takenCard = createElement( div,
                                    `${personName}_takenCard`,
                                    'person_takenCard_before  hover_big taken_card_window PC',
                                    '身分証所持',
                                    null);
    
    const dead = createElement(      div,
                                    `${personName}_deadState`,
                                    'person_alive  hover_big deadState_window',
                                    '生存',
                                    null);

    const deadMark = document.createElement('img'); 
    deadMark.id = `${personName}_dead_mark`;
    deadMark.className = 'person_dead_mark PC';
    deadMark.src = `../publicdomainq-0035421kjvdum.png`;
    deadMark.style.display = 'none';
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

if (window.innerWidth < 800){
    changeWeb();
}

function createElement(parent, childId, childClass, childTextContent, childDisplayStyle){
    const child = document.createElement('div'); 
    if(childId){
        child.id = childId;
    }
    if(childClass){
        child.className = childClass;
    }
    if(childTextContent){
        child.textContent=childTextContent;
    }
    if(childDisplayStyle !== null){
        child.style.display = childDisplayStyle;
    }
    parent.appendChild(child);
    
    return child;
}

function changeClass(element, classNameA, classNameB){
    element.classList.remove(classNameA);
    element.classList.add(classNameB)
}

function checkPerson(index){
    const target = personState.checkList[index];
    personState.checkList[index] = (target === true) ? false : true;
    let element = document.getElementById(`${people[index]}_checked`);
    if (target === false){
        changeClass(element,'person_checked_before', 'person_checked_after');
    } else {
        changeClass(element,'person_checked_after', 'person_checked_before');
    }
    element.textContent = (target === true) ? '' : `${checkedText}`;
}

function changeTakenCard(index){
    const target = personState.takenCardList[index];
    personState.takenCardList[index] = (target === true) ? false : true;
    let element = document.getElementById(`${people[index]}_takenCard`);
    if(target === true){
        changeClass(element, 'person_takenCard_after', 'person_takenCard_before');
    } else{
        changeClass(element, 'person_takenCard_before', 'person_takenCard_after');
    }
    element.textContent = (target === true) ? '身分証所持' : '身分証盗難';
}

function changeAlive(index){
    const target = personState.deadList[index];
    personState.deadList[index] += 1;
    let element = document.getElementById(`${people[index]}_deadState`);
    let deadFillter = document.getElementById(`${people[index]}_dead_fillter`)
    let deadMark = document.getElementById(`${people[index]}_dead_mark`)

    console.log(target)
    if (target % 3 === 0){
        changeClass(element, 'person_alive', 'person_dead');
        element.textContent = '死亡';
        deadFillter.style.display = '';
        deadMark.style.display = '';
        
    } else if(target % 3 === 1){
        changeClass(element, 'person_dead', 'person_detention');
        element.textContent = '留置';
        deadFillter.style.display = '';
        deadMark.style.display = '';
    } else {
        changeClass(element, 'person_detention', 'person_alive');
        element.textContent = '生存';
        deadFillter.style.display = 'none';
        deadMark.style.display = 'none';
    }
}

function changeWeb(){
    let personlist = document.getElementById('person-list');
    if (smartphonePage === false){
        changeClass(personlist, 'flex-row', 'flex-column')
    } else {
        changeClass(personlist, 'flex-column', 'flex-row')
    }
    people.forEach((personName, index) => { 
        let checkedMark = document.getElementById(`${people[index]}_checked`);
        let takenCard = document.getElementById(`${people[index]}_takenCard`);
        let master = document.getElementById(personName);
        let deadMark = document.getElementById(`${personName}_dead_mark`)
        if (smartphonePage === false){
            changeClass(checkedMark, 'PC', 'PHONE');
            changeClass(takenCard, 'PC', 'PHONE');
            changeClass(master, 'PC', 'PHONE');
            changeClass(deadMark, 'PC', 'PHONE');
            master.classList.add('flex-row');
        } else {
            changeClass(checkedMark, 'PHONE', 'PC');
            changeClass(takenCard, 'PHONE', 'PC');
            changeClass(master, 'PHONE', 'PC');
            changeClass(deadMark, 'PHONE', 'PC');
            master.classList.remove('flex-row');
        }
    })
    smartphonePage = (smartphonePage === false) ? true: false;
}

