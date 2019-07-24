var purpose = document.getElementById('purpose')
var purpose_control = document.getElementById('a1')
var purpose_show = false

purpose_control.onclick = function(){
	if (purpose_show){
		purpose.style.display = 'none'
	}
	else{
		purpose.style.display = 'block'
	}

}

var whatis = document.getElementById('whatis')
var whatis_control = document.getElementById('a2')
var whatis_show = false

whatis_control.onclick = function(){
	if (whatis_show){
		whatis.style.display = 'none'
	}
	else{
		whatis.style.display = 'block'
	}

}

var howbuilt = document.getElementById('howbuilt')
var howbuilt_control = document.getElementById('a3')
var howbuilt_show = false

howbuilt_control.onclick = function(){
	if (howbuilt_show){
		howbuilt.style.display = 'none'
	}
	else{
		howbuilt.style.display = 'block'
	}

}




var Supplement = document.getElementById('Supplement')
var Supplement_control = document.getElementById('b1')
var Supplement_show = false

Supplement_control.onclick = function(){
	if (Supplement_show){
		Supplement.style.display = 'none'
	}
	else{
		Supplement.style.display = 'block'
	}

}

var Main = document.getElementById('Main')
var Main_control = document.getElementById('b2')
var Main_show = false

Main_control.onclick = function(){
	if (Main_show){
		Main.style.display = 'none'
	}
	else{
		Main.style.display = 'block'
	}

}

var drawing = document.getElementById('drawing')
var drawing_control = document.getElementById('b3')
var drawing_show = false

drawing_control.onclick = function(){
	if (drawing_show){
		drawing.style.display = 'none'
	}
	else{
		drawing.style.display = 'block'
	}

}


var dashboard = document.getElementById('dashboard')
var dashboard_control = document.getElementById('b4')
var dashboard_show = false

dashboard_control.onclick = function(){
	if (dashboard_show){
		dashboard.style.display = 'none'
	}
	else{
		dashboard.style.display = 'block'
	}

}


var technique = document.getElementById('technique')
var technique_control = document.getElementById('b5')
var technique_show = false

technique_control.onclick = function(){
	if (technique_show){
		technique.style.display = 'none'
	}
	else{
		technique.style.display = 'block'
	}

}

var whowe = document.getElementById('whowe')
var whowe_control = document.getElementById('a5')
var whowe_show = false

whowe_control.onclick = function(){
	if (whowe_show){
		whowe.style.display = 'none'
	}
	else{
		whowe.style.display = 'block'
	}

}


var acknow = document.getElementById('acknow')
var acknow_control = document.getElementById('a6')
var acknow_show = false

acknow_control.onclick = function(){
	if (acknow_show){
		acknow.style.display = 'none'
	}
	else{
		acknow.style.display = 'block'
	}

}


var sublist = document.getElementsByClassName('sublist')
var sublist_control = document.getElementById('a4')
var sublist_show = false


sublist_control.onclick = function(){
	if (sublist_show){
		for (let i =0; i<sublist.length;i++){
			sublist[i].style.display = 'none'
		}
	}
	else {
		for (let i =0; i<sublist.length;i++){
			sublist[i].style.display = 'block'
		}
	}
	
	
}