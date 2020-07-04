const possibleWidths = [4096, 2048, 1024, 512, 256, 128, 64, 32, 16];

String.prototype.removeExtension = function() {
	return this.split('.').slice(0, -1).join('.');
}

if (!Array.prototype.filter) {
	Array.prototype.filter = function(func) {
		var newArr = [];

		for (var i = 0; i < this.length; ++i)
			if (func(this[i]))
				newArr.push(this[i]);
			
		return newArr;
	}
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

File.prototype.extension = function() {
	return this.name.split('.').last().toLowerCase();
};

function saveOptions(file) {
	var saveOptions;

	switch (file.extension()) {
		case 'jpg':
		case 'jpeg':
			saveOptions = new JPEGSaveOptions();
			saveOptions.quality = 10;
			saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
			saveOptions.matte = MatteType.WHITE;
			break;

		default: // png is default
			saveOptions = new PNGSaveOptions();
			saveOptions.compression = 9;
			saveOptions.interlaced = true;
			break;
	}
	
	return saveOptions;
}


app.preferences.rulerUnits = Units.PIXELS;

// MAIN >>>
var file = app.openDialog()[0];
app.open(file);

var saveOptions = saveOptions(file);

const ratio = app.activeDocument.width / app.activeDocument.height;

var widthsToGenerate = possibleWidths.filter(function(x) { return x < app.activeDocument.width; })

for (var i = 0; i < widthsToGenerate.length; ++i) {
	currentWidth = widthsToGenerate[i];
	currentHeight = Math.round(currentWidth / ratio);

	app.activeDocument.resizeImage(currentWidth, currentHeight);

	app.activeDocument.saveAs(
		new File(file.path + '\\' + file.name.removeExtension() + '-' + currentWidth + 'px-' + currentHeight + 'px'), saveOptions);
}

alert("Les images ont bien été générées dans le répertoire " + file.path + '.');