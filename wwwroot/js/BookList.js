///*const { data } = require("jquery");

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
                            <a class="btn btn-success btn-sm text-white" style="cursor: pointer; width:70px"
                            onclick=Delete('/api/book?id='+${data})
                            >Delete</a>
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

const Delete = (url) => {
    swal({
        title: "Are you sure?",
        text: "This will be deleted permanently!",
        buttons: true
        icon: "warning",
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        datatable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}




window.addEventListener('DOMContentLoaded', e => {
    loadDataTable();
});