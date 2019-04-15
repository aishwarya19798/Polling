let i = 1;

function addfield() {
    let newLi = document.createElement('li')
    newLi.innerHTML = `<input id=op${i} type="text">`
    let field = document.querySelector("#field")
    field.appendChild(newLi)
    field.appendChild(document.createElement('br'))
    i++
}

function getOptions() {
    let options = [];
    for (let index = 1; index < i; index++) {
        let item = document.querySelector(`#op${index}`)
        if (item.value != "")
            options.push({
                name: item.value,
                value: 0
            });
    }
    console.log(options);
    return options;
}

function createPoll(data) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            console.log(this.responseText);
            const id = JSON.parse(this.responseText).id;
            window.location.replace(`/created.html?id=${id}`);
        }
    }
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
}

for (var index = 0; index < 5; index++) {
    addfield();
}

document.querySelector("#poll").addEventListener('click', function () {
    let poll = {
        ques: document.querySelector("#question").value,
        options: getOptions()
    };
    poll = JSON.stringify(poll);
    console.log(poll);

    createPoll(poll);
});