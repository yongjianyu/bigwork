 window.onload = function() {
    let list = document.querySelector('.slide-img');
    let img = document.querySelectorAll('.slide-img img');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let button = document.querySelector('.slide-button').getElementsByTagName('span');
    let slide = document.querySelector('.slide');
    let index = 0;

    /**
     * 在第一个图片和最后一个图片之外再添加图片
     * @type {[type]}
     */
    let img1 = document.createElement('img');
    img1.src = img[0].src;
    list.appendChild(img1); 
    let img2 = document.createElement('img');
    img2.src = img[img.length-1].src;
    list.insertBefore(img2,img[0]);

    function animate(offset) {
        /**
         * 滑动不衔接
         */
        // let newLeft = parseInt(list.style.left) + offset;
        // if(newLeft<-225){ 
        //     newLeft = -75;
        // }
        // else if(newLeft>0){ 
        //     newLeft = -225
        // }
        // list.style.left = newLeft + 'em';


        /**
         *滑动衔接
         *
         */
        let speed = offset/70;
        let animate = true;
        let newLeft = parseInt(list.style.left) + offset;
        function go(){
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                        list.style.left = parseInt(list.style.left) + speed + 'em';
                        setTimeout(go, 10);//递归函数
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

        go();
        
    }


    prev.onclick = function() {             
        animate(75);
        showbutton(-1);
    }
    next.onclick = function() {  
        animate(-75);
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

    function play(){
        timer=setInterval(function(){
            next.onclick();
        },4000);
    }
    function stop(){
        clearInterval(timer);
    }
   play();
    slide.onmouseover=stop;
    slide.onmouseout=play;

}