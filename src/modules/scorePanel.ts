class ScorePanel{
    score = 0;
    level = 1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    upScore:number;
    // 设置一个变量限制
    maxLevel:number;
    constructor(maxLevel:number = 10,upScore:number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 加分的函数
    addScore(){
        this.scoreEle.innerHTML = ++this.score+'';
        // 判断分数是多少  每10分升一级
        if(this.score % this.upScore === 0){
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

export default ScorePanel
