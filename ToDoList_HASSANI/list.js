
$(document).ready(calcul_Nb_Task());
/// Restaurer les donnees stockées ------------------------------------------------

 var table = JSON.parse(localStorage.getItem("IdTasks"));
 if(table != null)
 {
for(var i=0;i<table.length;i++)
{
    var idTask=table[i];
    var data=JSON.parse(localStorage.getItem(idTask));
    if(data.statut=="new") add(data.text,idTask); 
    if(data.statut=="check") 
    {
        add(data.text,idTask); 
        $("."+idTask).toggleClass("check");
         
    }
   
}
}


/// Time -----------------------------------------------------------------


    setInterval(() => {
        let d = new Date;
        let date = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        let time=d.toLocaleTimeString('en-IN',{hour12:true});

        let dateTime=$('#time');
        dateTime.html(`${date}<br>${time}`);
    }, 1000);




/// Suppression tout ------------------------------------------------------
function  supp_tout(){
    
        $("#listing ul").each(function () {
            $(this).parent().parent().find($('li').fadeOut(500));
        })
    localStorage.clear();
    calcul_Nb_Task();
    test_afficher();
    }

/// Cocher tout ------------------------------------------------------------------
function all_done()
{
    
        $("#listing ul ").each(function () {
            $(this).parent().find($('li').removeClass("check"));
          $(this).parent().find($('li').toggleClass("check"));  
        });

var table = JSON.parse(localStorage.getItem("IdTasks"));
 if(table != null)
 {
for(var i=0;i<table.length;i++)
{
    var idTask=table[i];
    var data=JSON.parse(localStorage.getItem(idTask));
   var  task={ text:data.text ,statut :"check" }
            localStorage.setItem(idTask,JSON.stringify(task));
   
}
}
    
}

/// Barre d'outils ------------------------------------------------------------------

function afficher_bar()
{
     
$("#bar").html("<button onclick='supp_tout()' class='outil' style='float:right;'> <i class='fa fa-trash' style='padding: 5px;color:red; font-size: 13px;'></i><span class='bar_style'>Delete all</span></button>"+
"<button  onclick='all_done()' class='outil' style='float:left;'> <i class='bi bi-check-all' style='padding: 0; color:green; font-size: 17px; '> </i> <span class='bar_style'> Check all </span> </button>   <br>") ;
}
function test_afficher()
{
var t = JSON.parse(localStorage.getItem("IdTasks"));
if(t == null ) $("#bar").html("");
else { 
     if(t.length != 0) afficher_bar();
     else {$("#bar").html("");}   
     }
}

/// Calcul Nbr Tasks -----------------------------------------------------------------
   function calcul_Nb_Task()
   {
        var a = JSON.parse(localStorage.getItem("IdTasks"));
        if (a == null) {
            $("#nbrTask").html("<br><b> You Have No Task For Today !!! </b> <br><br>");
        } else if (a == 0) {
            $("#nbrTask").html("<br><b>You Have No Task For Today !!!</b> <br><br>");
        }
        else {
            $("#nbrTask").html("Task You Have : <b>" + a.length + "</b> For Today!!! <br><br>");
        }

    }

/// Fonction ajouter ------------------------------------------
 function add(todoText,id)
 {
   
    var item;
    item="<li class="+id+" data-liLenght="+id+"><span align='right'> <i class='fa fa-check' style='color:green;' data-lenght=' "+ id +"' data-text='"+todoText+"' onclick='checkTask(this)'></i>" 
    + todoText + " <i class='far fa-edit' style='color:#5C7AEA;float:right;' data-text ='"+todoText+
    "' data-lenght='"+id+"' onclick='editList(this)'> </i>  <i class='fas fa-trash-alt' style='color:#FF5C58;float:right;' data-lenght='"
    +id+"' onclick='removeList(this)'></i> </span></li>";

   
    $("#listing ul").append(item);
    calcul_Nb_Task();
    test_afficher();

 }


/// Ajout task ---------------------------------------------------------------------

