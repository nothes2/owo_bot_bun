export const regex_match = (regex: RegExp, input: string): boolean => {
    return regex.test(input)
}