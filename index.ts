const $root = <HTMLDivElement>document.getElementById('root')
const wrapItemsCreator = (items: number) => {
    const wrapItems: Array<string> = []
    let func = () => {
        for (let i = 0; i < items; i++) {
            wrapItems.push(`<div class="cell cell__${i + 1}">${i + 1}</div>`)
        }
    }
    func()
    return wrapItems.join('')
}
const wrapItems = wrapItemsCreator(64) // 16 32 64 ну и т.д
$root.insertAdjacentHTML('beforeend', `<section class="wrapCell">${wrapItems}</section>`)
$root.insertAdjacentHTML('beforeend', `<section id="console" class="console"></section>`)
$root.insertAdjacentHTML('beforeend', `
<div class="btn">
<a id="start" class="start">Start</a>
</div>`)
const $console = <HTMLElement>document.getElementById('console')
const printConsole = (text: string) => {
    $console.insertAdjacentHTML('beforeend', `<p>${text} </p>`)
    $console.scrollTop = 9999 // автоскролл вниз
}
const $cells = <HTMLCollection>document.getElementsByClassName('cell')
const $startButton = <HTMLLinkElement>document.getElementById('start')
$startButton.addEventListener('click', async () => { /// async
    printConsole('---PROGRESS START---')
    $startButton.innerText = 'in progress'
    for (let elem of $cells) {
        await new Promise((resolve: any) => { /// ждём исполнения функции resolve
            setTimeout(() => {
                printConsole(`${elem.classList[1]} animation <span class="animation_start">start</span>`)
                elem.classList.add('cell__anim')
                resolve()
            }, 100)
        }).then(() => setTimeout(() => printConsole(`${elem.classList[1]} animation <span class="animation_finish">finish</span>`), 400))
    }
    setTimeout(() => {
        $startButton.innerText = 'Start'
        printConsole('---PROGRESS FINISH---')
        for (let elem of $cells) {
            elem.classList.remove('cell__anim')
        }
    }, 1000)
})




