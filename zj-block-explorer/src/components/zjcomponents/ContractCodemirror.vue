<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Codemirror from 'codemirror-editor-vue3';

// @types/codemirror
import type { Doc, Editor, EditorChange, EditorConfiguration } from 'codemirror';

// language
import 'codemirror/mode/javascript/javascript.js';
/*
const defaultCode ='// This is a Demo\n' +
    'pragma solidity ^0.7.5;\n' +
    'contract Storage {\n' +
    '    uint256 public storedData;\n' +
    '    function set(uint256 data) public {\n' +
    '        storedData = data;\n' +
    '    }\n' +
    '    function get() public returns (uint256) {\n' +
    '        return storedData;\n' +
    '    }\n' +
    '}\n';*/
export default defineComponent({
    name:'ContractCodemirror',
    props:{
        code:{
            type:String,
            default: '',
        },
    },
    components: {
        Codemirror,
    },
    setup(props) {
        const codeText = computed(() => props.code.toString());
        const cminstance = ref<Editor>();
        const cmOptions: EditorConfiguration = {
            mode: 'javascript',
            lineWrapping: true,
        };

        return {
            cmOptions,
            codeText,
            onReady(cm: Editor) {
                cminstance.value = cm;
            },
            onChange(value: string, cm: Editor) {
                console.log(value.length, cm.historySize());
            },
            onFocus(cm: Editor, event: FocusEvent) {
                console.log('onFocus', cm, event);
                cm.getDoc().on('beforeChange', (instance: Doc, obj: EditorChange) => {
                    console.log('beforeChange', instance.historySize(), obj);
                });
            },
        };
    },
});
</script>

<template>
<div class="row">
    <Codemirror
        v-model:value='codeText'
        :options="cmOptions"
        class="col"
        border
        height="400"
        @change="onChange"
        @ready="onReady"
        @focus="onFocus"
    />
</div>
</template>
