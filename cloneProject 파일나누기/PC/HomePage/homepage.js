
const md = [
    window.matchMedia(`(min-width: 897px)`), // 태블릿 + PC
    window.matchMedia(`(max-width: 896px)`)   // 모바일
];

//nav 옆으로 나오기
    const elHeaderBtn = document.querySelector('header>.head_El>.head_right>.verMenu_btn'),
          elNav = document.querySelector('nav'),
          nav_elXBtn = document.querySelector('nav>div.head_gnb_vertical_top_Wrap>div.xBtn');

    elHeaderBtn.onclick = function(){
        elNav.classList.add('active');
    }
    nav_elXBtn.onclick = function(){
        elNav.classList.remove('active');
    }



//nav lnb나오기
    const nav_elUl = document.querySelector('nav ul.head_gnb_vertical'),
          nav_elLi = document.querySelectorAll('nav ul.head_gnb_vertical > li'),
          nav_elA = document.querySelectorAll('nav ul.head_gnb_vertical > li > a');
    
    let nav_previous_key = 0, first = true;

    let nav_aTagActive = function(ele, k){
        nav_elLi[nav_previous_key].classList.remove('active');

        nav_elA.forEach(function(v){
            v.style.color = '#707070';
        });

        nav_elLi[k].classList.add('active');
        if(k == nav_previous_key && !first) nav_elLi[k].classList.remove('active');
        nav_elA[k].style.color = 'white';
        nav_previous_key = k;

        if(first) first = false;
    }//nav_aTagActive()함수정의

    let nav_reset = function(){
            nav_elLi[nav_previous_key].classList.remove('active');
            nav_elA.forEach(function(ele){
                ele.style.color = 'white';
            });//nav_elA.forEach
    }//nav_reset()함수정의

    let a_media_event = function(){   
        nav_elA.forEach(function(ele, k){
            ele.onmouseenter = function(){//a태그 올려놓을 때 //addEventListner()가 아닌 이 방법으로 매개변수(ele, k)넣는 법?????????????????????????            
                if(md[0].matches){
                    nav_aTagActive(ele, k);
                }
            };//ele.onmouseenter     
        
            ele.onclick = function(e){
                if(!md[0].matches){
                    e.preventDefault();
                    nav_aTagActive(ele, k);
                }
            };
        });//nav_elA.forEach
    }//a_media_event() 함수정의

    // md.forEach(function(v,k){
    //     a_media_event();       
    //     md[k].addListener(a_media_event);//md[k].addListener() 
    // });// md.forEach(function(v,k)

        a_media_event();       
        md[0].addListener(a_media_event);//md[k].addListener() 

    nav_elUl.onmouseleave = function(){
        nav_reset();
    }//nav_elUl.onmouseleave

