function enableStylesheet (node) {
    node.media = '';
}

function disableStylesheet (node) {
    node.media = 'none';
}

var storagevalue = localStorage.getItem('CurrentStyle');
var oldvalue = "style1";

function changetheme(value) {
    localStorage.setItem('CurrentStyle', value);
    enableStylesheet(document.getElementById(value));
    disableStylesheet(document.getElementById(oldvalue));
    oldvalue = value;
}

if(storagevalue!= null){
    oldvalue = storagevalue;
    document.getElementById('changetheme').value = storagevalue;
}
enableStylesheet(document.getElementById(oldvalue));

