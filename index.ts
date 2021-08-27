const $root = <HTMLDivElement>document.getElementById('root')
const wrapItemsCreator = (items: number) => {  //функция принимающая кол-во(number) элементов `<div class="cell cell__${i + 1}">${i + 1}</div>` которые будут помещены в массив `wrapItems`
    const wrapItems: Array<string> = []        //массив для хранения элементов
    let func = () => {
        for (let i = 0; i < items; i++) {
            wrapItems.push(`<div class="cell cell__${i + 1}">${i + 1}</div>`)
        }
    }
    func()
    return wrapItems.join('')
}
const wrapItems = wrapItemsCreator(16) // 16 32 64 ну и т.д
$root.insertAdjacentHTML('beforeend', `<section class="wrapCell">${wrapItems}</section>`) // вставляем все элементы из `wrapItems`
$root.insertAdjacentHTML('beforeend', `<section id="console" class="console"></section>`) // создаем блок с консолью
$root.insertAdjacentHTML('beforeend', `<div class="btn"><a id="start" class="start">Start</a></div>`) // создаем кнопку Start
const $console = <HTMLElement>document.getElementById('console')
const printConsole = (text: string) => {  // функция принимающая сообщение(string) которое будет отображено в конце блока console и помещено в `<p></p>`
    $console.insertAdjacentHTML('beforeend', `<p>${text} </p>`)
    $console.scrollTop = 9999 // автоскролл вниз при вызове функции `printConsole`
}
const $cells = <HTMLCollection>document.getElementsByClassName('cell')
const $startButton = <HTMLLinkElement>document.getElementById('start')
$startButton.addEventListener('click', async () => { /// async
    printConsole('---PROGRESS START---')  // сигнал о начале выполнения функции
    $startButton.innerText = 'in progress'   // кнопка Start -> in progress
    for (let elem of $cells) {
        await new Promise((resolve: any) => { /// ждём исполнения функции resolve
            setTimeout(() => {
                elem.classList.add('cell__anim') // добовление класса с анимацией
                printConsole(`${elem.classList[1]} animation <span class="animation_start">start</span>`) // сигнал в консоль о начале анимации у блока elem
                resolve()
            }, 100)
        }).then(() => setTimeout(() => printConsole(`${elem.classList[1]} animation <span class="animation_finish">finish</span>`), 400)) // сигнал об окончании анимации. По таймеру
    }
    setTimeout(() => { // костыль который обязательно должет имень задержку >800,  иначе выполнение будет быстрее чем закончится .then выше. Не знаю как сделать это нрмально
        $startButton.innerText = 'Start'   // кнопка in progress -> Start
        printConsole('---PROGRESS FINISH---') // сигнал об окончании работы программы
        for (let elem of $cells) {
            elem.classList.remove('cell__anim') // удаление класса с анимацией у всех элементов коллекции $cells
        }
    }, 1000)
})




