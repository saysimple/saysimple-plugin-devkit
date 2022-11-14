
# Saysimple plugins devkit

A tool for viewing and editing saysimple apps. In this readme you will find how to install and use the devkit and also a tutorial on how to create and develop Saysimple apps

## Table of contents
<!-- TOC -->
* [Saysimple plugins devkit](#saysimple-plugins-devkit)
  * [Table of content](#table-of-content)
* [Creation and development of an App](#creation-and-development-of-an-app)
  * [Create an app](#create-an-app)
    * [Package.json](#packagejson)
      * [name](#name)
      * [main & module](#main--module)
      * [Saysimple](#saysimple)
    * [Icon](#icon)
  * [Components](#components)
    * [AppData](#appdata)
      * [contact](#contact)
      * [agent](#agent)
      * [assignedAgent](#assignedagent)
      * [conversation](#conversation)
      * [messages](#messages)
      * [tags](#tags)
    * [App](#app)
  * [Utilities](#utilities)
    * [setEmitAndToast](#setemitandtoast)
    * [appendToMessage](#appendtomessage)
    * [i18n](#i18n)
    * [notify](#notify)
    * [apiCall](#apicall)
    * [insightsApiCall](#insightsapicall)
    * [getSetting](#getsetting)
    * [saveSettings](#savesettings)
    * [Send email](#send-email)
    * [saveData](#savedata)
    * [getData](#getdata)
    * [scrollToTop](#scrolltotop)
  * [Translations](#translations)
    * [Creating translations](#creating-translations)
    * [Using translations inside component](#using-translations-inside-component)
      * [Inside the composition api](#inside-the-composition-api)
  * [Icons](#icons)
  * [Assets](#assets)
* [Installation and use of the devkit](#installation-and-use-of-the-devkit)
  * [Installation](#installation)
  * [Install an app](#install-an-app)
    * [Register the app](#register-the-app)
  * [Developing the app in realtime](#developing-the-app-in-realtime)
<!-- TOC -->

# Creation and development of an App
A Saysimple app is a [VueJs component](https://vuejs.org/) that is loaded inside the saysimple platform for users. If you want to create an app you need the following

* An idea on how to create a basic vue app
* A Saysimple environment
* The [devkit](#installation-and-use-of-the-devkit) up and running
## Create an app

First pull the skeleton or the example app
```
git clone <TODO:repo name>
```

### Package.json
Then change the following parts of the `package.json`

#### name
Change name to your plugin name

#### main & module
change
```
  "main": "dist/example.esm.js",
  "module": "dist/example.esm.js",
```
to
```
  "main": "dist/<your-app-name>.esm.js",
  "module": "dist/<your-app-name>.esm.js",
```
#### Saysimple
The saysimple object is data the saysimple platform will use to install and display the plugin, the object looks like this

```json
{
  "saysimple": {
    "name": "App name",
    "description": "A short description of the app",
    "dataRequired": [
      "contact",
      "agent"
    ]
  }  
}
```
The `name` and `description` are shown to the end user to display your app.

Data Required is an array of strings it notifies what kind of data will be sent to your app by the saysimple platform.

The array can exist out of the following data types

* __contact__ \
  The user that sent a message to the saysimple.
* __contact_metadata__ \
  Custom data about the contact, this can be different for every customer.
* __agent__ \
  The agent that is currently logged in.
* __assignedAgent__ \
  The agent the current conversation is assigned to.
* __conversation__ \
  The conversation that is opened by the agent.
* __messages__ \
  Messages that are send in the current conversation.
* __tags__ \
  The tags that are assigned to the current

### Icon
The icon file is located inside the `assets` folder and is named icon.png, if your icon has another extension, or you need the name you can edit the icon location inside the `icon.js` file
```
import iconFile from "../assets/icon.png" <--- change this to your icon location

export const icon = iconFile

```
## Components
Every app needs at least 2 components `settings` and `content` The settings component will be rendered when a user clicks on app settings, the content will be rendered if the end user selects your app when in an active conversation.

Both the settings and the content receive 2 props app and appData you can interact with the Saysimple platform.

### AppData
The appData is a prop delivered to your app settings and content components it contains information about the current instance of the Saysimple platform.

You have to request AppData in the `dataRequired` array inside the `package.json` otherwise the data won't be delivered.

These are the possible attributes of the appData:

#### contact
The contact exists out of the following attributes
```typescript
{
  id: number;
  name: string;
  countryCode?: string;
  email?: string;
  phone?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  province?: string;
  country?: string;
  reference?: string;
  company?: string;
  jobTitle?: string;
  isHighPriority?: number;
  createdAt?: Date;
  isBlocked?: number;
}
```
If you have `content_metadata` enabled in `dataRequired` you also get access to a `metadata` attribute. This is an array that looks like this:
```typescript
[{
    id: number,
    name: string,
    value: string
}]
```
#### agent
The agent exists out of the following attributes
```typescript
{
  id: number;
  name?: string;
  displayName?: string;
  email?: string;
}
```
#### assignedAgent
The assigned agent looks exactly the same as the normal agent

#### conversation
The conversation exists out of the following attributes

```typescript
{
    start: Date;
    status: "open" | "closed";
}
```
#### messages
The messages is an array that exists out of the following attributes

```typescript
[{
    direction: "in" | "out";
    time: Date;
    status: string;
    message: string;
}]
```

#### tags
The tags is a string array

### App
The app is a prop delivered to your app settings and content components it contains information about your app and utilities to interact with the Saysimple platform.

the app object always looks like this:
```typescript
{
    id: number,
    enabled: number,
    name: string,
    package: {
        name: string,
        version: string,
        saysimple: <same as the saysimple in package.json>
    },
    utils: <object with functions>,
    components: {
        settings: <Vue component>,
        content: <Vue component>,
    },
    settings: <your app settings>,
}
```

the `id`, `enabled` and `components` are mainly for the saysimple to render your app properly, so you probably don't have to care about them.

The `name` is the same as the name in `package.json`

The package also contains data from the `package.json`

The `settings` are the settings of the app.

`utils` are useful functions to interact with app or make api calls. You can read more about them in the next chapter
## Utilities
Saysimple gives you a few utility functions. They are available in the `utils` attribute inside the `app` prop. The utils contain the following functions

### setEmitAndToast
TODO: find out what this does

### appendToMessage
This will append a message inside the message editor inside the saysimple platform.

You will receive an alert with the appended message if you're using the devkit.

__input__

A `string` that will be the message that is appended

__output__

This function does not return anything

__usage__

```javascript
utils.appendToMessage("message to append")
```

### i18n
This is a [Vue i18n](https://kazupon.github.io/vue-i18n/) plugin you can use inside a composable. You can read more about translation in the next chapter.

### notify
This function calls a [vue toastification](https://github.com/Maronato/vue-toastification/tree/main) element, styled the same way as a saysimple notification would.

__input__

* The first attribute is a `string` that will be the title
* The second attribute is an optional `string` that can be `"success"`, `"error"`, `"warning"` or `"info"`. This is the type of the notification. If nothing is given it will fall back to `"success"`

__output__

This function does not return anything

__usage__

```javascript
utils.notify("Oh no something went wrong", "error")
```
### apiCall
This function will make a http request with [axios](https://axios-http.com/docs/intro) via the Saysimple backend as a proxy. Please use this function instead of your own request to avoid CORS issues.

__input__

* the same as called if you just run `axios()` like [this](https://axios-http.com/docs/api_intro)
* You can also supply a return type if you're using typescript

__output__

A `promise` of the result of the http request

__usage__

```typescript
utils.apiCall<DataInterface>({
    url: "https://example.com/api/some-location",
    method: "POST",
    headers: {
        authorizarion: app.settings.apiKey
    },
    data: {
        foo: "bar"
    },
    params: {
        hi: "mom"
    }
})

/* Returns
{
    hello: "world",
    number: 1337   
}
*/
```
_This is just an example and won't work if you try it_

### insightsApiCall
TODO: find out how this works

### getSetting
Request a single setting with a fallback if it does not exist

__input__

* The first argument is a `string` this will be the path of the setting.
* The second argument is optional this will be the default value if the setting does not exist.
* You can supply the setting type if you're using typescript.

__output__

The function returns the setting if it exists otherwise it will fall back to the default value

__usage__

```typescript
// settings 
{
    existingSetting: 1337
}

utils.getSetting<number>("existingSetting", 45) // 1337
utils.getSetting<number>("notExistingSetting", 45) // 45
```

### saveSettings
This is a way to save settings to the saysimple database. You can retreive them again with the `getSetting` util or in the `settings` attribute of the app prop.

__input__

The input is an object with all the settings you want to save.

__output__

The function returns an empty promise

__usage__

```typescript
utils.saveSettings({
    existingSetting: 1337,
    anotherSetting: "cool",
    words: ["hello", "world"]
})
```

### Send email
TODO find out how this works.

### saveData
A way to save additional data that aren't settings.

__input__

* The first element is a `string` that will be the name of the data
* The second element will be the value of the data

__output__

An empty promise

__usage__

```typescript
utils.saveData(
    `userProfile:${contact.id}`
    {
        externalId: yourApp.id,
        success: true
    }
)
```

### getData
A way to retreive additional data that was saved before.

__input__

* The first element is a `string` that will be the name of the data
* The second is optional and will be the fallback if the name is not set
* You can supply the setting type if you're using typescript.

__output__

An empty promise

__usage__

```typescript
utils.getData<UserProfile>("userProfile:77", {success: false})
/*
    {
        externalId: yourApp.id,
        success: true
    }
*/

utils.getData<UserProfile>("unkown", {success: false}) // {success: false}

```

### scrollToTop
This function scrolls to the top of the conversation.

__input__

This function does not require an input

__output__

This function does not require an output

__usage__

```typescript
utils.scrollToTop()
```
## Translations
Saysimple uses `i18n` and the [vue-i18n](https://kazupon.github.io/vue-i18n/) plugin for translation, at this moment we support 3 languages:

* English (en)
* Spanish (es)
* Dutch (nl)

And we made it available for you to translate your app to these 3 languages and your app will be shown to the user in the language they've selected.

We highly recommend you supply translations in all languages, but English is the only one who is absolutely mandatory and also the fallback if one of the other languages is not supplied.

### Creating translations
To create translations you have to go to the `locales.js` this will be an object with the language codes in the root, and they possess translation objects for example

```javascript
export const locales = {
    en: {
        settings: {
            active: "Active",
            save: "Save",
            "save-success-title": "Settings saved",
            "save-error-title": "Error saving settings",
            name: "Name",
            phone: "Phone number"
        },
        location: {
            house: "House",
            address: "Address",
            street: "Street",
            city: "City"
        }
    },
    nl: {
        settings: {
            active: "Actief",
            save: "Opslaan",
            "save-success-title": "Settings opgeslagen",
            "save-error-title": "Fout bij opslaan settings",
            name: "Naam",
            phone: "Telefoonnummer"
        },
        location: {
            house: "Huis",
            address: "Adres",
            street: "Straat",
            city: "Stad"
        }

    },
    es: {
        settings: {
            active: "Activo",
            save: "Ahorrar",
            "save-success-title": "Ajustes guardados",
            "save-error-title": "Error al guardar la configuración",
            name: "Nombre",
            phone: "Número de teléfono"
        },
        location: {
            house: "Casa",
            address: "Dirección",
            street: "Calle",
            city: "Ciudad"
        }

    },
};

```

### Using translations inside component
If you want to use your translation it is a bit less straight forward normally if you want to translate with i18n you do something like this:
```html
<p> {{ $t("location.house") }} </p>
``` 
But in our platform you have to add it with a prefix `@app/<your-plugin-name>` so for the example app it would be
```html
<p> {{ $t("@app/example.location.house") }}</p>
```
_Don't forget to change `example` to your app name_

#### Inside the composition api
There is also a way to get translations inside the composition api. We supply a [vue i18n class](https://kazupon.github.io/vue-i18n/api/#vuei18n-class) with all your translations inside the `app.utils.i18n` so it would work something like this:


```javascript
export default {
    setup(props) {
        const $t = props.app.utils.i18n.t;
        const $notify = props.app.utils.notify;

        const onButtonClick = () => {
            $notify({
                $t("@app/example.settings.save-success-title"),
                "success"
            })
        }
    }
}
```

_And again don't forget to change example to your app name_


## Icons
We use [fontAwesome](https://fontawesome.com/icons) as our iconset and make them available to all apps. If you want to use an fontAwesome you have to register it. You can do that inside the `faIcons.js` files.

There you'll find that it exports an array with all the icons something like this:
```javascript
import { faFaceSmileBeam } from "@fortawesome/pro-solid-svg-icons"

export const faIcons = [
    faFaceSmileBeam
]

```
You can add your icons in this array and Saysimple will install them for you.

You can add icons of these packages
* fontawesome-pro
* free-brands-svg-icons
* pro-duotone-svg-icons
* pro-light-svg-icons
* pro-regular-svg-icons
* pro-solid-svg-icons

_Please register __all__ icons you use, even if your certain this icon is already imported there might be changes in the platform and then your plugin might be lost_

## Assets
If you're using assets you will have to place them inside the `assets` folder than you can make a reference like this
```html
<div> 
    <img src="../assets/your-image.jpg" />
</div>
```

If you need assets programmatically you can use something like this:
```javascript
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
```
Assets are converted in base64 so please be aware of the size.
# Installation and use of the devkit
## Installation
To install this project you can start it by doing

```bash
git clone <location>
cd ./saysimple-plugin-devkit
npm i
``` 
To start the program you have to run

```bash
npm start
```

## Install an app
To install an app you need to run

```bash
npm i <app>
```

If the app isn't in the npm registry, yet you need to place the path of the app instead of the appName

### Register the app

Then you have to register your plugin inside `src/saysimpleApps.ts`. Import your app and add it to the exported `saysimpleApps` object inside the file.

```typescript
import <yourAppName> from "<yourAppNpmName>";

export const saysimpleApps: Record<string, NpmAppInterface> = {
  <yourAppName>,
};
```

## Developing the app in realtime
If you have the app installed and want to develop in real time you first need to make sure that the following packages __are not__ installed or are listed as peer dependencies
* vue
* @vue/composition-api
* vue-i18n
  _They are inherited from the saysimple platform and the devkit will break if you try to develop while they are installed_

After that you have to start the watcher
```
npm run watch
```

Then you have created a symlink to develop in realtime. To do that you have to go to the directory of __your app__ and run
```bash
npm link
```
After you've done that you need to go to the directory of __the saysimple devkit__
```bash
npm link <npmName of app>
```
Finally restart the saysimple devkit and you should be able to develop in realtime. This works for both packages who are installed locally and from npm.
