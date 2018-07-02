window.onload = function () {
	// body...
	let list = document.querySelector('.slide-img');
	let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let button = document.querySelector('.slide-button').getElementsByTagName('span');
	let img = document.querySelectorAll('.slide-img img');
	 let index = 0;
	for(let i=0;i<img.length;i++){
		let n = 90*(i+1);
		img[i].style.transform = 'rotateY('+n+'deg) translateZ(38em)';
	}

	function analyse(t){
		let str='';
		let dealstr='';
		for(let k=0;k<t.length;k++){
			if(t[k] == '('){
				for(let i=1;i<=3;i++){
					str +=t[k+i];	
				}
				break;
			}
		}

		if(str[2] == 'd'){
			for(let j=0;j<2;j++){
				dealstr += str[j];
			}
			return dealstr;
		}else{return str;}
	}

	function threeanimate(offset){
		function go(){
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                        list.style.left = parseInt(list.style.left) + speed + 'em';
                        setTimeout(go, 15);//递归函数
            }else {       
                animated=false;
                list.style.left=newLeft+"em";
                if (newLeft >-75) {
                    list.style.left=-300+"em";
                }
                if (newLeft <-300) {
                    list.style.left=-75+"em";
                }
            }
        }
		let img_rotate;
		for(let i=0;i<img.length;i++){
			console.log(img[i].style.transform);
			let k = analyse(img[i].style.transform);
			img_rotate = parseInt(k)+offset;
			if(img_rotate > 360){
				img_rotate = 90;
			}
			img[i].style.transform = 'rotateY('+img_rotate+'deg) translateZ(38em)' ;
			console.log(img[i].style.transform);
		}

	}

	prev.onclick = function() {             
        threeanimate(90);
        showbutton(-1);
    }
    next.onclick = function() {  
        threeanimate(-90);
        showbutton(1);
    }

    function showbutton(m){
       for(let i=0;i<button.length;i++){
            if(button[i].className == "on"){
                button[i].className = "";
            }
       }
        index =index+m;
       if(index<0){
            index = 3;
       }else if(index>3){
            index = 0;
       }
       button[index].className = "on";
    }
}