$("#add_btn").click(function(){

 var todoText   = $("#toDoList").val();
 
 if (todoText == "") 
  {
    $("#err").html("Enter Something!!!");
    $("#err").css("display", "inline").fadeOut(1500);  
  }
if($("#toDoList").val() !== "" && $('#toDoListNo').val() == "") 
{
  var listLenght = $('#listing ul li').length+1;
  const d = new Date();
  var  id=listLenght+d.getTime();


var a=JSON.parse(localStorage.getItem("IdTasks"));
if(a==null)
{
    var state=[];
    state.push(id);
    localStorage.setItem("IdTasks",JSON.stringify(state));
}else {

 var table = JSON.parse(localStorage.getItem("IdTasks"));
  table.push(id);
localStorage.setItem("IdTasks",JSON.stringify(table));
}

var task;
 task={text:todoText ,statut :"new"}
localStorage.setItem(id,JSON.stringify(task));

 add(todoText,id);
 

}else{
  editToDoList(todoText,$('#toDoListNo').val());
 
}

/// Vider les champs
$(this).val("");
$('#toDoListNo').val("");
});



$("#toDoList").keypress(function(e) 
{     
if(e.which === 13) {
  $("#add_btn").click();
}
});
/// Chek ------------------------------------------------------
function checkTask(e) 
{
    $("#listing ul ").each(function () {
$(e).parent().parent().toggleClass("check");
  
 
});
 var id=Number(($(e).attr('data-lenght')));
var text=$(e).attr('data-text');

var  task={ text:text ,statut :"check" }
localStorage.setItem(id,JSON.stringify(task));
}

/// Supprimer task -------------------------------------------------------------------
    
    function removeList(e) 
    {
        let dataLenght = $(e).attr('data-lenght');
    
        $("#listing ul li i.fa-trash-alt").each(function () {
            let CheckLenght = $(this).attr('data-lenght');
            if(dataLenght==CheckLenght){
    
                $(e).parent().parent().fadeOut(500);
                //suppression de local storage
                localStorage.removeItem(dataLenght);
        // Suppression du tablau des IDs
        var table = JSON.parse(localStorage.getItem("IdTasks"));
         if(table != null)
          {
           var removeItem =dataLenght ;
            table= jQuery.grep(table, function(value) {
            return value != removeItem;
         } 
         );
    localStorage.setItem("IdTasks",JSON.stringify(table));
         } 
    
            }
    
        });
test_afficher(); 
 calcul_Nb_Task(); 
 
    }
    
/// Edit task -------------------------------------------------------------------------------  
    function editList(e) {
    
        let dataLenght = $(e).attr('data-lenght');
    
        let dataText = $(e).attr('data-text');
        $('#toDoList').val(dataText);
        $('#toDoListNo').val(dataLenght);
    }
    function editToDoList(todoText,toDoListNo){
    
        $("#listing ul li").each(function () {
            let id = $(this).attr('data-liLenght');
            if(toDoListNo==id)
            {
            $("#listing ul").parent().parent().find($('.'+toDoListNo+'').
                html("<span><i class='fa fa-check' style='color:green;' data-lenght=' "
                    + id +"' data-text='"+todoText+"' onclick='checkTask(this)'></i>" 
                    +todoText+"  <span align='right'>"+
                    " <i class='far fa-edit' style='color:#5C7AEA;float:right;' data-text = '"+
                    todoText+"' data-lenght="+toDoListNo+" onclick='editList(this)'> "+
                    "</i> <i class='fas fa-trash-alt' style='color:#FF5C58;float:right;' data-lenght="
                    +toDoListNo+" onclick='removeList(this)'> </i> </span>")); 

          var data=JSON.parse(localStorage.getItem(id));
           var  task={text:todoText ,statut :data.statut}
            localStorage.setItem(id,JSON.stringify(task));
            }
        });
}



/// Changer ordre des taches -----------------------------------------------
$( function() {
    $(".to_do").sortable();
  } );






 