

function gxTable(element, options) {
    this.element = $(element);
    this.settings = $.extend(
        {
            // heading: 'Delete',
            // message: 'Are you sure you want to delete this item?',
            // btn_ok_label: 'Yes',
            // btn_cancel_label: 'Cancel',
            // callback: null,
            // delete_callback: null,
            // cancel_callback: null
        }, options || {}
    );

    this.tableName ;
    this.tableItems = new Map();
    this.columnsHead = [];

    this.tableTraducter;

    this.tableGxRoot;
    this.tableGxHead;
    this.tableGxBody;

    this.modalEditRow;
    this.modalEditRowBody;
    this.modalRowEditLabelId;
    this.modalButtonSaveEditRow;

    this.modelAddColumn ;
    this.modelColumnLabelName ;
    this.modelBodyAddColumn ;
    this.modelButtonSaveAddColumn ;
}

gxTable.prototype.build = function (tableName, columnsHead, items) {
    this.tableName = tableName;
    this.columnsHead = columnsHead;
    this.initTable();
    this.initModelEditor();
    this.initmodalAddColumn();
    if (items) {
        items.forEach(trItem => {
            this.addRow(trItem);
        });
    }
}

gxTable.prototype.initTable = function () {
    this[0] = $(`
        <div class="table-responsive">
            <table id="table-gx-root" class="table table-bordered table-hover table-sm table-striped">
                <thead id="table-gx-thead">
                    <tr id="colom-gx-head">
                        <th>ID</th>

                    </tr>
                </thead>
                <tbody id="table-gx-body">
                </tbody>
            </table>
        </div>
    `)[0];
    this.length = 1;
    this.element.append(this[0]);
    var gxtable = this;
    this.tableGxRoot = $('#table-gx-root');
    this.tableGxHead = $('#table-gx-thead');
    this.tableTrColomHead = $('#colom-gx-head');
    this.tableGxBody = $('#table-gx-body');
    this.columnsHead.forEach(column => {
        var thColumn = $(`
            <th> 
                ${column}
            </th>
        `);
        bRemoveColumn = $('<button class="float-right btn-icon  ml-1 mdi mdi-close"> </button>');
        bRemoveColumn.bootstrap_confirm_delete({
            heading: 'Delete ' + column,
            message: 'Are you sure you want to delete this column?',
            btn_ok_label: 'Yes',
            btn_cancel_label: 'Cancel',
            delete_callback: () => {
                console.log(column+' was Deleted');
                gxtable.removeColumnName(column);
            },
            cancel_callback: () => {
                console.log('cancel Delete Languages');
            },
        });
        thColumn.append(bRemoveColumn);
        this.tableTrColomHead.append(thColumn);
    })
    var bAddColumn = $(`<button class="btn-icon border  border-dark rounded px-2 ml-1 mdi mdi-plus-thick"> </button>`);
    bAddColumn.click(function () {
        gxtable.openEditColumn();
    });
    this.tableTrColomHead.append($('<th></th>').append(bAddColumn));
}

gxTable.prototype.initModelEditor = function () {
    if (null === document.getElementById('model-edit-row')) {
        $('body').append(`
            <div class="modal" id="model-edit-row">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 id="edit-row-id" class="modal-title"></h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div id="model-edit-row-body" class="modal-body" >
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button id="edit-row-save" type="button" class="btn btn-secondary" data-dismiss="modal">SAVE</button>
                        </div>

                    </div>
                </div>
            </div>
        `);

        this.modalEditRow = $('#model-edit-row');
        this.modalRowEditLabelId = $('#edit-row-id')
        this.modalEditRowBody = $('#model-edit-row-body');
        this.modalButtonSaveEditRow = $('#edit-row-save');
    }
    this.columnsHead.forEach(colum => {
        this.addColumnToModelEditor(colum);
    })
    this.modalEditRow.on('shown.bs.modal', function () {
        $(this).find('.textar-input').each(function (index, element) {
            element.style.height = "1px";
            element.style.height = (this.scrollHeight + 1.1) + "px";
        })
    })
}

gxTable.prototype.initmodalAddColumn = function () {
    if (null === document.getElementById('modal-add-column')) {
        $('body').append(`
            <div class="modal" id="modal-add-column">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Add a newcolumn</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body "id="add-column-body">
                            <div class="form-group row">
                                <label class="col-sm-4 " for="add-column-name"> column Name :</label>
                                <input type="text" class="form-control col-sm-7" id="add-column-name"></textarea>
                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button id="add-column-save" type="button" class="btn btn-secondary" data-dismiss="modal">SAVE</button>
                        </div>

                    </div>
                </div>
            </div>
        `);
        
        this.modelAddColumn = $('#modal-add-column');
        this.modelBodyAddColumn = $('dd-column-body');
        this.modelColumnLabelName = $('#add-column-name');
        this.modelButtonSaveAddColumn = $('#add-column-save');
    }
}