//section2_menuStory의 슬라이드
    const sec2_tapBtns = document.querySelectorAll('.menuStory ul.text_btn>li');

    const sec2_ElUls = document.querySelectorAll('.menuStory .img_slides ul');

    const sec2_Elpagination = document.querySelector('.menuStory .img_slide_pagination'),
          sec2_ElLeftBtn = sec2_Elpagination.querySelector('.leftBtn'),
          sec2_ElPageName = sec2_Elpagination.querySelector('span'),
          sec2_ElRightBtn = sec2_Elpagination.querySelector('.rightBtn');

    let sec2_UlIdx = 0, // 현재 Ul 인덱스
        prev_UlIdx = 0;

    let sec2_LiIdx = 0, // 현재 Ul의 현재 Li 인덱스
        prev_LiIdx = 0;  //이전 인덱스

    let sec2_SlideFun = function(text){
        const ElLis = sec2_ElUls[sec2_UlIdx].querySelectorAll('li');

        if(text == "prev"){
            sec2_LiIdx > 0 ? sec2_LiIdx--: sec2_LiIdx = ElLis.length-1;
        }else{ //text == "next"
            sec2_LiIdx < ElLis.length-1 ? sec2_LiIdx++ : sec2_LiIdx = 0;
        }

        sec2_ElUls[sec2_UlIdx].style = `transform: translateX(calc(100% * -${sec2_LiIdx}));`;
        ElLis[prev_LiIdx].classList.remove('active');
        ElLis[sec2_LiIdx].classList.add('active');
        sec2_ElPageName.innerText = ElLis[sec2_LiIdx].dataset.name;

        prev_LiIdx = sec2_LiIdx;
    };//sec2_SlideFun() 함수정의

    //prev버튼 누를시
    sec2_ElLeftBtn.onclick = function(){
        sec2_SlideFun("prev");
    };//sec2_ElLeftBtn.onclick

    //next버튼 누를시
    sec2_ElRightBtn.onclick = function(){
        sec2_SlideFun("next");
    };//sec2_ElRightBtn.onclick

    sec2_tapBtns.forEach(function(ele, key){
        ele.onclick = function(){
            sec2_UlIdx = key;

            // 탭 active
            sec2_tapBtns[prev_UlIdx].classList.remove('active');
            sec2_tapBtns[sec2_UlIdx].classList.add('active');

            // Ul active
            sec2_ElUls[prev_UlIdx].classList.remove('active');
            sec2_ElUls[sec2_UlIdx].classList.add('active');

            // 새로 Ul보여줄 때 li초기화
            sec2_LiIdx = 0;
            const prev_ElLis = sec2_ElUls[prev_UlIdx].querySelectorAll('li'),
                  ElLis = sec2_ElUls[sec2_UlIdx].querySelectorAll('li');

            sec2_ElUls[sec2_UlIdx].style = `transform: translateX(0%);`;
            prev_ElLis[prev_LiIdx].classList.remove('active');
            ElLis[sec2_LiIdx].classList.add('active');
            sec2_ElPageName.innerText = ElLis[sec2_LiIdx].dataset.name;
        
            prev_LiIdx = sec2_LiIdx;
            prev_UlIdx = sec2_UlIdx;
        };//ele.onclick
    });//sec2_tapBtns.forEach


//section1 슬라이드, section4 슬라이드, section6 슬라이드
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },
        on:{
            slideChange: function(e){
            const elPage = document.querySelector('section.main .pagination_pageNumber');
            elPage.innerHTML = `<span>${e.realIndex+1}</span> <span>/</span> <span>${e.slides.length}</span>`
            }
        }
    });//.mySwiper

    var brandSupport_swiper = new Swiper(".brandSupport_Swiper", {
        loop: true,
        cssMode: true,
        navigation: {
            nextEl: ".swiper-btn-next_4",
            prevEl: ".swiper-btn-prev_4",
        },
        on:{
            slideChange: function(e){
            const elPage = document.querySelector('section.brandSupport .pagination_pageNumber');
            elPage.innerHTML = `<span>${e.realIndex+1}</span> <span>/</span> <span>${e.slides.length}</span>`
            }
        }

    });//.brandSupport_Swiper

    var newAndNotice_swiper = new Swiper(".newAndNotice_Swiper", {
        loop: true,
        navigation: {
            nextEl: ".swiper-btn-next_6",
            prevEl: ".swiper-btn-prev_6",
        },
        on:{
            slideChange: function(e){
            const elPage = document.querySelector('section.newAndNotice .pagination_pageNumber');
            elPage.innerHTML = `<span>${e.realIndex+1}</span> <span>/</span> <span>${e.slides.length}</span>`
            }
        }
    });

