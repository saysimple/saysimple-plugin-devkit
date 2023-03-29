# Saysimple plugins devkit

A tool for viewing and editing saysimple apps.
In this readme you will find how to install and use the devkit and also a
tutorial on how to create and develop Saysimple apps

## Table of contents

<!-- TOC -->
* [Saysimple plugins devkit](#saysimple-plugins-devkit)
  * [Table of contents](#table-of-contents)
* [Installation of the devKit](#installation-of-the-devkit)
  * [Requirements](#requirements)
  * [Installation](#installation)
* [Creation of an app](#creation-of-an-app)
  * [Create an app](#create-an-app)
    * [Package.json](#packagejson)
      * [name](#name)
      * [main & module](#main--module)
      * [Saysimple](#saysimple)
    * [Icon](#icon)
* [Installing the app in the devKit](#installing-the-app-in-the-devkit)
  * [Installation](#installation-1)
  * [Registration](#registration)
  * [Realtime development](#realtime-development)
* [Understanding and developing the app](#understanding-and-developing-the-app)
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
    * [appendToMessage](#appendtomessage)
    * [i18n](#i18n)
    * [notify](#notify)
    * [apiCall](#apicall)
    * [insightsApiCall](#insightsapicall)
    * [getSetting](#getsetting)
    * [saveSettings](#savesettings)
    * [Send email](#send-email)
    * [getData](#getdata)
    * [saveData](#savedata)
    * [saveStorage](#savestorage)
    * [getStorage](#getstorage)
    * [scrollToTop](#scrolltotop)
    * [setEmitAndToast](#setemitandtoast)
  * [Translations](#translations)
    * [Creating translations](#creating-translations)
    * [Using translations inside component](#using-translations-inside-component)
      * [Inside the composition api](#inside-the-composition-api)
  * [Icons](#icons)
  * [Assets](#assets)
* [Usage of the devkit](#usage-of-the-devkit)
  * [Devkit layout](#devkit-layout)
    * [Navbar](#navbar)
    * [Settings page](#settings-page)
    * [Viewer page](#viewer-page)
  * [Controls](#controls)
    * [Manipulating appData](#manipulating-appdata)
      * [Creating your own presets](#creating-your-own-presets)
        * [Randomization](#randomization)
    * [Viewing data](#viewing-data)
      * [App info](#app-info)
      * [Settings](#settings)
      * [Appdata](#appdata-1)
<!-- TOC -->

# Installation of the devKit

To make an app you need the devkit installed and know how to install apps on it.
This way you can see and test your apps
before there installed in the Saysimple platform.

## Requirements

* [NodeJs](https://nodejs.org/en/download/releases/) with a version between `12` and `16`, `12` is recommended \
  _we recommend [nvm](https://github.com/nvm-sh/nvm) if you're running a newer version and need to switch easily between
  versions_
* Linux or mac is recommended, the devKit is not tested on windows

## Installation

```bash
git clone https://github.com/saysimple/saysimple-plugin-devkit.git
```

After that you need to copy the package.dist.json and src/saysimpleApps.dist.ts to files without the dist

```bash
cd ./saysimple-plugin-devkit
cp package.dist.json package.json
cp src/saysimpleApps.dist.ts src/saysimpleApps.ts
```

And to compleet the installation you need to run a npm install

```bash
npm i
```

To start the program you have to run

```bash
npm start
```

After that you can access the devkit by going to http://localhost:3000 in a browser

# Creation of an app

A Saysimple app is a [VueJs component](https://vuejs.org/) that is loaded inside the saysimple platform for users to
use.

## Create an app

To create an app you first need to pull from an existing app. There are 2 packages you can pick from initially. The
skeleton or example app.

If you want to start developing immediately without extra code you should pull from the skeleton app and if you want to
see how everything works in action and play around with that you should pull the example app

Install the skeleton app

```
git clone https://github.com/saysimple/skeleton-plugin.git
```

Or install the example app

```
git clone https://github.com/saysimple/example-plugin.git
```

### Package.json

After installation of the existing app you should make the following changes to the `package.json` to fully customize
the existing app to your own app

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

The saysimple object is data the saysimple platform will use to install and display the plugin, the object looks like
this

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

The icon file is located inside the `assets` folder and is named icon.png, if your icon has another extension, or you
need the name you can edit the icon location inside the `icon.js` file

```javascript
import iconFile from "../assets/icon.png" // <--- change this to your icon location

export const icon = iconFile
```

# Installing the app in the devKit

## Installation

First you need to install your app via npm

```bash
npm i <app>
```

You can also install the app from location if your app is not yet in the npm registry

```bash
npm i ../location/to/app
```

_Make sure your app is built while installing it this way_

## Registration

After you need to register the app te see it in the devKit you do that by modifying the `src/saysimpleApps.ts` file.

Import your app and add it to the
exported `saysimpleApps` object inside the file.

```typescript
import

<yourAppName>from
"<yourAppNpmName>";

export const saysimpleApps: Record<string, NpmAppInterface> = {
    < yourAppName >,
  };
```

_You can add as many plugins to this list, and you will see them all in a list in the devKit_

## Realtime development

If you have the app installed and want to develop in real time you first need to make sure that the following
packages __are not__ installed or are listed as peer dependencies

* vue
* @vue/composition-api
* vue-i18n

_They are inherited from the saysimple platform and the devkit will break if you try to develop while they are
installed_

Then you have created a [symlink](https://docs.npmjs.com/cli/v9/commands/npm-link) to develop in realtime.
To do that you have to go to the directory of __your app__ and run

```bash
npm link
```

After you've done that you need to go to the directory of __the saysimple devkit__

```bash
npm link <npmName of app>
```

After that you have to start the watcher in the __app__ so it will rebuild after you make changes

```
npm run watch
```

Finally restart the saysimple devkit and you should be able to develop in realtime.
This works for both packages who are
installed locally and from npm.

_You need to restart the devKit if changes in the package.json are made_

# Understanding and developing the app

## Components

Every app needs at least 2 components `settings` and `content` The settings component will be rendered when a user
clicks on app settings, the content will be rendered if the end user selects your app when in an active conversation.

Both the settings and the content receive 2 props app and appData you can interact with the Saysimple platform.

### AppData

The appData is a prop delivered to your app settings and content components it contains information about the current
instance of the Saysimple platform.

You have to request AppData in the `dataRequired` array inside the `package.json` otherwise the data won't be delivered.

These are the possible attributes of the appData:

#### contact

The contact exists out of the following attributes

```typescript
interface contact {
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

If you have `content_metadata` enabled in `dataRequired` you also get access to a `metadata` attribute inside
the `contacts`.
This is an array
that looks like this:

```typescript
interface metadata {
  id: number,
  name: string,
  value: string
}

[]
```

_If you don't have access to the contact you don't get the metadata_

#### agent

The agent exists out of the following attributes

```typescript
interface user {
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
interface conversation {
  start: Date;
  status: "open" | "closed";
}
```

#### messages

The messages is an __array__ that exists out of the following attributes

```typescript
interface message {
  direction: "in" | "out";
  time: Date;
  status: string;
  message: string;
}
```

#### tags

The tags is a string array

### App

The app is a prop delivered to your app settings and content components it contains information about your app and
utilities to interact with the Saysimple platform.

the app object always looks like this:

```typescript
interface app {
  id: number,
  enabled: number,
  name: string,
  package: {
    name: string,
    version: string,
    saysimple: Saysimle // Same as the saysimple in package.json
  },
  utils: Utils  // object with  functions,
  components: {
    settings: VueComponent,
    content: VueComponent,
  },
  settings: Record<string, any> // Your app settings,
}
```

the `id`, `enabled` and `components` are mainly for the saysimple to render your app properly, so you probably don't
have to care about them.

The `name` is the same as the name in `package.json`

The package also contains data from the `package.json`

The `settings` are the settings of the app.

`utils` are useful functions to interact with app or make api calls.
You can read more about them in the next chapter

## Utilities

Saysimple gives you a few utility functions.
They are available in the `utils` attribute inside the `app` prop.
The utils contain the following functions

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

This is a [Vue i18n](https://kazupon.github.io/vue-i18n/) plugin you can use inside a composable.
You can read more
about translation in the next chapter.

### notify

This function calls a [vue toastification](https://github.com/Maronato/vue-toastification/tree/main) element, styled the
same way as a saysimple notification would.

__input__

* The first attribute is a `string` that will be the title
* The second attribute is an optional `string` that can be `"success"`, `"error"`, `"warning"` or `"info"`.
* This is the
  type of the notification.
* If nothing is given it will fall back to `"success"`

__output__

This function does not return anything

__usage__

```javascript
utils.notify("Oh no something went wrong", "error")
```

### apiCall

This function will make a http request with [axios](https://axios-http.com/docs/intro) via the Saysimple backend as a
proxy.
Please use this function instead of your own request to avoid CORS issues.

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

For Saysimple internal use only

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

This is a way to save settings to the saysimple database.
You can retreive them again with the `getSetting` util or in
the `settings` attribute of the app prop.

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

Send an email to the address inside the `toEmailAddress` setting.

__input__

The input is string with the content of the email.\
_Keep in mind that this also requires a toEmailAddress setting_

__output__

An axios response

__usage__

```typescript
utils.saveSettings({
  toEmailAddress: "info@example.com"
})

utils.sendEmail(
  `<b>The content of an email</b>`
)
```

### getData

This is deprecated please use [getStorage](#getStorage) instead

### saveData

This is deprecated please use [saveStorage](#saveStorage) instead

### saveStorage

A way to save additional data that aren't settings.

__input__

* The first element is a `string` that will be the name of the data
* The second element will be the value of the data

__output__

An empty promise

__usage__

```typescript
utils.saveData(
  `userProfile:${contact.id}`,
  {
    externalId: yourApp.id,
    success: true
  }
)
```

### getStorage

A way to retreive additional data that was saved before.

__input__

* The first element is a `string` that will be the name of the data
* The second is optional and will be the fallback if the name is not set
* You can supply the setting type if you're using typescript.

__output__

An empty promise

__usage__

```typescript
utils.getData<UserProfile>("userProfile:77", { success: false })
/*
    {
        externalId: yourApp.id,
        success: true
    }
*/

utils.getData<UserProfile>("unkown", { success: false }) // {success: false}

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

### setEmitAndToast

This is a function used internally by Saysimple. You should not touch this or you're risking to break the emit and toast
functionality.

## Translations

Saysimple uses `i18n` and the [vue-i18n](https://kazupon.github.io/vue-i18n/) plugin for translation, at this moment we
support 3 languages:

* English (en)
* Spanish (es)
* Dutch (nl)

And we made it available for you to translate your app to these 3 languages and your app will be shown to the user in
the language they've selected.

We highly recommend you supply translations in all languages, but English is the only one which is absolutely mandatory
and also the fallback if one of the other languages is not supplied.

### Creating translations

To create translations you have to go to the `locales.js` this will be an object with the language codes in the root,
and they possess translation objects for example

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

If you want to use your translation it is a bit less straight forward normally if you want to translate with i18n you do
something like this:

```html
<p> {{ $t("location.house") }} </p>
```

But in our platform you have to add it with a prefix `@app/<your-app-translation-key>`, the plugin translation key is your app name in kebab case, if the app name is `myAwesomeApp` the translation key would be `my-awesome-app`

so for the example app it would be

```html
<p> {{ $t("@app/example.location.house") }}</p>
```

_Don't forget to change `example` to your app translation key_

#### Inside the composition api

There is also a way to get translations inside the composition api.
We supply a [vue i18n class](https://kazupon.github.io/vue-i18n/api/#vuei18n-class) with all your translations inside
the `app.utils.i18n` so it would work something like this:

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

_And again don't forget to change example to your app translation key_

## Icons

We use [fontAwesome](https://fontawesome.com/icons) as our iconset and make them available to all apps.
If you want to use an fontAwesome you have to register it.
You can do that inside the `faIcons.js` files.

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

_Please register __all__ icons you use, even if your certain this icon is already imported there might be changes in the
platform and then your plugin might be lost_

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

# Usage of the devkit

The devkit is a great way to debug and test your plugin, but you do need to know how to use it.

## Devkit layout

When opening the devkit you'll notice 3 important elements: The __navbar__ the __settings page__ and the __viewer page__
.
You can use these components to tests your app and mock saysimple interactions.

### Navbar

The navbar is always visible on top of the page.
The left contains the saysimple logo but the right side contains 3 handy functions.

The first is the language.
You can control the language of the app with this.
When you click this you get a dropdown and you can select a language.
_This will only change the language of the app and not the devkit_

The second item is the plugin select.
You'll see the name of the current plugin (_example_ when you first open the
devkit).
When clicked you'll see all the installed plugins and you can switch between apps.

And last is the refresh button when clicked it will refresh the app.
So the app will be mounted again and the rest of
the devkit will be untouched

### Settings page

The settings page will show you how your app will look inside the settings page from saysimple.
When opened you'll see 2
component the one on the left is a preview how your app will be displayed the one on the app selection page.

The component on the right will display the content of your settings.vue inside your app, this is what will be displayed
inside the Saysimple settings page.
When you save your settings (using the [saveSettings](#savesettings) util) the data
will be saved inside the localStorage and it will also be given to the overview page, so you can test with the settings
you selected.

### Viewer page

You can use this page to debug your app itself.
On the left you see the controls, more on that in the next chapter, and
on the right you can see your apps content.vue component.
It will be populated with appData which you can configure in
the controls and settings which are configured in the settings page.

## Controls

Inside the viewer page of the Devkit you'll find a few components where you can manipulate the [AppData](#appdata) going
in to the app.
This way you can manipulate the devkit to mock the Saysimple platform and see how your app will react.

### Manipulating appData

The first 4 control items are about manipulating appData

* contact
* agent
* assignedAgent
* chat

They all contain a dropdown where you can select which data goes to your app.
You can select a few presets and a random option you can learn how to create your own preset in the next chapter.

Some control items can be grayed out it means that you don't have the right data enabled inside your dataRequired inside
the package.json.
Read more about that [here](#saysimple).

#### Creating your own presets

Presets are `.json` files located in the `/src/data` directory of the Devkit.
You'll see 3 subdirectories

* chats \
  which contains presets for the __chat__ controller, the structure looks like this:
  ```typescript
  interface chat {
    "conversation": {
      "start": DateString; // example: "2022-09-19T13:25:03.390Z"
      "status": "open" | "closed";
    },
    "messages": {
        "direction": "in" | "out";
        "time": DateString; // example: "2022-09-19T13:25:03.390Z";
        "status": "rejected" | "pending" | "sent" | "received" | "read" | "none";
        "message": string;
    }[],
    "tags": string[];
  }
  ```
* users \
  which contains presets for the __agent__ and __assignedAgent__ controller, the structure looks like this
  ```typescript
  interface user {
      "name": string,
      "displayName": string,
      "email": string
  }
  ```
* contacts \
  which contains presets for the __contact__ controller, the structure looks like this
  ```typescript
  interface contacts {
    "name": string;
    "countryCode"?: string;
    "email"?: string;
    "phone"?: string;
    "street"?: string;
    "houseNumber"?: string;
    "zipCode"?: string;
    "city"?: string;
    "province"?: string;
    "country"?: string;
    "reference"?: string;
    "company"?: string;
    "jobTitle"?: string;
    "isHighPriority"?: 0 | 1;
    "createdAt"?: DateString; // example: "2022-09-19T13:25:03.390Z";
    "isBlocked"?: 0 | 1;
    "metadata"?: {
      "id": number,
      "name": string,
      "value": any
    }[]
  }
  ```

If you want to create your own preset, you have to create a new json file in the subfolder according to the type above.
The name of the file will return as the name of the preset.

You can copy an existent preset and change the data, or you can create it from scratch according to the structure above
but please be careful that the structure of your preset matches the structure of the data itself.
There is no check if the preset is correct and if it's not you may be relying on data that will be different in the
saysimple platform.

##### Randomization

When creating a preset you might want to use random data.
You can do that by adding the string `[RANDOM]` to your preset at the value you want randomized.
So if your app relies on different email addressed and you want a random address everytime you can
do `email: "[RANDOM]"`.

Random data wil be generated using [Faker](https://fakerjs.dev/) and will be different every time you use the refresh
button, when you switch between user and back random data stays the same but random data is different between 2 users
that have the random field.

So if 2 users have a random email field they will have 2 different email addresses, but you can switch between the users
and the keep their address, until you hit the refresh button in the navbar than both users get a different address.

The `"[RANDOM]"` string can be used for most fields and will be given sensible data according to the field type.
For example city will return a random city, if you have a name email addressed wil be generated using the name and a
contact will be generated localized data if a country code if given.
So a contact with the country code `"DE"` can be given Bremen as their random city.

If the data is not clearly randomised you can supply the random method in your field like
this `"[RANDOM:category:function]"` to get the category and function you have to look at
the [Faker api documentation](https://fakerjs.dev/api/).

So for example `"[RANDOM:animal:cat]"` would return a [random cat species](https://fakerjs.dev/api/animal.html#cat)
and `"[RANDOM:music:songName]"` would return a [random song name](https://fakerjs.dev/api/music.html#songname).

### Viewing data

There are also 3 other control items.

* App info
* Settings
* App Data

They are here to give you more information of the app. Data is displayed in raw JSON to let you know exactly what is
given to the app.

#### App info

This contains the info that is given from your app to the platform `package.json`. You can check if everything is
given as expected.

#### Settings

These are the settings saved by the settings page.

#### Appdata

This is the AppData object that is given to your app. You can use it to quickly check what kind of data is given and if
your dataRequired is set up as expected.
