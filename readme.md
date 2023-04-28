1. Downlaod the main.js file or add

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/cjcoaustralia/cjco-appbar@2.0.0/dist/main.js"></script>
```

2. Add below script for Appbar

```html
<script>
    cjco.appBar({
        text: 'Download our app today',
        icon: false,
        ios: 'https://cjco.com.au/ios',
        android: 'https://cjco.com.au/android',
        backgroud: 'linear-gradient(50deg, #be3691, #e65432)',
        color: '#FFFFFF',
        automate: [
          {
            text: 'Email us',
            days: ['Monday', 'Thursday', 'Friday'],
            startTime: '19:00:00',
            endTime: '21:00:00',
            country: 'australia',
            city: 'brisbane',
            url: 'mailto:info@cjco.com.au'
          }
        ]
    })
</script>
```

and below script for Browser Tab Attention

```html
<script>
  cjco.attention({
    effect: 'scroll',
    delay: 500,
    seperator: '🌻',
    message: ['Premium Fill Kit Worth $75 for FREE', 'EZ-FLO USA'],
    favicon: {
      delay: 1800,
      icon: ['🪴', '🔔', '✨', 'https://www.google.com/s2/favicons?domain=ezfloinjection.com&sz=64']
    }
  });
</script>
```

## Settings options

`text` - string

`icon` - boolean

`url` - string

`ios` - string

`android` - string

`target` - string

`background` - string

`color` - string


`automate` is array of object

`days` - array e.g `['Monday', 'Thursday', 'Friday']`

`startTime` - string

`endTime` - string

`country` - string

`city` - string