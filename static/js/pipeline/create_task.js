//创建数据Ajax
function createTaskAjax() {
    $("#create_busy_icon").show();
    $("#create_task_btn").attr('disabled', "true");
    var pipe_id = $('.modal_iframe', window.parent.document).attr("pipe_id");
    var url = "/pipeline/create_task/" + pipe_id + "/";
    var name = $("#id_name").val();
    if (name.trim().toLowerCase() == "data") {
        new PNotify({
            title: '通知',
            text: "任务名不能为Data，Data用于数据源或数据最终流出。",
            addclass: 'custom',
            type: 'error'
        });
        return;
    }

    //by xl
    $("#id_server_tag").val($('#server_tag_select').prev().find('input').eq(1).val());
    //
    var param = "";
    param += "&type=" + $('.modal_iframe', window.parent.document).attr('proc_type');
    param += "&processor_id=" + $('.modal_iframe', window.parent.document).attr('proc_id');
    param += "&version_id=" + $('.modal_iframe', window.parent.document).attr('version_id');
    param += "&use_processor=1";
    param += "&retry_count=1";
    param += "&over_time=0";
    param += "&priority=6";
    param +=  "&" + $("#create_task_form").serialize();

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
                window.parent.create_task_callback(pipe_id, result.task);
            }
            $("#create_busy_icon").hide();
            $("#create_task_btn").removeAttr('disabled');
        }
    });
}

function hrefindex(pipe_id) {
    top.location.href = "/pipeline/task/" + pipe_id + "/";
}

//修改数据Ajax
function updateTaskAjax(id) {
    $("#update_busy_icon").show();
    $("#update_task_btn").attr('disabled', "true");
    $("#id_template").removeAttr('disabled');

    var url = "/pipeline/update_task/" + id + "/";
    var param = $("#create_task_form").serialize();
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
            $("#update_task_btn").removeAttr('disabled');
            $("#id_template").attr("disabled", true)
        }
    });
}


//修改数据
function update_task(id) {
    //保存前准备
    var config_str = combineParams("paramDiv");
    $("#id_config").val(config_str);

    //若id_over_time == '' 默认值0
    if ($("#id_over_time").val() == '') {
        $("#id_over_time").val(0);
    }
    //依赖任务
    var task_list = combineTasks();
    $("#id_prev_task_ids").val(task_list);
    //服务标签
    if ($("#server_tag_select").val() != '') {
        $("#id_server_tag").val($('#server_tag_select').prev().find('input').eq(1).val());
    }

    updateTaskAjax(id);
}

var script_param = '';
var spark_param = ('<option value=""></option>' +
    '<option value="--master">--master</option>' +
    '<option value="--driver-memory">--driver-memory</option>' +
    '<option value="--executor-memory">--executor-memory</option>' +
    '<option value="--executor-cores">--executor-cores</option>' +
    '<option value="--py-files">--py-files</option>' +
    '<option value="--files">--files</option>');
//参数默认值数组
var param_arr = [script_param, spark_param];

//点击添加任务参数
function addTemplate() {
    var param_input_val = '';
    var type = $('.modal_iframe', window.parent.document).attr('proc_type');
    var param_div = "<div class='form-group param_div'" +
        " style='margin-left: 104px;margin-top: 0px;margin-bottom: 0px;'>" +
        "<select style='width:180px'" +
        " class='combobox form-control'>" + param_arr[type - 1] + "</select>&nbsp;" +
        "= <input type='text' value='" + param_input_val + "'" +
        " placeholder='填写参数的值' class='form-control'" +
        " style='width:474px;'/>";
    param_div += "&nbsp;<i class='fa fa-plus-square' style='cursor:pointer;color:green' title='添加' onclick='addTemplate()' href='javascript:void(0)'></i>" +
        "&nbsp;<i class='fa fa-minus-square' style='cursor:pointer;color:red' title='删除' onclick='deleteParam(this, " + paramIndex + ")' href='javascript:void(0)'></i></dev>";

    $('#paramDiv').append(param_div);

    //$('.combobox').combobox();
    $("#paramDiv .combobox:last").combobox();
    paramIndex++;

    if (type == 1) {
        $('#paramDiv .add-on').unbind('click');
    } else {
        var arr = [];
        $('#paramDiv input.combobox').each(function (index) {
            var text = $(this).val();
            // console.log(text);
            arr.push(text);
            this.index = index;
            // console.log(arr);
            $(this).unbind('blur');
            $(this).unbind('blur');
            $(this).on('blur', function () {
                var index = this.index;
                // console.log(index);
                if ($(this).val() == "") {
                    $(this).val(arr[index]);
                    // console.log(arr[index]);
                }
            }).on('change', function () {
                arr[this.index] = $(this).val();
            });
        });
    }
}

