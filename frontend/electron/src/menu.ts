const { app, shell } = require('electron');

export let window: any;

export let menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                click: () => app.exit(0)
            }
        ]
    },
    {
        label: 'Tools',
        submenu: [
            {
                label: 'Open Dev Tools',
                click: () => window.webContents.openDevTools()
            },
            {
                label: 'Reload',
                click: () => window.reload()
            },
            {
                label: 'Close',
                click: () => app.quit()
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Github repository',
                click: () => shell.openExternal('https://github.com/tfSheol/meet-nalia-interview-test-full-stack')
            },
            { type: 'separator' },
            {
                label: 'You have an issue ?',
                click: () => shell.openExternal('https://github.com/tfSheol/meet-nalia-interview-test-full-stack/issues')
            }
        ]
    }
]