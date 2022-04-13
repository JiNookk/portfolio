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
    const str = link.split('#');
    let element = document.getElementById(str[1]);
    console.log(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }
});
