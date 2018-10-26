import {browser, element, $, By, ExpectedConditions as EC} from 'protractor'
import {beforeEach} from "selenium-webdriver/testing";


class HomePage {
    async open() {
        await browser.get('/')
    }

    async searchFor(search_request: string | number) {
        let searchField = element(By.name('searchStr'))
        let searchButton = element.all(By.className('btn btn-primary')).last()
        await browser.wait(EC.visibilityOf(searchField))
        await searchField.sendKeys(search_request)
        await searchButton.click()
    }
}

class MoviePage {
    async open() {
        await browser.get('/movie/19404')
    }
}

class ActorsPage {
    async open() {
        await browser.get('/actor/35742')
    }
}

describe('Main page', async function () {
    let homePage = new HomePage()
    beforeEach(async function () {
        await homePage.open()
    })
    it('Should have "Search"', async function () {
        let searchField = element(By.name('searchStr'))
        let searchTitel = element(By.cssContainingText('p', 'Search for a movie using the form below'))
        let searchButton = element(By.cssContainingText('button', 'Go!'))
        await browser.wait(EC.visibilityOf(searchField))
        await browser.wait(EC.visibilityOf(searchTitel))
        await browser.wait(EC.visibilityOf(searchButton))
    });
    it('Should have "Movies Category"', async function () {
        let moviesCategory = element.all(By.cssContainingText('div', 'Movies Category')).first()
        let moviesCategories = element.all(By.className('list-group-item'))
        await browser.wait(EC.visibilityOf(moviesCategory))
        await expect<any>(moviesCategories.count()).toBe(19)
    });
    it('Should have "Upcoming Movies section"', async function () {
        let upcomingMovies = element(By.cssContainingText('a', 'Upcoming Movies'))
        await browser.wait(EC.visibilityOf(upcomingMovies))
    });
    it('Should have "Popular Series"', async function () {
        let popularSeries = element(By.cssContainingText('a', 'Popular Series'))
        await browser.wait(EC.visibilityOf(popularSeries))
    });
    it('Should have "Top Rated Movies"', async function () {
        let topRatedMovies = element(By.cssContainingText('h3', 'Top Rated Movies'))
        let movieCards = element.all(By.css('movie-card'))
        await browser.wait(EC.visibilityOf(topRatedMovies))
        await expect<any>(movieCards.count()).toBe(40)
    });
});
describe('Movie card', async function () {
    let homePage = new HomePage()
    beforeEach(async function () {
        await homePage.open()
    })
    it('Should contain movie poster', async function () {
        let moviePoster = element.all(By.css('movie-card')).all(By.css('img')).first()
        await expect<any>(moviePoster.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg')
    });
    it('Should contain movie name', async function () {
        let movieName = element.all(By.className('caption')).all(By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge'))
        await expect(movieName.isDisplayed())
    });
    it('Should contain movie release date', async function () {
        let releaseDate = element.all(By.cssContainingText('p', '1995-10-20'))
        await expect(releaseDate.isDisplayed())
    });
    it('Should contain rating', async function () {
        let rating = element.all(By.className('label label-success pull-right')).first()//NoSuchElementError: Index out of bound. - если все тесты запускать
        await expect(rating.isDisplayed())
    });
    it('Should contain "View details »" link', async function () {
        let viewDetails = element.all(By.cssContainingText('a', 'View details »')).first()//NoSuchElementError: Index out of bound. - если все тесты запускать
        await expect(viewDetails.isDisplayed())
    });
});
describe('Movies Category', function () {
    it('Should contain known categories', async function () {
        let homePage = new HomePage()
        await homePage.open()
        let categories = element.all(By.className('list-group-item')).map(function (elm, index) {
            return {
                index: index,
                text: elm.getText()
            };
        });
        await expect<any>(categories).toEqual([
            {index: 0, text: 'Action'},
            {index: 1, text: 'Adventure'},
            {index: 2, text: 'Animation'},
            {index: 3, text: 'Comedy'},
            {index: 4, text: 'Crime'},
            {index: 5, text: 'Documentary'},
            {index: 6, text: 'Drama'},
            {index: 7, text: 'Family'},
            {index: 8, text: 'Fantasy'},
            {index: 9, text: 'History'},
            {index: 10, text: 'Horror'},
            {index: 11, text: 'Music'},
            {index: 12, text: 'Mystery'},
            {index: 13, text: 'Romance'},
            {index: 14, text: 'Science Fiction'},
            {index: 15, text: 'TV Movie'},
            {index: 16, text: 'Thriller'},
            {index: 17, text: 'War'},
            {index: 18, text: 'Western'}
        ]);
    });
});
describe('Search for a movie', async function () {
    let homePage = new HomePage()
    beforeEach(async function () {
        await homePage.open()
    })
    it('Should find a movie', async function () {
        homePage.searchFor('Dilwale Dulhania Le Jayenge')
        let searchResult = element(By.cssContainingText('h3', 'Search Results'))
        let searchResultfound = element.all(By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).first().all(By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge')).first()
        await browser.wait(EC.visibilityOf(searchResult))
        await browser.wait(EC.visibilityOf(searchResultfound))
    });
    it('Should find nothing', async function () {
        homePage.searchFor('fdaggadgagd')
        let searchResult = element(By.cssContainingText('h3', 'Search Results'))
        let searchResultfound = element.all(By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).count()
        await browser.wait(EC.visibilityOf(searchResult))
        await expect<any>(searchResultfound).toBe(20)
    });
});
describe('Movie page', async function () {
    let moviePage = new MoviePage()
    beforeEach(async function () {
        await moviePage.open()
    })
    it('Should contain movie poster', async function () {
        let moviePoster = element.all(By.className('thumbnail')).first()
        await expect<any>(moviePoster.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg')
    });
    it('Should contain movie name', async function () {
        let movieName = element.all(By.className('col-md-8')).all(By.cssContainingText('h2', 'Dilwale Dulhania Le Jayenge'))
        await expect(movieName.isDisplayed())
    });
    it('Should contain movie rating', async function () {
        let movieRating = element(By.className('label label-warning'))
        await browser.wait(EC.visibilityOf(movieRating))
    });
    it('Should contain movie slogan', async function () {
        let movieSlogan = element(By.cssContainingText('p', 'Come Fall In love, All Over Again..'))
        await browser.wait(EC.visibilityOf(movieSlogan))
    });
    it('Should contain movie genre', async function () {
        let movieGenre = element.all(By.className('label label-info m-r-md')).map(function (elm, index) {
            return {
                index: index,
                text: elm.getText()
            };
        });
        await expect<any>(movieGenre).toEqual([
            {index: 0, text: 'Comedy'},
            {index: 1, text: 'Drama'},
            {index: 2, text: 'Romance'}
        ]);
    });
    it('Should contain movie overview', async function () {
        let overview = element(By.cssContainingText('h3', 'Overview'))
        let overviewText = element(By.cssContainingText('p', 'Raj is a rich, carefree, happy-go-lucky second generation NRI'))
        await browser.wait(EC.visibilityOf(overview))
        await browser.wait(EC.visibilityOf(overviewText))
    });
    it('Should contain movie cast', async function () {
        let cast = element(By.cssContainingText('h3', 'Cast'))
        let castActors = element.all(By.className('col-md-3')).all(By.className('thumbnail'))
        await browser.wait(EC.visibilityOf(cast))
        await expect<any>(castActors.count()).toBe(4)
    });
    it('Should contain movie trailer', async function () {
        let trailerTitel = element(By.cssContainingText('h2', 'Official Trailer'))
        let trailer = element(By.className('embed-responsive embed-responsive-16by9'))
        await browser.wait(EC.visibilityOf(trailerTitel))
        await browser.wait(EC.visibilityOf(trailer))
    });
    it('Should contain movie reviews', async function () {
        let review = element(By.cssContainingText('h2', 'Reviews'))
        let reviewText = element(By.cssContainingText('p', 'The Dilwale Dulhania Le Jayenge is a film considered by most'))
        await browser.wait(EC.visibilityOf(review))
        await browser.wait(EC.visibilityOf(reviewText))
    });
});
describe('Actor`s page', function () {
    let actorsPage = new ActorsPage()
    beforeEach(async function () {
        await actorsPage.open()
    })
    it('Should contain actor`s photo', async function () {
        let actorsPhoto = element.all(By.className('thumbnail')).all(By.css('img')).first()
        await expect<any>(actorsPhoto.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//unfoh4zAiPvnQsHeE2CUgpNOX9u.jpg')
    });
    it('Should contain actor`s name', async function () {
        let actorsName = element.all(By.className('col-md-3')).last().all(By.cssContainingText('h4', 'Shah Rukh Khan')).first()
        await browser.wait(EC.visibilityOf(actorsName))
    });
    it('Should contain actor`s Birthday', async function () {
        let actorsBirthday = element(By.cssContainingText('p', 'Birthday: '))
        await browser.wait(EC.visibilityOf(actorsBirthday))
    });
    it('Should contain actor`s Place of Birth', async function () {
        let actorsPlace = element(By.cssContainingText('p', 'New Delhi, Delhi, India'))
        await browser.wait(EC.visibilityOf(actorsPlace))
    });
    it('Should contain actor`s Popularity', async function () {
        let actorsPopularity = element(By.cssContainingText('p', 'Popularity'))
        await browser.wait(EC.visibilityOf(actorsPopularity))
    });
    it('Should contain actor`s Movies', async function () {
        let movies = element(By.cssContainingText('h3', 'Movies'))
        let actorsMovies = element.all(By.className('col-sm-3'))
        await browser.wait(EC.visibilityOf(movies))
        await expect<any>(actorsMovies.count()).toBe(92)
    });
});
describe('Site`s logo', function () {
    it('Should lead to the main page', async function () {
        let actorsPage = new ActorsPage()
        await actorsPage.open()
        let logo = element(By.className('navbar-brand'))
        await logo.click()
        await expect<any>(browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/')
    });
});
describe('Site`s footer', function () {
    it('Should contain "© 2016 Company, Inc."', async function () {
        let homePage = new HomePage()
        await homePage.open()
        let footer = element(By.css('footer'))
        await expect<any>(footer.getText()).toBe('© 2016 Company, Inc.')
    });
});

