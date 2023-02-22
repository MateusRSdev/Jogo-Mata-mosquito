
var largura = 0
var altura = 0
var vidas = 3
var tempo = 30
var delay = 0
var pontuacao = 0
var parar = false
var interacao = false
var combo = 0


var coins = localStorage.getItem('coins')
var nivel = localStorage.getItem('dificuldade')
var cursor = localStorage.getItem('cursorAtual')
var vidasEX = localStorage.getItem('vidasEX')
var modoDeJogo = localStorage.getItem('modoJogo')
var cursor2 = null
console.log(coins, nivel, cursor, vidasEX, modoDeJogo);


var medidorCombo = document.getElementById('medidorDeCombo')



var vidasEX = parseInt(vidasEX)

if (nivel === 'f') {
    delay = 1800
} else if (nivel === 'n') {
    delay = 1350
} else if (nivel === 'd') {
    delay = 1100
} else if (nivel === 'D') {
    delay = 1000
}


if (modoDeJogo === 'classico') {
    var almentarDificuldadeC = setInterval(function () {
        if (parar === false) {
            delay -= 10
            console.log(delay + 'delay')
        }

    }, 1100)

} else if (modoDeJogo === 'infinito') {
    tempo = 99999999999999999
    document.getElementById('divTempo').style.display = 'none'
    var almentarDificuldade = setInterval(function () {
        if (parar === false) {
            delay -= 10
            console.log(delay + 'delay')
        }

    }, 2000)
}

coins = parseInt(coins)


var classeAtual = null
var PosicaoX = null
var PosicaoY = null



//audios do jogo
var hit = new Audio('sounds/Minecraft Hit Sound Effect (320 kbps).mp3')
var tapa = new Audio('sounds/AudioCutter_Tapa Efeito Sonoro(MP3_70K).mp3')
var missaoConcluida = new Audio('sounds/mi.mp3')
var Derrota = new Audio('sounds/Efeito sonoro de derrota do pou (320 kbps).mp3')
var raio = new Audio('sounds/EFEITO SONORO DE RAIO CAINDO _ FALLING LIGHTNING SOUND EFFECT [Free SFX to edition_ SFX de graça] (320 kbps).mp3')
var choque = new Audio('sounds/Som de Choque - Efeito Sonoro(MP3_70K) (mp3cut.net).mp3')
var metal = new Audio('sounds/Efeito Sonoro - Som de Golpe de Metal(MP3_70K) (mp3cut.net).mp3')
var spray = new Audio('sounds/Efeito Sonoro - Spray Curto(MP3_128K) (mp3cut.net).mp3')



function ajustarTamanhoTela() {
    altura = window.innerHeight
    largura = window.innerWidth
    //console.log('ALT: ' + altura + 'LAR: ' + largura)
}

//cronometro
var cronometro = setInterval(function () {
    tempo -= 1
    if (tempo <= 0) {

        missaoConcluida.play()
        if (nivel === 'f') {
            coins += 15
        } else if (nivel === 'n') {
            coins += 25
        } else if (nivel === 'd') {
            coins += 50
        } else if (nivel === 'D') {
            coins += 500
        }
        final()
        document.getElementById('vitoria').style.display = 'block'
    } else {
        document.getElementById('tempo').innerHTML = tempo
    }
}, 1000)

ajustarTamanhoTela()

//executa no final do jogo
function final() {
    clearInterval(cronometro)
    clearTimeout(tempo)
    parar = true
    localStorage.setItem('vidasEX', vidasEX)
    localStorage.setItem('coins', coins)
    if (parseInt(localStorage.getItem('melhorPontuacao')) < pontuacao) {
        alert('Novo Recorde de pontuação')
        localStorage.setItem('melhorPontuacao', pontuacao)
    }
    console.log(localStorage.getItem('coins'))

}

var mosquito = document.createElement('img')



//cria os mosquitos na tela
function posicaoRandomica() {

    //se o elemento existir no momento em e outro estiver para ser criado ele remove o existente e desconta uma vida
    if (parar === false) {
        if (document.getElementById('mosquito')) {
            if (interacao === true) {
                hit.play()
            }
            document.getElementById('mosquito').remove()
            combo = 0
            medidorCombo.innerHTML = combo
            medidorCombo.className = ''
            medidorCombo.className += ' sacudir'
            corCombo()
            setTimeout(function () {
                medidorCombo.className = ''

            }, 300)
            animacaoAtaque()

            //contador de vidas
            if (vidas <= 1) {
                if (vidasEX >= 1) {
                    vidasEX--
                    document.getElementById('VidasEX').innerHTML = vidasEX
                    document.getElementById('contadorX').className = 'lifeAnimation'
                    setTimeout(function () {
                        document.getElementById('contadorX').className = ''
                    }, 500)
                    vidasextras()

                } else {
                    final()
                    document.getElementById('v1').src = "imagens/coracao_vazio.png"
                    document.getElementById('v' + vidas).className = 'lifeAnimation'
                    Derrota.play()

                    setTimeout(function () {

                        document.getElementById('derrota').style.display = 'block'

                    }, 300)
                }
            } else {
                // console.log('v' + vidas);
                document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
                document.getElementById('v' + vidas).className = 'lifeAnimation'
                vidas--
            }


        }
    }


    PosicaoX = Math.floor(Math.random() * largura) - 90
    PosicaoY = Math.floor(Math.random() * altura) - 90

    PosicaoX = PosicaoX < 0 ? 0 : PosicaoX
    PosicaoY = PosicaoY < 0 ? 0 : PosicaoY
    //console.log(PosicaoX, PosicaoY)

    //criando elementos html com JS

    mosquito.src = 'imagens/mosca.png'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {

        console.log(mosquito.id)
        document.getElementById('mosquito').remove()
        moscaMorta()
    }
    classeAtual = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.className = classeAtual + ' surgir'
    mosquito.style.left = PosicaoX + 'px'
    mosquito.style.top = PosicaoY + 'px'

    document.body.appendChild(mosquito)

    //console.log(tamanhoAleatorio())

}



