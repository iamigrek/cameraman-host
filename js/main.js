const randomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

let galleryDate = [
  {
    id: randomId(),
    imgUrl: './images/1.jpg',
    imgMinUrl: './images/min/1.jpg',
    class: 'reports',
  },
  {
    id: randomId(),
    imgUrl: './images/2.jpg',
    imgMinUrl: './images/min/2.jpg',
    class: 'portraits',
  },
  {
    id: randomId(),
    imgUrl: './images/3.jpg',
    imgMinUrl: './images/min/3.jpg',
    class: 'reports',
  },
  {
    id: randomId(),
    imgUrl: './images/4.jpg',
    imgMinUrl: './images/min/4.jpg',
    class: 'portraits',
  },
  {
    id: randomId(),
    imgUrl: './images/5.jpg',
    imgMinUrl: './images/min/5.jpg',
    class: 'portraits',
  },
  {
    id: randomId(),
    imgUrl: './images/6.jpg',
    imgMinUrl: './images/min/6.jpg',
    class: 'reports',
  },
  {
    id: randomId(),
    imgUrl: './images/7.jpg',
    imgMinUrl: './images/min/7.jpg',
    class: 'weddings',
  },
  {
    id: randomId(),
    imgUrl: './images/8.jpg',
    imgMinUrl: './images/min/8.jpg',
    class: 'weddings',
  },
  {
    id: randomId(),
    imgUrl: './images/9.jpg',
    imgMinUrl: './images/min/9.jpg',
    class: 'weddings',
  },
  {
    id: randomId(),
    imgUrl: './images/10.jpg',
    imgMinUrl: './images/min/10.jpg',
    class: 'reports',
  },
];

const galleryWrapper = document.querySelector('.gallery');

const galleryBtn = document.querySelectorAll('[data-class]');

galleryBtn.forEach(item => {
  item.addEventListener('click', () => {
    galleryWrapper.style.opacity = 0;
    galleryBtn.forEach(item => {
      item.classList.remove('btn--category-active');
    });
    item.classList.add('btn--category-active');
    displayPhoto(item.dataset.class);
    galleryWrapper.classList.remove('category-change');
    galleryWrapper.style.opacity = 1;
  });
});

function displayPhoto(category) {
  galleryWrapper.innerHTML = '';
  galleryDate.forEach(item => {
    if (item.class == category) {
      let photo = `
			<li id="${item.id}" class="gallery__item">
				<img src="${item.imgMinUrl}" alt="gallery__img" class="gallery__img">
			</li>
		`;
      galleryWrapper.innerHTML += photo;
    } else if (category == '') {
      let photo = `
			<li id="${item.id}" class="gallery__item">
				<img src="${item.imgMinUrl}" alt="gallery__img" class="gallery__img">
			</li>
		`;
      galleryWrapper.innerHTML += photo;
    }
    openPhoto();
  });
}

function openPhoto() {
  const galleryItem = document.querySelectorAll('.gallery__item');
  const galleryModal = document.querySelector('.portfolio__modal');

  galleryItem.forEach(item => {
    item.addEventListener('click', function () {
      const clickedPhotoId = item.closest('li').getAttribute('id');
      console.log(item.closest('li').getAttribute('id'));

      galleryDate.forEach(item => {
        if (item.id == clickedPhotoId) {
          let modalPhoto = `
			<button class="portfolio__modal-close btn btn--close">CLOSE</button>
	<div class="portfolio__modal-preloader-wrapper">
      <ul class="portfolio__modal-preloader image-preloader list-reset">
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

			<img class="portfolio__modal-img" src="${item.imgUrl}" alt="modal photo">
			<div class="portfolio__modal-bg">
			</div>
			`;

          galleryModal.innerHTML = modalPhoto;
          galleryModal.style.visibility = 'visible';

          document.querySelector('body').style.overflowY = 'hidden';

          const galleryModalClose = document.querySelector(
            '.portfolio__modal-close'
          );
          const galleryModalBg = document.querySelector('.portfolio__modal-bg');

          galleryModalClose.addEventListener('click', () => {
            galleryModal.style.visibility = 'hidden';
            document.querySelector('body').style.overflowY = 'auto';
          });
          galleryModalBg.addEventListener('click', () => {
            galleryModal.style.visibility = 'hidden';
            document.querySelector('body').style.overflowY = 'auto';
          });
          document
            .querySelector('.portfolio__modal-preloader-wrapper')
            .addEventListener('click', () => {
              galleryModal.style.visibility = 'hidden';
              document.querySelector('body').style.overflowY = 'auto';
            });
          document.querySelector('.portfolio__modal-img').onload = function () {
            document.querySelector(
              '.portfolio__modal-preloader-wrapper'
            ).style.display = 'none';
            document.querySelector('.portfolio__modal-img').style.border =
              '1px solid #fff';
          };
        }
      });
    });
  });
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

  displayPhoto('');
  setTimeout(() => (galleryWrapper.style.opacity = 1), 1000);
  setTimeout(
    () =>
      document
        .querySelector('.hero__title')
        .classList.remove('hero__title--disable'),
    1200
  );
  setTimeout(
    () => document.querySelector('.nav').classList.remove('nav--disable'),
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
    document.querySelector('body').style.overflowY = 'auto';
  }, 2000);
};

