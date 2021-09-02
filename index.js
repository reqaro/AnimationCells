"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $root = document.getElementById('root');
const wrapItemsCreator = (items) => {
    const wrapItems = [];
    let func = () => {
        for (let i = 0; i < items; i++) {
            wrapItems.push(`<div class="cell cell__${i + 1}">${i + 1}</div>`);
        }
    };
    func();
    return wrapItems.join('');
};
const printConsole = (text) => {
    $console.insertAdjacentHTML('beforeend', `<p>${text} </p>`);
    $console.scrollTop = 9999;
};
const wrapItems = wrapItemsCreator(32);
$root.insertAdjacentHTML('beforeend', `<section class="wrapCell">${wrapItems}</section>`);
$root.insertAdjacentHTML('beforeend', `<section id="console" class="console"></section>`);
$root.insertAdjacentHTML('beforeend', `<div class="btn"><a id="start" class="start">Start</a></div>`);
const $console = document.getElementById('console');
const $cells = document.getElementsByClassName('cell');
const $startButton = document.getElementById('start');
for (let elem of $cells) {
    elem.addEventListener('animationend', () => {
        printConsole(`${elem.classList[1]} animation <span class="animation_finish">finish</span>`);
        if (elem === $cells[$cells.length - 1]) {
            printConsole('---PROGRESS FINISH---');
            $startButton.innerText = 'Start';
            for (let elem of $cells) {
                elem.classList.remove('cell__anim');
            }
        }
    });
}
let animationTime = 100;
$root.insertAdjacentHTML('beforeend', `<button type='button' id="changeAnimationTimeBtn">100 ms</button>`);
const $changeAnimationTimeBtn = document.getElementById('changeAnimationTimeBtn');
$changeAnimationTimeBtn.addEventListener('click', () => {
    animationTime === 100
        ? animationTime = 1000
        : animationTime = 100;
    $changeAnimationTimeBtn.innerText = `${animationTime} ms`;
});
$startButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    printConsole('---PROGRESS START---');
    $startButton.innerText = 'In progress';
    for (let elem of $cells) {
        yield new Promise((resolve) => {
            setTimeout(() => {
                elem.classList.add('cell__anim');
                printConsole(`${elem.classList[1]} animation <span class="animation_start">start</span>`);
                resolve();
            }, animationTime);
        });
    }
}));
