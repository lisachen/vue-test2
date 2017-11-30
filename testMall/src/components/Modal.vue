<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="mdClose">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="massage"></slot>
                    </div>
                    <slot name="btnGroup"></slot>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="mdClose"></div>
    </div>
</template>
<script>
    export default {
        props:['mdShow'],
        data() {
            return {
                //modalFlag:false
            }
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        },
        methods: {
            mdClose(){
                this.$emit('close');
            }
        }
    }
</script>
