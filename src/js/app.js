var fileName = "dataItem.json";
var items = [];

function additem(item) {
    var rowItem = $("<li class='list-group-item'>" + item.contene + "</li>");
    var close = $("<button class='close'>&times</button>");
    var date = $("<div><div class='pt-4 float-right'>" + item.time + "</div></div>");
    rowItem.append(close);
    rowItem.append(date);
    $("#list").append(rowItem);
    close.one('click', function () {
        close.parent().hide();
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

$(".close").click(function () {
    $(this).parent().remove();
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

