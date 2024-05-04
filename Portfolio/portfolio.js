function openNav() {
  document.getElementById("navo").style.height = "100%";
}

function closeNav() {
  document.getElementById("navo").style.height = "0%";
}

function active() {
  const navLinks = document.querySelectorAll('.overlay-content a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  document.getElementById("navo").style.height = "0%";
}

function activly(){
  const navLinks = document.querySelectorAll('.nav-content a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  active();
}

// $(window).bind('keydown', 'ctrl+s', function () {
//   $('#save').click(); return false;
// });
DisableDevtool({
  ondevtoolopen: (type) => {
    if(DisableDevtool.isRunning){console.log("Copyright restrictions are in effect."); window.location.href="error.html";}
  },
});





document.onkeydown = (e) => {
  if ( 
    event.keyCode === 123 ||
    ctrlKey(e, "C") ||
    ctrlKey(e, "X") ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  ) return !1;
};




