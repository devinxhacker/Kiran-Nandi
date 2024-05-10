function checkpass(){
    const dnka="150106";
    if(confirm("This page is under Development but you can view if you know the Admin Password! Do you want to continue?")){
        var s=prompt("Password: ");
        if (s){
            if(s == dnka){
                alert("Securely opened");
                window.location.href="dashboard.html";
            }
            else if(s!= dnka)
            {
                alert("Wrong password contact me.")
                if (confirm("Contacting for password..."))
                {
                    window.location="contact.html";
                }
            }
            else
            {
                window.location="index.html"
            }
        }
    }
}