var taskvalue;
var text1, text2, minh, day, hour;
var changeindex = 0;

function deleteParam(obj, index) {
    $(obj).parent().remove();
}

function addPipeTask() {
    var select_str = "";
    var task_id = $('#task_id').val();
    $.ajax({
        type: 'post',
        async: false,
        url: '/pipeline/get_pipelines/',
        data: {'plIndex': pIndex, 'task_id': task_id},
        success: function (result) {
            if (result.status == 0) {
                var pipelines = result.pipeline_list;
                if (pipelines.length > 0) {
                    select_str += "<div class='form-group'" +
                        " style='margin-left: 104px;'><select id='rely_pipeline" + pIndex +
                        "' onchange='get_tasks(" + pIndex + ")' style='width:350px'" +
                        " class='combobox select2-select-00 full-width-fix select2-offscreen'>" +
                        "<option value=''>--请选择DAG流--</option>";

                    for (var i = 0; i < pipelines.length; i++) {
                        select_str += "<option value='" + pipelines[i].id + "' >" +
                            pipelines[i].name + "</option>";
                    }

                    select_str += "</select>&nbsp<select id='rely_task" + pIndex +
                        "' style='width:350px' class='combobox select2-select-00 full-width-fix select2-offscreen'>" +
                        "<option value=''>--请选择任务--</option></select>&nbsp;" +
                        "<i class='fa fa-plus-square' style='cursor:pointer;color:green;' title='添加' onclick='addPipeTask()' href='javascript:void(0)'></i>&nbsp;" +
                        "<i title='删除' class='fa fa-minus-square' style='cursor:pointer;color:red' onclick='deletePlDiv(this)'" +
                        " href='javascript:void(0)'></i></div>";

                    // console.log(select_str);
                    $("#plDiv").append(select_str);

                    $('#rely_pipeline' + pIndex).select2();
                    $('#s2id_rely_pipeline' + pIndex).css({
                        'width': '346px',
                        'margin-left': '10px'
                    });
                    $('#rely_pipeline' + pIndex).prev().find('.select2-chosen').text('--请选择DAG流--');
                    // $('#rely_task'+pIndex).combobox();
                    //by xl
                    var addinput = $('#rely_pipeline' + pIndex).prev().find('input').eq(1);
                    var text = addinput.val();
                    addinput.on('blur', function () {
                        if ($(this).val() == "") {
                            $(this).val(text);
                        }
                    });
                    $('#rely_task' + pIndex).select2();
                    $('#rely_task' + pIndex).prev().find('.select2-chosen').text('--请选择任务--');
                    $('#s2id_rely_task' + pIndex).css({

                        'width': '364px',
                        'margin-left': '9px'
                    });
                }
                else {
                    alert("你没有拥有权限的DAG流，不能添加依赖！");
                }
            }
        }
    });
    pIndex++;
}

function deletePlDiv(obj) {
    $(obj).parent().remove();
}

function get_tasks(index) {
    var id = $("#rely_pipeline" + index).val();
    //by xl
    $('#rely_task' + index).prev().find('.select2-chosen').text('--请选择任务--');

    var url = "/pipeline/get_tasks/";
    var task_select = '';
    if (id != '' && id != null) {
        $.ajax({
            type: 'post',
            url: url,
            async: false,
            dataType: 'json',
            data: {'pipeline_id': id},
            success: function (result) {
                $("#rely_task" + index).empty();
                var task_list = result.task_list;
                if (task_list.length > 0) {
                    for (var i = 0; i < task_list.length; i++) {
                        task_select += "<option value='" + task_list[i].id + "'>" +
                            task_list[i].name + "</option>";
                    }
                }
                else {
                    task_select = "<option value=''>无</option>";
                }

                $("#rely_task" + index).append(task_select);
            }
        });
    }
    else {
        //DAG流为空
        $("#rely_task" + index).empty();
    }
}

//选择已有插件，获取参数
function getParams() {
    var param = '';
    var id = $('.modal_iframe', window.parent.document).attr('proc_id');
    var url = "/pipeline/get_params/";
    $.ajax({
        type: 'post',
        url: url,
        data: {"processor_id": id},
        success: function (result) {
            var config = result.config;
            // console.log(config);
            add_config_list(config);
        }
    });
}

