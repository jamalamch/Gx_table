var mot1 = {
    id : "hello-words-1585",
    english : "testenglish",
    frensh: "testfrench",
    espan: "testespan",
    chine: "testchine"
}

var mot2 = {
    id : "Star-words-11185-456621542vb",
    english : "starenglish",
    frensh: "starfrench",
    espan: "starfespan",
    chine: "starchine"
}
var mot3 = {
    id : "lang-words-185-4542vb",
    english : "starenglish dsfdsf fdsfsdf",
    arabic : " fsdfdsf sdooqop kfd;ap reotijflsd ",
    frensh: "starfrench asdfsd dsfd sadfds",
    espan: "starfespan sdfdsf dsfsdf dsfsdf",
    chine: "starchine sdafsd dfsdf sfdsdfdsf dsfsdf starchine sdafsd dfsdf sfdsdfdsf dsfsdf starchine sdafsd dfsdf sfdsdfdsf dsfsdf"
}
var tabletr = new gxTraducter();
tabletr.buildTranslationTable("testTaraducter",["english","arabic","frensh","espan","chine"],[mot1,mot2,mot3]);
$('.container').append(tabletr);
