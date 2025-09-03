const personState = {
    checkList: Array(10).fill(false)
}

const dict = {
    0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H", 8: "I", 9: "J",
}

const people = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const personContainer = document.querySelector('.person');
const KillerSelect = document.getElementById('Killer-select')
const subKillerSelect = document.getElementById('sub-Killer-select')
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
    checked.textContent = 'Lの疑いアリ';

    // const checkBox = document.createElement('input');
    // checkBox.type = 'checkbox';
    // checkBox.label = 'キラ陣営';
    // checkBox.name = 'キラ陣営';

    // const label = document.createElement('label');
    // label.for = 'キラ陣営'
    // label.textContent = 'キラ陣営か?'

    
    div.appendChild(innerElement);
    div.appendChild(checked);
    // div.appendChild(checkBox)
    // div.appendChild(label)

    div.addEventListener('click', () => {
        check_person(index); 
    });
    personContainer.appendChild(div);

    const option = document.createElement('option');
    option.value = index;
    option.textContent = personName;
    KillerSelect.appendChild(option);

    const option2 = document.createElement('option');
    option2.value = index;
    option2.textContent = personName;
    subKillerSelect.appendChild(option2);
});


function selectProcessKiller(event){
    const index = Number(event.target.value);
    if (index != -1 && index != whosubKillerIndex){
        if (personState.checkList[index] === false){
            check_person(index)
        }
        
        if (whoKillerIndex != -1){
            check_person(whoKillerIndex)
        }
        whoKillerIndex = index;
    }
}

function selectProcessSubKiller(event){
    const index = Number(event.target.value);
    if (index != -1 && index != whoKillerIndex){
        check_person(index)
        if (whosubKillerIndex != -1){
            check_person(whosubKillerIndex)
        }
        whosubKillerIndex = index;
    }
}

KillerSelect.addEventListener('change', selectProcessKiller);
subKillerSelect.addEventListener('change', selectProcessSubKiller);


function check_person(index){
    const target = personState.checkList[index];
    personState.checkList[index] = (target === true) ? false : true;
    let element = document.getElementById(`${dict[index]}_checked`);
    element.className = (target === true) ? 'person_checked_before' : 'person_checked_after' ;
    element.textContent = (target === true) ? 'Lの疑いアリ' : 'L以外 確定';

}

function judge_who_L() {
    const answer = personState.checkList
        .map((isChecked, index) => isChecked === false ? dict[index] : null)
        .filter(Boolean);
    
    if (answer.length <= 0) {
        message = '夜神月: 何が何だかわからない...。';
    } else if (answer.length <= 1){
        message = `夜神月: Lはこの人物の可能性が非常に高い。\n[${answer.join(', ')}]\n 強硬手段を使うことをお勧めする。`;
    } else {
        message = `夜神月: Lはこの中に潜伏している可能性がある。\n[${answer.join(', ')}]`;
    }

    document.getElementById("judge-text").textContent = message;
}
