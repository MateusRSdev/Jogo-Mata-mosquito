


var audioCoins = new Audio('sounds/EFEITO SONORO - DINHEIRO (320 kbps).mp3')

var coins = localStorage.getItem('coins')
coins = parseInt(coins)
console.log(coins)


if(isNaN(coins)){
    coins = 0
    console.log('setando valores iniciais')
    localStorage.setItem('coins', 0)
    localStorage.setItem('cursorAtual', 'mataMosca')
    localStorage.setItem('vidasEX', 0)
    localStorage.setItem('melhorPontuacao', 0)
    document.getElementById('regras').style.display = 'block'
}

var vidasEX = parseInt(localStorage.getItem('vidasEX'))
var pontos = parseInt(localStorage.getItem('melhorPontuacao'))
console.log(vidasEX);


document.getElementById('vidasEX').innerHTML = vidasEX
document.getElementById('coins').innerHTML = coins
document.getElementById('pontuacao').innerHTML = pontos

function iniciarJogo(modo){
    var nivel = document.getElementById('dificuldade').value
    if(nivel === ''){
        alert('selecione uma dificuldade para iniciar o jogo')
        return false
    }
    
    localStorage.setItem('dificuldade', nivel)
    localStorage.setItem('coins',coins)
    localStorage.setItem('modoJogo', modo)

    window.location.href = 'jogo.html'
    
}

var cursorI = localStorage.getItem('cursorAtual')


switch(cursorI){
    case 'mataMosca':
        document.getElementById('MM').innerHTML = 'Em uso'
        break

    case 'jornal':
        document.getElementById('JC').innerHTML = 'Em uso'
        break

    case 'raquete':
        document.getElementById('RC').innerHTML = 'Em uso'
        break

    case 'panela':
        document.getElementById('PC').innerHTML = 'Em uso'
        break

    case 'inseticida':
        document.getElementById('IC').innerHTML = 'Em uso'
        

}

var ativo = true
function loja(){

    if(ativo === false){
        ativo = true
        document.getElementById('loja').style.display = 'none'
        document.getElementById('btnLoja').style.border = 'none'
    }else{
        ativo = false
        document.getElementById('loja').style.display = 'block'
        document.getElementById('btnLoja').style.border = '1px solid #000'

    }
    console.log(ativo)
}

function limpar() {
   localStorage.clear()
}



function comprar(item,valor,id1,id2){
    
    if(coins > valor){
        coins -= valor
        document.getElementById('coins').innerHTML = coins
        localStorage.setItem(item,'comprado')
        document.getElementById(id1).style.display = 'none'
        document.getElementById(id2).style.display = 'block'
        audioCoins.play()
    }else{
        alert('dinheiro insuficiente')
    }

    
}


if(localStorage.getItem('jornal') === 'comprado'){
    document.getElementById('J').style.display = 'none'
    document.getElementById('JC').style.display = 'block'
}
if(localStorage.getItem('raquete') === 'comprado'){
    document.getElementById('R').style.display = 'none'
    document.getElementById('RC').style.display = 'block'
}
if(localStorage.getItem('panela') === 'comprado'){
    document.getElementById('P').style.display = 'none'
    document.getElementById('PC').style.display = 'block'
}
if(localStorage.getItem('inseticida') === 'comprado'){
    document.getElementById('I').style.display = 'none'
    document.getElementById('IC').style.display = 'block'
}
function aplicarCursor(nome,id) {
    localStorage.setItem('cursorAtual', nome)
    
    document.getElementById('MM').innerHTML = 'Usar'
    document.getElementById('JC').innerHTML = 'Usar'
    document.getElementById('RC').innerHTML = 'Usar'
    document.getElementById('PC').innerHTML = 'Usar'
    document.getElementById('IC').innerHTML = 'Usar'
    document.getElementById(id).innerHTML = 'Em uso'
}


function comprarVida() {
    if(coins >= 50){
        coins -= 50
        vidasEX += 1
        audioCoins.play()
        console.log(vidasEX);
        localStorage.setItem('vidasEX', vidasEX)
        document.getElementById('coins').innerHTML = coins
        localStorage.setItem('coins', coins)
        document.getElementById('vidasEX').innerHTML = vidasEX
    }else{
        alert('Dinheiro insuficiente')
    }
}

function tutorial() {
    document.getElementById('regras').style.display = 'none'
}
