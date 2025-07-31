export function validateMachine(machineData) {
    // 1. Gerekli alan kontrolü
    const requiredFields = ['name', 'alphabet', 'blank', 'states', 'initial', 'finals', 'transitions'];
    for (const field of requiredFields)
        if (!(field in machineData))
            throw new Error(`Missing required field: '${field}' in machine definition`);

    // 2. Alphabet validasyonu
    if (!Array.isArray(machineData.alphabet))
        throw new Error("Alphabet must be an array");

    if (machineData.alphabet.length === 0)
        throw new Error("Alphabet cannot be empty");

    for (const char of machineData.alphabet)
        if (typeof char !== 'string' || char.length !== 1)
            throw new Error(`Alphabet character '${char}' must be a single character string`);

    // 3. Blank karakter kontrolü
    if (typeof machineData.blank !== 'string' || machineData.blank.length !== 1)
        throw new Error("Blank character must be a single character");

    if (!machineData.alphabet.includes(machineData.blank))
        throw new Error(`Blank character '${machineData.blank}' must be in alphabet`);

    // 4. States validasyonu
    if (!Array.isArray(machineData.states))
        throw new Error("States must be an array");

    if (machineData.states.length === 0)
        throw new Error("States list cannot be empty");

    const statesSet = new Set(machineData.states);
    if (statesSet.size !== machineData.states.length)
        throw new Error("States list contains duplicate values");

    // 5. Initial state kontrolü
    if (!machineData.states.includes(machineData.initial))
        throw new Error(`Initial state '${machineData.initial}' not found in states list`);

    // 6. Final states kontrolü
    if (!Array.isArray(machineData.finals))
        throw new Error("Finals must be an array");

    for (const finalState of machineData.finals) {
        if (!machineData.states.includes(finalState))
            throw new Error(`Final state '${finalState}' not found in states list`);
    }

    // 7. Transitions validasyonu
    if (typeof machineData.transitions !== 'object' || machineData.transitions === null)
        throw new Error("Transitions must be an object");

    for (const [state, transitions] of Object.entries(machineData.transitions)) {
        if (!machineData.states.includes(state))
            throw new Error(`Transition state '${state}' not found in states list`);

        if (!Array.isArray(transitions))
            throw new Error(`Transitions for state '${state}' must be an array`);

        if (transitions.length === 0)
            throw new Error(`State '${state}' has no transitions defined`);

        const seenChars = new Set();
        for (const transition of transitions) {
            if (typeof transition !== 'object')
                throw new Error(`Invalid transition format in state '${state}'`);

            // 7.1. Transition alan kontrolü
            const requiredTransitionFields = ['read', 'to_state', 'write', 'action'];
            for (const field of requiredTransitionFields)
                if (!(field in transition))
                    throw new Error(`Missing '${field}' in transition for state '${state}'`);

            // 7.2. Read karakter kontrolü
            if (!machineData.alphabet.includes(transition.read))
                throw new Error(`Invalid read character '${transition.read}' in state '${state}'`);

            // 7.3. Write karakter kontrolü
            if (!machineData.alphabet.includes(transition.write))
                throw new Error(`Invalid write character '${transition.write}' in state '${state}'`);

            // 7.4. Hedef state kontrolü
            if (!machineData.states.includes(transition.to_state))
                throw new Error(`Invalid to_state '${transition.to_state}' in state '${state}'`);

            // 7.5. Action kontrolü
            if (!['LEFT', 'RIGHT'].includes(transition.action))
                throw new Error(`Invalid action '${transition.action}' in state '${state}'. Must be LEFT or RIGHT`);

            // 7.6. Aynı karakter için çift geçiş kontrolü (deterministik olmayan makineler için kaldırılabilir)
            if (seenChars.has(transition.read))
                throw new Error(`Duplicate transition for character '${transition.read}' in state '${state}'`);
            seenChars.add(transition.read);
        }
    }
}

export function validateInput(input, alphabet, blank) {
    if (typeof input !== 'string')
        throw new Error("Input must be a string");

    if (input.includes(blank))
        throw new Error(`Input contains blank character '${blank}' which is not allowed`);

    for (const char of input) {
        if (!alphabet.includes(char))
            throw new Error(`Input character '${char}' not found in machine alphabet`);
    }
}
