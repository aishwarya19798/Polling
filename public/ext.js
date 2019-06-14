const createPoll = () => {
    let value = {
        ques : document.querySelector('#ques').value,
        options : [{
            name : document.querySelector('#op1').value,
            value : 0
        }]
    }
    let data = JSON.stringify(value)
    console.log(data)
    sendToBackend(data)
}

const sendToBackend = (data) => {
    return fetch("/polls",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : data
    })
    .then(response => response.json())
    .then(vari => {
            console.log(vari);
            saveId(vari);
        });
}

const saveId = (val) => {   
    Cookies.set("id",val.id);
}

const getPoll = () => {
    fetch(`/polls/${Cookies.get('id')}`)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        document.querySelector('#ques').innerHTML = data.ques;
        document.querySelector('#options').innerHTML = data.options[0].name;
    })
}