function getParamsTest() {
    var param = '';
    var id = $('.modal_iframe', window.parent.document).attr('proc_id');
    var url = "/pipeline/get_params/";
    $.ajax({
        type: 'post',
        url: url,
        data: { "processor_id": id }
    });
}

//去除字符串中间空格
function trim(str) {
    return str.replace(/[ ]/g, ""); //去除字符串中的空格
}

//选择已有插件，构造参数列表
function add_config_list(config) {
    var div_str = "<label style='margin-right: 3px;'>" +
        "<font color='red'>*</font>" +
        "任务参数:</label><dev>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<i title='添加' style='color:green;cursor:pointer' class='fa fa-plus-square' onclick='addTemplate()' href='javascript:void(0)'>" +
        "</i></dev>"
    $('#paramDiv').html(div_str);
    if (config != '') {
        var temp = config.split('\n');
        var count = temp.length;
        if (count >= 1) {
            for (var i = 0; i <= (count - 1); i++) {
                addTemplate();
            }
        }

        for (var j = 0; j < count; j++) {
            var config_str = temp[j]
            var config_str_ = config_str.split('=');
            var config_str_left = config_str_[0];
            //key-value,value里面有=的情况
            var config_str_right = temp[j].substring(config_str_left.length + 1);
            var config_right_split = config_str_right.split('\1100')
            var config_state = ""
            if (config_right_split.length >= 2) {
                config_state = config_right_split[1];
                config_str_right = config_right_split[0];
            }

            //config_str_right = config_str_[1];
            $("#paramDiv div.param_div:eq(" + j + ")").find("input[type='text']").each(function (m) {
                if (m == 0) {
                    $(this).val(config_str_left);
                }
                if (m == 1) {
                    $(this).val(config_str_right);
                }
            });
        }
        var arr = [];
        $('#paramDiv input.combobox').each(function (index) {
            var text = $(this).val();

            arr.push(text);
            this.index = index;
            $(this).unbind('change');
            $(this).unbind('blur');
            $(this).on('blur', function () {
                var index = this.index;
                // console.log(index);
                if ($(this).val() == "") {
                    $(this).val(arr[index]);
                    // console.log(arr[index]);
                }
            }).on('change', function () {
                arr[this.index] = $(this).val();
            });
        });

    }
}

//组装参数配置**
function combineParams(id) {
    var config = "";
    var template = "";
    if (id == 'processor_param') {
        $("#" + id + " div").each(function () {
            $(this).find("input[type='text']").each(function (j) {
                if (j == 0 && $(this).val()) {
                    config += $(this).val() + '=';
                }
                if (j == 1) {
                    config += $(this).val() + "\n";
                }
            });
        });
    }
    else {
        $("#" + id + " div.param_div").each(function (i) {
            $(this).find("input[type='text']").each(function (j) {
                if (j == 0) {
                    if ($(this).val() == '') {
                        //alert('请选择参数！');
                        return;
                    }
                    else {
                        config += $(this).val() + '=';
                    }
                }
                else {
                    if ($(this).val() == '') {
                        config += '\n';
                    }
                    else {
                        config += $(this).val() + "\n";
                    }
                }
            })

        });
    }
    //alert(config);
    return config;
}

//组装依赖任务list
function combineTasks() {
    var task_list = '';
    $("#plDiv div").each(function () {
        $(this).find("select").each(function (i) {
            if (i == 1 && $(this).val() != '') {
                task_list += $(this).val() + ',';
            }
        });
    })
    if (task_list.length > 1) {
        task_list = task_list.substr(0, task_list.length - 1);
    }
    return task_list;
}

//保存前设置form参数
function task_attribute() {
    //使用已有插件
    var use_processor = $("#id_use_processor").is(':checked');
    if (use_processor) {
        $("#id_processor_id").val($("#processor_select").val());
        $("#id_config").val(combineParams("processor_param"));
    }
    else {
        $("#id_processor_id").val(0);
        $("#id_config").val(combineParams("paramDiv"));
    }
    $("#id_config").val(combineParams("paramDiv"));
    //若id_over_time == '' 默认值0
    if ($("#id_over_time").val() == '') {
        $("#id_over_time").val(0);
    }

    //服务标签
    if ($("#server_tag_select").val() != '') {
        $("#id_server_tag").val($("#server_tag_select").val());
    }

    //依赖任务
    var task_list = combineTasks();
    $("#id_prev_task_ids").val(task_list);
}

