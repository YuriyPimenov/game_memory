class Base{
    constructor(id){

        //Контейнер для игры
        this.container = document.getElementById(id);

        this.container.style.width;

        //Последняя картинка
        this.last=[];

        //Путь до картинок
        this.dirImg = 'img/';

        this.flag = 1;
        //Сколько кликов было выполнено по картинкам
        this.click = 0;

        this.array=[];
        this.cards=[];

    }

    clickCard(event,data){
        //Не будет обрабатываться событие если картинка уже открыта
        if( event.target.dataset.state != 0 || this.flag != 1 )
            return;

        //Если это первый клик,то открываем картинку
        if( this.checkClick() ){

            this.click++;
            this.last.push(event.target.val);
            data.dataset.state = 1;
            data.style.backgroundImage = `url('${this.dirImg+event.target.val.substr(5,1)}.png')`;
        }
        else{

            //Если мы отгадали
            if( this.checkImgs(event.target.val) ){
                data.dataset.state = 1;
                data.style.backgroundImage = `url('${this.dirImg+event.target.val.substr(5,1)}.png')`;
                // let elements = document.getElementsByClassName(event.target.val);
                let elements = document.querySelectorAll( 'div[data-state="1"]' );

                for(let i=0;i<elements.length;i++){
                    elements[i].dataset.state = 2;
                    elements[i].style.backgroundImage = `url('${this.dirImg+this.last[0].substr(5,1)}.png')`;
                }
                this.last = [];
            }else{//Иначе показываем и через секунду прячим

                data.dataset.state = 1;
                data.style.backgroundImage = `url('${this.dirImg+event.target.val.substr(5,1)}.png')`;

                this.flag = 0;

                setTimeout(this.hide.bind(this), 1000);
                this.last = [];
            }
            this.click = 0;
        }


    }

    //Проверка одинаковости
    checkImgs(value){
        let check = true;
        for(let i=0; i<this.last.length; i++){
            if(this.last[i]!=value){
                check = false;
                break;
            }
        }
        return check;
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