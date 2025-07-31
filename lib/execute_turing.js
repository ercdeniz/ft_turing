const replaceChar = (str, index, newChar) =>
    str.substring(0, index) + newChar + str.substring(index + 1);

const prepend = (str, char) => char + str;

const append = (str, char) => str + char;

export function executeTuring(turingData, input, state, index = 0, arr = []) {
    if (turingData.finals.includes(state))
        return arr;
    for (const [s, tra] of Object.entries(turingData.transitions))
        if (state === s) {
            for (const t of tra) {
                if (index == -1) {
                    if (t.read === turingData.blank) {
                        const str = "<" + turingData.blank + ">" + input;
                        return executeTuring(
                            turingData,
                            prepend(input, t.write),
                            t.to_state,
                            index + 1 + (t.action == "RIGHT" ? 1 : -1),
                            [...arr.map(elm => [prepend(elm[0], turingData.blank), elm[1]]), [str, `(${state}, ${t.read}) -> (${t.to_state}, ${t.write}, ${t.action})`]]
                        );
                    }
                } else if (index >= input.length) {
                    if (t.read === turingData.blank) {
                        const str = input + "<" + turingData.blank + ">";
                        return executeTuring(
                            turingData,
                            append(input, t.write),
                            t.to_state,
                            index + (t.action == "RIGHT" ? 1 : -1),
                            [...arr.map(elm => [append(elm[0], turingData.blank), elm[1]]), [str, `(${state}, ${t.read}) -> (${t.to_state}, ${t.write}, ${t.action})`]]
                        );
                    }
                } else if (t.read === input[index]) {
                    const str = input.substring(0, index) + "<" + input[index] + ">" + input.substring(index + 1);
                    return executeTuring(
                        turingData,
                        replaceChar(input, index, t.write),
                        t.to_state,
                        index + (t.action == "RIGHT" ? 1 : -1),
                        [...arr, [str, `(${state}, ${t.read}) -> (${t.to_state}, ${t.write}, ${t.action})`]]
                    );
                }
            }
        }
    if (index === -1 || index >= input.length)
        throw new Error("No valid transition found for state '" + state + "' with input '" + turingData.blank + "'");
    else
        throw new Error("No valid transition found for state '" + state + "' with input '" + input[index] + "'");
}
