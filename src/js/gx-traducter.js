function gxTraducter(){
    this.translaItems = new Map();
    this.translationLanguages = [];

    this.tableTrRoot = $('#table-tr-root');
    this.tableTrHead = $('#table-tr-thead');
    this.tableTrBody = $('#table-tr-body');

    this.modalEditWord = $('#model-edit-word');
    this.modelEditWordBody =$('#model-edit-word-body');
    this.modelWordEditLabelId = $('#edit-word-id');
    this.modelButtonSaveEditWord = $('#edit-word-save');

    this.modelAddlanguage = $('#modal-add-language');
    this.modelLanguageLabelName = $('#add-language-name');
    this.modelBodyAddlangauge = $('#add-language-body');
    this.modelButtonSaveAddlanguage = $('#add-language-save');
}


gxTraducter.prototype.initTableTr = function (){
    var colomLangHead = $(`<tr></tr>`);
    colomLangHead.append($('<th>ID</th>'));
    this.tableTrHead.append(colomLangHead);

    this.translationLanguages.forEach(element=>{
        var thLanguage = $(`
            <th> ${element}</th>
        `);
        colomLangHead.append(thLanguage);
    })
    var bAddlangauge = $(`<button class="btn-icon border  border-dark rounded px-2 ml-1 mdi mdi-plus-thick"> </button>`);
    var gxtable = this;
    bAddlangauge.click(function (){
        gxtable.openEditLanguage();
    });
    colomLangHead.append($('<th></th>').append(bAddlangauge));
}

gxTraducter.prototype.addLangugeToModelEditor = function (language){
    var editAreWord = $(`
        <div class="form-group row">
            <label class="text-capitalize col-sm-2 form-control-sm" for="t-${language}">${language}:</label>
        </div>
    `);
    var textarInput = $(`<textarea class="textar-input form-control form-control-sm col-sm-9 rows="1" id="t-${language}"></textarea>`);
    textarInput.on('input',function (){
        this.style.height = "1px";
        this.style.height = (this.scrollHeight+1.1)+"px";
    });
    this.modelEditWordBody.append(editAreWord.append(textarInput));
}

gxTraducter.prototype.initModelEditor = function (){
    this.translationLanguages.forEach(language=>{
        this.addLangugeToModelEditor(language);
    })
    this.modalEditWord.on('shown.bs.modal', function (){
        $(this).find('.textar-input').each(function (index,element ){
            element.style.height = "1px";
            element.style.height = (this.scrollHeight+1.1)+"px";
        })
    })
}

gxTraducter.prototype.buildTranslationTable = function (languages, trsItems){
    this.translationLanguages = languages;
    this.initTableTr();
    this.initModelEditor();
    if(trsItems){
        trsItems.forEach(trItem =>{
            this.addTranslation(trItem);
        });
    }
}

gxTraducter.prototype.addTranslation = function (item){
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
    this.translationLanguages.forEach(element=>{
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
    Bedite.click(function (){
        gxtable.openEditorWord(item);
    });
    Bdelete.bootstrap_confirm_delete({
        heading: 'Delete '+item.id,
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
    colom.hover(function (){
        $(this).find('td').css("white-space","normal");
    },function (){
        $(this).find('td').css("white-space","nowrap");
    });
    this.tableTrBody.append(colom);
    this.translaItems.set(item.id, item);
}

gxTraducter.prototype.updateTranslation = function (item){
    this.translationLanguages.forEach(element => {
        $(`#${item.id}-${element}`).text(item[element]);
    });
}

gxTraducter.prototype.openEditorWord = function (item){
    this.modalEditWord.modal('show');
    this.modelWordEditLabelId.text(item.id);
    this.translationLanguages.forEach(element => {
        $(`#t-${element}`).val(item[element]);
    });
    var gxtable = this;
    this.modelButtonSaveEditWord.off("click").click(function(){
        gxtable.translationLanguages.forEach(element => {
            item[element] = $(`#t-${element}`).val();
        });
        gxtable.updateTranslation(item);
    });
}

gxTraducter.prototype.openEditLanguage = function (){
    this.modelAddlanguage.modal('show');
    this.modelLanguageLabelName.val('');
    var gxtable = this;
    this.modelButtonSaveAddlanguage.off('click').click(function (){
        var lang = gxtable.modelLanguageLabelName.val().toLowerCase().replace(' ','_');
        if(lang.length > 0 && !gxtable.translationLanguages.includes(lang)){
            gxtable.translationLanguages.push(lang);
            gxtable.addColumnToTableJS(null,lang);
            gxtable.addLangugeToModelEditor(lang);
        }
    })
}

gxTraducter.prototype.addColumnToTableJS = function (pos, content){
    table = this.tableTrRoot[0];
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