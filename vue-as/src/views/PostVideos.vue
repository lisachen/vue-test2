<template>
    <div class="post-videos">
        <div class="form-group form-group-upload-vadio">
            <label> </label>
            <div class="form-control">
                <label class="label-radio mr20" @click="category=0"><input type="radio" name="cate" checked>Share from YouTube</label>
                <label class="label-radio" @click="category=1"><input type="radio" name="cate">Upload Video</label>
                <div v-show="category==0">
                    <input type="text" v-model="YouTubeUrl" placeholder="Enter YouTube URL">
                </div>
                <div  v-show="category==1">
                    <a class="btn-upload " id="browse">Select Video</a><span>{{ videoUrl }}</span>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Cover</label>
            <div class="form-control">
                <img :src="coverUrl ? coverUrl : './../src/assets/img/cover_video.jpg'" class="cover-img mr10">
                <input type="file" class="btn-file" id="changeCover"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
                <a class="btn-upload ">Change</a>
            </div>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="title" maxlength="120" minlength="5" placeholder="Required. 5-120 characters.">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="description" placeholder="Optional. 5-200 characters."></textarea>
        </div>
        <div class="form-group">
            <label>Tags</label>
            <input type="text" class="form-control input-tag" name="tags" id="tags" placeholder="Enter separated tages">
            <p class="tags">Featured Tags  <span v-for="tag in fdTags" @click="addTage(tag)">{{tag}}</span></p>
        </div>
        <div class="btn-group">
        <a href="javascript:;"><div class="btn btn-l btn-green" id="post-submit">Post</div></a></div>
        <Loading :loading="isLoading"/>
    </div>
</template>

<script>
    import Loading from './../components/Loading'
    export default{
        props:['fdTags'],
        data(){
            return{
                type:'videos',
                category:'0',
                YouTubeUrl:'',
                videoUrl:'no mo than 100m',
                coverUrl:'',
                title:'',
                description:'',
                featruredTags:['mange','review','light novel'] ,
                tags:[],
                isLoading:false
            }
        },
        components:{
            Loading
        },
        mounted: function() {	
        	//视频上传
        	var _this = this;
        	var url = baseUrl+'/web/uploadVideo';
        	var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
        		browse_button : 'browse',
        		url : url,
        		chunk_size: 5*1024*1024,
        		multi_selection: false,
        		filters: { 
        	        max_file_size: '100mb', 
        	        mime_types: [
        	            {title: "files", extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"} 
        	        ] 
        	    }, 
        		headers : {
        			'version': '2.1.0',
        			'platform': 'IOS',
        			'auth': 'f5dacee17a9715dddd3f6c946b0b1031'
        		}

        	});
        	uploader.init(); //初始化

        	//绑定文件添加进队列事件
        	uploader.bind('FilesAdded',function(uploader,files){
        		//更换视频时  只上传最后一个
        		if(uploader.files.length>1){
        			uploader.files.splice(0,1)
        		}
        		_this.videoUrl = files[0].name;
        	});
        	//点提交按钮才上传
        	$(document).on('click', '#post-submit',function(){
        		//标题不能为空
                let tLen=_this.title.length;
                if(tLen<5 || tLen>120){
                    alert('Title: 5-120 characters.');
                    return;
                }

        		//封面不能为空
        		if(_this.coverUrl==''){
        			alert('Please upload a cover.');
        			return;
        		}
        		//tag不能为空
        		let tags=$('.input-tag').val();
                if(tags==''){
                    alert('Please write tags!');
                    return false;
                }else{
                    _this.tags=$('.input-tag').val().split(",");
                }

        		_this.isLoading=true;
        		if(_this.category == 1){
        			//上传视频
        			if(_this.videoUrl=='no mo than 100m'){
            			alert('Please upload a video.');
            			return;
            		}
        			var res = false;
            		var objThis = this; 
            		uploader.bind('FileUploaded', function(uploader,file,responseObject) {
            			res = JSON.parse(responseObject.response);
            			console.log(res);
            			if(res && res.original_url){
            				var videoUrl=res.original_url;
                            _this.$http.post('/web/videoCreate',{
                            	v_type:1,
                            	videoUrl:videoUrl,
                            	title: _this.title,
                                cover:_this.coverUrl,
                                tags:_this.tags,
                                des: _this.description,
                                nickname: _this.$store.state.nickname,
                                token: _this.$store.state.token
                            }).then(function (response) {
                            	var code = response.code;
                                _this.isLoading=false;
                                if(code > 0){
                                	if(code == 2016){
                                		alert('You need login')
                                		_this.$store.commit('logout')
                                	}else{
                                		alert('failed')
                                	}
                                	return
                                }else{
                                	alert('succeeded')
                                	_this.$router.push('/')
                               	}
                            	
                            }).catch(function (error) {
                                console.log(error);
                            });
            			}else{
            				uploader.files.splice(0,1);
            				alert('upload video failed');
            				_this.videoUrl='mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv, no mo than 100m';
            				return;
            			}
            			
            		});
            		uploader.start();
        		}else{
        			//youtube
        			if(_this.YouTubeUrl==''){
            			alert('Please Enter YouTube URL.');
            			return;
            		}
        			_this.$http.post('/web/videoCreate',{
                    	v_type:2,
                    	videoUrl:_this.YouTubeUrl,
                    	title: _this.title,
                        cover:_this.coverUrl,
                        tags:_this.tags,
                        des: _this.description,
                        nickname: _this.$store.state.nickname,
                        token: _this.$store.state.token
                    }).then(function (response) {
                    	var code = response.code
                    	_this.isLoading=false;
                        if(code > 0){
                        	if(code == 2016){
                        		alert('You need login')
                        		_this.$store.commit('logout')
                        	}else{
                        		alert('failed')
                        	}
                        	return
                        }else{
                        	alert('succeeded')
                        	_this.$router.push('/')
                       	}
                    	
                    }).catch(function (error) {
                        console.log(error);
                    });
        		}

        		
        	});
            this.$nextTick(function() {
                this.postType();
                $('.input-tag').tagsInput();
                this.changeCover()
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
        }
    }
</script>
