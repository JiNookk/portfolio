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
  }
  // const str = link.split('#');
  // let element = document.getElementById(str[1]);
  // querySelector로 어떠한 형태의 선택자도 받아올 수 있다!!!
  navbarMenu.classList.remove('clicked');
  scrollIntoView(link);
  selectNavItem(target);

  navbarMenuItem.forEach((navbarItem) => {
    if (link === navbarItem.dataset.link) {
      navbarItem.classList.add('active');
    } else {
      navbarItem.classList.remove('active');
    }
  });

  const options = {
    root: null, //기본값으로 viewport(브라우저에 보여지는 윈도우 부분)
    rootMargin: '0px', //viewport 바깥으로 감지영역을 넓힐때
    threshold: 0.2, // 콜백함수를 언제 실행할지 정하는 기준. 0 > 요소 보이면 바로 실행, 1 > 요소 다 보이면 실행
  };
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('clicked');
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
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonial',
  '#contact',
];

// map을 이용해서 섹션을 담고있는 새로운 배열을 반환받는다.
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
console.log(sections);
console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '-20px',
  threshold: 0.3,
};

// 옵저버 콜백 정의(우리가 실행시킬 내용) > entry에 section이 들어간다!
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 섹션의  인덱스를 가져오는 함수
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // 섹션의 인덱스를 반환 받은 후 방향을 결정
      // (entry의 y좌표가 +인지 -인지 판단해서 방향결정)
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// observer 변수에 옵저버 콜백과 옵션을 넣어서 옵저버 생성!
const observer = new IntersectionObserver(observerCallback, observerOptions);

// wheel : 마우스로 직접 스크롤
// scroll : 모든 스크롤을 포함.
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.ceil(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }

  selectNavItem(navItems[selectedNavIndex]);
});

// 배열화한 섹션관찰을 시작해줘!
sections.forEach((section) => observer.observe(section));

// finaltouch
// 개발자 도구에 들어가서 ctrl shift c로 확인하면 어떤 클래스로 인해 프로퍼티가 적용되었는지 확인가능
// 여기서 테스트를 해본 후 코드에서 변경하면 효율적
// 개발자 도구에 스마트폰 모양을 누르면 스마트폰 화면크기로 볼 수 있다.
// 개발자 도구를 참고하면 styles에 상위에 있을수록 우선순위임을 의미한다!
// 가까운 프로퍼티가 먼 프로퍼티보다 우선순위 : cascading
// html에서 배치를 바꾸지 않고도 flex 박스를 이용해서 위치를 변경할 수 있다.
// window.addEventListener('scroll') ~ 을하면 굉장히 성능이 떨어지는 코드를 작동시킨다.
// 콜백자체가 성능이 굉장히 떨어지기 때문이다.
