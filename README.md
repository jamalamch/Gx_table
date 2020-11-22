
![Gx_Table](http://olifolkerd.github.io/Gx_table/images/Gx_table.png)

An easy to use interactive table generation JavaScript library

Full documentation & demos can be found at: [http://test.test.info](http://Gx_table.info)
***
![Gx_Table](http://Gx_table.info/images/tabulator_table.jpg)
***

Features
================================
Gx_table allows you to create interactive tables in seconds from any HTML Table, Javascript Array or JSON formatted data.

Simply include the library and the css in your project and you're away!


Setup
================================
Setting up Gx_table could not be simpler.

Include the library and the css
```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" >
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.6.55/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="src/css/gx-table.css">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="src/js/bootstrap-confirm-delete.js"></script>
    <script src="src/js/gx-table.js" defer></script>
    <script src="src/js/app.js" defer></script>
```

Create an element to hold the table
```html
<div class="container">
....
......    
</div>
```

Turn the element into a tabulator with some simple javascript
```js
var table = $('.container').gxTable({
    tableName: 'table Gx',
    columns: [
        "english", "arabic", "frensh", "espan", "chine"
    ],
    data: {
        "hello-words-1585": {
            english: "testenglish",
            frensh: "testfrench",
            espan: "testespan",
            chine: "testchine"
        },
        "Star-words-11185-456621542vb": {
            english: "starenglish",
            frensh: "starfrench",
            espan: "starfespan",
            chine: "starchine"
        },
        "lang-words-185-4542vb": {
            english: "starenglish dsfdsf fdsfsdf",
            arabic: " fsdfdsf sdooqop kfd;ap reotijflsd ",
            frensh: "starfrench asdfsd dsfd sadfds",
            espan: "starfespan sdfdsf dsfsdf dsfsdf",
            chine: "starchine sdafsd dfsdf sfdsdfdsf dsfsdf"
        }
    }
});
```


### NPM Installation
To get Tabulator via the NPM package manager, open a terminal in your project directory and run the following commmand:
```


```

### CDN - UNPKG
To access Tabulator directly from the UNPKG CDN servers, include the following two lines at the start of your project, instead of the localy hosted versions:
```html



```