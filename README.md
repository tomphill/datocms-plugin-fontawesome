# DatoCMS Font Awesome plugin

An unofficial plugin that allows use of Font Awesome v5 free icons in DatoCMS.

## Configuration

After installing the plugin, you'll need to add a new JSON field type to a block or model, go to the presentation tab, and select "Font Awesome" for the Field editor.

![JSON field configuration](/docs/json-field-config.png)

## Output structure

The data structure will be a stringified JSON object with the following structure:

```
    {
        "prefix": "fab",
        "iconName": "amazon",
        "icon": [
            448,
            512,
            [],
            "f270",
            "M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"
        ]
    }
```

## Usage

If using with React, you can pass the entire output object above as the `icon` prop to the FontAwesomeIcon component. Assuming the output object above hasn't already been parsed and is stored in a variable called myIcon, you can use it like so:

`<FontAwesomeIcon icon={JSON.parse(myIcon)} />`

Check out the video tutorial for usage with React: https://youtu.be/a526r4uo4aI

If you want to use via class names, you can concatenate the `prefix` and `iconName` like so:

```
const parsedIcon = JSON.parse(myIcon);
const className = `${parsedIcon.prefix} fa-${parsedIcon.iconName}`;
console.log(className); // outputs "fab fa-amazon"
```
