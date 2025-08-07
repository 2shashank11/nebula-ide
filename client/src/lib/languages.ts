const extensionToLanguage: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    html: "html",
    css: "css",
    json: "json",
    py: "python",
    java: "java",
    cs: "csharp",
    cpp: "cpp",
    md: "markdown",
    xml: "xml",
    sql: "sql",
    php: "php",
    go: "go",
    rs: "rust",
    txt: "plaintext",
    yaml: "yaml",
};


export const getFileLanguage = (language: string): string => {
    return extensionToLanguage[language] || "txt";
}   