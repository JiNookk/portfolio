'use strict';

// 스크립트를 임포트 할때 무조건 defer를 추가해주어야 한다!!!
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// document에서 스크롤이 될때마다 콜백을 호출.
document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuItem = document.querySelectorAll('.navbar__menu__item');
// navbarMenu에서 클릭이 발생하면 콜백실행
// 클릭이 발생했을 때 그 대상을 이벤트에 담는다.
// .target을 이용해 event객체의 내용을 받아올 수 있다.
// data-프로퍼티를 이용해 쉽게 태그를 선택할 수 있다.
// html에 data 프로퍼티를 추가할것 >> target.dataset.propname으로 받아올 수 있음.

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  // return을 이용해 함수를 종료. else를 안써도 이런식으로 함수를 종료 가능
  if (link == null || undefined) {
    return;
  } else {
    console.log(link);
    // const str = link.split('#');
    // let element = document.getElementById(str[1]);
    // querySelector로 어떠한 형태의 선택자도 받아올 수 있다!!!
    scrollIntoView(link);
  }

  navbarMenuItem.forEach((navbarItem) => {
    if (link === navbarItem.dataset.link) {
      navbarItem.classList.add('active');
    } else {
      navbarItem.classList.remove('active');
    }
  });
});

// Handle click on "contact me" button on home
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scroll down
// 자식만 투명하게 만드려면 ? >> html에서 container하나 더만들면 되지.
const homeCon = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const scrollHomeY = document.addEventListener('scroll', () => {
  // console.log(homeHeight);
  // console.log(window.scrollY);
  // 이런식으로 html 스타일을 직접 줄 수 있다.
  homeCon.style.opacity = 1 - window.scrollY / homeHeight;
});

// Make arrow button to move topside
// 버튼태그를 이용하면 자식태그가 자동으로 중심정렬이 이루어진다.

const icon = document.querySelector('.arrow__up');
icon.addEventListener('click', () => {
  scrollIntoView('#home');
});

const arrowScroll = document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    icon.classList.add('visible');
  } else {
    icon.classList.remove('visible');
  }
});

// 22.04.14

// Projects
// 누를 버튼에 불러올 값을 html에 dataset 처리한다!
// 컨테이너를 쿼리셀렉터로 가져와야 한다.
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
// project클래스에 해당되는 모든 녀석들을 변수에 할당 : forEach쓸때는 무조건 요놈으로 받아와야한다.
const projects = document.querySelectorAll('.project');
const categoryBtn = document.querySelectorAll('.category__btn');

workBtnContainer.addEventListener('click', (e) => {
  // undefined값을 가진 아이콘을 눌러도 그 부모값의 filter를
  // 가져오기 때문에 문제해결
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // 이부분에 브레이크 포인트를 걸어서 부모노드에 대한 정보를 얻을 수 있다.
  if (filter == null) {
    return;
  }
  projectContainer.classList.add('anim-out');

  categoryBtn.forEach((workBtn) => {
    if (filter === workBtn.dataset.filter) {
      workBtn.classList.add('active');
    } else {
      workBtn.classList.remove('active');
    }
  });

  setTimeout(() => {
    // projects라는 배열을 받아서 출력
    projects.forEach((project) => {
      // foreach가 돌면서 조건에 맞지않는 녀석을 invisible로 만듦
      console.log(project.dataset.type);
      console.log(filter);
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// Project button final touch

// 눌렀을때 액티브 옮겨가기, navbar border 옮기기
// 눌렀을떄 액티브 클래스 추가(classlist), 다른놈들 액티브 해제(foreach)
// transform 요소 다시공부할것!!
// hover시 border 주의사항 : 없던 border가 생기므로 사이즈가 늘어났다 줄어났다함.
//   >> 평소에도 transparent로 border를 주면 된다!!

// 중복되는 부분 발생!! >> 메서드로 추출하자
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
