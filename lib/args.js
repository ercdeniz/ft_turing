export function parseArgs() {
    const args = Deno.args;
    const length = args.length - 5;

    if (length === 0) throw new Error("Argument missing. Please provide arguments.");
    if (length === 1 && (args[5] === "--help" || args[5] === "-h")) printHelp();
    if (length === 1) throw new Error("Expected 2 arguments, got 1.");
    if (length > 2) throw new Error("Too many arguments. Expected 2.");

    return {
        jsonFile: args[5],
        input: args[6]
    };
}

function printHelp() {
    console.log(`
    Turing Machine Simulator

    usage: ft_turing [-h] jsonfile input

    positional arguments:
      jsonfile\tjson description of the machine
      input\tinput of the machine

    optional arguments:
      -h, --help\tshow this help message and exit
    `);
    Deno.exit(0);
}
