const personState = {
    checkList: Array(10).fill(false),
    takenCardList: Array(10).fill(false),
    deadList: Array(10).fill(0),
}

const dict = {
    0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H", 8: "I", 9: "J",
}

const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const personContainer = document.querySelector('.person');
const checkedText = "！"
let whoKillerIndex = -1;
let whosubKillerIndex = -1;


people.forEach((personName, index) => { 
    const div = document.createElement('div');
    div.id = personName;

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
                  'person_checked_before',
                   '',
                   null);

    const takenCard = createElement( div,
                                    `${personName}_takenCard`,
                                    'person_takenCard_before  hover_big taken_card_window',
                                    '身分証所持',
                                    null);
    
    const dead = createElement(      div,
                                    `${personName}_deadState`,
                                    'person_alive  hover_big deadState_window',
                                    '生存',
                                    null);

    const deadMark = document.createElement('img'); 
    deadMark.id = `${personName}_dead_mark`;
    deadMark.className = 'person_dead_mark';
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
    let element = document.getElementById(`${dict[index]}_checked`);
    element.className = (target === true) ? 'person_checked_before' : 'person_checked_after' ;
    element.textContent = (target === true) ? '' : `${checkedText}`;

}

function changeTakenCard(index){
    const target = personState.takenCardList[index];
    personState.takenCardList[index] = (target === true) ? false : true;
    let element = document.getElementById(`${dict[index]}_takenCard`);
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
    let element = document.getElementById(`${dict[index]}_deadState`);
    let deadFillter = document.getElementById(`${dict[index]}_dead_fillter`)
    let deadMark = document.getElementById(`${dict[index]}_dead_mark`)

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

