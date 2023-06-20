function get_input_params() {
    var key_arr = new Array();
    $("input[name='input_params_key']").each(function(i, item) {
        key_arr.push(item.value);
    });

    var val_arr = new Array();
    $("select[name='input_params_val']").each(function(i, item) {
        val_arr.push(item.value);
    });

    var desc_arr = new Array();
    $("input[name='input_params_desc']").each(function(i, item) {
        desc_arr.push(item.value);
    });

    var config = "";
    for (var i = 0; i < key_arr.length; ++i) {
        config += key_arr[i] + "=" + val_arr[i] + "\1100" + desc_arr[i] + "\n";
    }

    return config;
}

function get_output_params() {
    var key_arr = new Array();
    $("input[name='output_params_key']").each(function(i, item) {
        key_arr.push(item.value);
    });

    var val_arr = new Array();
    $("select[name='output_params_val']").each(function(i, item) {
        val_arr.push(item.value);
    });

    var desc_arr = new Array();
    $("input[name='output_params_desc']").each(function(i, item) {
        desc_arr.push(item.value);
    });

    var config = "";
    for (var i = 0; i < key_arr.length; ++i) {
        config += key_arr[i] + "=" + val_arr[i] + "\1100" + desc_arr[i] + "\n";
    }

    return config;
}

//创建数据Ajax
function createProcAjax() {
    $("#create_busy_icon").show();
    $("#create_processor_btn").attr('disabled', "true");
    var url = "/processor/create/";
    var param = $("#create_processor_form").serialize();
    var project_id = $("#create_processor_project_id").val();
    param += "&project_id=" + project_id;
    param += "&input_config=" + get_input_params();
    param += "&output_config=" + get_output_params();

    console.log(param);
    $.ajax({
        type: 'post',
        url: url,
        dataType: "json",
        data: param,
        success: function (result) {
            $("#create_busy_icon").hide();
            $("#create_processor_btn").removeAttr('disabled');
            if (result.status) {
                // alert(result.msg);
                $('#messageModal .modal-body p').text(result.msg);
                $('#messageModal').modal('show');
            } else {
                $('.modal_iframe', window.parent.document).hide();
                $('.modal-backdrop', window.parent.document).remove();
                window.parent.create_processor_callback(project_id, result.pid, $("#id_name").val());
            }
        }
    });
}

//修改数据Ajax
function updateProcAjax(id) {
    $("#update_busy_icon").show();
    $("#update_processor_btn").attr('disabled', "true");
    var url = "/processor/update/" + id + "/";
    var param = $("#create_processor_form").serialize();
    var project_id = $("#update_processor_project_id").val();
    param += "&project_id=" + project_id;
    param += "&input_config=" + get_input_params();
    param += "&output_config=" + get_output_params();

    $.ajax({
        type: 'post',
        url: url,
        dataType: "json",
        data: param,
        success: function (result) {
            if (result.status) {
                $('#messageModal .modal-body p').text(result.msg);
                $('#messageModal').modal('show');
            } else {
                $('.modal_iframe', window.parent.document).hide();
                $('.modal-backdrop', window.parent.document).remove();
                window.parent.update_processor_callback(project_id, id, $("#id_name").val());
            }
            $("#update_busy_icon").hide();
            $("#update_processor_btn").removeAttr('disabled');
        }
    });
}

//修改数据
function updateProc(id) {
    var $tag = $("#tag").siblings(".tagsinput").find(".tag span");
    var tags = [];
    for (var i = $tag.length; i--;) {
        tags.push($($tag[i]).text().trim());
    }

    tags.join(",");
    $("#id_tag").val(tags);
    $("#id_config").val(combineParams());

    updateProcAjax(id);
}

function add_input_template() {
    if ($("input[name='input_params_key']").length >= 4) {
        new PNotify({
            title: '失败',
            text: "最多只能有4个输入参数",
            addclass: 'custom',
            type: 'warn'
        });

        return;
    }
    $('#input_div').append("<div class='form-group'" +
        " style='margin-left: 84px;'><input name='input_params_key' type='text' " +
        "placeholder='填写参数的key' class='form-control'" +
        " style='width:235px;'  disabled />&nbsp;:" +
        " <select name='input_params_val' style='width:237px;' class='form-control' ><option value='hive'>hive表格</option><option value='hdfs'>hdfs文件</option></select>&nbsp;//" +
        " <input name='input_params_desc' type='text' placeholder='填写参数的说明' class='form-control' style='width:237px;'/>" +
        " &nbsp<i style='cursor:pointer;color:red' class='fa fa-minus-square' title='删除'" +
        " onclick='delete_input_param(this)' href='javascript:void(0)'>" +
        "</i></div>");

    $("input[name='input_params_key']").each(function(i, item) {
        $(this).val("input_" + i);
    });
}

function add_output_template() {
    if ($("input[name='output_params_key']").length >= 4) {
        new PNotify({
            title: '失败',
            text: "最多只能有4个输出参数",
            addclass: 'custom',
            type: 'warn'
        });

        return;
    }

    $('#output_div').append("<div class='form-group'" +
        " style='margin-left: 84px;'><input name='output_params_key' type='text' " +
        "placeholder='填写参数的key' class='form-control'" +
        " style='width:235px;'/  disabled>&nbsp;:" +
        " <select name='output_params_val' style='width:237px;' class='form-control' ><option value='hive'>hive表格</option><option value='hdfs'>hdfs文件</option></select>&nbsp;//" +
        " <input name='output_params_desc' type='text' placeholder='填写参数的说明' class='form-control' style='width:237px;'/>" +
        " &nbsp<i style='cursor:pointer;color:red' class='fa fa-minus-square' title='删除'" +
        " onclick='delete_output_param(this)' href='javascript:void(0)'>" +
        "</i></div>");

    $("input[name='output_params_key']").each(function(i, item) {
        $(this).val("output_" + i);
    });
}

