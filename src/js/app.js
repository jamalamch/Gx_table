var fileName = "dataItem.json";
var items = [];

var langage = ["english","arabic","frensh","espan","chine"];
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

additem(mot1);
additem(mot2);
additem(mot3);

function additem(item) {
    var colom = $(`<tr id="${item.id}"></tr>`);
    var trId = $(`
        <td>
            <div style="width: 150px" class="float-left text-truncate">
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
    langage.forEach(element=>{
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
        openEditor(item);
    });
    Bdelete.bootstrap_confirm_delete({
        heading: 'Delete '+item.id,
        message: 'Are you sure you want to delete this item?',
        btn_ok_label: 'Yes',
        btn_cancel_label: 'Cancel',
        delete_callback: () => {
            $(`#${item.id}`).remove();
            delete items[item.id];
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
    $("#table-tr-body").append(colom);
    items[item.id] = item;
}

function updateItem(item){
    langage.forEach(element => {
        $(`#${item.id}-${element}`).text(item[element]);
    });
}

function openEditor(item){
    $('#myModal').modal('show')
    $('#edit-word-id').text(item.id);
    langage.forEach(element => {
        $(`#t-${element}`).val(item[element]);
    });
    $('#edit-word-save').off("click").click(function(){
        langage.forEach(element => {
            item[element] = $(`#t-${element}`).val();
        });
        updateItem(item);
    });
}

function chargeficher(data) {
    items = JSON.parse(data);
    console.debug(items);
    $("#list").empty();
    items.forEach(function (item) {
        additem(item);
    });
}

function download(text, filename, type) {
    var file = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.setAttribute("download", filename);
    a.click();
}

$("#addItem").click(function () {
    var text = $(this).parent().parent().children(".form-control");
    if(text.val()){
        var item = {
            time: new Date().toLocaleDateString(),
            contene: text.val()
        };
        text.val("");
        items.push(item);
        additem(item);
    }
});

$("#save").click(function () {
    download(JSON.stringify(items), fileName, 'text/plain');
    console.log("clicked");
});

$(".custom-file-input").on("change", function () {
    var url = $(this).val();
    fileName = url.split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

    var fileReader = new FileReader();
    fileReader.onload = function () {
        var data = fileReader.result;
        chargeficher(data);
    };
    fileReader.readAsText($(this).prop('files')[0]);
});

function copieText(text){
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

$('#myModal textarea').on('input',function (){
    this.style.height = "1px";
    this.style.height = (this.scrollHeight+1.1)+"px";
})
$('#myModal').on('shown.bs.modal', function (){
    $('#myModal textarea').each(function (index,element ){
        element.style.height = "1px";
        element.style.height = (this.scrollHeight+1.1)+"px";
        console.log(element.style.height);
    })
})