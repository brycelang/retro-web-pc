# Retro Dashboard

A Windows 98 inspired dashboard landing page built with Create React App

![app](https://i.imgur.com/hD67hTt.png)

# Features

- Draggable windows
- Closable windows
- Desktop icons launch respective program
- Time and date in header
- Relatively simple to create a new app

# Applications

### File explorer

The file explorer application comes with a file tree view and a folder
view interface.

### Terminal

The terminal is a read-only terminal window that outputs information
about the webserver it is currently sitting on.

# Creating a new application

Creating a new application is fairly simple. The process contains only
a few steps:

### Step 1: App creation

File: `Desktop.js`

Create an application template like this:

```
// example app template
generateExampleApp = () => {
  return (
    <AppContainer
      appName="Example Application"
      appContent={<h1>Hello World!</h1>}
      footerChunks={['example-footer-item', 'example-footer-item']}
      closeApp={this.closeApp.bind(this)}
      key={uuidv4()}
    />
  )
}
```

#### props

- `appName` this is the applications identifier and will show in the
  header of the app.
- `appContent` this is what will be displayed inside the applications
  main window.
- `footerChunks` these will be present in the footer (I don't
  recommend more than 3 items). Supply an array of strings.
- `closeApp` bind it to the closeApp method to handle closing.
- `key` supply it to make react stop complaining about unique
  identifiers.

### Step 2: Create content

File: `Desktop.js`

Create the application content. Here you can create whatever you want.
Import the new application content file into Desktop.js and provide it
as a JSX element in the appContent prop in the AppContainer as shown
above.

```
appContent={<ExampleApp />}
```

### Step 3: Load application in state

File: `Desktop.js`

Create a field in the state and set its value to the return value of
the method.

```
this.state = {
  exampleApplication: this.generateExampleApp()
}
```

Alternatively you can set the field to null to prevent app from
appearing at page load.

```
this.state = {
  exampleApplication: null
}
```

**IMPORTANT:** Name the field in the state the same as the appName but
in Camel Case! In this example case "Example Application" becomes
"exampleApplication". This is so that the close app button and desktop
icons can function properly.

### Step 4: Create a desktop icon

File: `DesktopIconContainer.js`

To create a desktop icon you just need to supply an image.

First place the icon in `src/img` and import it:
`import <YOUR-NEW-ICON> from '../../../img/<YOUR-NEW-ICON>.<file-extension>'`

Then you just supply it to the icons array inside the state:

```
this.state = {
  icons: [<ALREADY-DEFINED-ICON>, <ALREADY-DEFINED-ICON>, <YOUR-NEW-ICON>]
}
```

### Step 5: Hook desktop icon to app

File: `Desktop.js`

Inside the spawnNewApp method you need to provide a case in the
switch/case statement.

**NOTE:** The desktop icon's id is equal to the application's index in
the state.

```
spawnNewApp(e) {
    const key = e.currentTarget.getAttribute('name')
    const id = e.currentTarget.id

    let app = null
    switch (id) {
      case '0':
        app = this.generateTerminalApp()
        break
      case '1':
        app = this.generateFolderApp()
        break
   __________________________________________
  |   case '2':                              |
  |     app = this.generateExampleApp()      |
  |     break                                |
   __________________________________________
      default:
        break
    }
    this.setState({ [key]: app })
  }
```
