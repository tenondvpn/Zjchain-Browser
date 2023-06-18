var stream_type = 0;

//修改数据Ajax
function updateEdgeAjax() {
    $("#update_busy_icon").show();
    $("#update_edge_btn").attr('disabled', "true");
    $("#id_template").removeAttr('disabled');

    var url = "/pipeline/update_edge/";
    var param = "";
    param += "&prev_task_id=" + $("#prev_task_id").val();
    param += "&next_task_id=" + $("#next_task_id").val();
    param += "&stream_type=" + stream_type;
    if (stream_type == 1) {
        param += "&rcm_context=" + $("#rcm_def_context_name_id").val();
        param += "&rcm_topic=" + $("#rcm_def_topic_id").val();
        param += "&rcm_partition=1";
    } else {
        param += "&rcm_context=" + $("#rcm_context_name_id").val();
        param += "&rcm_topic=" + $("#rcm_topic_id").val();
        param += "&rcm_partition=" + $("#rcm_partition_id").val();
    }

    param += "&file_name=" + $("#file_name_id").val();
    param += "&dispatch_tag=" + $("#dispatch_tag_id").val();
    $.ajax({
        type: 'post',
        url: url,
        dataType: "json",
        data: param,
        success: function (result) {
            if (result.status) {
                $('#messageModal_iframe .modal-body p', window.parent.document).text(result.msg);
                $('#messageModal_iframe', window.parent.document).modal('show');
            } else {
                $('.modal_iframe', window.parent.document).hide();
                $('.modal-backdrop', window.parent.document).remove();
                window.parent.update_task_callback(result.task);
            }
            $("#update_busy_icon").hide();
            $("#update_edge_btn").removeAttr('disabled');
            $("#id_template").attr("disabled", true)
        }
    });
}

function CancelAddEdge() {
    $('.modal_iframe', window.parent.document).hide();
    $('.modal-backdrop', window.parent.document).remove();
}

function ChangeFlowType() {
    var nSel = document.getElementById("create_edge_type_select");
    var index = nSel.selectedIndex;
    var text = nSel.options[index].text;
    var value = nSel.options[index].value;
    if (value == 1) {
        $("#rcm_default_stream_info").show();
        $("#file_stream_file_name").hide();
        $("#rcm_stream_info").hide();
        stream_type = 1;
    } else if (value == 2) {
        $("#rcm_default_stream_info").hide();
        $("#file_stream_file_name").hide();
        $("#rcm_stream_info").show();
        stream_type = 2;
    } else if (value == 3) {
        $("#rcm_default_stream_info").hide();
        $("#file_stream_file_name").show();
        $("#rcm_stream_info").hide();
        stream_type = 3;
    }
}

function delete_edge(prev_task_id, next_task_id) {
    if (confirm("删除该链接?")) {
        $.post("/pipeline/unlink_task/", {
            Link: {
                from: prev_task_id,
                to: next_task_id
            }
        }, function (result) {
            if (result.status) {
                $('#messageModal .modal-body p').text('删除数据流失败');
                $('#messageModal').modal('show');
            } else {
                CancelAddEdge();
                window.parent.create_edge_cancel_callback();
            }
        }, "json");
    }
}

$(function () {
    $('.changevalue', window.parent.document).on('click', function () {
        choosevalue = 1;
        $('#modalcheck_iframe', window.parent.document).modal('hide');
    });

    stream_type = $("#stream_type").val();
    if ($("#stream_type").val() == 0) {
        $("#edge_type_inner").show();
        $("#edge_type_select").hide();
        $("#file_stream_file_name").hide();
        $("#rcm_stream_info").hide();
    } else {
        $("#edge_type_inner").hide();
        $("#edge_type_select").show();
    }

    $("#dispatch_tag_list").hide();
    if ($("#prev_task_name").val() != 'Data') {
        $("#dispatch_tag_list").show();
    }

    if (stream_type == 1) {
        $("#rcm_default_stream_info").show();
        $("#file_stream_file_name").hide();
        $("#rcm_stream_info").hide();
    } else if (stream_type == 2) {
        $("#rcm_default_stream_info").hide();
        $("#file_stream_file_name").hide();
        $("#rcm_stream_info").show();
    } else if (stream_type == 3) {
        $("#rcm_default_stream_info").hide();
        $("#file_stream_file_name").show();
        $("#rcm_stream_info").hide();
    }

    if ($("#prev_task_name").val() != 'Data') {
        $("#dispatch_tag_list").show();
    }

    $("#update_edge_btn").click(function () {
        //填充所需字段,create前准备
        updateEdgeAjax();
    });
});
