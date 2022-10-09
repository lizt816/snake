import './style/index.less';
console.log("111");
class Food{
    // 定义一个属性表示食物对应的元素
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!;  // 不加！会有红色波浪线是因为getid的时候可能是unll
    }
    // 获取x坐标
    get X(){
        return this.element.offsetLeft
    }
    get Y(){
        return this.element.offsetTop
    }
    change(){
        // 生成一个随机数
        // 食物的位置最小是0 最大是290
        // 蛇移动一次就是一格，一格的大小就是10所以就要求食物的坐标必须是整10
        
        // Math.random() 生成一个0-1之间的随机数 0.1 * 29
        // Math.round() 四舍五入 取整
        // Math.round(Math.random() * 290)
        // 下面这个就是获取0-1随机数，* 29 最大就是29 取整之后在 * 10 最大就是290
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

class ScorePanel{
    score = 0;
    level = 1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    // 设置一个变量限制
    maxLevel:number;
    constructor(maxLevel:number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel
    }
    // 加分的函数
    addScore(){
        this.scoreEle.innerHTML = ++this.score+'';
        // 判断分数是多少  每10分升一级
        if(this.score % 10 === 0){
            this.levelUp()
        }
    }
    // 等级提升
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level+'';
        }
    }

}

let a = new ScorePanel()
a.levelUp()
a.levelUp()
a.levelUp()