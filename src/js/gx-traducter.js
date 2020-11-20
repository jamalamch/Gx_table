

function gxTraducter() {
    this.traducterName ;
    this.translaItems = new Map();
    this.translationLanguages = [];

    this.tableTraducter;

    this.tableTrRoot;
    this.tableTrHead;
    this.tableTrBody;

    this.modalEditWord;
    this.modalEditWordBody;
    this.modalWordEditLabelId;
    this.modalButtonSaveEditWord;

    this.modelAddlanguage ;
    this.modelLanguageLabelName ;
    this.modelBodyAddlangauge ;
    this.modelButtonSaveAddlanguage ;
}

gxTraducter.prototype.buildTranslationTable = function (traducterName, languages, trsItems) {
    this.traducterName = traducterName;
    this.translationLanguages = languages;
    this.initTableTr();
    this.initModelEditor();
    this.initmodalAddLanguage();
    if (trsItems) {
        trsItems.forEach(trItem => {
            this.addTranslation(trItem);
        });
    }
}

gxTraducter.prototype.initTableTr = function () {
    this[0] = $(`
        <div class="table-responsive">
            <table id="table-tr-root" class="table table-bordered table-hover table-sm table-striped">
                <thead id="table-tr-thead">
                    <tr id="colom-tr-head">
                        <th>ID</th>

                    </tr>
                </thead>
                <tbody id="table-tr-body">
                </tbody>
            </table>
        </div>
    `)[0];
    this.length = 1;
    $('body').append(this[0]);

    this.tableTrRoot = $('#table-tr-root');
    this.tableTrHead = $('#table-tr-thead');
    this.tableTrColomHead = $('#colom-tr-head');
    this.tableTrBody = $('#table-tr-body');

    this.translationLanguages.forEach(element => {
        var thLanguage = $(`
            <th> ${element}</th>
        `);
        this.tableTrColomHead.append(thLanguage);
    })
    var bAddlangauge = $(`<button class="btn-icon border  border-dark rounded px-2 ml-1 mdi mdi-plus-thick"> </button>`);
    var gxtable = this;
    bAddlangauge.click(function () {
        gxtable.openEditLanguage();
    });
    this.tableTrColomHead.append($('<th></th>').append(bAddlangauge));
}

gxTraducter.prototype.initModelEditor = function () {
    if (null === document.getElementById('model-edit-word')) {
        $('body').append(`
            <div class="modal" id="model-edit-word">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 id="edit-word-id" class="modal-title"></h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div id="model-edit-word-body" class="modal-body" >
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button id="edit-word-save" type="button" class="btn btn-secondary" data-dismiss="modal">SAVE</button>
                        </div>

                    </div>
                </div>
            </div>
        `);

        this.modalEditWord = $('#model-edit-word');
        this.modalWordEditLabelId = $('#edit-word-id')
        this.modalEditWordBody = $('#model-edit-word-body');
        this.modalButtonSaveEditWord = $('#edit-word-save');
    }
    this.translationLanguages.forEach(language => {
        this.addLangugeToModelEditor(language);
    })
    this.modalEditWord.on('shown.bs.modal', function () {
        $(this).find('.textar-input').each(function (index, element) {
            element.style.height = "1px";
            element.style.height = (this.scrollHeight + 1.1) + "px";
        })
    })
}

gxTraducter.prototype.initmodalAddLanguage = function () {
    if (null === document.getElementById('modal-add-language')) {
        $('body').append(`
            <div class="modal" id="modal-add-language">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Add a new langage</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body "id="add-language-body">
                            <div class="form-group row">
                                <label class="col-sm-4 " for="add-language-name"> language Name :</label>
                                <input type="text" class="form-control col-sm-7" id="add-language-name"></textarea>
                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button id="add-language-save" type="button" class="btn btn-secondary" data-dismiss="modal">SAVE</button>
                        </div>

                    </div>
                </div>
            </div>
        `);
        
        this.modelAddlanguage = $('#modal-add-language');
        this.modelBodyAddlangauge = $('dd-language-body');
        this.modelLanguageLabelName = $('#add-language-name');
        this.modelButtonSaveAddlanguage = $('#add-language-save');
    }
}

