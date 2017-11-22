<template>
    <div>
      <div class="modal modal-login" v-show="block">
      <div>
        <fieldset>
          <legend>Log In</legend>
          <div class="form-group">
            <label>Email</label>
            <input name="email" id="email" type="email" class="form-control" v-model="loginform.name">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input name="password" id="password" type="password" class="form-control" placeholder="6-16 characters" v-model="loginform.password">
          </div>
          <div class="btn-group">
            <button class="btn btn-l btn-green" id="login-sub" @click="clickLogin">Login</button>
            <a href="javascript:;" class="forgot-pwd" id="forgot">Forgot Password?</a>
          </div>
          <div>
            <a href="javascript:;" class="btn-fb" @click="loginFackbook" style="display:inline-block"><img style="width:173px;" src="../assets/img/facebook_login.png" alt="FB"></a>
            <a href="javascript:;" class="btn-fb" @click="loginTwitter" style="display:inline-block"><img style="width:173px;height:36.56px;" alt="用Twitter登录" src="../assets/img/twitter.png"></a>
          </div>

          <div class="tips">
            <p>Tip: Registration is only available on Anime Sama App.</p>
          </div>
        </fieldset>
      </div>
      <a class="close" @click="close">&times;</a>
    </div>
    <div class="mask" v-show="block"></div>
    </div>
</template>

<script>
    import {hello} from '../../static/js/hello.js'
    export default {
        data(){
          return{
            loginform: {}  
          }
        },
        computed:{
          block(){
            return this.$store.state.loginBox
          }
        },
        methods:{
          close(){
            this.$store.commit('change')
          },
          clickLogin(){
              var _this = this
              this.$http.post('/web/login', {
                  email: this.loginform.name,
                  password: this.loginform.password
              }).then(function (response) {
                  var code = response.code
                  if(code > 0){
                	  alert('Wrong email or password');
                	  return;
                  }else{
                	//登录成功
                    _this.$store.commit('username', response.data.nickname)
                    _this.$store.commit('usertoken', response.data.token)
                    _this.$store.commit('change')
                  }
              }).catch(function (error) {
                  console.log(error);
              });
          },
          loginTwitter(){
        	  var _this = this
        	  var log = console.log;
        	  hello.init({
        		  'twitter' : 'hGiNlP9lsagz8VPpvlgf1Dtql'
       		  },{
       			  oauth_proxy: 'https://auth-server.herokuapp.com/proxy'
    	      });
        	  hello('twitter').login().then(function(){
        		  var twitter = hello('twitter');
        		  return twitter.api('/me')
        	  },log).then(function(e){
        		  console.log(e)
        		  if(e.id>0){
        			  _this.$http.post('/web/loginSocia', {
                          type: 2,
                          id: e.id
                      }).then(function (response) {
                    	  console.log(response);
                    	  var code = response.code
                          if(code > 0){
                        	  alert("This account doesn't exist. Please register in Anime Sama app.");
                        	  return;
                          }else{
                        	//登录成功
                            _this.$store.commit('username', response.data.nickname)
                            _this.$store.commit('usertoken', response.data.token)
                            _this.$store.commit('change')
                          }
                      }).catch(function (error) {
                          console.log(error);
                      });
        		  }
        	  },log)
          },
          loginFackbook(){
        	  var _this = this
        	  FB.login(function(response){
      	    	if (response.authResponse) {	
      			    FB.api('/me?fields=id,email', function(response) {
      			    	console.log(response)
      			    	if(response.id>0){
      			    		_this.$http.post('/web/loginSocia', {
      	                          type: 1,
      	                          id: response.id
      	                      }).then(function (response) {
      	                    	  var code = response.code
      	                          if(code > 0){
      	                        	  alert("This account doesn't exist. Please register in Anime Sama app.");
      	                        	  return;
      	                          }else{
      	                        	//登录成功
      	                            _this.$store.commit('username', response.data.nickname)
      	                            _this.$store.commit('usertoken', response.data.token)
      	                            _this.$store.commit('change')
      	                          }
      	                      }).catch(function (error) {
      	                          console.log(error);
      	                      });
      			    	}
      		     	});
      		    } else {
      		    	console.log('User cancelled login or did not fully authorize.');
      		    }
      	    }, {scope:'email'});
          }
        }
    }
    window.fbAsyncInit = function() {
        FB.init({
          appId      : "209155779448961",
          xfbml      : true,
          version    : 'v2.10'
        }); 
   };
   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