function add_template() {
    $('#paramDiv').append("<div name='user_add_template' class='form-group'" +
        " style='margin-left: 84px;'><input type='text' " +
        "placeholder='填写参数的key' class='form-control'" +
        " style='width:235px;'/>&nbsp;:" +
        " <input type='text' placeholder='填写默认参数' class='form-control' style='width:237px;'/>&nbsp;//" +
        " <input type='text' placeholder='填写参数的说明' class='form-control' style='width:237px;'/>" +
        " &nbsp<i style='cursor:pointer;color:red' class='fa fa-minus-square' title='删除'" +
        " onclick='deleteParam(this)' href='javascript:void(0)'>" +
        "</i></div>");
}

function add_template_with_val(key, val, desc, id) {
    $('#paramDiv').append("<div id='" + id + "' class='form-group'" +
        " style='margin-left: 84px;'><input type='text' " +
        "placeholder='填写参数的key' value='" + key + "' class='form-control'" +
        " style='width:235px;'/>&nbsp;:" +
        " <input type='text' placeholder='填写默认参数' value='" + val + "' class='form-control' style='width:237px;'/>&nbsp;//" +
        " <input type='text' placeholder='填写参数的说明' value='" + desc + "' class='form-control' style='width:237px;'/>" +
        " &nbsp<i style='cursor:pointer;color:red' class='fa fa-minus-square' title='删除'" +
        " onclick='deleteParam(this)' href='javascript:void(0)'>" +
        "</i></div>");
}

function init_script() {
    if ($("#spark_master").length > 0) {
        $("#spark_master").remove();
    } else {
        $("#init_key").val("");
        $("#init_val").val("");
        $("#init_desc").val("");
    }
    $("#spark_driver_memory").remove();
    $("#spark_executor_memory").remove();
    $("#spark_executor_cores").remove();
    $("#spark_py_files").remove();
    $("#spark_files").remove();
}

function init_spark() {
    if ($("#init_key").val().trim() != "") {
        add_template_with_val("--master", "yarn", "运行模式", "spark_master");
    } else {
        $("#init_key").val("--master");
        $("#init_val").val("yarn");
        $("#init_desc").val("运行模式");
    }
    add_template_with_val("--driver-memory", "1g", "应用分配内存大小", "spark_driver_memory");
    add_template_with_val("--executor-memory", "1g", "每个节点分配内存大小", "spark_executor_memory");
    add_template_with_val("--executor-cores", "1", "每个Executor进程的CPU core数量", "spark_executor_cores");
    add_template_with_val("--py-files", "", "依赖包zip，egg或py文件列表，英文','分割", "spark_py_files");
    add_template_with_val("--files", "", "附加文件列表，英文','分割", "spark_files");
}

function init_oozie() {
    init_script();
}

function deleteParam(obj) {
    $(obj).parent().remove();
}

function delete_input_param(obj) {
    $(obj).parent().remove();
    $("imput[name='input_params_key']").each(function(i, item) {
        console.log(item.value);
    });
}

function delete_output_param(obj) {
    $(obj).parent().remove();
    $("imput[name='output_params_key']").each(function(i, item) {
        console.log(item.value);
    });
}

//组装参数配置
function combineParams() {
    var config = "";
    $("#paramDiv div").each(function (i) {
        $(this).find("input[type='text']").each(function (j) {
            if (j == 0 && $(this).val()) {
                config += $(this).val();
            }
            if (j == 1) {
                config += "=" + $(this).val();
            }
            if (j == 2) {
                config += "\1100" + $(this).val() + "\n";
            }
        });
    });
    //$("#id_template").val(template);
    return config;
}


$(function () {
    $("#principal").change(function () {
        $("#id_principal").val($("#principal").val());
    });

    //
    $("#tag").tagsInput({
        'height': 'auto',
        'width': '500px'
    });

    $("#create_processor_btn").click(function () {
        var $tag = $("#tag").siblings(".tagsinput").find(".tag span");
        var tags = [];
        for (var i = $tag.length; i--;) {
            tags.push($($tag[i]).text().trim());
        }

        tags.join(",");
        $("#id_tag").val(tags);
        $("#id_config").val(combineParams());

        createProcAjax();
    });

    $("[name='type']").change(function () {
        if ($(this).val() == 3) {
            $("#spark_sql").show();
        }
        else {
            $("#id_template").val('');
            $("#spark_sql").hide();
        }
    });

    $("#create_processor_project_id").combotree('setValue', {
        id: $('.modal_iframe', window.parent.document).attr("project_id")
    });

    $(".textbox .combo").css({"border": "1px solid #cdd0d4;"});

    $("#id_type").change(function () {
        if ($("#id_type").val() == 1) {
            init_script();
        } else if ($("#id_type").val() == 2) {
            init_spark();
        } else if ($("#id_type").val() == 3) {
            init_oozie();
        }
    });
});
