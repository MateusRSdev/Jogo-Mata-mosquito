
document.getElementById('tempo').innerHTML = tempo
document.getElementById('coins').innerHTML = coins
document.getElementById('VidasEX').innerHTML = vidasEX
document.getElementById('pontuacao').innerHTML = pontuacao
document.getElementById('medidorDeCombo').innerHTML = combo


vidasextras()


// var criarMosquitos = setInterval(function(){
//     posicaoRandomica()
// }, delay)


function tempo2(y) {
    if (parar === false) {

         setTimeout(function () {
            posicaoRandomica()
            console.log(delay)
            tempo2(delay);
        }, y);

    }else{
        console.log('parou');
        console.log(vidas)
    }
}



tempo2(delay)


switch (cursor) {
    case 'mataMosca':
        document.querySelector('body').style.cursor = 'url(imagens/mataMosca.png) 30 30, auto'
        cursor2 = 'mataMosca2'
        break

    case 'jornal':
        document.querySelector('body').style.cursor = 'url(imagens/jornal.png) 30 20, auto'
        cursor2 = 'jornal2'
        outrov = 35
        break

    case 'raquete':
        document.querySelector('body').style.cursor = 'url(imagens/raquete.png) 30 30, auto'
        cursor2 = 'raquete2'
        break

    case 'panela':
        document.querySelector('body').style.cursor = 'url(imagens/panela.png) 30 30, auto'
        cursor2 = 'panela2'
        break

    case 'inseticida':
        document.querySelector('body').style.cursor = 'url(imagens/inseticida.png) 30 30, auto'
        cursor2 = 'inseticida2'

}
