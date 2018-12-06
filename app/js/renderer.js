(function() {
    var element = document.getElementById('editor');
    var editor = CodeMirror.fromTextArea(element, {
        lineNumbers: true,
        mode: "javascript"
    });
})();