//seta um valor de tamanho para os mosquitos
function tamanhoAleatorio() {
    var tamanho = Math.floor(Math.random() * 3)

    switch (tamanho) {

        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }

    //console.log(tamanho)
}


//seta um lado para os mosquitos
function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2)

    switch (lado) {

        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'

    }

    //console.log(lado)
}


//funcaoo para animacao de ataque
function animacaoAtaque() {
    var clone = document.createElement('img')
    clone.src = 'imagens/mosca.png'
    clone.id = 'mosca'
    clone.className = classeAtual + ' atacar'
    clone.style.left = PosicaoX + 'px'
    clone.style.top = PosicaoY + 'px'


    console.log(clone)
    document.body.appendChild(clone)
    setTimeout(function () {
        document.getElementById('mosca').remove()
    }, 190)
}

var outrov = 30


//funcao responsavel para matar os moaquitos e contabilizar  valores e realizar animmacoes
function moscaMorta() {
    var clone = document.createElement('img')
    clone.src = 'imagens/mosca.png'
    clone.id = 'mosca'
    clone.className = classeAtual + ' animacao'
    clone.style.left = PosicaoX + 'px'
    clone.style.top = PosicaoY + 'px'
    interacao = true
    Som()

    Combo()

    if (nivel === 'f') {
        coins += 1
        adicionarPontuacao(5)
    } else if (nivel === 'n') {
        adicionarPontuacao(10)
        coins += 2
    } else if (nivel === 'd') {
        adicionarPontuacao(24)
        coins += 4
    } else {
        adicionarPontuacao(50)
        coins += 8
    }

    document.getElementById('coins').innerHTML = coins
    console.log(coins)
    document.body.appendChild(clone)
    document.querySelector('body').style.cursor = 'url(imagens/' + cursor2 + '.png) 30 ' + outrov + ', auto'

    

    setTimeout(function () {
        document.getElementById('mosca').remove()
    }, 900)

    setTimeout(function () {
        document.querySelector('body').style.cursor = 'url(imagens/' + cursor + '.png) 30 30, auto'
    }, 300)
}

//adiciona o funcao de pontuacao baseada no numero do combo
function Combo() {
    if (combo < 10) {
        combo++

        medidorCombo.innerHTML = combo
        medidorCombo.className += ' lifeAnimation'
        setTimeout(function () {
            medidorCombo.className = ''

        }, 300)
        corCombo()
    }
}
function corCombo() {
    if (combo < 3) {
        medidorCombo.style.background = '#0de209'
        medidorCombo.style.outline = '3px solid #008000'
        medidorCombo.style.scale = '0.8'

    } else if (combo < 5) {
        medidorCombo.style.background = '#007bff'
        medidorCombo.style.outline = '3px solid #002fff'
        medidorCombo.style.scale = '0.9'

    } else if (combo < 8) {
        medidorCombo.style.background = '#f2ff00'
        medidorCombo.style.outline = '3px solid #ffbb00'
        medidorCombo.style.scale = '1'
    } else if (combo < 10) {
        medidorCombo.style.background = '#e28f09'
        medidorCombo.style.outline = '3px solid #ff7105'
        medidorCombo.style.scale = '1.05'
    } else if (combo = 10) {
        medidorCombo.style.background = '#f00e0e'
        medidorCombo.style.outline = '3px solid #b91111'
        medidorCombo.style.scale = '1.1'
        raio.play()
        setTimeout(() => {
            medidorCombo.className += ' tremer'
        }, 300);

    }
}



//funcao para retornar a tela de inicio
function restart() {
    window.location.href = 'index.html'
}

//funcao para mudar a cor do contador  dependendo da quantidade de vidas extras disponiveiss
function vidasextras() {
    if (vidasEX <= 5) {
        document.getElementById('contadorX').style.background = '#db0707'
    } else if (vidasEX <= 10) {
        document.getElementById('contadorX').style.background = '#e7d214'
    } else if (vidasEX <= 15) {
        document.getElementById('contadorX').style.background = '#077fdb'
    } else if (vidasEX <= 25) {
        document.getElementById('contadorX').style.background = '#15b51d'
    } else if (vidasEX > 25) {
        document.getElementById('contadorX').style.background = '#197e21'
    }
}

//adiciona pontuacao
function adicionarPontuacao(valor) {
    pontuacao += valor * combo
    if (combo === 10) {
        var bonus = valor * 10
        pontuacao += bonus * (25 / 100)

        if (nivel === 'f') {
            coins += 1
        } else if (nivel === 'n') {
            coins += 2
        } else if (nivel === 'd') {
            coins += 4
        } else if (nivel === 'D') {
            coins += 10
        }

    }
    pontuacao = Math.floor(pontuacao)
    document.getElementById('pontuacao').innerHTML = pontuacao
}



function Som() {
    if (cursor === 'mataMosca' || cursor === 'jornal') {
        tapa.play()
    } else if (cursor === 'raquete') {
        choque.play()
    } else if(cursor === 'panela'){
        metal.play()
    }else if(cursor === 'inseticida'){
        spray.play()
    }
}