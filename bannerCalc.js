
let sides = {
    dlina: null,
    visota: null,
    getSize() {
        let dlina = Number(document.getElementById("dlina").value.replace(/,/, '.'));
        let visota = Number(document.getElementById("visota").value.replace(/,/, '.'));
        this.unitsChek(dlina, visota);

    },
    unitsChek(dlina, visota) {
        let checkM = document.getElementById('unitsM');
        let checkC = document.getElementById('unitsC');
        let checkMm = document.getElementById('unitsMm');
        if (checkM.checked === true) {
            this.dlina = dlina;
            this.visota = visota;
        } else if (unitsC.checked === true) {
            dlina = dlina / 100;
            this.dlina = dlina;
            visota = visota / 100;
            this.visota = visota;
        } else if (unitsMm.checked === true) {
            dlina = dlina / 1000;
            this.dlina = dlina;
            visota = visota / 1000;
            this.visota = visota;
        }

    }
};

let priceArray = {
    priceM2: null,
    pricePokleika: null,
    priceLuvers: null,
    dizPrice: null,
    getPrice() {
        let priceM2 = Number(document.getElementById("priceM2").value.replace(/,/, '.'));
        let pricePokleika = Number(document.getElementById("priceProkleika").value.replace(/,/, '.'));
        let priceLuvers = Number(document.getElementById("priceLuvers").value.replace(/,/, '.'));
        let priceDiz = Number(document.getElementById("dizIn").value.replace(/,/, '.'));
        this.priceM2 = priceM2;
        this.pricePokleika = pricePokleika;
        this.priceLuvers = priceLuvers;
        this.dizPrice = priceDiz;
    },

};

let main = {
    sides,
    priceArray,
    printOnlyPrice: null,
    prokleikaOnlyPrice: null,
    runnigMeterValue: null,
    luverPriceOut: null,
    bannerTotal: null,
    priceDiz: null,

    printingPrice() {
        let printingPrice = (this.sides.dlina * this.sides.visota) * this.priceArray.priceM2;
        printingPrice = printingPrice.toFixed();
        document.getElementById('printOutString').innerHTML = `&nbsp ${printingPrice} руб.`;
        document.getElementById('printOnlyFirstBlock').value = `${printingPrice} руб.`;
        this.printOnlyPrice = +printingPrice;
    },
    prokleikaPrice() {
        if (this.radioChekPrintOnly()) {
            document.getElementById('prokleikaOutString').innerHTML = `&nbsp - руб.`;
            document.getElementById('prokleikaFirtstBlock').value = ` - руб`;
            document.getElementById('rm').innerHTML = ``;
            let prokleikaPrice = 0;
            this.prokleikaOnlyPrice = prokleikaPrice;

        } else {
            let runnigMeterValue = (this.sides.dlina + this.sides.visota) * 2;
            let prokleikaPrice = runnigMeterValue * this.priceArray.pricePokleika;
            prokleikaPrice = prokleikaPrice.toFixed();
            runnigMeterValue = runnigMeterValue.toFixed();
            document.getElementById('prokleikaOutString').innerHTML = `&nbsp ${prokleikaPrice} руб.`;
            document.getElementById('prokleikaFirtstBlock').value = ` ${prokleikaPrice} руб.`;
            document.getElementById('rm').innerHTML = `(${runnigMeterValue}п.м.)`;
            this.prokleikaOnlyPrice = +prokleikaPrice;
            this.runnigMeterValue = +runnigMeterValue;
        };
    },
    luverPrice() {
        if (this.radioChekPrintOnly()) {
            document.getElementById('luversOutString').innerHTML = `&nbsp - руб.`;
            let luversPrice = 0;
            this.luverPriceOut = luversPrice;
            let luversValue = 0;
            document.getElementById('luversOut').innerHTML = ``;
            document.getElementById('luversFirstBlock').value = `- руб.`

        } else if (this.radioChekOnlyProkleika()) {
            document.getElementById('luversOutString').innerHTML = `&nbsp - руб.`;
            let luversPrice = 0;
            this.luverPriceOut = luversPrice;
            let luversValue = 0;
            document.getElementById('luversOut').innerHTML = ``;
            document.getElementById('luversFirstBlock').value = `- руб.`


        }
        else {
            let luversValue = this.runnigMeterValue / 0.3;
            luversValue = luversValue.toFixed();
            let luversPrice = luversValue * this.priceArray.priceLuvers;
            document.getElementById('luversOutString').innerHTML = `&nbsp ${luversPrice} руб.`;
            document.getElementById('luversOut').innerHTML = `(${luversValue}шт.)`;
            document.getElementById('luversFirstBlock').value = `${luversPrice} руб`
            this.luverPriceOut = +luversPrice;
        };
    },
    dizainPrice() {
        let dizP = this.priceArray.dizPrice;
        this.priceDiz = dizP;
        if (dizP === 0) {
            document.getElementById('DizOutString').innerHTML = `&nbsp - руб.`;
        } else {
            document.getElementById('DizOutString').innerHTML = `&nbsp ${dizP} руб.`;
        }
    },
    bannerTotalPrice() {
        let bannerTotalPrice = this.printOnlyPrice + this.prokleikaOnlyPrice + this.luverPriceOut + this.priceDiz;
        bannerTotalPrice = bannerTotalPrice.toFixed();
        document.getElementById('itog').innerHTML = `&nbsp ${bannerTotalPrice} руб.`;
        document.getElementById('itog').style.color ='red';
        document.getElementById('totalPriceFirstBlock').value = `${bannerTotalPrice} руб.`
        this.bannerTotal = +bannerTotalPrice;
    },
    radioChekPrintOnly() {
        let c = document.getElementById('onlyPrintChek');
        if (c.checked === true) {
            return true;
        }
    },
    radioChekOnlyProkleika() {
        let c = document.getElementById('OnlyProkleika');
        if (c.checked === true) {
            return true;
        }

    },
    getTextAreaValue() {
        let text = document.getElementById('areaText').value;
        let stringLenght = 25;
        let add = addBr(text, stringLenght).join('<br>');
        document.getElementById('areaTextResult').innerHTML = add;

        function addBr(text, n) {
            let ret = [];
            for (let i = 0, len = text.length; i < len; i += n) {
                ret.push(text.substr(i, n))
            }

            return ret
        };
    },



};

