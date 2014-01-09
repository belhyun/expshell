$(document).ready(function(){
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
  }
  Object.prototype.get_commands = function(){
    if(_.isEmpty(localStorage['data'])){
      return false;
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
    if($("#my-commands ul li").length == 0){
      $("#my-commands ul").append($((Mustache.render('<li>{{.}}</li>',command))));
    }
    else{
      $((Mustache.render('<li>{{.}}</li>',command))).insertBefore("#my-commands ul li:first-child");
    }
  });

  $("input").keypress(function(e){
    if(e.which == 13){
      $("#nav-top .container a img.search").trigger('click');   
    }
  });
  (function(){
    var commands = this.get_commands(), result ='';
    if(!commands) return false;
    for(var i=1; i<=commands.length;i++){
      result += Mustache.render('<li>{{.}}</li>',commands[commands.length-i].substring(0,40));
    }
    $("#my-commands ul").append(result);
  }());
});
