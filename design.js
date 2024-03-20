let teams = ['CSK', 'RCB'];
let runs = [0, 1, 2, 3, 4, 6, 'W'];

let chosenTeam = teams[Math.floor(Math.random() * 2)];

let team1Prog = [];
let team2Prog = [];

let team1Run = 0;
let team2Run = 0;

let wickCount1 = 0;
let wickCount2 = 0;

let startSecond = false;

function updateScore() {
    let team1Scores = document.getElementById("team1").children;
    let team2Scores = document.getElementById("team2").children;

    for (let i = 0; i < team1Prog.length; i++) {
        team1Scores[i].textContent = team1Prog[i];
    }
    for (let j = 0; j < team2Prog.length; j++) {
        team2Scores[j].textContent = team2Prog[j];
    }
}

function playgame() {
    let buttonValue = document.querySelector('.but');
    let resultText = document.getElementById("res");
    let team1Score = document.getElementById("t1s");
    let team2Score = document.getElementById("t2s");

    if (buttonValue.value === "Striking") {
        buttonValue.value = "play";
        buttonValue.textContent = chosenTeam + " Batting";
    } else {
        let chosenRun = runs[Math.floor(Math.random() * 7)];
        let run = chosenRun === "W" ? 0 : chosenRun;
        if (!startSecond) {
            if (chosenTeam === "CSK") {
                team1Prog.push(chosenRun);
                if (chosenRun === "W") {
                    wickCount1++;
                }
                team1Run += run;
                team1Score.textContent = team1Run;

                if (team1Prog.length === 6 || wickCount1 === 2) {
                    startSecond = true;
                    buttonValue.value = "Striking";
                }
            } else if (chosenTeam === "RCB") {
                team2Prog.push(chosenRun);
                if (chosenRun === "W") {
                    wickCount2++;
                }
                team2Run += run;
                team2Score.textContent = team2Run;

                if (team2Prog.length === 6 || wickCount2 === 2) {
                    startSecond = true;
                    buttonValue.value = "Striking";
                }
            }
            updateScore();
        }

        if (startSecond) {
            let nextTeam = teams.find(team => team !== chosenTeam);
            if (buttonValue.value !== "Striking") {
                chosenRun = runs[Math.floor(Math.random() * 7)];
                run = chosenRun === "W" ? 0 : chosenRun;
            }

            if (nextTeam === "CSK") {
                if (chosenRun === "W") {
                    wickCount1++;
                }
                team1Run += run;
                team1Score.textContent = team1Run;
                team1Prog.push(chosenRun);

                if (team1Prog.length === 6 || wickCount1 === 2) {
                    resultText.textContent = "End of Match";
                    if (team1Run > team2Run) {
                        resultText.textContent = "CSK Wins the Match";
                    } else if (team2Run > team1Run) {
                        resultText.textContent = "RCB Wins the Match";
                    } else {
                        resultText.textContent = "Match Tied";
                    }
                    buttonValue.setAttribute("disabled", true);
                }
            } else if (nextTeam === "RCB") {
                if (chosenRun === "W") {
                    wickCount2++;
                }
                team2Run += run;
                team2Score.textContent = team2Run;
                team2Prog.push(chosenRun);

                if (team2Prog.length === 6 || wickCount2 === 2) {
                    resultText.textContent = "End of Match";
                    if (team1Run > team2Run) {
                        resultText.textContent = "CSK Wins the Match";
                    } else if (team2Run > team1Run) {
                        resultText.textContent = "RCB Wins the Match";
                    } else {
                        resultText.textContent = "Match Tied";
                    }
                    buttonValue.setAttribute("disabled", true);
                }
            }
            updateScore();
        }
    }
}