const render = {
    sides,
    drawing() {
        if (this.sides.dlina === this.sides.visota) {
            document.getElementById('renderKvadrat').style.display = 'block';
            document.getElementById('kvadratHorizontal').style.display = 'none';
            document.getElementById('kvadratVertical').style.display = 'none';
            document.getElementById('dlinaKvadrat').innerHTML = this.sides.dlina;
            document.getElementById('visotaKvadrat').innerHTML = this.sides.visota;
        } else if (this.sides.visota < this.sides.dlina) {
            document.getElementById('kvadratHorizontal').style.display = 'block';
            document.getElementById('kvadratVertical').style.display = 'none';
            document.getElementById('renderKvadrat').style.display = 'none';
            document.getElementById('dlinaKvadratHorizontal').innerHTML = this.sides.dlina;
            document.getElementById('visotaKvadratHorizontal').innerHTML = this.sides.visota;
        }else if (this.sides.visota > this.sides.dlina) {
            document.getElementById('kvadratVertical').style.display = 'block';
            document.getElementById('renderKvadrat').style.display = 'none';
            document.getElementById('kvadratHorizontal').style.display = 'none';
            document.getElementById('dlinaKvadratVertical').innerHTML = this.sides.dlina;
            document.getElementById('visotaKvadratVertical').innerHTML = this.sides.visota;
        }
    },
}


let start = {
    cacl() {
        sides.getSize();
        priceArray.getPrice();
        main.printingPrice();
        main.prokleikaPrice();
        main.luverPrice();
        main.dizainPrice();
        main.bannerTotalPrice();
        main.getTextAreaValue();
        render.drawing();
    },
};

document.getElementById('settings').addEventListener('click', drop, DropOut);
document.getElementById('areaText').addEventListener('input', main.getTextAreaValue);

let inputCollection = document.getElementsByTagName('input');



for (let i = 0; i < inputCollection.length; i++) {
    inputCollection[i].addEventListener('input', start.cacl);
    console.log(i);
};



function drop() {
    document.getElementById('drop_list').style.display = 'block';
}
function DropOut() {
    document.getElementById("drop_list").style.display = 'none';
}