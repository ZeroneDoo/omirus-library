module.exports = {
    obfusLib: function (program, fs, path, fse, obfuscator) {
        program
            .command('obfuscate-file <inputFile> <outputFile>')
            .description('Obfuscate a JavaScript file')
            .action((inputFile, outputFile) => {
                console.log(`Obfuscating file: ${inputFile}`);
                const code = fs.readFileSync(inputFile, 'utf-8');
                const obfuscationOptions = {
                    compact: false,
                    controlFlowFlattening: false,
                    debugProtection: false,
                    disableConsoleOutput: false,
                    renameGlobals: true,
                    selfDefending: false,
                    stringArray: false,
                    transformObjectKeys: false,
                    unicodeEscapeSequence: false,
                };

                const obfuscatedCode = obfuscator.obfuscate(code, obfuscationOptions).getObfuscatedCode();
                const autoGeneratedComment =
                    `/**
*  AUTO GENERATED BY OMIRUS
*
*/
`;

                const obfuscatedCodeWithComment = autoGeneratedComment + obfuscatedCode;

                fs.writeFileSync(outputFile, obfuscatedCodeWithComment, 'utf-8');

                console.log(`File obfuscated and saved as: ${outputFile}`);
            });
    }
}