1. Downlaod the main.js file
or
add
`<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/cjcoaustralia/cjco-appbar/dist/main.js"></script>`

2. Add below script

`<script>
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
</script>`

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