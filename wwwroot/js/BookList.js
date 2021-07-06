let datatable;

const loadDataTable = () => {
    //datatable = document.getElementById("DT_load");

    datatable = $('#DT_load').DataTable({
        "ajax": {
            "url": "api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "30%" },
            { "data": "author", "width": "30%" },
            { "data": "isbn", "width": "30%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/BookList/Edit?id=${data}" class="btn btn-success btn-sm text-white" style="cursor: pointer; width:70px">Edit</a>
                            &nbsp;
                            <a class="btn btn-success btn-sm text-white" style="cursor: pointer; width:70px">Delete</a>
                        </div>
                    `;
                }, "width": "100%"
            }
        ],
        "language": {
            "emptyTable": "sorry, no data at the moments!"
        },
        "width": "100%"
    });
}




window.addEventListener('DOMContentLoaded', e => {
    loadDataTable();
});