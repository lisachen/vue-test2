<!--
<template>
    <div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
        <p>子组件：{{num}}</p>
    </div>
</template>

<script>
    export default{
        props:['num'],//父组件的数据需要通过 prop 才能下发到子组件中
        data(){
            return{
                
            }
        },
        methods:{
            decrement(){
              this.num--;
            },
            increment(){
              this.num++;
            }
        }
    }
</script>
-->

<template>
    <div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
        <p>子组件：{{num}}</p>
    </div>
</template>

<script>
    export default{
        props:['num'],//父组件的数据需要通过 prop 才能下发到子组件中
        data(){
            return{
                //num:0,
                msg:'hello vue'
            }
        },
        methods:{
            decrement(){
              this.$emit('dec');//子组件往父组件里传数据通过`emit()`触发，通过emit来触发父组件的方法，相当于jquery里的trigger， 复杂项目用Vuex
            },
            increment(){
              this.$emit('incre');
            }
        }
    }
</script>
