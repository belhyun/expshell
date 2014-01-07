$(document).ready(function(){
  Object.prototype.add_command = function(command){
    if(!('localStorage' in window) || window['localStorage'] == null){
      return false;
    }
    if(localStorage['data'] == "undefined"){
      localStorage.setItem('data',JSON.stringify([]));
    }
    var cur_data = JSON.parse(localStorage.getItem('data'));
    cur_data.push(command);
    localStorage.setItem('data',JSON.stringify(cur_data));
    return cur_data;
  }
  Object.prototype.get_commands = function(){
    if(localStorage['data'] == "undefined"){
      return 'user commands not exists';
    }else{
      return JSON.parse(localStorage.getItem('data'));
    }
  }
  $("#nav-top .container a img.search").click(function(e){
    e.preventDefault();
    var command = _.escape($("#nav-top .container input").val());
    if(_.isEmpty(command)){
      alert('Please Insert Command');
      return;
    }
    $("body #expshell iframe").attr("src","http://explainshell.com/explain?cmd="+command);
    this.add_command(command);
    var commands = this.get_commands(), result ='';
    $((Mustache.render('<li>{{.}}</li>',command))).insertBefore("#my-commands ul li:first-child");
  });

  $("input").keypress(function(e){
    if(e.which == 13){
      $("#nav-top .container a img.search").trigger('click');   
    }
  });
  (function(){
    var commands = this.get_commands(), result ='';
    for(var i=0; i<commands.length;i++){
      result += Mustache.render('<li>{{.}}</li>',commands[commands.length-i]);
    }
    $("#my-commands ul").append(result);
  }());
});
