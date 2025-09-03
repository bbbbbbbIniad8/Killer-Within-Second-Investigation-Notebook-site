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
const KillerSelect = document.getElementById('Killer-select')
const subKillerSelect = document.getElementById('sub-Killer-select')
const checkedText = "！"
let whoKillerIndex = -1;
let whosubKillerIndex = -1;



people.forEach((personName, index) => { 
    const div = document.createElement('div');
    div.id = personName;

    const deadFillter = document.createElement('div'); 
    deadFillter.id = `${personName}_dead_fillter`;
    deadFillter.className = 'person_dead_fillter';
    deadFillter.style.display = 'none';

    const innerElement = document.createElement('div'); 
    innerElement.id = `${personName}_name`;
    innerElement.className = 'person_name';
    innerElement.textContent = personName;

    const checked = document.createElement('div'); 
    checked.id = `${personName}_checked`;
    checked.className = 'person_checked_before';
    checked.textContent = '';

    const takenCard = document.createElement('div'); 
    takenCard.id = `${personName}_takenCard`;
    takenCard.className = 'person_takenCard_before  hover_big';
    takenCard.textContent = `身分証所持`;

    const dead = document.createElement('div'); 
    dead.id = `${personName}_deadState`;
    dead.className = 'person_alive  hover_big';
    dead.textContent = `生存`;

    const deadMark = document.createElement('img'); 
    deadMark.id = `${personName}_dead_mark`;
    deadMark.className = 'person_dead_mark';
    deadMark.src = `../publicdomainq-0035421kjvdum.png`;
    deadMark.style.display = 'none';

    

    div.appendChild(deadFillter)
    div.appendChild(innerElement);
    div.appendChild(checked);
    div.appendChild(takenCard)
    div.appendChild(dead)
    div.appendChild(deadMark)


    div.addEventListener('click', () => {
        check_person(index); 
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


function check_person(index){
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
    element.className =  (target === true) ? 'person_takenCard_before hover_big' : 'person_takenCard_after hover_big';
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
        element.className = 'person_dead hover_big';
        element.textContent = '死亡';
        deadFillter.style.display = '';
        deadMark.style.display = '';
        
    } else if(target % 3 === 1){
        element.className = 'person_detention hover_big';
        element.textContent = '留置';
        deadFillter.style.display = '';
        deadMark.style.display = '';
    } else {
        element.className = 'person_alive hover_big';
        element.textContent = '生存';
        deadFillter.style.display = 'none';
        deadMark.style.display = 'none';
    }
}

