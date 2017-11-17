<template>
    <div class="post-article">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Category</label>
          <label class="label-radio mr20" @click="category=3"><input type="radio" name="cate" checked>Blog</label>
          <label class="label-radio" @click="category=1"><input type="radio" name="cate">Drawing</label>
        </div>
        <div class="form-group form-group-editor">
            <p><iframe id="editor"></iframe></p>
            <input type="file" id="upload_img" class="btn-file"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <a  class="btn-upload">Upload Local Img</a>
        </div>
        <div class="form-group">
          <label>Tages</label>
          <input type="text" class="form-control input-tag" name="tags" id="tags" placeholder="Enter separated tages" v-model="tags" >
          <p class="tags">Featured Tags  <span v-for="tag in fdTags" @click="addTage(tag)">{{tag}}</span></p>
        </div>
        <div class="btn-group"><a href="javascript:;" class="btn btn-l btn-org mr20">Close</a>
        <a v-if="typeof id == 'undefined'" href="javascript:;"class="btn btn-l btn-green" @click="editPost">Post</a>
        <a v-else href="javascript:;" class="btn btn-l btn-green" @click="saveEdit">Save</a>
        </div>
    </div>
    
</template>

<script>
    import {mapState} from 'vuex'
    export default{
        props:['fdTags'],
        data(){
            return{
                type:'article',
                title:'',
                content:'',
                category:'3',
                tags:[],
                articleData:[],
                id:this.$route.params.id
            }
        },
         mounted: function() {
            this.$nextTick(()=> {
                this.postType();
                this.editorContent();
                $('.input-tag').tagsInput();
                if(typeof this.id !== "undefined"){
                    this.getContentList();
                    $('#selectType').attr('disabled','disabled');
                }
            })
        },
        methods: { 
            postType: function(){
                this.$emit('v-type',this.type);
            },
            addTage(tag){
                if ($('.input-tag').tagExist(tag)) {  
                	alert('Exist!');
                }else{
                   $('.input-tag').addTag(tag); 
                } 
            },
            editPost(){
                var tags=$('.input-tag').val();
                var _this = this;

                if(typeof tags!=='undefined'){
                    this.tags=$('.input-tag').val().split(",");
                }else{
                	this.tags=[]
                }
                this.content=$('#editor').contents().find('body').html();

                this.$http.post('http://local.api.animesama.com:888/web/feedCreate', {
                    title: this.title,
                    content:this.content,
                    tags:this.tags,
                    category: this.category,
                    nickname: this.$store.state.nickname,
                    token: this.$store.state.token
                })
                .then(function (response) {
                    console.log(response);
                    var code = response.code
                    if(code > 0){
                    	alert(response.message)
                    	if(code == 2016){
                    		_this.$store.commit('logout')
                    	}
                    	return
                    }else{
                    	alert('success')
                    	_this.$router.push('/')
                   	}
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            editorContent(){	
            	var _this = this
                var $d;
                $d = $("#editor")[0].contentWindow.document; // IE、FF都兼容
                //$d.body.scrollTop( $d.body[0].scrollHeight );
                $d.designMode = "on";
                $d.contentEditable = true;
                $d.open();
                $d.close();

                $("#upload_img").change(function () {
                	var formData = new FormData();
                	var file = this.files[0];
                	console.log(file);
                	formData.append("file",file);

                    _this.$http.post('http://local.api.animesama.com:888/web/upload',formData)
                    .then(function (response) {
                    	$("body", $d).append("<img src='"+response.data.img_url+"' style='max-width:200px'>");
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
            },
            getContentList(){
              this.$http.get('http://local.api.animesama.com:888/web/feedDetail/'+this.id).then(res=>{
                this.articleData=res.data;
                this.title=this.articleData.title;
                let $d = $("#editor")[0].contentWindow.document;
                let content=this.articleData.content_text.replace(/<img src=/g, "<img style='max-width:200px' src=");
                $("body", $d).append(content);
                this.articleData.tags.forEach((item, index)=>{
                    this.tags.push(item.name);
                })
                $('.input-tag').importTags(this.tags.toString());

              })
            },
            saveEdit(){
                
            }
        }
    }
    
</script>
