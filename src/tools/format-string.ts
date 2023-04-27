export const toPascalCase = (term: string): string => {
    return `${term.substring(0,1).toUpperCase()}${term.substring(1).toLowerCase()}`;
}