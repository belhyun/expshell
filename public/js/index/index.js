(function($_){
  $_.serial_id = Math.random().toString(36).substring(7);
  $_.host = "http://explainshell.eventstore.co.kr";
  Object.prototype.add_command = function(command){
    if(!('localStorage' in window) || window['localStorage'] == null){
      return false;
    }
    if(_.isEmpty(localStorage['data'])){
      localStorage.setItem('data',JSON.stringify([]));
    }
    var cur_data = JSON.parse(localStorage.getItem('data'));
    cur_data.push(command);
    localStorage.setItem('data',JSON.stringify(cur_data));
    return cur_data;
  };
  Object.prototype.get_commands = function(){
    if(_.isEmpty(localStorage['data'])){
      return false;
    }else{
      return JSON.parse(localStorage.getItem('data'));
    }
  };
  $(document).ready(function(){
    var request = function(args){
      var queryStr = '?', hasOwnProperty = Object.prototype.hasOwnProperty;
      for (ele in args["data"]){
        if(!_.isFunction(ele) && args["data"].hasOwnProperty(ele)){
          queryStr += ele+"="+args["data"][ele]+"&";
        }
      }
      location.replace(args["url"]+queryStr);
    };

    $("#nav-top .container a img.search").click(function(e){
      e.preventDefault();
      var command = encodeURI($("#nav-top .container input").val());
      if(_.isEmpty(command)){
        alert('Please Insert Command');
        return;
      }
      $("body #expshell iframe").attr("src","http://explainshell.com/explain?cmd="+command);
      this.add_command($("#nav-top .container input").val());
      var commands = this.get_commands(), result ='';
      if($("#my-commands ul li").length == 0){
        $("#my-commands ul").append($((Mustache.render('<li>{{.}}</li>',decodeURIComponent(command)))));
      }
      else{
        $((Mustache.render('<li>{{.}}</li>',decodeURIComponent(command)))).insertBefore("#my-commands ul li:first-child");
      }
    });

    $("input:not([type='button'])").keypress(function(e){
      if(e.which == 13){
        $("#nav-top .container a img.search").trigger('click');   
      }
    });

    $("body input#save-commands").click(function(e){
      e.preventDefault();
      var commands = Array.prototype.slice.call(this.get_commands(),0), args = {};
      args.method = "POST";args.url=$_.host+"/command/insert";
      args.data={
        commands: encodeURI(commands.join("\n")),
        serial_id: $_.serial_id 
      };
      request.call(this,args);
    });

    $("<span id='serial-id'>"+$_.serial_id+"</span>").insertAfter("#save-commands");
    (function(){
      var commands = this.get_commands(), result ='';
      if(!commands) return false;
      for(var i=1; i<=commands.length;i++){
        result += Mustache.render('<li>{{.}}</li>',decodeURIComponent(commands[commands.length-i]));
      }
      $("#my-commands ul").append(result);
    }());
  });
}).call(this, window);
