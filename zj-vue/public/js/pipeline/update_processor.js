function href_index_update() {
    window.location.href = "/processor/" + $('#proc_id').val() + "/";
}

function add_user_config(config) {
    if (config != '') {
        var temp = config.split('\n');
        var count = temp.length;
        if (count > 1) {
            for (var i = 0; i <= (count - 2); i++) {
                add_template();
            }
        }

        for (var j = 0; j < count; j++) {
            var config_str = temp[j]
            var config_str_ = config_str.split('=');
            var config_str_left = config_str_[0];
            var config_str_right = temp[j].substring(config_str_left.length + 1);

            var config_right_split = config_str_right.split('\1100')
            var config_state = ""
            if (config_right_split.length >= 2) {
                config_state = config_right_split[1];
                config_str_right = config_right_split[0];
            }

            $("#paramDiv div:eq(" + j + ")").find("input[type='text']").each(function (m) {
                if (m == 0) {
                    $(this).val(config_str_left);
                }
                if (m == 1) {
                    $(this).val(config_str_right);
                }
                if (m == 2) {
                    $(this).val(config_state);
                }
            });
        }
    }
}

function add_input_config(config) {
    if (config != '') {
        var temp = config.split('\n');
        var count = temp.length;
        if (count > 1) {
            for (var i = 0; i <= (count - 2); i++) {
                add_input_template();
            }
        }

        for (var j = 0; j < count; j++) {
            var config_str = temp[j]
            var config_str_ = config_str.split('=');
            var config_str_left = config_str_[0];
            var config_str_right = temp[j].substring(config_str_left.length + 1);

            var config_right_split = config_str_right.split('\1100')
            var config_state = ""
            if (config_right_split.length >= 2) {
                config_state = config_right_split[1];
                config_str_right = config_right_split[0];
            }
            $("input[name='input_params_key']").eq(j).val(config_str_left);
            $("select[name='input_params_val']").eq(j).find("option[value='" + config_str_right + "']").attr("selected",true);
            $("input[name='input_params_desc']").eq(j).val(config_state);
        }
    }
}

function add_output_config(config) {
    if (config != '') {
        var temp = config.split('\n');
        var count = temp.length;
        if (count > 1) {
            for (var i = 0; i <= (count - 2); i++) {
                add_output_template();
            }
        }

        for (var j = 0; j < count; j++) {
            var config_str = temp[j]
            var config_str_ = config_str.split('=');
            var config_str_left = config_str_[0];
            var config_str_right = temp[j].substring(config_str_left.length + 1);

            var config_right_split = config_str_right.split('\1100')
            var config_state = ""
            if (config_right_split.length >= 2) {
                config_state = config_right_split[1];
                config_str_right = config_right_split[0];
            }
            $("input[name='output_params_key']").eq(j).val(config_str_left);
            $("select[name='output_params_val']").eq(j).find("option[value='" + config_str_right + "']").attr("selected",true);
            $("input[name='output_params_desc']").eq(j).val(config_state);
        }
    }
}

$(function () {
    $("#id_principal").val($("#principal").val());

    var type = $("#type").val();
    if (type == 3) {
        $("#odps_sql").show();
    }

    add_user_config($("#config_str").val());
    add_input_config($("#input_config_str").val());
    add_output_config($("#output_config_str").val());

    $("#update_processor_project_id").combotree('setValue', {
        id: $('.modal_iframe', window.parent.document).attr("project_id")
    });
});
