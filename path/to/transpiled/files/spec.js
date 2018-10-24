"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const testing_1 = require("selenium-webdriver/testing");
describe('Main page', function () {
    testing_1.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/');
        });
    });
    it('Should have "Search"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let searchfield = protractor_1.element(protractor_1.By.name('searchStr'));
            let searchtitel = protractor_1.element(protractor_1.By.cssContainingText('p', 'Search for a movie using the form below'));
            let searchbutton = protractor_1.element(protractor_1.By.cssContainingText('button', 'Go!'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchfield));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchtitel));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchbutton));
        });
    });
    it('Should have "Movies Category"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let moviescategory = protractor_1.element(protractor_1.By.cssContainingText('div', 'Movies Category'));
            let moviescategories = protractor_1.element.all(protractor_1.By.className('list-group-item'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(moviescategory));
            yield expect(moviescategories.count()).toBe(19);
        });
    });
    it('Should have "Upcoming Movies section"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let upcomingmovies = protractor_1.element(protractor_1.By.cssContainingText('a', 'Upcoming Movies'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(upcomingmovies));
        });
    });
    it('Should have "Popular Series"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let popularseries = protractor_1.element(protractor_1.By.cssContainingText('a', 'Popular Series'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(popularseries));
        });
    });
    it('Should have "Top Rated Movies"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let topratedmovies = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Top Rated Movies'));
            let moviecards = protractor_1.element.all(protractor_1.By.css('movie-card'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(topratedmovies));
            yield expect(moviecards.count()).toBe(40);
        });
    });
});
describe('Movie card', function () {
    testing_1.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/');
        });
    });
    it('Should contain movie poster', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movieposter = protractor_1.element.all(protractor_1.By.css('movie-card')).all(protractor_1.By.css('img')).first();
            yield expect(movieposter.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg');
        });
    });
    it('Should contain movie name', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let moviename = protractor_1.element.all(protractor_1.By.className('caption')).all(protractor_1.By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge'));
            yield expect(moviename.isDisplayed());
        });
    });
    it('Should contain movie release date', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let releasedate = protractor_1.element.all(protractor_1.By.cssContainingText('p', '1995-10-20'));
            yield expect(releasedate.isDisplayed());
        });
    });
    it('Should contain rating', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let rating = protractor_1.element.all(protractor_1.By.className('label label-success pull-right')).first();
            yield expect(rating.isDisplayed());
        });
    });
    it('Should contain "View details »" link', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let viewdetails = protractor_1.element.all(protractor_1.By.cssContainingText('a', 'View details »')).first();
            yield expect(viewdetails.isDisplayed());
        });
    });
});
describe('Movies Category', function () {
    it('Should contain known categories', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/');
            let categories = protractor_1.element.all(protractor_1.By.className('list-group-item')).map(function (elm, index) {
                return {
                    index: index,
                    text: elm.getText()
                };
            });
            yield expect(categories).toEqual([
                { index: 0, text: 'Action' },
                { index: 1, text: 'Adventure' },
                { index: 2, text: 'Animation' },
                { index: 3, text: 'Comedy' },
                { index: 4, text: 'Crime' },
                { index: 5, text: 'Documentary' },
                { index: 6, text: 'Drama' },
                { index: 7, text: 'Family' },
                { index: 8, text: 'Fantasy' },
                { index: 9, text: 'History' },
                { index: 10, text: 'Horror' },
                { index: 11, text: 'Music' },
                { index: 12, text: 'Mystery' },
                { index: 13, text: 'Romance' },
                { index: 14, text: 'Science Fiction' },
                { index: 15, text: 'TV Movie' },
                { index: 16, text: 'Thriller' },
                { index: 17, text: 'War' },
                { index: 18, text: 'Western' }
            ]);
        });
    });
});
describe('Search for a movie', function () {
    testing_1.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/');
        });
    });
    it('Should find a movie', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let searchfield = protractor_1.element(protractor_1.By.name('searchStr'));
            let searchbutton = protractor_1.element.all(protractor_1.By.className('btn btn-primary')).last();
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchfield));
            yield searchfield.sendKeys('Dilwale Dulhania Le Jayenge');
            yield searchbutton.click();
            let searchresult = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Search Results'));
            let searchresultfound = protractor_1.element.all(protractor_1.By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).first().all(protractor_1.By.cssContainingText('h4', 'Dilwale Dulhania Le Jayenge'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchresult));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchresultfound.first()));
        });
    });
    it('Should find nothing', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let searchfield = protractor_1.element(protractor_1.By.name('searchStr'));
            let searchbutton = protractor_1.element.all(protractor_1.By.className('btn btn-primary')).last();
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchfield));
            yield searchfield.sendKeys('fdgdfgsdfg');
            yield searchbutton.click();
            let searchresult = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Search Results'));
            let searchresultfound = protractor_1.element.all(protractor_1.By.className('col-sm-6 col-md-4 col-lg-3 col-xs-6')).count();
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(searchresult));
            yield expect(searchresultfound).toBe(20);
        });
    });
});
describe('Movie page', function () {
    testing_1.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/movie/19404');
        });
    });
    it('Should contain movie poster', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movieposter = protractor_1.element.all(protractor_1.By.className('thumbnail')).first();
            yield expect(movieposter.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500//uC6TTUhPpQCmgldGyYveKRAu8JN.jpg');
        });
    });
    it('Should contain movie name', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let moviename = protractor_1.element.all(protractor_1.By.className('col-md-8')).all(protractor_1.By.cssContainingText('h2', 'Dilwale Dulhania Le Jayenge'));
            yield expect(moviename.isDisplayed());
        });
    });
    it('Should contain movie rating', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movierating = protractor_1.element(protractor_1.By.className('label label-warning'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(movierating));
        });
    });
    it('Should contain movie slogan', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movieslogan = protractor_1.element(protractor_1.By.cssContainingText('p', 'Come Fall In love, All Over Again..'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(movieslogan));
        });
    });
    it('Should contain movie genre', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movieslogan = protractor_1.element.all(protractor_1.By.className('label label-info m-r-md')).map(function (elm, index) {
                return {
                    index: index,
                    text: elm.getText()
                };
            });
            yield expect(movieslogan).toEqual([
                { index: 0, text: 'Comedy' },
                { index: 1, text: 'Drama' },
                { index: 2, text: 'Romance' }
            ]);
        });
    });
    it('Should contain movie overview', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let overview = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Overview'));
            let overviewtext = protractor_1.element(protractor_1.By.cssContainingText('p', 'Raj is a rich, carefree, happy-go-lucky second generation NRI'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(overview));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(overviewtext));
        });
    });
    it('Should contain movie cast', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let cast = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Cast'));
            let castactors = protractor_1.element.all(protractor_1.By.className('col-md-3')).all(protractor_1.By.className('thumbnail'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(cast));
            yield expect(castactors.count()).toBe(4);
        });
    });
    it('Should contain movie trailer', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let trailertitel = protractor_1.element(protractor_1.By.cssContainingText('h2', 'Official Trailer'));
            let trailer = protractor_1.element(protractor_1.By.className('embed-responsive embed-responsive-16by9'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(trailertitel));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(trailer));
        });
    });
    it('Should contain movie reviews', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let review = protractor_1.element(protractor_1.By.cssContainingText('h2', 'Reviews'));
            let reviewtext = protractor_1.element(protractor_1.By.cssContainingText('p', 'The Dilwale Dulhania Le Jayenge is a film considered by most'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(review));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(reviewtext));
        });
    });
});
describe('Actor`s page', function () {
    testing_1.beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/actor/35742');
        });
    });
    it('Should contain actor`s photo', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let actorsphoto = protractor_1.element.all(protractor_1.By.className('thumbnail')).all(protractor_1.By.css('img')).first();
            yield expect(actorsphoto.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w300//unfoh4zAiPvnQsHeE2CUgpNOX9u.jpg');
        });
    });
    it('Should contain actor`s name', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let actorsname = protractor_1.element.all(protractor_1.By.className('col-md-3')).last().all(protractor_1.By.cssContainingText('h4', 'Shah Rukh Khan')).first();
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(actorsname));
        });
    });
    it('Should contain actor`s Birthday', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let actorsbirthday = protractor_1.element(protractor_1.By.cssContainingText('p', 'Birthday: '));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(actorsbirthday));
        });
    });
    it('Should contain actor`s Place of Birth', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let actorsplace = protractor_1.element(protractor_1.By.cssContainingText('p', 'New Delhi, Delhi, India'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(actorsplace));
        });
    });
    it('Should contain actor`s Popularity', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let actorspopularity = protractor_1.element(protractor_1.By.cssContainingText('p', 'Popularity'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(actorspopularity));
        });
    });
    it('Should contain actor`s Movies', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let movies = protractor_1.element(protractor_1.By.cssContainingText('h3', 'Movies'));
            let actorsmovies = protractor_1.element.all(protractor_1.By.className('col-sm-3'));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(movies));
            yield expect(actorsmovies.count()).toBe(92);
        });
    });
});
describe('Site`s logo', function () {
    it('Should lead to the main page', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/actor/35742');
            let logo = protractor_1.element(protractor_1.By.className('navbar-brand'));
            yield logo.click();
            yield expect(protractor_1.browser.getCurrentUrl()).toBe('https://movies-finder.firebaseapp.com/');
        });
    });
});
describe('Site`s footer', function () {
    fit('Should contain "© 2016 Company, Inc."', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('/');
            let footer = protractor_1.element(protractor_1.By.css('footer'));
            yield expect(footer.getText()).toBe('© 2016 Company, Inc.');
        });
    });
});
//# sourceMappingURL=spec.js.map