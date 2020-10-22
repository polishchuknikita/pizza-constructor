var arr = document.querySelectorAll('.topping-item label input'),
    arr2 = document.querySelectorAll('.current-pizza div'),
    arr3 = document.querySelectorAll('.select-drink-item'),
    arr5 = document.querySelectorAll('.topping-item label input.active'),
    sumOrderTopping = 0,
    sumOrderDrink = 95,
    object = {
        topping : [],
        drink : '',
        fullSumOrder : 300 + sumOrderDrink + '₽',
    },
    textSum = document.querySelectorAll('.option-delivery-right span.summa')[0];
    textSum.innerHTML = object.fullSumOrder;

var btnOpen = document.getElementById('make-an-order'),
    modal = document.getElementById('modal-window-wrap'),
    overlay = document.getElementById('overlay'),
    btnClose = document.getElementById('btn-close'),
    toppingPizzaInfo = document.querySelectorAll('#modal-window-wrap .topping-pizza')[0],
    drinkPizzaInfo = document.querySelectorAll('#modal-window-wrap .drink-pizza')[0],
    resultSumOrder = document.querySelectorAll('#modal-window-wrap .result-sum-order')[0];

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
function choiceToppings(item) {
    item.forEach(function(array) {
        array.addEventListener('click', function(event) {
            this.classList.toggle('active');
            if (array.classList.contains('active')) {
                object.topping.push(array.parentElement.textContent);
                toppingPizzaInfo.innerHTML = 'Вы ничего не добавили.'
            } else {
                var tempArr = object.topping.filter(function(item) {
                    if(item != array.parentElement.textContent) {
                        return item
                    }
                })
                object.topping = tempArr;
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].classList.contains('active')) {
                    arr2[i+2].classList.add('active');
                } else {
                    arr2[i+2].classList.remove('active');
                }
            }
            sumOrderTopping = 25 * object.topping.length;
            object.fullSumOrder = 300 + sumOrderTopping + sumOrderDrink;
            textSum.innerHTML = object.fullSumOrder + '₽';
            toppingPizzaInfo.innerHTML = 'Вы добавили в пиццу: ' + object.topping.join(', ');
            resultSumOrder.innerHTML = 'Сумма Вашего заказа: ' + textSum.innerHTML;
        })
        toppingPizzaInfo.innerHTML = 'Вы ничего не добавили в пиццу, так что корж и соус - вот ваш заказ =)'; 
    })
}

function choiceDrink(item) {
    item.forEach(function(array) {
        array.addEventListener('click', function(event) {
            if (array.classList.contains('active')) {
                array.classList.remove('active');
                object.drink = 'нет напитков'
                sumOrderDrink = 0;
                drinkPizzaInfo.innerHTML = 'Вы не выбрали напиток, ну и ладно';
            } else {
                for (var key of item) {
                    key.classList.remove('active');
                }
                array.classList.add('active'); 
                var p = array.children[1];
                object.drink = p.textContent;
                sumOrderDrink = 95;
                drinkPizzaInfo.innerHTML = 'Вы выбрали напиток: ' + object.drink;
            }
            object.fullSumOrder = 300 + sumOrderTopping + sumOrderDrink;
            textSum.innerHTML = object.fullSumOrder + '₽';
            resultSumOrder.innerHTML = 'Сумма Вашего заказа: ' + textSum.innerHTML;
        })
        drinkPizzaInfo.innerHTML = 'Вы выбрали напиток: Cola Zero';
    })
}

choiceToppings(arr);
choiceDrink(arr3);

btnOpen.addEventListener('click', function(event) {
    modal.classList.add('active');
})

function closeModal() {
    modal.classList.remove('active');
}


