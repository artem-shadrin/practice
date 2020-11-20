/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
document.addEventListener('DOMContentLoaded',() => { 
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const promo = document.querySelector('.promo'),
          adv = promo.querySelectorAll(".promo__adv img"),
          poster = promo.querySelector(".promo__bg"),
          interactiveList = promo.querySelector(".promo__interactive-list"),
          add = promo.querySelector('.add');
    const deleteAdv = () => {
        adv.forEach(item => {
            item.remove();
        });
    };
    poster.querySelector(".promo__genre").textContent = "драма";
    poster.style.backgroundImage = `url("img/bg.jpg")`;
    const deleteFilm = (btn) => {
        btn.addEventListener('click', () => {
            delete movieDB.movies[btn.parentElement.textContent[0]-1];
            btn.parentElement.remove();
            movieDB.movies.sort();
            refreshInteractiveList();
        });
    };
    const refreshInteractiveList = () => {
        interactiveList.innerHTML = ``;
        movieDB.movies.forEach((film, i) => {
            interactiveList.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>`;
        });
        interactiveList.querySelectorAll('.delete').forEach((btn, i) => {
            deleteFilm(btn);
        });
    };
    const addMovie = (movieName) => {
        if(movieName.length>21){
            movieName = `${movieName.substring(0,22)}...`;
        }
        movieDB.movies.push(movieName);
        movieDB.movies.sort();
    };
    add.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault();
        addMovie(add.querySelector('.adding__input').value);
        refreshInteractiveList();
    }); 
    deleteAdv();
    movieDB.movies.sort();
    refreshInteractiveList();
});