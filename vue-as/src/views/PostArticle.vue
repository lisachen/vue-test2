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
          <input type="text" class="form-control" name="tags" id="tags"  placeholder="Enter separated tages">
          <p class="tags">Featured Tags  <span v-for="tag in featruredTags" @click="addTage(tag.name)">{{tag.name}}</span></p>
        </div>
        <div class="btn-group"><button class="btn btn-l btn-org mr20">Close</button><div class="btn btn-l btn-green" @click="editPost">Post</div></div>
    </div>

</template>

<script>
    export default{
        data(){
            return{
                type:'article',
                title:'',
                content:'',
                category:'3',
                featruredTags:this.getfeatruredTags() ,
                tags:[]
            }
        },
         mounted: function() {
            this.$nextTick(function() {
                this.postType();
                this.editorContent();
                $('#tags').tagsInput();
            })
        },
        methods: { 
        	getfeatruredTags: function(){
        		this.$http.get('http://local.api.animesama.com:888/tag/recommand').then(res=>{
                    this.featruredTags=res.data;
                })
        	},
            postType: function(){
                this.$emit('v-type',this.type);
            },
            addTage(tag){
                if ($('#tags').tagExist(tag)) {  
                    alert('tag已存在！');
                }else{
                   $('#tags').addTag(tag); 
                } 
            },
            editPost(){
                var tags=$('#tags').val();

                if(typeof tags!=='undefined'){
                    this.tags=$('#tags').val().split(",");
                }
                this.content=$('#editor').contents().find('body').html();

                console.log(this.type);
                console.log(this.title);
                console.log(this.content);
                console.log(this.tags);
                console.log(this.category);
                
                this.$http.post('/article', {
                    feed_type: this.type,
                    title: this.title,
                    content:this.content,
                    tags:this.tags
                })
                .then(function (response) {
                    console.log(response);
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

                $('#insert_img').click(function () {
                    var img = '<img src="' + $('#path').val() + '" />';
                    $("body", $d).append(img);
                });

                $("#upload_img").change(function () {
                	console.log(this.files);
                    _this.$http.post('http://local.api.animesama.com:888/web/upload', {

                    }).then(function (response) {
                    	console.log(response);
                    	$("body", $d).append("<img src='"+response.data[0]+"' style='max-width:200px'>");
                    }).catch(function (error) {
                        console.log(error);
                    });
                    /* var fil = this.files;
                    for (var i = 0; i < fil.length; i++) {
                        reads(fil[i]);
                    } */
                });

                /*
                function reads(fil){
                    var reader = new FileReader();
                    reader.readAsDataURL(fil);
                    reader.onload = function(){
                        $("body", $d).append("<img src='"+reader.result+"'>");
                    };
                }
                */

            }
        }
    }
    
</script>
