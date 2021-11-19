const burgerBtn = document.querySelector('.btn--burger');
const burgerLink = document.querySelectorAll('.nav__link');

burgerBtn.addEventListener('click', burgerMenuShow);
burgerLink.forEach(el => {
  el.addEventListener('click', burgerMenuShow);
});

function burgerMenuShow() {
  burgerBtn.classList.toggle('btn--burger-active');
  document
    .querySelector('.header__inner')
    .classList.toggle('header__inner--active');
}

const form = document.querySelectorAll('.form');
const phoneCheck = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const emailCheck =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

for (let j = 0; j < form.length; j++) {
  form[j].addEventListener('submit', e => {
    formCheck(e, form[j].phone, form[j].email, j);

    form[j].addEventListener('input', () => {
      if (
        (form[j].email == '' || form[j].phone != '') &&
        (form[j].email != '' || form[j].phone == '')
      ) {
        form[j].email.parentElement.classList.remove('form__item--error');
        form[j].email.parentElement.querySelector('.form__error').textContent =
          '';
        form[j].phone.parentElement.classList.remove('form__item--error');
        form[j].phone.parentElement.querySelector('.form__error').textContent =
          '';
      }
    });

    form[j].phone.addEventListener('input', () => {
      form[j].phone.parentElement.classList.remove('form__item--error');
      form[j].phone.parentElement.querySelector('.form__error').textContent =
        '';
    });
    form[j].email.addEventListener('input', () => {
      form[j].email.parentElement.classList.remove('form__item--error');
      form[j].email.parentElement.querySelector('.form__error').textContent =
        '';
    });
  });
}

