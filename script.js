
/*document.addEventListener("click", function(){
	
	
	var el = document.getElementById("showText");
	el.style.margin = "auto";
	el.style.width = '70%';
	el.style.border = "2px solid black";
	el.style.padding = "10px";
	
	
	var name = document.getElementById("file").files[0].name;
	var form_data = new FormData();
	var ext = name.split('.').pop().toLowerCase();
	console.log(inputFile.value);
	 
	Api key = dsuyVkMvuhiSZg03
});*/
var obj = {};
function correctReplacement(event) {
	if(event.button == 2){
		
		let badString = document.getElementById("popup").textContent;
		let goodStrings = obj[badString];
		
		var  content = document.getElementById("popup");
		var modal = document.createElement('div');
		modal.setAttribute('id', 'myModal');
		
		var tbl = document.createElement('table');
		tbl.setAttribute('id', 'spelling');
		console.log(goodStrings.length);
		for(let i = 0; i < goodStrings.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 1; j++) {
				var td = document.createElement('td');
				td.setAttribute('id', 'close');
				var  txt = goodStrings[i];
				
				let text = document.createTextNode(txt);
				console.log(text);
				td.appendChild(text);
			}
			tr.appendChild(td);
			tbl.appendChild(tr);
			console.log(tbl);
		}
		
		content.appendChild(tbl);
		
		console.log(content);
	}
}

function onFileLoad(elementId, event) {
	
	var el = document.getElementById("showText");
	el.style.margin = "auto";
	el.style.width = '70%';
	el.style.border = "2px solid black";
	el.style.padding = "10px";
    
	var fileOutput = event.target.result;
	//console.log(fileOutput);
	var str = fileOutput.replace(/\s+/g, '+');
	var res = str.slice(0, str.length - 1);
	console.log(res);
	
	var url = "https://api.textgears.com/spelling?key=dsuyVkMvuhiSZg03&text="+res+"&language=en-GB"
	fetch(url)
	 .then(response => response.json())
	 .then((response) => {
		console.log(response);
		console.log(typeof response);
		var errors = response['response']['errors'];
		var fileText = fileOutput;
		
		for(let i = 0; i < errors.length; i++) {
			console.log(errors[i]['bad']);
			var badString = errors[i]['bad'];
			var goodStrings = errors[i]['better'];
			obj[badString] = goodStrings;
			
			for(let j = 0; j < fileOutput.length; j++) {
				if(fileOutput.substr(j, badString.length) == badString){
					let strs = obj[badString];
					let key = badString;
					let regex = new RegExp(key,'g');
					fileText = fileText.replace(regex,
					'<mark id="popup" style="background-color:#f26666; text-decoration:underline;cursor:pointer" onmouseover="this.style.color=\'red\';" onmouseout="this.style.color=\'black\';" onmousedown="correctReplacement(event)">'+key+'</mark>')
				}
			}
		}
		document.getElementById(elementId).innerHTML = fileText;
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
	
    let fr = new FileReader();
	
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
	
}
