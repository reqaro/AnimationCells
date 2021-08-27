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
const wrapItems = wrapItemsCreator(16);
$root.insertAdjacentHTML('beforeend', `<section class="wrapCell">${wrapItems}</section>`);
$root.insertAdjacentHTML('beforeend', `<section id="console" class="console"></section>`);
$root.insertAdjacentHTML('beforeend', `<div class="btn"><a id="start" class="start">Start</a></div>`);
const $console = document.getElementById('console');
const printConsole = (text) => {
    $console.insertAdjacentHTML('beforeend', `<p>${text} </p>`);
    $console.scrollTop = 9999;
};
const $cells = document.getElementsByClassName('cell');
const $startButton = document.getElementById('start');
$startButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    printConsole('---PROGRESS START---');
    $startButton.innerText = 'in progress';
    for (let elem of $cells) {
        yield new Promise((resolve) => {
            setTimeout(() => {
                elem.classList.add('cell__anim');
                printConsole(`${elem.classList[1]} animation <span class="animation_start">start</span>`);
                resolve();
            }, 100);
        }).then(() => setTimeout(() => printConsole(`${elem.classList[1]} animation <span class="animation_finish">finish</span>`), 400));
    }
    setTimeout(() => {
        $startButton.innerText = 'Start';
        printConsole('---PROGRESS FINISH---');
        for (let elem of $cells) {
            elem.classList.remove('cell__anim');
        }
    }, 1000);
}));
