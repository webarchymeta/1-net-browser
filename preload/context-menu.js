var ipc = require('electron').ipcRenderer;

function triggerMenu(data) {
    ipc.sendToHost('contextmenu-data', data);
}

ipc.on('get-contextmenu-data', function(s, pos) {
    var data = {
        x: pos.x,
        y: pos.y,
        hasSelection: !!window.getSelection.toString(),
        href: false,
        img: false,
        video: false
    };
    var el = document.elementFromPoint(pos.x, pos.y);
    while (el && el.tagName) {
        if (!data.img && el.tagName == 'IMG')
            data.img = el.src;
        if (!data.href && el.href)
            data.href = el.href;
        el = el.parentNode
    }
    if (!data.href && window.__current_href)
        data.href = window.__current_href;
    if (!data.img && window.__current_img)
        data.img = window.__current_img;
    triggerMenu(data);
});