window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	var buffer;

	fileInput.addEventListener('change', function(e) {
		fileDisplayArea.innerHTML = '';
		var file = fileInput.files[0];
		var reader = new FileReader();
        reader.readAsBinaryString(file);
		reader.onload = function(e) {
            var temp = reader.result;
            temp = unescape(temp);
            temp2 = "<title>Hawaii</title>"
			fileDisplayArea.innerHTML = reader.result;
			// buffer = (JSON.parse(JSON.stringify(reader.result)));
			buffer = reader.result;
		}
	});
	
	$('#convert').click(function(){
		svgExecute();
	});
	
	$('#restore').click(function(){
		fileDisplayArea.innerHTML = buffer;
	});
}
