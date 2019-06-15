const createPoll = () => {
    let value = {
        ques: document.querySelector("#ques").value,
        options: []
    };

    const allOptions = document.querySelectorAll(".op");
    allOptions.forEach(op => {
        if (op.value.length > 0) {
            value.options.push({ name: op.value, value: 0 });
        }
    });

    let data = JSON.stringify(value);
    console.log(data);
    sendToBackend(data);
};

const sendToBackend = data => {
    return fetch("/polls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    })
        .then(response => response.json())
        .then(vari => {
            console.log(vari);
            saveId(vari);
            window.location.href = "/view.html";
        });
};

const saveId = val => {
    Cookies.set("id", val.id);
};

let vote = "";
const getPoll = () => {
    fetch(`/polls/${Cookies.get("id")}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            document.querySelector("#ques").innerHTML = data.ques;
            vote = data;
            // document.querySelector("#options").innerHTML = data.options[0].name;
            let html = "";
            data.options.forEach(op => {
                html += `<div>${
                    op.name
                } <input type="radio" name="check" class="tick"> <h4>${op.value}</h4> </div>`;
            });
            document.querySelector("#options").innerHTML = html;
        });
};

const sendVote = () => {
    let selectedVote = '';
    const allOptions = document.querySelectorAll(".tick");

    for (let index = 0; index < allOptions.length; index++) {
        const element = allOptions[index];
        if (element.checked) {
            selectedVote = vote.options[index].name;
            element.checked=false
            break;
        }
    }
    console.log(selectedVote)

    if(selectedVote.length>0){
        fetch(`/polls/${vote.id}/${selectedVote}`).then(x=>window.location.href = window.location.href)
    }
};
