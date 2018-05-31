class Triple extends Base{
    constructor(id){
        super(id);
        this.container.style.width = '475px';
        this.count = 3;
        this.array = this.getArray(this.count);
        //Размешиваем его
        this.array = this.random(this.array);
        //Создаём карты
        this.cards = this.setCards(id);
    }
    getArray(n){
        let tempArray = [];
        for (let i=1; i<=n; i++) {
            tempArray.push(i);
            tempArray.push(i);
            tempArray.push(i);
        }
        return tempArray
    }
    //Смотрим какой у нас режим, и от этого зависит сколько нам можно открывать карточки
    checkClick(){
        return (this.click < 2);
    }
}