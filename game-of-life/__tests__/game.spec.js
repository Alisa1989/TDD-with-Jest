/**
 * @jest-environment jsdom
 */

require("../game");
const { 
    isAlive, 
    generate, 
    regenerate, 
    countNeighbors, 
    drawGrid, 
    attachGridEventHandler, 
    getCellsFromDom
} = window.game;

jest.useFakeTimers();

describe("the game of life", () => {
    test("should be a function", () => {
        expect(typeof isAlive).toEqual("function");
    });
    describe("isAlive algorithm", () => {
        test("dead cell with no neighbors", () => {
            expect(isAlive(0, 0)).toEqual(0)
        })
        test("dead cell with 3 neighbors should return 1", () => {
            expect(isAlive(0, 3)).toEqual(1);
        })
        test("live cell with 0 neigbors should return 0", () => {
            expect(isAlive(1, 0)).toEqual(0);
        })
        test("live cell with 2 neigbors should return 1", () => {
            expect(isAlive(1, 2)).toEqual(1);
        })
    })
    describe("generate function", () => {
        test("should be a function", () => {
            expect(typeof generate).toEqual("function");
        })
        test("should create an array of x*x squares", () => {
            expect(generate(1)).toEqual([0]); //no variable
            expect(generate(2)).toEqual([0, 0, 0, 0]);
        })
    })

    describe("countNeighbors", () => {
        test("should be a function", () => {
            expect(typeof countNeighbors).toEqual("function");
        });
        test("should count 1 for array of one", () => {
            expect(countNeighbors([1], 0)).toEqual(0);
        });
        test("should count 2 neighbors", () => {
            expect(countNeighbors([1, 1, 1, 0], 0)).toEqual(2);
        });
        test("should count 2 neighbors", () => {
            expect(countNeighbors([1, 1, 1, 0], 1)).toEqual(2);
        });
        test("should count 2 neighbors", () => {
            expect(countNeighbors([1, 1, 1, 0], 2)).toEqual(2);
        });
        test("should count 2 neighbors", () => {
            expect(countNeighbors([1, 1, 1, 0], 3)).toEqual(3);
        });
        test("should count 2 neighbors", () => {
            expect(countNeighbors([1, 1, 1, 0, 0, 0, 0, 0, 0], 4)).toEqual(3);
        });
    })

    describe("regenerate function", () => {
        test("should not update dead cells", () => {
            const cells = generate(1);
            expect(regenerate(cells)).toEqual(cells);
        })
        test("should return all dead cells", () => {
            const initialCells = generate(2)
            const cells = generate(2);
            cells[0] = 1;
            expect(regenerate(cells)).toEqual(initialCells);
        })
        test("should return all alive cells", () => {
            const cells = [1, 1, 1, 0]
            expect(regenerate(cells)).toEqual([1, 1, 1, 1]);
        })
    })

    describe("browser grid", () => {
        test("should display 1 dead cell", () => {
            document.body.innerHTML = '<div id="grid"></grid>'
            drawGrid([0]);
            expect(document.querySelectorAll('.container').length).toEqual(1);
            expect(document.querySelectorAll('.cell').length).toEqual(1);
            expect(document.querySelectorAll('.dead').length).toEqual(1);
        })
        test("should display 1 live cell", () => {
            document.body.innerHTML = '<div id="grid"></grid>'
            drawGrid([1]);
            expect(document.querySelectorAll('.container').length).toEqual(1);
            expect(document.querySelectorAll('.cell').length).toEqual(1);
            expect(document.querySelectorAll('.alive').length).toEqual(1);
        })
        test("should display 4 cells", () => {
            document.body.innerHTML = '<div id="grid"></grid>'
            drawGrid([0, 0, 1, 1]);
            expect(document.querySelectorAll('.row').length).toEqual(2);
            expect(document.querySelectorAll('.cell').length).toEqual(4);
            expect(document.querySelectorAll('.dead').length).toEqual(2);
            expect(document.querySelectorAll('.alive').length).toEqual(2);
        })
    })

    describe("event handler for grid", () => {
        test("click on cell should toggle alive/dead", () => {
            document.body.innerHTML = '<div id="grid"></grid>';
            drawGrid([0])
            attachGridEventHandler()
            expect(document.querySelectorAll('.dead').length).toEqual(1)
            expect(document.querySelectorAll('.alive').length).toEqual(0)
            const cell = document.querySelectorAll('.dead')[0]
            cell.click()
            expect(document.querySelectorAll('.dead').length).toEqual(0)
            expect(document.querySelectorAll('.alive').length).toEqual(1)
            cell.click()
            expect(document.querySelectorAll('.dead').length).toEqual(1)
            expect(document.querySelectorAll('.a').length).toEqual(0)
        });
    });

    describe("get cells from dom", () => {
        test("should fet living and dead cells from dom", () => {
            document.body.innerHTML = '<div id="grid"></grid>';
            const cells = [0, 0, 1, 1]
            drawGrid(cells)
            expect(getCellsFromDom()).toEqual(cells);
        })
    })

    describe("start function", () => {
        test("", () => {
            const getCellsFromDomSpy = jest.spyOn(game, 'getCellsFromDom');
            const setIntervalSpy = jest.spyOn(global, 'setInterval');
            const regenerateSpy = jest.spyOn(game, "regenerate");
            const drawGridSpy = jest.spyOn(game, "drawGrid");
            game.start();
            jest.runOnlyPendingTimers();
            expect(setIntervalSpy).toHaveBeenCalled();
            expect(getCellsFromDomSpy).toHaveBeenCalled();
            expect(regenerateSpy).toHaveBeenCalled();
            expect(drawGridSpy).toHaveBeenCalled();
        })
    })

    describe("stop function", () => {
        test("stop should clear interval", () => {
            const clearIntervalOnSpy = jest.spyOn(global, 'clearInterval')
            game.stop();
            expect(clearIntervalOnSpy).toHaveBeenCalled();
        })
    })
});