function updateUI() {
    const id = getVoteIdFromQuery();
    getPoll(id).then((poll) => {
        console.log(poll);
        document.querySelector("#ques").innerText = poll.ques;
        poll.options.forEach(option => {
            addradio(option.name)
        });
        document.querySelector('#view').setAttribute("href",`/view.html?id=${id}`)
    });
}

function addradio(name) {
    const newOption = document.createElement('p');
    newOption.innerHTML = `<input type="radio" name="option" value='${name}' onclick='vote("${name}")'>${name}<br>`;
    const options = document.querySelector("#options");
    options.appendChild(newOption);
}

function vote(option) {
    console.log(option);
    const redirect = document.querySelector("#Multiple").checked;
    if (redirect) {
        if (getCookie(getVoteIdFromQuery()) == "true") {
            alert("You can't vote more than once");
            return;
        }
        setCookie(getVoteIdFromQuery().toString(), "true", Date.now());
    }
    SendVote(option, redirect);
}

function SendVote(voteName, redirect) {
    const id = getVoteIdFromQuery();
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            if (redirect) {
                const id = JSON.parse(this.responseText).id;
                window.location.replace(`/view.html?id=${id}`);
            }
        }
    }
    req.open("GET", url + id + '/' + voteName, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
}

updateUI();