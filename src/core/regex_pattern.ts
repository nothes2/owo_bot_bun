const pattern = {
    integer: /^[0-9]+$/,
}

function detectNumberPattern(input: string): string {
    for (const [key, regex] of Object.entries(pattern)) {
        if(regex.test(input)) {
            return key
        }
    }

    return 'nothing find here'
}