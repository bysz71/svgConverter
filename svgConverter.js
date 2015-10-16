window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	var buffer;
	var filename="";

	fileInput.addEventListener('change', function(e) {
		fileDisplayArea.innerHTML = '';
		var file = fileInput.files[0];
		var reader = new FileReader();
        reader.readAsBinaryString(file);
		filename = file.name;
		console.log(filename);
		reader.onload = function(e) {
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
	
	$('#saveas').click(function(){
		var newname = filename.replace(/.svg/,"_modified.svg");
		var content = document.getElementById("fileDisplayArea").innerHTML;
		var blob = new Blob([content],{type: "text/html;charset=utf-8"});
		saveAs(blob,newname);
	})
}
