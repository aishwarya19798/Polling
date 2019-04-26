const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT||5000;

app.use(express.static('public'));
app.use(bodyParser.json());

const polls = [{
        "id": "1",
        "ques": "q1",
        "options": [{
            "name": "yes",
            "value": "0"
        }, {
            "name": "no",
            "value": "0"
        }]
    },
    {
        "id": "2",
        "ques": "q2",
        "options": [{
            "name": "yes",
            "value": "0"
        }, {
            "name": "no",
            "value": "0"
        }]
    },
    {
        "id": "3",
        "ques": "q3",
        "options": [{
            "name": "yes",
            "value": "0"
        }, {
            "name": "no",
            "value": "0"
        }]
    }
];

//get all polls
app.get("/polls/", (req, res) => {
    res.json(polls);
});

//get a particular poll
app.get("/polls/:id", (req, res) => {
    const poll = polls.find(x => x.id == req.params.id);
    console.log(poll);
    if (poll == null) return res.status(404).end();

    res.json(poll);
});

//vote in a poll
app.get("/polls/:id/:option", (req, res) => {
    const pollIndex = polls.findIndex(x => x.id == req.params.id);
    if (pollIndex == -1) return res.status(404).end();

    const optionIndex = polls[pollIndex].options.findIndex(x => x.name == req.params.option);
    if (optionIndex == -1) return res.status(404).end();

    polls[pollIndex].options[optionIndex].value++;

    res.json(polls[pollIndex]);
});

//add a poll
app.post("/polls", (req, res) => {
    const newPoll = {
        id: Math.floor(Date.now() / 1000),
        ques: req.body.ques,
        options: req.body.options
    };

    polls.unshift(newPoll);
    res.status(201).json(newPoll);
});

app.listen(port, console.log("Listening at http://127.0.0.1:5000"));