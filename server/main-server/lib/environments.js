const environments = [
    {
        id: '1',
        envLabel: 'Node.js',
        environment: 'nodejs',
        language: 'javascript',
        entry_point: 'index.js',
        icon: 'https://img.icons8.com/?size=512&id=hsPbhkOH4FMe&format=png',
        fileExtension: '.js',
        runCommand: ['node', 'index.js']
    },

    {
        id: '2',
        envLabel: 'Python',
        environment: 'python',
        language: 'python',
        entry_point: 'main.py',
        icon: 'https://img.icons8.com/?size=512&id=13441&format=png',
        fileExtension: '.py',
        runCommand: ['python', 'main.py']
    },

    {
        id: '3',
        envLabel: 'Java',
        environment: 'java',
        language: 'java',
        entry_point: 'Main.java',
        icon: 'https://img.icons8.com/?size=512&id=13679&format=png',
        fileExtension: '.java',
        runCommand: ['javac', 'Main.java', '&&', 'java', 'Main']
    },

    {
        id: '4',
        envLabel: 'C++',
        environment: 'cpp',
        language: 'cpp',
        entry_point: 'main.cpp',
        icon: 'https://img.icons8.com/?size=512&id=40669&format=png',
        fileExtension: '.cpp',
        runCommand: ['g++', 'main.cpp', '-o', 'main', '&&', './main']
    },

    {
        id: '5',
        envLabel: 'C',
        environment: 'c',
        language: 'c',
        entry_point: 'main.c',
        icon: 'https://img.icons8.com/?size=512&id=shQTXiDQiQVR&format=png',
        fileExtension: '.c',
        runCommand: ['gcc', 'main.c', '-o', 'main', '&&', './main']
    },

    {
        id: '6',
        envLabel: 'Go',
        environment: 'go',
        language: 'go',
        entry_point: 'main.go',
        icon: 'https://img.icons8.com/?size=512&id=7ej5ASIwdQXG&format=png',
        fileExtension: '.go',
        runCommand: ['go', 'run', 'main.go']
    },

    {
        id: '7',
        envLabel: 'TypeScript',
        environment: 'typescript',
        language: 'typescript',
        entry_point: 'index.ts',
        icon: 'https://img.icons8.com/?size=512&id=uJM6fQYqDaZK&format=png',
        fileExtension: '.ts',
        runCommand: ['tsc', 'index.ts', '&&', 'node', 'index.js']
    },

    {
        id: '8',
        envLabel: 'JavaScript',
        environment: 'javascript',
        language: 'javascript',
        entry_point: 'index.js',
        icon: 'https://img.icons8.com/?size=512&id=108784&format=png',
        fileExtension: '.js',
        runCommand: ['node', 'index.js']
    }
]

module.exports = environments;


