// IIFE -- Immediately Invoked Function Expression
(function () {
  function Start() {
    console.log("App Started...");
    let deletebuttons = document.querySelectorAll(".btn-danger");
    for (button of deletebuttons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure")) {
          event.preventDefault();
          window.location.assign("/survey-list");
        }
      });
    }
  }
  window.addEventListener("load", Start);
})();


(function () {
 
  function sendinfo()
  {
    var name = document.getElementById("name").value;
    var email= document.getElementById("email").value;
    var subject= document.getElementById("subject").value;
    var comment = document.getElementById("comment").value;

    if(name =="")
    {
      alter("Please enter your Name!")
    }

    if(email=="")
   { alert("Please enter your Email!")}    

   if(subject=="")
   {
    alert("Please enter the Subject!")
   }
   if(comment=="")
   {
    alert("Please enter your Comment!")
   }
    else if(name !="" && email !="" && subject !="" && comment != "")
    
  
    {
      alert(" DEAR CUSTOMER THANK YOU FOR CONTACING US !");
    }

    else
    {
      alert();
    }
    
   
  }

  var send = document.getElementById("send");
     send.addEventListener("click", sendinfo, false);


})();


(function (){
  function saveAsPDF() {
    window.print();
  }
  var savePDF = document.getElementById("savePDF");
  savePDF.addEventListener("click", saveAsPDF, false);
})();


