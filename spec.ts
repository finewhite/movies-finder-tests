import {browser, element, $, By, ExpectedConditions as EC} from 'protractor'
import {beforeEach} from "selenium-webdriver/testing";

describe('Main page', function () {
    beforeEach(async function () {
        await browser.get('/')
    })
    it('Should have "Search"', async function () {
        let searchfield = element(By.name('searchStr'))
        let searchtitel = element(By.cssContainingText('p', 'Search for a movie using the form below'))
        let searchbutton = element(By.cssContainingText('button', 'Go!'))
        await browser.wait(EC.visibilityOf(searchfield))
        await browser.wait(EC.visibilityOf(searchtitel))
        await browser.wait(EC.visibilityOf(searchbutton))
    });
    it('Should have "Movies Category"', async function () {
        let moviescategory = element(By.cssContainingText('div', 'Movies Category'))
        let moviescategories = element.all(By.className('list-group-item'))
        await browser.wait(EC.visibilityOf(moviescategory))
        await expect<any>(moviescategories.count()).toBe(19)
    });
    it('Should have "Upcoming Movies section"', async function () {
        let upcomingmovies = element(By.cssContainingText('a', 'Upcoming Movies'))
        await browser.wait(EC.visibilityOf(upcomingmovies))
    });
    it('Should have "Popular Series"', async function () {
        let popularseries = element(By.cssContainingText('a', 'Popular Series'))
        await browser.wait(EC.visibilityOf(popularseries))
    });
    it('Should have "Top Rated Movies"', async function () {
        let topratedmovies = element(By.cssContainingText('h3', 'Top Rated Movies'))
        let moviecards = element.all(By.css('movie-card'))
        await browser.wait(EC.visibilityOf(topratedmovies))
        await expect<any>(moviecards.count()).toBe(40)
    });
});
describe('Movie card', function () {
    beforeEach(async function () {
        await browser.get('/')
    })
    it('Should contain movie poster', async function () {
        let movieposter = element.all(By.css('movie-card')).all(By.css('img')).first()
        await expect<any>(movieposter.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg')
    });
    it('Should contain movie name', async function () {
        let moviename = element.all(By.className('caption')).all(By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge'))
        await expect(moviename.isDisplayed())
    });
    it('Should contain movie release date', async function () {
        let releasedate = element.all(By.cssContainingText('p', '1995-10-20'))
        await expect(releasedate.isDisplayed())
    });
    it('Should contain rating', async function () {
        let rating = element.all(By.className('label label-success pull-right')).first()
        await expect(rating.isDisplayed())
    });
    it('Should contain "View details »" link', async function () {
        let viewdetails = element.all(By.cssContainingText('a', 'View details »')).first()
        await expect(viewdetails.isDisplayed())
    });
});
describe('Movies Category', function () {
    it('Should contain known categories', async function () {
        await browser.get('/')
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
describe('Search for a movie', function () {
    beforeEach(async function () {
        await browser.get('/')
    })
    it('Should find a movie', async function () {
        let searchfield = element(By.name('searchStr'))
        let searchbutton = element.all(By.className('btn btn-primary')).last()
        await browser.wait(EC.visibilityOf(searchfield))
        await searchfield.sendKeys('Dilwale Dulhania Le Jayenge')
        await searchbutton.click()
        let searchresult = element(By.cssContainingText('h3', 'Search Results'))
        let searchresultfound = element.all(By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).first().all(By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge'))
        await browser.wait(EC.visibilityOf(searchresult))
        await browser.wait(EC.visibilityOf(searchresultfound.first()))
    });
    it('Should find nothing', async function () {
        let searchfield = element(By.name('searchStr'))
        let searchbutton = element.all(By.className('btn btn-primary')).last()
        await browser.wait(EC.visibilityOf(searchfield))
        await searchfield.sendKeys('fdgdfgsdfg')
        await searchbutton.click()
        let searchresult = element(By.cssContainingText('h3', 'Search Results'))
        let searchresultfound = element.all(By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).count()
        await browser.wait(EC.visibilityOf(searchresult))
        await expect<any>(searchresultfound).toBe(20)
    });
});
describe('Movie page', function () {
    beforeEach(async function () {
        await browser.get('/movie/19404')
    })
    it('Should contain movie poster', async function () {
        let movieposter = element.all(By.className('thumbnail')).first()
        await expect<any>(movieposter.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg')
    });
    it('Should contain movie name', async function () {
        let moviename = element.all(By.className('col-md-8')).all(By.cssContainingText('h2', 'Dilwale Dulhania Le Jayenge'))
        await expect(moviename.isDisplayed())
    });
    it('Should contain movie rating', async function () {
        let movierating = element(By.className('label label-warning'))
        await browser.wait(EC.visibilityOf(movierating))
    });
    it('Should contain movie slogan', async function () {
        let movieslogan = element(By.cssContainingText('p', 'Come Fall In love, All Over Again..'))
        await browser.wait(EC.visibilityOf(movieslogan))
    });
    it('Should contain movie genre', async function () {
        let movieslogan = element.all(By.className('label label-info m-r-md')).map(function (elm, index) {
            return {
                index: index,
                text: elm.getText()
            };
        });
        await expect<any>(movieslogan).toEqual([
            {index: 0, text: 'Comedy'},
            {index: 1, text: 'Drama'},
            {index: 2, text: 'Romance'}
        ]);
    });
    it('Should contain movie overview', async function () {
        let overview = element(By.cssContainingText('h3', 'Overview'))
        let overviewtext = element(By.cssContainingText('p', 'Raj is a rich, carefree, happy-go-lucky second generation NRI'))
        await browser.wait(EC.visibilityOf(overview))
        await browser.wait(EC.visibilityOf(overviewtext))
    });
    it('Should contain movie cast', async function () {
        let cast = element(By.cssContainingText('h3', 'Cast'))
        let castactors = element.all(By.className('col-md-3')).all(By.className('thumbnail'))
        await browser.wait(EC.visibilityOf(cast))
        await expect<any>(castactors.count()).toBe(4)
    });
    it('Should contain movie trailer', async function () {
        let trailertitel = element(By.cssContainingText('h2', 'Official Trailer'))
        let trailer = element(By.className('embed-responsive embed-responsive-16by9'))
        await browser.wait(EC.visibilityOf(trailertitel))
        await browser.wait(EC.visibilityOf(trailer))
    });
    it('Should contain movie reviews', async function () {
        let review = element(By.cssContainingText('h2', 'Reviews'))
        let reviewtext = element(By.cssContainingText('p', 'The Dilwale Dulhania Le Jayenge is a film considered by most'))
        await browser.wait(EC.visibilityOf(review))
        await browser.wait(EC.visibilityOf(reviewtext))
    });
});
describe('Actor`s page', function () {
    beforeEach(async function () {
        await browser.get('/actor/35742')
    })
    it('Should contain actor`s photo', async function () {
        let actorsphoto = element.all(By.className('thumbnail')).all(By.css('img')).first()
        await expect<any>(actorsphoto.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//unfoh4zAiPvnQsHeE2CUgpNOX9u.jpg')
    });
    it('Should contain actor`s name', async function () {
        let actorsname = element.all(By.className('col-md-3')).last().all(By.cssContainingText('h4', 'Shah Rukh Khan')).first()
        await browser.wait(EC.visibilityOf(actorsname))
    });
    it('Should contain actor`s Birthday', async function () {
        let actorsbirthday = element(By.cssContainingText('p', 'Birthday: '))
        await browser.wait(EC.visibilityOf(actorsbirthday))
    });
    it('Should contain actor`s Place of Birth', async function () {
        let actorsplace = element(By.cssContainingText('p', 'New Delhi, Delhi, India'))
        await browser.wait(EC.visibilityOf(actorsplace))
    });
    it('Should contain actor`s Popularity', async function () {
        let actorspopularity = element(By.cssContainingText('p', 'Popularity'))
        await browser.wait(EC.visibilityOf(actorspopularity))
    });
    it('Should contain actor`s Movies', async function () {
        let movies = element(By.cssContainingText('h3', 'Movies'))
        let actorsmovies = element.all(By.className('col-sm-3'))
        await browser.wait(EC.visibilityOf(movies))
        await expect<any>(actorsmovies.count()).toBe(92)
    });
});
describe('Site`s logo', function () {
    it('Should lead to the main page', async function () {
        await browser.get('/actor/35742')
        let logo = element(By.className('navbar-brand'))
        await logo.click()
        await expect<any>(browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/')
    });
});
describe('Site`s footer', function () {
    fit('Should contain "© 2016 Company, Inc."', async function () {
        await browser.get('/')
        let footer = element(By.css('footer'))
        await expect<any>(footer.getText()).toBe('© 2016 Company, Inc.')
    });
});

