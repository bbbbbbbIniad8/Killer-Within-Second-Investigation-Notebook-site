const personState = {
    checkList: Array(10).fill(false),
    takenCardList: Array(10).fill(false)
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

    // const checkBox = document.createElement('input');
    // checkBox.type = 'checkbox';
    // checkBox.label = 'キラ陣営';
    // checkBox.name = 'キラ陣営';

    // const label = document.createElement('label');
    // label.for = 'キラ陣営'
    // label.textContent = 'キラ陣営か?'

    
    div.appendChild(innerElement);
    div.appendChild(checked);
    div.appendChild(takenCard)
    // div.appendChild(checkBox)
    // div.appendChild(label)

    div.addEventListener('click', () => {
        check_person(index); 
    });

    takenCard.addEventListener('click', (event) =>{
        event.stopPropagation()
        changeTakenCard(index);    
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
    element.className = (target === true) ? 'person_takenCard_before' : 'person_takenCard_after';
    element.textContent = (target === true) ? '身分証所持' : `身分証盗難`;
}