// 스크롤
    // return;
    let view = document.querySelector("#view")
    const fullPage = document.querySelector('.fullPage'),
            prevNum = fullPage.querySelector('span:nth-of-type(1)'),
            progressAllBar = fullPage.querySelector('p'),
            progressBar = fullPage.querySelector('p>span'),
            allNum = fullPage.querySelector('span:nth-of-type(2)');
    const   header = document.querySelector('header');
    
    let floor = 0;
    document.body.style = `height: ${view.offsetHeight}px;`;
    
        
            //y는 현재 위치 // prev_y는 스크롤 이전 위치 //statues: 내리는중(true), 올리는 중(false)
            let pos = {y: 0, prev_y: 0, status: true};
    
            let timer;
    
            window.addEventListener("wheel", function(e){
                e.preventDefault();
    
            },{passive : false});
    
            window.addEventListener('wheel', function(e){
                    if(timer) clearTimeout(timer); /* 디바운싱 */
                    
                    timer = setTimeout(function(){ 
                        pos.status = e.wheelDelta < 0 ? true : false;
                    
                        if(pos.status){ //스크롤을 내리면
                            if(floor < 6) floor++;
                        }else{ //스크롤을 올리면
                            if(floor > 0) floor--;
                        }
    
                        if(floor <= 5){
                            prevNum.innerText = `0${floor+1}`;
                            let progressAllBarHeight = window.getComputedStyle(progressAllBar).height;
                            progressAllBarHeight = progressAllBarHeight.substr(0, progressAllBarHeight.indexOf('px'));
                            progressBar.style = `height: ${(progressAllBarHeight/6)*(floor+1)}px; transition: 1s;`;
                        }
                        if(floor <= 5){
                            view.style = `transform: translateY(calc(-100vh*${floor})); transition: 1s`;
                        }else{
                            document.body.style = `height: ${view.offsetHeight}px;`;
    
                            const footer = document.querySelector('footer');
                            let footerHeight = window.getComputedStyle(footer).height;
                            console.log(footerHeight);
                            view.style = `transform: translateY(calc(-100vh*${(floor-1)} - ${footerHeight})); transition: 1s`;
                        }
                        
                        header.classList.remove('firstFloor');
                        if(floor == 0){
                            header.classList.add('firstFloor');
                        }
    
                    }, 500);//timer = setTimeout
            });//window.addEventListener
            /*
            window.addEventListener('scroll', function(){
                    if(timer) clearTimeout(timer); // 디바운싱 
                    
                    timer = setTimeout(function(){
                        //document.body.style = `height: ${view.offsetHeight}px;`; 
                        pos.y = window.pageYOffset;
                        pos.status = pos.y > pos.prev_y ? true : false;
                    
                        if(pos.status){ //스크롤을 내리면
                            if(floor < 5) floor++;
                        }else{ //스크롤을 올리면
                            if(floor > 0) floor--;
                        }
    
                        
                        prevNum.innerText = `0${floor+1}`;
                        let progressAllBarHeight = window.getComputedStyle(progressAllBar).height;
                        progressAllBarHeight = progressAllBarHeight.substr(0, progressAllBarHeight.indexOf('px'));
                        progressBar.style = `height: ${(progressAllBarHeight/6)*(floor+1)}px; transition: 1s;`;
    
                        view.style = `transform: translateY(calc(-100vh*${floor})); transition: 1s`;
    
                        pos.prev_y = pos.y
                    }, 500);//timer = setTimeout
            });//window.addEventListener
            */
    
    
    
            const topBtn = document.querySelector('.wrapper_Btn > .moveScrollTop_btn');
    
            topBtn.onclick = function(){
                floor = 0;
    
                prevNum.innerText = `0${floor+1}`;
                let progressAllBarHeight = window.getComputedStyle(progressAllBar).height;
                progressAllBarHeight = progressAllBarHeight.substr(0, progressAllBarHeight.indexOf('px'));
                progressBar.style = `height: ${(progressAllBarHeight/6)*(floor+1)}px; transition: 1s;`;
    
                view.style = `transform: translateY(${floor}); transition: 1s`;
                header.classList.add('firstFloor');
            }//topBtn.onclick
        
//헤더 매치미디어 호버 변경
    Hmd = matchMedia('(min-width: 1285px)');

    let headerHover = function(){
        header.onmouseenter = function(){ //마우스 호버
            if(Hmd.matches) header.classList.remove('firstFloor');
        }//header.onmouseenter

        header.onmouseleave = function(){//호버 취소
            if(Hmd.matches){
                if(floor == 0){
                    header.classList.add('firstFloor');
                }
            }
        }//header.onmouseleave
    }//headerHover() 함수정의

    // let headerHover = function(){
    //     header.onmouseenter = function(){ //마우스 호버
    //         header.classList.remove('firstFloor');
    //     }//header.onmouseenter

    //     header.onmouseleave = function(){//호버 취소
    //             if(floor == 0){
    //                 header.classList.add('firstFloor');
    //             }
    //     }//header.onmouseleave
    // }//headerHover() 함수정의

    headerHover();
    Hmd.addListener(headerHover);