gxTraducter.prototype.addLangugeToModelEditor = function (language) {
    var editAreWord = $(`
        <div class="form-group row">
            <label class="text-capitalize col-sm-2 form-control-sm" for="t-${language}">${language}:</label>
        </div>
    `);
    var textarInput = $(`<textarea class="textar-input form-control form-control-sm col-sm-9 rows="1" id="t-${language}"></textarea>`);
    textarInput.on('input', function () {
        this.style.height = "1px";
        this.style.height = (this.scrollHeight + 1.1) + "px";
    });
    this.modalEditWordBody.append(editAreWord.append(textarInput));
}

gxTraducter.prototype.addTranslation = function (item) {
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
    BcopieId.click(function () {
        copieText(item.id)
    });
    trId.append(BcopieId);
    colom.append(trId);
    this.translationLanguages.forEach(element => {
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
    var gxtable = this;
    Bedite.click(function () {
        gxtable.openEditorWord(item);
    });
    Bdelete.bootstrap_confirm_delete({
        heading: 'Delete ' + item.id,
        message: 'Are you sure you want to delete this item?',
        btn_ok_label: 'Yes',
        btn_cancel_label: 'Cancel',
        delete_callback: () => {
            $(`#${item.id}`).remove();
            gxtable.translaItems.delete(item.id);
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
    colom.hover(function () {
        $(this).find('td').css("white-space", "normal");
    }, function () {
        $(this).find('td').css("white-space", "nowrap");
    });
    this.tableTrBody.append(colom);
    this.translaItems.set(item.id, item);
}

gxTraducter.prototype.updateTranslation = function (item) {
    this.translationLanguages.forEach(element => {
        $(`#${item.id}-${element}`).text(item[element]);
    });
}

gxTraducter.prototype.openEditorWord = function (item) {
    this.modalEditWord.modal('show');
    this.modalWordEditLabelId.text(item.id);
    this.translationLanguages.forEach(element => {
        $(`#t-${element}`).val(item[element]);
    });
    var gxtable = this;
    this.modalButtonSaveEditWord.off("click").click(function () {
        gxtable.translationLanguages.forEach(element => {
            item[element] = $(`#t-${element}`).val();
        });
        gxtable.updateTranslation(item);
    });
}

gxTraducter.prototype.openEditLanguage = function () {
    this.modelAddlanguage.modal('show');
    this.modelLanguageLabelName.val('');
    var gxtable = this;
    this.modelButtonSaveAddlanguage.off('click').click(function () {
        var lang = gxtable.modelLanguageLabelName.val().toLowerCase().replace(' ', '_');
        if (lang.length > 0 && !gxtable.translationLanguages.includes(lang)) {
            gxtable.translationLanguages.push(lang);
            gxtable.addColumnToTableJS(null, lang);
            gxtable.addLangugeToModelEditor(lang);
        }
    })
}

gxTraducter.prototype.addColumnToTableJS = function (pos, content) {
    table = this.tableTrRoot[0];
    var columns = table.rows[0].getElementsByTagName('th').length;
    if (!pos && pos !== 0) {
        pos = columns - 1;
    }
    var cell = table.rows[0].insertCell(pos);
    cell.outerHTML = `<th>${content}</th>`;

    for (var r = 1; r < table.rows.length; r++) {
        var cell = table.rows[r].insertCell(pos);
        var itemId = table.rows[r].id;
        cell.id = itemId + '-' + content;
    }
}

gxTraducter.prototype.removeColumInTableJs = function(pos) {
    table = this.tableTrRoot[0];
    var columns = table.rows[0].getElementsByTagName('th').length;
    if (!pos && pos !== 0) {
        pos = columns - 1;
    }
    for (var r = 0; r < table.rows.length; r++) {
        table.rows[r].deleteCell(pos);
    }
}

gxTraducter.prototype.savaTableTrAsJson = function() {
    download(JSON.stringify(this.translaItems), this.traducterName+".json", 'text/plain');
    console.log("dowload table As Json");
}

function copieText(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function download(text, filename, type) {
    var file = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.setAttribute("download", filename);
    a.click();
}