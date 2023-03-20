var stream_type = 0;
//创建数据Ajax

function createEdgeAjax() {
    $("#create_busy_icon").show();
    $("#create_edge_btn").attr('disabled', "true");
    var pipe_id = $('.modal_iframe', window.parent.document).attr("pipe_id");
    var url = "/pipeline/link_task/";

    //by xl
    $("#id_server_tag").val($('#server_tag_select').prev().find('input').eq(1).val());
    //
    var param = "";
    param += "&prev_task_id=" + $("#prev_task_id").val();
    param += "&next_task_id=" + $("#next_task_id").val();
    param += "&stream_type=" + stream_type;
    param += "&file_name=" + $("#file_name_id").val();
    if (stream_type == 1) {
        param += "&rcm_context=" + $("#rcm_def_context_name_id").val();
        param += "&rcm_topic=" + $("#rcm_def_topic_id").val();
        param += "&rcm_partition=1";
    } else {
        param += "&rcm_context=" + $("#rcm_context_name_id").val();
        param += "&rcm_topic=" + $("#rcm_topic_id").val();
        param += "&rcm_partition=" + $("#rcm_partition_id").val();
    }
    param += "&dispatch_tag=" + $("#dispatch_tag_id").val();

    $.ajax({
        type: 'post',
        url: url,
        dataType: "json",
        data: param,
        success: function (result) {
            if (result.status) {
                new PNotify({
                    title: '通知',
                    text: result.msg,
                    addclass: 'custom',
                    type: 'error'
                });
            } else {
                $('.modal_iframe', window.parent.document).hide();
                $('.modal-backdrop', window.parent.document).remove();
            }
            $("#create_busy_icon").hide();
            $("#create_edge_btn").removeAttr('disabled');
        }
    });
}

function CancelAddEdge() {
    $('.modal_iframe', window.parent.document).hide();
    $('.modal-backdrop', window.parent.document).remove();
    window.parent.create_edge_cancel_callback();
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

$(function () {
    $('.changevalue', window.parent.document).on('click', function () {
        choosevalue = 1;
        $('#modalcheck_iframe', window.parent.document).modal('hide');
    });

    $("#dispatch_tag_list").hide();
    if ($("#prev_task_name").val() != 'Data' && $("#next_task_name").val() != 'Data') {
        $("#edge_type_inner").show();
        $("#edge_type_select").hide();
        stream_type = 0;
    } else {
        $("#edge_type_inner").hide();
        $("#edge_type_select").show();
        stream_type = 1;
    }

    if ($("#prev_task_name").val() != 'Data' && $("#next_task_name").val() == 'Data') {
        stream_type = 2;
    }

    if ($("#prev_task_name").val() == 'Data' && $("#next_task_name").val() != 'Data') {
        stream_type = 1;
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

    $("#create_edge_btn").click(function () {
        //填充所需字段,create前准备
        createEdgeAjax();
    });
});
