<template>
    <div class="post-videos">
        <div class="form-group form-group-upload-vadio">
            <label> </label>
            <div class="form-control">
                <label class="label-radio mr20" @click="category=0"><input type="radio" name="cate" checked>Share from YouTube</label>
                <label class="label-radio" @click="category=1"><input type="radio" name="cate">Upload Video</label>
                <div v-if="category==0">
                    <input type="text" v-model="YouTubeUrl" placeholder="Enter YouTube URL">
                </div>
                <div  v-if="category==1">
                    <input type="file" class="btn-file"  accept="iaudio/mpeg,video/mpeg,audio/mpeg,audio/mp4,video/mpeg,video/mpeg"/>
                    <a class="btn-upload ">Select Video</a>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Cover</label>
            <div class="form-control">
                <img :src="coverUrl" class="cover-img mr10">
                <input type="file" class="btn-file" @change="changeCover"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
                <a class="btn-upload ">Change</a>
            </div>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="title" maxlength="120" minlength="5" placeholder="Required 5-120 characters.">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="description" placeholder="Required 5-300 characters."></textarea>
        </div>
        <div class="form-group">
            <label>Tages</label>
            <input type="text" class="form-control input-tag" name="tags" id="tags" placeholder="Enter separated tages">
            <p class="tags">Featured Tags  <span v-for="tag in featruredTags" @click="addTage(tag)">{{tag}}</span></p>
        </div>
        <div class="btn-group"><button class="btn btn-l btn-org mr20">Close</button><div class="btn btn-l btn-green" @click="editPost">Post</div></div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                type:'videos',
                category:'0',
                YouTubeUrl:'',
                videoUrl:'',
                coverUrl:'http://placehold.it/100x100',
                title:'',
                description:'',
                featruredTags:['mange','review','light novel'] ,
                tags:[]
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.postType();
                $('.input-tag').tagsInput();
            })
        },
        methods: { 
            postType: function(){
                this.$emit('v-type',this.type);
            },
            addTage(tag){
                if ($('.input-tag').tagExist(tag)) {  
                    alert('tag已存在！');
                }else{
                   $('.input-tag').addTag(tag); 
                }    
            },
            changeCover(){
                this.$http.post('http://local.api.animesama.com:888/web/upload').then(response=>{
                    console.log(response);
                    this.coverUrl=response.data[0];
                }).catch(error=> {
                    console.log(error);
                });
            },
            editPost(){
                let tags=$('.input-tag').val();
                if(typeof tags!=='undefined'){
                    this.tags=$('.input-tag').val().split(",");
                }
                console.log('type:'+this.type);
                console.log('category:'+this.category);
                if(this.category==0){
                    console.log('YouTubeUrl:'+this.YouTubeUrl);
                }else{
                    console.log('videoUrl:'+this.videoUrl);
                }
                console.log('coverUrl:'+this.coverUrl);
                console.log('title:'+this.title);
                console.log('description:'+this.description);
                console.log('tags:'+this.tags);
            }
        }
    }
</script>
