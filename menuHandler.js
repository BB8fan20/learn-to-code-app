const $ = require('jquery');
const { remote } = require('electron');

var win = remote.getCurrentWindow();

var full = document.getElementById("maximize");

$('#minimize').click(function() {
    win.minimize();
});

$('#maximize').click(function(){
    if (!win.isMaximized()) {
        win.maximize();
        full.innerHTML = "fullscreen_exit";
    } else {
        win.unmaximize();
        full.innerHTML = "fullscreen";
    }
});
