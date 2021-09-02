const $root = <HTMLDivElement>document.getElementById('root')

const wrapItemsCreator = (items: number) => {  //функция принимающая кол-во(number) элементов `<div class="cell cell__${i + 1}">${i + 1}</div>` которые будут помещены в массив wrapItems
    const wrapItems: Array<string> = []        //массив для хранения элементов
    let func = () => {
        for (let i = 0; i < items; i++) {
            wrapItems.push(`<div class="cell cell__${i + 1}">${i + 1}</div>`)
        }
    }
    func()
    return wrapItems.join('')
}
const printConsole = (text: string) => {  // функция принимающая сообщение(string) которое будет отображено в конце блока console и помещено в <p></p>
    $console.insertAdjacentHTML('beforeend', `<p>${text} </p>`)
    $console.scrollTop = 9999 // автоскролл вниз при вызове функции `printConsole` //scrollBy(0,20)
}

const wrapItems = wrapItemsCreator(32) // 16 32 64
$root.insertAdjacentHTML('beforeend', `<section class="wrapCell">${wrapItems}</section>`) // вставляем все элементы из wrapItems
$root.insertAdjacentHTML('beforeend', `<section id="console" class="console"></section>`) // создаем блок с консолью
$root.insertAdjacentHTML('beforeend', `<div class="btn"><a id="start" class="start">Start</a></div>`) // создаем кнопку Start
const $console = <HTMLElement>document.getElementById('console')

const $cells = <HTMLCollection>document.getElementsByClassName('cell')
const $startButton = <HTMLLinkElement>document.getElementById('start')


for (let elem of $cells) {           // каждому элементу из $cells добавляем слушатель animationend
    elem.addEventListener('animationend', () => {
        printConsole(`${elem.classList[1]} animation <span class="animation_finish">finish</span>`) // сигнал в консоль, что анимация элемента elem завершена
        if (elem === $cells[$cells.length - 1]) {
            printConsole('---PROGRESS FINISH---')  // сигнализируем в консоль что анимация всех элементов завершена
            $startButton.innerText = 'Start' // меняем кнопку на Start
            for (let elem of $cells) {
                elem.classList.remove('cell__anim') // удаляем класс с анимацией у всех элементов $cells
            }
        }
    })
}

let animationTime = 100
$root.insertAdjacentHTML('beforeend', `<button type='button' id="changeAnimationTimeBtn">100 ms</button>`)
const $changeAnimationTimeBtn = <HTMLLinkElement>document.getElementById('changeAnimationTimeBtn')

$changeAnimationTimeBtn.addEventListener('click', () => {
    animationTime === 100
        ? animationTime = 1000
        : animationTime = 100
    $changeAnimationTimeBtn.innerText = `${animationTime} ms`
})


$startButton.addEventListener('click', async () => { /// async
    printConsole('---PROGRESS START---')  // сигнал о начале выполнения функции
    $startButton.innerText = 'In progress'   // кнопка Start -> In progress
    for (let elem of $cells) {
        await new Promise((resolve: any) => {
            setTimeout(() => {
                elem.classList.add('cell__anim') // добовление класса с анимацией
                printConsole(`${elem.classList[1]} animation <span class="animation_start">start</span>`) // сигнал в консоль о начале анимации у блока elem
                resolve()  // ждём исполнения функции resolve
            }, animationTime)
        })
    }
})