gxTable.prototype.addColumnToModelEditor = function (column) {
    var editAreWord = $(`
        <div class="form-group row">
            <label class="text-capitalize col-sm-2 form-control-sm" for="t-${column}">${column}:</label>
        </div>
    `);
    var textarInput = $(`<textarea class="textar-input form-control form-control-sm col-sm-9 rows="1" id="t-${column}"></textarea>`);
    textarInput.on('input', function () {
        this.style.height = "1px";
        this.style.height = (this.scrollHeight + 1.1) + "px";
    });
    this.modalEditRowBody.append(editAreWord.append(textarInput));
}

gxTable.prototype.addRow = function (item) {
    var trRow = $(`<tr id="${item.id}"></tr>`);
    var rowHead = $(`
        <td>
            <div class="float-left text-truncate">
                ${item.id}
            </div>
        </td>
    `)
    var bCopieHead = $(`
        <button class="btn-icon float-right mdi mdi-content-copy"></button>
    `);
    bCopieHead.click(function () {
        copieText(item.id)
    });
    rowHead.append(bCopieHead);
    trRow.append(rowHead);
    this.columnsHead.forEach(column => {
        var trdWord = $(`
            <td id="${item.id}-${column}"> ${item[column]}</td>
        `);
        trRow.append(trdWord);
    })

    var Bdelete = $(`
        <button type="button" class="btn-icon  mdi mdi-delete-forever "></button>
    `);
    var Bedite = $(`
        <button type="button" class="btn-icon  mdi mdi-file-document-edit"></button>
    `);
    var gxtable = this;
    Bedite.click(function () {
        gxtable.openEditorRow(item);
    });
    Bdelete.bootstrap_confirm_delete({
        heading: 'Delete ' + item.id,
        message: 'Are you sure you want to delete this item?',
        btn_ok_label: 'Yes',
        btn_cancel_label: 'Cancel',
        delete_callback: () => {
            $(`#${item.id}`).remove();
            gxtable.tableItems.delete(item.id);
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
    trRow.append(GroupEdit);
    trRow.hover(function () {
        $(this).find('td').css("white-space", "normal");
    }, function () {
        $(this).find('td').css("white-space", "nowrap");
    });
    this.tableGxBody.append(trRow);
    this.tableItems.set(item.id, item);
}

gxTable.prototype.updateRow = function (item) {
    this.columnsHead.forEach(element => {
        $(`#${item.id}-${element}`).text(item[element]);
    });
}

gxTable.prototype.openEditorRow = function (item) {
    this.modalEditRow.modal('show');
    this.modalRowEditLabelId.text(item.id);
    this.columnsHead.forEach(element => {
        $(`#t-${element}`).val(item[element]);
    });
    var gxtable = this;
    this.modalButtonSaveEditRow.off("click").click(function () {
        gxtable.columnsHead.forEach(column => {
            item[column] = $(`#t-${column}`).val();
        });
        gxtable.updateRow(item);
    });
}

gxTable.prototype.openEditColumn = function () {
    this.modelAddColumn.modal('show');
    this.modelColumnLabelName.val('');
    var gxtable = this;
    this.modelButtonSaveAddColumn.off('click').click(function () {
        gxtable.addColumn(gxtable.modelColumnLabelName.val());
    })
}

gxTable.prototype.addColumn = function (column) {
    column = column.toLowerCase().replace(' ', '_');
    if (column.length > 0 && !this.columnsHead.includes(column)) {
        this.columnsHead.push(column);
        this.addColumnToTableJS(null, column);
        this.addColumnToModelEditor(column);
    }
}

gxTable.prototype.removeColumnName = function (column) {
    if(this.columnsHead.includes(column)){
        var index = this.columnsHead.indexOf(column);
        if (index > -1) {
            this.columnsHead.splice(index, 1);
            this.removeColumInTableJs(index + 1);
        }
    }
}

gxTable.prototype.addColumnToTableJS = function (pos, content) {
    table = this.tableGxRoot[0];
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

gxTable.prototype.removeColumInTableJs = function(pos) {
    table = this.tableGxRoot[0];
    var columns = table.rows[0].getElementsByTagName('th').length;
    if(pos > 0 && pos < columns){
        for (var r = 0; r < table.rows.length; r++) {
            table.rows[r].deleteCell(pos);
        }
    }
}

gxTable.prototype.savaTableTrAsJson = function() {
    download(JSON.stringify(this.tableItems), this.tableName+".json", 'text/plain');
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

$.fn.gxTable = function (options) {
    var element = $(this);

    if (element.data('gx-traducter')) {
        return element.data('gx-traducter');
    }

    var plugin = new gxTable(this, options);

    element.data('gx-traducter', plugin);
    return plugin;
}