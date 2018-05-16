class Game{
    constructor(id){
        //Контейнер для игры
        this.container = document.getElementById(id);
        //Последняя картинка
        this.last='';
        //Путь до картинок
        this.dirImg = 'img/';

        this.flag = 1;
        //Сколько кликов было выполнено по картинкам
        this.click = 0;
        //Получаем массив
        this.count = 8;
        this.array = this.getArray(this.count);
        //Размешиваем его
        this.array = this.random(this.array);
        //Создаём карты
        this.cards = this.setCards(id);

    }

    clickCard(event,data){
        //Не будет обрабатываться событие если картинка уже открыта
        if( event.target.dataset.state == 0 && this.flag == 1 ){

            //Если это первый клик,то открываем картинку
            if( this.click == 0 ){
                this.click++;
                this.last = event.target.classList.value;
                data.dataset.state = 1;
                data.style.backgroundImage = `url('${this.dirImg+this.last.substr(5,1)}.png')`;
            }
            else{

                //Если мы отгадали
                if( this.last == event.target.classList.value  ){
                    let elements = document.getElementsByClassName(this.last);
                    for(let i=0;i<elements.length;i++){
                        elements[i].dataset.state = 2;
                        elements[i].style.backgroundImage = `url('${this.dirImg+this.last.substr(5,1)}.png')`;
                    }
                }else{//Иначе показываем и через секунду прячим

                    data.dataset.state = 1;
                    data.style.backgroundImage = `url('${this.dirImg+event.target.classList.value.substr(5,1)}.png')`;

                    this.flag = 0;

                    setTimeout(this.hide.bind(this), 1000);
                }
                this.click = 0;
            }

        }
    }
    hide(){

        let elements = document.querySelectorAll('#app div');
        Array.prototype.forEach.call(elements, function(el, i){
            if( el.dataset.state == 1 ){
                el.dataset.state = 0;
                el.style.backgroundImage = 'url("img/question.png")';

            }
        });
        this.flag = 1;

    }
    //Создаём карты
    setCards(id){
        let temp = [];
        for(let i=0; i<this.array.length; i++){
            temp.push(new Card(id,this.array[i],this.clickCard.bind(this)));
        }
        return temp;
    }
    //Создаём массив
    getArray(n){
        let tempArray = [];
        for (let i=1; i<=n; i++) {
            tempArray.push(i);
            tempArray.push(i);
        }
        return tempArray
    }
    //Размешиваем цифры в массиве
    random(array){
        let index, valueIndex;
        for (let i=0; i<=array.length-1; i++) {
            index = Math.floor(Math.random()*i);
            valueIndex = array[index];
            array[index] = array[i];
            array[i] = valueIndex;
        }
        return array;
    }
}