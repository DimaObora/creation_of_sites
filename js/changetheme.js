function enableStylesheet (node) {
    node.media = '';
}

function disableStylesheet (node) {
    node.media = 'none';
}

var selecttheme = document.getElementById("changetheme");
var oldvalue = "style1";

function changetheme(value) {
    enableStylesheet(document.getElementById(value));
    disableStylesheet(document.getElementById(oldvalue));
    oldvalue = value;
}