function formCheck(e, phone, email, j) {
  if (!phone.value == '') {
    if (phoneCheck.test(phone.value) && emailCheck.test(email.value)) {
      formSend(e, j);

      return false;
    } else if (phoneCheck.test(phone.value) && email.value == '') {
      formSend(e, j);

      return false;
    } else if (emailCheck.test(email.value) || !phoneCheck.test(phone.value)) {
      phone.parentElement.classList.add('form__item--error');
      phone.parentElement.querySelector('.form__error').textContent =
        'Некорректный номер';
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  if (!email.value == '') {
    if (emailCheck.test(email.value) && phoneCheck.test(phone.value)) {
      formSend(e, j);

      return false;
    } else if (emailCheck.test(email.value) && phone.value == '') {
      formSend(e, j);

      return false;
    } else if (phoneCheck.test(phone.value) || !emailCheck.test(email.value)) {
      email.parentElement.classList.add('form__item--error');
      email.parentElement.querySelector('.form__error').textContent =
        'Некорректная почта';
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  if (phone.value == '' && email.value == '') {
    phone.parentElement.classList.add('form__item--error');
    email.parentElement.classList.add('form__item--error');
    phone.parentElement.querySelector('.form__error').textContent =
      'Нужно что то написать';
    email.parentElement.querySelector('.form__error').textContent =
      'Нужно что то написать';
    e.preventDefault();
  }
}

async function formSend(e, j) {
  e.preventDefault();

  let formData = new FormData(form[j]);

  document.querySelector('.preloader').style.display = 'block';

  let response = await fetch('../telegram.php', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    sendingСompleted();
  } else {
    sendingError();
  }
}

function sendingСompleted() {
  form.forEach(el => {
    el.reset();
  });
  document.querySelector('.preloader').style.display = 'none';
  document.querySelector('.hero-modal__sending').classList.add('is-hidden');
  sendingСompletedModal.classList.remove('is-hidden');
  sendingСompletedModal
    .querySelector('.send-setatus-close')
    .addEventListener('click', heroModalOpen);

  //Для второй формы
  const contactSendingСompletedModal = document.querySelector('.contact__send');

  document.querySelector('.contact-form__send').classList.add('is-hidden');
  contactSendingСompletedModal.classList.remove('is-hidden');
  contactSendingСompletedModal
    .querySelector('.send-setatus-close')
    .addEventListener('click', () => {
      contactSendingСompletedModal.classList.add('is-hidden');
      document
        .querySelector('.contact-form__send')
        .classList.remove('is-hidden');
    });
}

function sendingError() {
  form.forEach(el => {
    el.reset();
  });
  document.querySelector('.preloader').style.display = 'none';
  document.querySelector('.hero-modal__sending').classList.add('is-hidden');
  sendingErrorModal.classList.remove('is-hidden');
  sendingErrorModal
    .querySelector('.send-setatus-close')
    .addEventListener('click', heroModalOpen);

  //Для второй формы

  const contactSendingErrorModal = document.querySelector('.contact__not-send');

  document.querySelector('.contact-form__send').classList.add('is-hidden');
  contactSendingErrorModal.classList.remove('is-hidden');
  contactSendingErrorModal
    .querySelector('.send-setatus-close')
    .addEventListener('click', () => {
      contactSendingErrorModal.classList.add('is-hidden');
      document
        .querySelector('.contact-form__send')
        .classList.remove('is-hidden');
    });
}

function randomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

//Данные
let galleryDate = [
  {
    id: randomId(),
    imgUrl: './images/1.jpg',
    imgMinUrl: './images/min/1.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/2.jpg',
    imgMinUrl: './images/min/2.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/3.jpg',
    imgMinUrl: './images/min/3.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/4.jpg',
    imgMinUrl: './images/min/4.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/5.jpg',
    imgMinUrl: './images/min/5.jpg',
    class: 'portraits',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/videos/1.mp4',
    imgMinUrl: './images/min/3.jpg',
    desc: 'реклама моршинской',
    class: 'реклама',
    type: 'video',
    viewing: 'video',
  },
  {
    id: randomId(),
    imgUrl: './images/6.jpg',
    imgMinUrl: './images/min/6.jpg',
    class: 'reports',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/7.jpg',
    imgMinUrl: './images/min/7.jpg',
    class: 'weddings',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/8.jpg',
    imgMinUrl: './images/min/8.jpg',
    class: 'weddings',
    type: 'photo',
  },
  {
    id: randomId(),
    imgUrl: './images/videos/1.mp4',
    imgMinUrl: './images/min/1.jpg',
    desc: 'реклама нижнего белья',
    class: 'reports',
    type: 'video',
    viewing: 'video',
  },
];

//types
typeBtnsDisplay();
function typeBtnsDisplay() {
  const typeBtnWrapepr = document.querySelector('.portfolio-main');
  const typesData = [];

  galleryDate.forEach(item => {
    const typeTemplate = {
      id: Math.random(),
      type: item.type,
    };
    typesData.push(typeTemplate);
  });

  const typesDataSort = typesData.reduce((unique, o) => {
    if (!unique.some(obj => obj.type === o.type)) {
      unique.push(o);
    }
    return unique;
  }, []);

  typeBtnWrapepr.innerHTML = '';
  classBtnsDisplay(typesDataSort[0].type);
  // classfilter(typesDataSort[0].type);
  typesDataSort.forEach(item => {
    let typesTemplate = `
    <li class="portfolio-main__item">
      <button class="portfolio-main__btn btn btn--portfolio" data-type="${item.type}">${item.type}</button>
    </li>

  `;

    typeBtnWrapepr.innerHTML += typesTemplate;
  });
  typeBtnWrapepr.children[0].children
    .item(0)
    .classList.add('btn--portfolio-active');
}

//class

function classBtnsDisplay(type) {
  const classBtnWrapepr = document.querySelector('.portfolio-category');
  const classData = [
    {
      id: 123456789,
      class: 'all',
    },
  ];

  galleryDate.forEach(item => {
    if (item.type == type) {
      const classTemplate = {
        id: Math.random(),
        class: item.class,
      };
      classData.push(classTemplate);
    }
  });

  const classDataSort = classData.reduce((unique, o) => {
    if (!unique.some(obj => obj.class === o.class)) {
      unique.push(o);
    }
    return unique;
  }, []);
  classBtnWrapepr.innerHTML = '';
  classDataSort.forEach(item => {
    let classTemplate = `
    <li class="portfolio-category__item">
      <button class="portfolio-category__btn btn btn--category portfolio-category__btn--portraits" data-class="${item.class}">${item.class}</button>
    </li>
  `;
    classBtnWrapepr.innerHTML += classTemplate;
    classfilter(type, classDataSort[0].class);
  });
  classBtnWrapepr.children[0].children
    .item(0)
    .classList.add('btn--category-active');
}

const typeBtn = document.querySelectorAll('[data-type]');

typeBtn.forEach(item => {
  item.addEventListener('click', () => {
    typeBtn.forEach(el => {
      el.classList.remove('btn--portfolio-active');
    });
    item.classList.add('btn--portfolio-active');
    classBtnsDisplay(item.dataset.type);
  });
});

function classfilter(itemsType, itemClass) {
  const classBtna = document.querySelectorAll('[data-class]');

  classBtna.forEach(item => {
    galleryDisplay(itemsType, itemClass);

    item.addEventListener('click', () => {
      classBtna.forEach(el => {
        el.classList.remove('btn--category-active');
      });
      item.classList.add('btn--category-active');
      galleryDisplay(itemsType, item.dataset.class);
    });
  });
}

//photos
function galleryDisplay(itemType, itemClass) {
  const itemsWrapper = document.querySelector('.gallery');

  itemsWrapper.innerHTML = '';

  galleryDate.forEach(item => {
    console.log(itemType, itemClass);

    if (item.viewing == 'video') {
      if (itemClass == 'all' && item.type == itemType) {
        itemsWrapper.classList.add('gallery--video');
        let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
        <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${item.desc}
        </h4>
        </div>
        <img alt="gallery__img" class="gallery__video-poster" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      } else if (
        (item.type == itemType && item.class == itemClass) ||
        itemType == '' ||
        itemClass == ''
      ) {
        itemsWrapper.classList.add('gallery--video');
        let galleryItem = `
      <li id="${item.id}" class="gallery__item gallery__item-video">
      <div class="gallery__item-video-title-wrapper">
        <h4 class="gallery__item-video-title title title--contacts">
          ${item.desc}
        </h4>
        </div>
        <img alt="gallery__img" class="gallery__video-poster" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      }
    } else {
      if (itemClass == 'all' && item.type == itemType) {
        itemsWrapper.classList.remove('gallery--video');

        let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="gallery__img" class="gallery__img" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      } else if (
        (item.type == itemType && item.class == itemClass) ||
        itemType == '' ||
        itemClass == ''
      ) {
        itemsWrapper.classList.remove('gallery--video');

        let galleryItem = `
      <li id="${item.id}" class="gallery__item">
        <img alt="gallery__img" class="gallery__img" src='${item.imgMinUrl}'>
      </li>
      `;

        itemsWrapper.innerHTML += galleryItem;
      }
    }
    modalView();
  });
}

//modal photo viewing

function modalView() {
  const galleryModalBtn = document.querySelectorAll('.gallery__item');
  const galleryModal = document.querySelector('.portfolio__modal');

  galleryModalBtn.forEach(item => {
    item.addEventListener('click', () => {
      galleryModal.classList.add('portfolio__modal-bg');
      document.querySelector('body').classList.add('dis-scroll');

      const galleryModalBtnId = item.getAttribute('id');

      galleryModal.innerHTML = '';
      galleryDate.forEach(el => {
        if (el.id == galleryModalBtnId) {
          if (el.viewing == 'video') {
            let modalTemplate = `

		  	<button class="portfolio__modal-btn btn btn--close"></button>
        <div class="portfolio__modal-preloader image-preloader ">
          <ul class="image-preloader-inner list-reset">

        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
		  </ul>
      </div>
        <div class="portfolio__modal-player player">
			<video class="player__video">
				<source class="player__video-source" src="${el.imgUrl}" type="video/mp4">
			</video>
			<div class="player__controls">
				<input class="player__time-progress-range" type="range" value=0>

				<div class="player__bottom">
					<ul class="player__controls-left list-reset">
            <li class="player__controls-left-item">
              <button class="player__play btn btn--play"></button>
            </li>	
            <li class="player__controls-left-item">
              <button class="player__volume btn btn--volume"></button>
              <input type="range" class="player__volume-range">
            </li>
            <li class="player__controls-left-item player__time">
              <span class="player__time-passed player__time-el">0:00:00</span>
              <span class="player__time-left player__time-el">0:00:00</span>
            </li>
					</ul>
					<div class="player__controls-right">
						<button class="player__full btn btn--full"></button>
					</div>
				</div>
			</div>
		</div>
        `;
            galleryModal.innerHTML = modalTemplate;
            document
              .querySelector('.player__video')
              .addEventListener('canplay', () => {
                document.querySelector('.image-preloader').style.display =
                  'none';
              });
            videoPlayer();
          } else {
            let modalTemplate = `
          <div class="portfolio__modal-preloader image-preloader ">
          <ul class="image-preloader-inner list-reset">

        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
        <li class="image-preloader__item">
          <span class="image-preloader__el"></span>
        </li>
		  </ul>
      </div>
		  	<button class="portfolio__modal-btn btn btn--close"></button>
        
        <img alt="portfolio__modal-img" class="portfolio__modal-img" src='${el.imgUrl}'>
        `;
            galleryModal.innerHTML += modalTemplate;
            document.querySelector('.portfolio__modal-img').onload =
              function () {
                document.querySelector(
                  '.portfolio__modal-img'
                ).style.opacity = 1;
                document.querySelector('.image-preloader').style.visibility =
                  'hidden';
              };
            document
              .querySelector('.image-preloader')
              .addEventListener('click', galleryModalClose);
          }
          const galleryModalCloseBtn = document.querySelector(
            '.portfolio__modal-btn'
          );

          galleryModalCloseBtn.addEventListener('click', () => {
            galleryModalClose();
          });
          galleryModal.addEventListener('click', e => {
            if (e.target == galleryModal) {
              galleryModalClose();
            }
          });
        }
      });
    });
  });

  function galleryModalClose() {
    galleryModal.classList.remove('portfolio__modal-bg');
    galleryModal.innerHTML = '';
    document.querySelector('body').classList.remove('dis-scroll');
  }
}

const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

window.onscroll = function (e) {
  if (window.scrollY >= hero.clientHeight) {
    header.classList.add('header--active');
  } else {
    header.classList.remove('header--active');
  }
};

window.onload = function () {
  document.querySelector('.preloader').style.display = 'none';
  setTimeout(
    () =>
      document
        .querySelector('.hero__title')
        .classList.remove('hero__title--disable'),
    1200
  );
  setTimeout(
    () =>
      document
        .querySelector('.header__inner')
        .classList.remove('header__inner--disable'),
    2000
  );
  setTimeout(
    () =>
      document
        .querySelector('.hero__btn')
        .classList.remove('hero__btn--disable'),
    1500
  );
  setTimeout(() => {
    document.querySelector('.hero').classList.remove('hero--disable');
  }, 2000);
};

const heroModalBtn = document.querySelector('.hero__btn');
const heroModalWrapper = document.querySelector('.hero-modal');
const heroModalClose = document.querySelector('.hero-modal__close');
const heroModal = document.querySelector('.hero-modal__inner');
const sendingErrorModal = document.querySelector('.hero-modal__not-send');
const sendingСompletedModal = document.querySelector('.hero-modal__send');
const sendingModal = document.querySelector('.hero-modal__sending');

heroModalBtn.addEventListener('click', heroModalOpen);
heroModalClose.addEventListener('click', heroModalOpen);
heroModalWrapper.addEventListener('click', e => {
  e.target == heroModalWrapper && heroModalOpen();
});

function heroModalOpen() {
  sendingErrorModal.classList.add('is-hidden');
  sendingСompletedModal.classList.add('is-hidden');
  sendingModal.classList.remove('is-hidden');
  heroModalWrapper.classList.toggle('hero-modal--open');
  heroModal.classList.toggle('hero-modal__inner--open');
  document.querySelector('body').classList.toggle('dis-scroll');
}

function videoPlayer() {
  const playerWrapper = document.querySelector('.player');
  const playerVideo = document.querySelector('.player__video');
  const playerPlayBtn = document.querySelector('.player__play');
  const playerMuteBtn = document.querySelector('.player__volume');
  const playerVolumeRange = document.querySelector('.player__volume-range');
  const playerFullScreen = document.querySelector('.player__full');
  const playerProgressBar = document.querySelector(
    '.player__time-progress-range'
  );
  const playerProgressPassed = document.querySelector('.player__time-passed');
  const playerProgressLeft = document.querySelector('.player__time-left');
  var playStatus = true;
  var volumeStatus = true;
  var volumeValue = 0.5;
  var fullScreenStatus = true;

  playerPlayBtn.addEventListener('click', () => {
    playStatus ? playVideo() : pauseVideo();
    playerPlayBtn.classList.toggle('btn--play-pause');
  });

  playerMuteBtn.addEventListener('click', muteVideo);

  playerVolumeRange.addEventListener('input', () => {
    volumeValue = playerVolumeRange.value / 100;
    valumeVideo();

    if (playerVolumeRange.value == 0) {
      playerMuteBtn.classList.add('btn--volume-mute');
      volumeStatus = !volumeStatus;
    } else {
      playerMuteBtn.classList.remove('btn--volume-mute');
    }
  });

  playerFullScreen.addEventListener('click', fullScreenVideo);

  playerVideo.ontimeupdate = progressUpdate;

  playerVideo.addEventListener('dblclick', fullScreenVideo);

  playerVideo.addEventListener('click', () => {
    playStatus ? playVideo() : pauseVideo();
    playerPlayBtn.classList.toggle('btn--play-pause');
  });

  playerProgressBar.addEventListener('input', videoRewind);

  document.addEventListener('DOMContentLoaded', timeSet);

  function playVideo() {
    playerVideo.play();
    playStatus = !playStatus;
    playerTimeLeft();
  }

  function pauseVideo() {
    playerVideo.pause();
    playStatus = !playStatus;
  }

  function muteVideo() {
    if (volumeStatus) {
      playerVideo.volume = 0;
      playerVolumeRange.value = 0;
      playerMuteBtn.classList.add('btn--volume-mute');
    } else {
      playerVideo.volume = 1;
      playerVolumeRange.value = volumeValue * 100;
      playerVolumeRange.value = 50;
      playerMuteBtn.classList.remove('btn--volume-mute');
    }
    volumeStatus = !volumeStatus;
  }

  function valumeVideo() {
    playerVideo.volume = volumeValue;
  }

  function fullScreenVideo() {
    fullScreenStatus
      ? playerWrapper.requestFullscreen()
      : document.exitFullscreen();
    fullScreenStatus = !fullScreenStatus;
    playerFullScreen.classList.toggle('btn--full-opposite');
  }

  function timeSet() {
    let timePass = playerVideo.currentTime;
    let playerHours = Math.floor(timePass / 60 / 60) % 24;
    let playerMinutes = Math.floor(timePass / 60) % 60;
    let playerSeconds = Math.floor(timePass) % 60;
    playerSeconds = playerSeconds < 10 ? '0' + playerSeconds : playerSeconds;
    playerMinutes = playerMinutes < 10 ? '0' + playerMinutes : playerMinutes;
    playerProgressPassed.textContent = `${playerHours}:${playerMinutes}:${playerSeconds}`;
  }

  function playerTimeLeft() {
    let timeLeft = playerVideo.duration;
    let playerHours2 = Math.floor(timeLeft / 60 / 60) % 24;
    let playerMinutes2 = Math.floor(timeLeft / 60) % 60;
    let playerSeconds2 = Math.floor(timeLeft) % 60;
    playerSeconds2 =
      playerSeconds2 < 10 ? '0' + playerSeconds2 : playerSeconds2;
    playerMinutes2 =
      playerMinutes2 < 10 ? '0' + playerMinutes2 : playerMinutes2;
    playerProgressLeft.textContent = `${playerHours2}:${playerMinutes2}:${playerSeconds2}`;
  }

  function progressUpdate() {
    let timePass = playerVideo.currentTime;
    let timeLeft = playerVideo.duration;
    playerProgressBar.setAttribute('max', timeLeft);
    playerProgressBar.value = timePass;
    console.log(playerProgressBar.value);
    timeSet();
  }

  function videoRewind() {
    playerVideo.currentTime = playerProgressBar.value;
  }
}
