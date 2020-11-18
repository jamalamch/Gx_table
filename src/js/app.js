var fileName = "dataItem.json";
var items = new Map();

var languages = ["english","arabic","frensh","espan","chine"];
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

var tableTrRoot = $('#table-tr-root')
var tableTrHead = $('#table-tr-thead');
var tableTrBody = $('#table-tr-body');

function initTableTr(){
    var colomLangHead = $(`<tr></tr>`);
    colomLangHead.append($('<th>ID</th>'));
    tableTrHead.append(colomLangHead);

    languages.forEach(element=>{
        var thLanguage = $(`
            <th> ${element}</th>
        `);
        colomLangHead.append(thLanguage);
    })

    var bAddlangauge = $(`<button class="btn-icon border  border-dark rounded px-2 ml-1 mdi mdi-plus-thick"> </button>`);
    bAddlangauge.click(function (){
        openEditLanguage();
    });
    colomLangHead.append($('<th></th>').append(bAddlangauge));
}

var editWordBody =$('#model-edit-word-body');

function initModelEditor(){
    languages.forEach(language=>{
        addLangugeToModelEditor(language);
    })
}

function addLangugeToModelEditor(language){
    var editAreWord = $(`
    <div class="form-group row">
        <label class="text-capitalize col-sm-2 form-control-sm" for="t-${language}">${language}:</label>
        <textarea class="textar-input form-control form-control-sm col-sm-9 rows="1" id="t-${language}"></textarea>
    </div>
    `);
    editWordBody.append(editAreWord);
}

initTableTr();
initModelEditor();

additem(mot1);
additem(mot2);
additem(mot3);

function additem(item) {
    var colom = $(`<tr id="${item.id}"></tr>`);
    var trId = $(`
        <td>
            <div class="float-left text-truncate">
                ${item.id}
            </div>
        </td>
    `)   
     var BcopieId = $(`
        <button class="btn-icon float-right mdi mdi-content-copy"></button>
    `);
    BcopieId.click(function(){
        copieText(item.id)
    });
    trId.append(BcopieId);
    colom.append(trId);
    languages.forEach(element=>{
        var trdWord = $(`
            <td id="${item.id}-${element}"> ${item[element]}</td>
        `);
        colom.append(trdWord);
    })

    var Bdelete = $(`
        <button type="button" class="btn-icon deleteWord mdi mdi-delete-forever "></button>
    `);
    var Bedite = $(`
        <button type="button" class="btn-icon  mdi mdi-file-document-edit"></button>
    `);
    Bedite.click(function (){
        openEditorWord(item);
    });
    Bdelete.bootstrap_confirm_delete({
        heading: 'Delete '+item.id,
        message: 'Are you sure you want to delete this item?',
        btn_ok_label: 'Yes',
        btn_cancel_label: 'Cancel',
        delete_callback: () => {
            $(`#${item.id}`).remove();
            items.delete(item.id);
            console.log('delete button clicked');
        },
        cancel_callback: () => {
            console.log('cancel button clicked');
        },
    })
    var GroupEdit = $(`
        <td></td>
    `);
    GroupEdit.append(Bedite);
    GroupEdit.append(Bdelete)
    colom.append(GroupEdit);
    tableTrBody.append(colom);
    items.set(item.id, item);
}

function updateItem(item){
    languages.forEach(element => {
        $(`#${item.id}-${element}`).text(item[element]);
    });
}

var modalEditWord = $('#model-edit-word');
var LabelWordEditId = $('#edit-word-id');
var ButtonSaveEditWord = $('#edit-word-save');

function openEditorWord(item){
    modalEditWord.modal('show');
    LabelWordEditId.text(item.id);
    languages.forEach(element => {
        $(`#t-${element}`).val(item[element]);
    });
    ButtonSaveEditWord.off("click").click(function(){
        languages.forEach(element => {
            item[element] = $(`#t-${element}`).val();
        });
        updateItem(item);
    });
}

var modelAddlanguage = $('#modal-add-language');
var languageName = $('#add-language-name');
var bodyModalAddlangauge = $('#add-language-body');
var buttonSaveAddlanguage = $('#add-language-save');

function openEditLanguage(){
    modelAddlanguage.modal('show');
    languageName.val('');

    buttonSaveAddlanguage.off('click').click(function (){
        var lang = languageName.val().toLowerCase().replace(' ','_');
        if(lang.length > 0 && !languages.includes(lang)){
            languages.push(lang);
            addColumnToTableJS(tableTrRoot[0],null,lang);
            addLangugeToModelEditor(lang);
        }
    })
}

function addColumnToTableJS(table, pos, content){
    
    var columns = table.rows[0].getElementsByTagName('th').length;
    if (!pos && pos !== 0){
      pos = columns - 1;
    }
    var cell = table.rows[0].insertCell(pos);
    cell.outerHTML = `<th>${content}</th>`;

    for (var r=1; r<table.rows.length; r++){
      var cell = table.rows[r].insertCell(pos);
      var itemId = table.rows[r].id;
      cell.id = itemId+'-'+content;
    }
  }  

function copieText(text){
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

$('.textar-input').on('input',function (){
    this.style.height = "1px";
    this.style.height = (this.scrollHeight+1.1)+"px";
})
$('.modal').on('shown.bs.modal', function (){
    $(this).find('.textar-input').each(function (index,element ){
        element.style.height = "1px";
        element.style.height = (this.scrollHeight+1.1)+"px";
        console.log(element.style.height);
    })
})

function chargeficher(data) {
    items = JSON.parse(data);
    console.debug(items);
    $("#list").empty();
    items.forEach(function (item) {
        additem(item);
    });
}