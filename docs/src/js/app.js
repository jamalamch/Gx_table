
var table = $('.container').gxTable({
    tableName: 'table Gx',
    editRow: true,
    editColumn: true,
    columns: [
        { label: 'A1', name: 'A1_name'},
        { label: 'A2',  name: 'A2_name'},
        { label: 'A3', name: 'A3_name'},
        { label: 'A4',  name: 'A4_name'},
        { label: 'A5', name: 'A5_name'},
    ],
    data: {
        "R1-1585": {
            A1: " R1 A1 : hi",
            A3: " R1 A3 : ha",
            A4: " R1 A4 : ho",
            A5: " R1 A5 : hp"
        },
        "R2-11185-456621542vb": {
            A1: " R2 A1 : hi hi hi",
            A2: " R2 A2 : ho ho ho",
            A4: " R2 A4 : ha ha ha",
            A5: " R2 A5 : hu hu hu hu"
        },
        "R3-185-4542vb": {
            A1: " R3 A1 : hi hi hi hi hi hi",
            A2: " R3 A2 : ho ho ho ho ho ho ho ho ho",
            A2: " R3 A3 : ha ha ha ha ha ha ha ha ha ha ha ha",
            A4: " R3 A4 : hu hu hu hu hu hu hu hu hu hu hu hu hu hu hu hu",
            A5: " R3 A5 : hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi"
        }
    }
});


$('#save-table').on('click', function() {
    table.savaTableTrAsJson();
});