<template>
    <div class="post-images">
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" v-model="description" placeholder="Required 5-300 characters."></textarea>
        </div>
        <div class="form-group">
            <label>Cover</label>
            <div class="form-control">
                <img :src="coverUrl ? coverUrl : './../src/assets/img/cover_images.jpg'" class="cover-img mr10">
                <input type="file" class="btn-file" id="changeCover" accept="image/png,image/jpeg,image/gif,image/jpg"/>
                <a class="btn-upload ">Change</a>
            </div>
        </div>
        <div class="form-group">
            <label>Images</label>
            <div class="form-control">
                <span class="mr10">Required 4-50 pictures.</span>
                <input type="file" class="btn-file" @change="changeImages" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
                <a class="btn-upload ">Upload</a>
                <div class="show-images" v-if="imagesUrl!=''">
                    <div class="img" v-for="(item,index) in imagesUrl">
                        <img :src="item" >
                        <a title="Removing image" @click="delImg(index)">x</a>
                    </div>    
                </div>    
            </div>
        </div>

        <div class="form-group">
          <label>Tags</label>
          <input type="text" class="form-control input-tag" id="tags" placeholder="Enter separated tages">
          <p class="tags">Featured Tags  <span v-for="tag in fdTags" @click="addTage(tag)">{{tag}}</span></p>
        </div>
        <div class="btn-group">
            <a href="javascript:;"class="btn btn-l btn-green" @click="editPost">Post</a>
        </div>
        <Loading :loading="isLoading"/>
    </div>
</template>

<script>
    import Loading from './../components/Loading'
    export default{	
        props:['fdTags'], 	
        data(){
            return{
                type:'images',
                description:'',
                coverUrl:'',
                imagesUrl:[],
                tags:[],
                articleData:[],
                //id:this.$route.params.id,
                form_data: new FormData(),
                count:0,
                isLoading:false
            }
        },
        components:{
            Loading
        },
        mounted: function() {
            this.$nextTick(function() {
                this.postType();
                $('.input-tag').tagsInput();
                if(typeof this.id !== "undefined"){
                    this.getContentList();
                    $('#selectType').attr('disabled','disabled');
                }
                this.changeCover();
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
            changeCover(){
            	var _this = this
            	$("#changeCover").change(function(){
                	var formData = new FormData();
                	var file = this.files[0];
                	formData.append("file",file);
                	formData.append('token',_this.$store.state.token);
                	formData.append('nickname',_this.$store.state.nickname);

                	_this.$http.post('/web/upload',formData)
                    .then(function (response) {
                    	console.log(response);
                    	var code = response.code
                        if(code > 0){
                        	if(code == 2016){
                        		alert('You need login')
                        		_this.$store.commit('logout')
                        	}else{
                        		alert('failed')
                        	}
                        	return
                        }else{
                        	_this.coverUrl=response.data.img_url;
                       	}
                    }).catch(function (error) {
                        console.log(error);
                    });
            	})
            	
            },
            changeImages(e){
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.fil = inputDOM.files;
                for (var i = 0; i < this.fil.length; i++) {
                    let size = Math.floor(this.fil[i].size / 1024);
                    if (size > 2*1024*1024) {
                        alert('File size is too large!');
                        return false
                    } 
                    this.imagesUrl.push(this.getObjectURL(this.fil[i]));
                    this.form_data.append('file'+i,this.fil[i]);
                    this.count ++;
                } 
            },
            getObjectURL(file) {
                var url = null ;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
            delImg(index){
                this.imagesUrl.splice(index, 1);
                this.form_data.delete("file"+index);
                this.count --;
            },      
            editPost(){
                let _this = this;
                let desLen=this.description.length;
                if(desLen<5 || desLen>300){
                    alert('Description: 5-300 characters.');
                    return;
                }

                if(this.coverUrl==''){
        			alert('cover is require!');
        			return;
        		}

                if(this.count < 4){
                    alert('Please upload 4 or more pictures.');
                    return;
                }

                let tags=$('.input-tag').val();
                if(tags==''){
                    alert('Please write tags!');
                    return false;
                }else{
                    this.tags=$('.input-tag').val().split(",");
                }

                this.isLoading=true;
                this.form_data.append('des',this.description);
                this.form_data.append('cover',this.coverUrl);
                this.form_data.append('tags',this.tags);
                this.form_data.append('token',this.$store.state.token);
                this.form_data.append('nickname',this.$store.state.nickname);
                this.$http.post('/web/imageCreate',this.form_data)
                .then(response=>{
                	console.log(response);
                    this.isLoading=false;
                	var code = response.code
                    if(code > 0){
                    	if(code == 2016){
                    		alert('You need login')
                    		this.$store.commit('logout')
                    	}else{
                    		alert('failed')
                    	}
                    	return
                    }else{
                    	alert('succeeded')
                    	this.$router.push('/')
                   	}
                }).catch(error=>{
                    console.log(error);
                });
                
            },
        }
    }
</script>