//获取服务器标签
function get_server_tags(task_type) {
    var options = "";
    $.ajax({
        type: "post",
        url: '/pipeline/get_server_tags/',
        async: false,
        dataType: "json",
        data: {'task_type': task_type},
        success: function (result) {
            if (result.status) {
                $("#server_tag_div").hide();
                $("#server_tag_select").empty();

            } else {
                $("#server_tag_div").show();
                var server_tags = result.server_tags;
                if (server_tags != '') {
                    var server_tags_arr = server_tags.split(',');
                    for (var i = 0; i < server_tags_arr.length; i++) {
                        options += "<option value='" + server_tags_arr[i] + "' >" +
                            server_tags_arr[i] + "</option>";
                    }
                    $('#server_tag_select option').remove();
                    $("#server_tag_select").append(options);
                }
            }
        }
    });
}

function cancel_add_task() {
    choosevalue = 0;
    $('#modalcheck_iframe', window.parent.document).unbind('hide.bs.modal');
    $('#modalcheck_iframe .modal-body h5', window.parent.document).text('确定要放弃创建task吗?');
    $('.changevalue', window.parent.document).text('确定');
    $('#modalcheck_iframe', window.parent.document).modal('show');
    $('#modalcheck_iframe', window.parent.document).on('hide.bs.modal', function () {
        if (choosevalue == 1) {
            //history.go(-1);
            $('.modal_iframe', window.parent.document).hide();
        }
    });
}

//添加任务的index
var pIndex = 0;

//添加参数的index
var paramIndex = 0;

$(function () {
    $('.changevalue', window.parent.document).on('click', function () {
        choosevalue = 1;
        $('#modalcheck_iframe', window.parent.document).modal('hide');
    });

    //清掉整个Div
    var div_str = "<label style='margin-right: 3px;'>" +
        "<font color='red'>*</font>" +
        "依赖任务:</label><dev>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<i class='fa fa-plus-square' style='color:green;cursor:pointer' title='添加' onclick='addPipeTask()' href='javascript:void(0)'></i></div>";
    $('#plDiv').html(div_str);

    var div_str = "<label style='margin-right: 3px;'>" +
        "<font color='red'>*</font>" +
        "任务参数:</label><dev>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;" +
        "<i title='添加' style='color:green;cursor:pointer' class='fa fa-plus-square' onclick='addTemplate()' href='javascript:void(0)'>" +
        "</i></dev>"
    $('#paramDiv').html(div_str);

    getParams();

    $("#create_task_btn").click(function () {
        //填充所需字段,create前准备
        task_attribute();
        createTaskAjax();
    });


    $('select.combobox').combobox();
    $('input.combobox').each(function () {
        $(this).val($(this).val());
    });
    $('#paramDiv .add-on').unbind('click');

    //获取服务标签
    get_server_tags($('.modal_iframe', window.parent.document).attr('proc_type'));
    $('#server_tag_select').combobox();
    $('#server_tag_select').parent().css({
        'margin-left': '4px',
        'margin-top': '-5px'
    });
    var tagtext = $('#server_tag_select').parent().find('input').eq(1).val();
    $('#server_tag_select').parent().find('input').eq(1).on('blur', function () {
        // console.log(tagtext);
        if ($(this).val() == "") {
            $(this).val(tagtext);
        }

    }).on('change', function () {
        // console.log(tagtext);
        tagtext = $(this).val();
    });

    $("[name='data_type']").change(function () {
        if (changeindex == 0) {
            changeDataType(taskvalue, text1, text2, minh, day, hour);
        } else if (changeindex == 1) {
            taskvalue = '';
            text1 = '';
            text2 = '';
            minh = '';
            day = '';
            hour = '';
            changeDataType(taskvalue, text1, text2, minh, day, hour);
        }
    });

    var proc_type_list = ['c/c++', 'lua', 'java', 'python']
    var proc_type = $('.modal_iframe', window.parent.document).attr('proc_type');
    $("#id_choosed_proc_type").val(proc_type_list[proc_type - 1]);
    $("#id_choosed_proc").val($('.modal_iframe', window.parent.document).attr('proc_name'));
    $("#id_choosed_version").val($('.modal_iframe', window.parent.document).attr('version_name'));
});
