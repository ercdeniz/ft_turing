function printName(name, length) {
    const lines = [
        "*".repeat(length),
        "*" + " ".repeat(length - 2) + "*",
        "*" + name.padStart((length + name.length - 2) / 2).padEnd(length - 2) + "*",
        "*" + " ".repeat(length - 2) + "*",
        "*".repeat(length)
    ];
    lines.forEach(line => console.log(line));
}

function printAlphabet(alphabet) {
    console.log("Alphabet : [", alphabet.join(", "), "]");
}

function printStates(states) {
    console.log("States : [", states.join(", "), "]");
}

function printInitial(initial) {
    console.log("Initial :", initial);
}

function printFinals(finals) {
    console.log("Finals : [", finals.join(", "), "]");
}

function printTransitions(transitions) {
    for (const [state, tra] of Object.entries(transitions)) {
        for (const t of tra) {
            console.log(`(${state}, ${t.read}) -> (${t.to_state}, ${t.write}, ${t.action})`);
        }
    }
}

function printTuringOperations(arr) {
    for (const a of arr) {
        console.log(`[${a[0]}] ${a[1]}`);
    }
}

export function printTuringData(turingData, arr) {
    const length = turingData.name.length > 56 ? turingData.name.length + 4 : 60;
    printName(turingData.name, length);
    printAlphabet(turingData.alphabet);
    printStates(turingData.states);
    printInitial(turingData.initial);
    printFinals(turingData.finals);
    printTransitions(turingData.transitions);
    console.log("*".repeat(length));
    printTuringOperations(arr.map(elm => [elm[0] + turingData.blank.repeat(10), elm[1]]));
}
