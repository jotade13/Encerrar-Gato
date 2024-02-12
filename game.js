const tam_fila = 10;
const tam_col = 10;
const casillasAleatorias= 8;
class Juego
{
    constructor()
    {
        const juego = document.getElementById("juego");
        var juegoHijo = document.createElement("div");
        juegoHijo.className= "rectangulo";
        juegoHijo.id = "juego-hijo";
        juego.appendChild(juegoHijo);
        this._casilla = [];
        this._grafo = new Grafo();
        for(let i=0;i<tam_fila;i++)
        {
            var divfila = document.createElement("div");
            divfila.className="fila";
            if(i%2==0)
            {
                divfila.id = "fila-par"
            }else{
                divfila.id = "filaimpar"
            }
            this._casilla[i] = [];

            for(let j=0;j<tam_col;j++)
            {
                this._casilla[i][j] = new Casilla(i,j);
                this._grafo.agregarNodo(i+"-"+j)
                var div = document.createElement("div");
                div.className = "casillas";
                div.id = "cas-"+i+"-"+j;
                div.addEventListener("click",this.bloquear.bind(this,div.id,i,j,true))
                divfila.appendChild(div);
            }
            juegoHijo.appendChild(divfila)
        }
        juego.appendChild(juegoHijo)
        this._gato = new Gato();
        this._terminado = false;
        this._ganar = false;
        this.recorrerLasCasillas(1);
        this.imagenGato(true);
        this.dibujarCasillasAleatorias();
    }
    get terminado()
    {
        return this._terminado;
    }
    set terminado(band)
    {
        this._terminado = band;
    }
    get empezado()
    {
        return this._empezado;
    }
    set empezado(band)
    {
        this._empezado = band;
    }
    get ganar()
    {
        return this._ganar;
    }
    set ganar(band)
    {
        this._ganar = band;
    }
    dibujarCasillasAleatorias()
    {
        let filaAleatoria;
        let colAleatoria;
        for(let i=0;i<casillasAleatorias;i++)
        {
            filaAleatoria = Math.floor(Math.random()*tam_fila);
            colAleatoria = Math.floor(Math.random()*tam_col);
            if(!this._casilla[filaAleatoria][colAleatoria].estado)
            {
                this.bloquear("cas-"+filaAleatoria+"-"+colAleatoria,filaAleatoria,colAleatoria,false)
            }
        }
    }
    recorrerLasCasillas(accion) //accion = 1 recorre las casillas y agrega los vertices de los nodos alrededor de el
    {
        for(let i=0;i<tam_fila;i++)
        {
            for(let j=0;j<tam_col;j++)
            {
                if(accion==1)
                {
                    this.recorrer(2,i,j);
                }
            }
        }
    }
    bloquear(id,fila,col,click) //click true, proviene de click
    {
        if(!this._casilla[fila][col].gato&&!this._casilla[fila][col].estado)
        {
            this._casilla[fila][col].bloquear();
            this._grafo.eliminarNodoyAristas(fila+"-"+col);
            document.getElementById(id).style.backgroundColor = "#460166";
            this._terminado = this.recorrer(1,this._gato.fila,this._gato.col);
            if(click)
            {
                this.imagenGato(false);
                this.moverGato();
                this.imagenGato(true);
            }
            this.fin();
        }
        
    }
    recorrer(accion,fila,col) //accion = 1 comprueba si ganó. accion = 2 comprueba sus alrededores y agrega los vertices
    {
        let auxPar = 0;
        let band1 = true;
        let band2 = true;
        if(this._casilla[fila][col].par)
        {
             auxPar=1;
        }
        for(let i=fila-1;i<=fila+1;i+=2)
        {
            for(let j=col-auxPar;j<=col-auxPar+1;j++)
            {
                if(i>=0&&i<=9&&j>=0&&j<=9)
                {
                    if(accion==1)
                    {
                        if(!this._casilla[i][j].estado)
                        {
                            band1=false; break;
                        }
                    }else
                    {
                        this._grafo.agregarArista(fila+"-"+col,i+"-"+j);
                    } 
                }
            }
        }
        for(let j=col-1;j<=col+1;j+=2)
        {
            if(j>=0&&j<=9)
            {
                if(accion==1)
                {
                    if(!this._casilla[fila][j].estado)
                    {
                        band2= false; break;
                    }
                }
                else
                {
                    this._grafo.agregarArista(fila+"-"+col,fila+"-"+j)
                }    
            }
        }
        if(accion==1)
        {
            if(band1&&band2)
            {
                this.ganar = true;
                return true;
            }else
            {
                return false;   
            }
        }
    }
    moverGato() //adaptamos el algoritmo Dijkstra para mover al gato
    {
        let nodosNoVisitados = Object.assign({}, this._grafo.nodos);
        const distancias = {};
        const camino = {};
        const gato = this._gato._fila+"-"+this._gato._col;
        let nodoActual = gato;
        let band = false;
        let finEncontrado;

        for (let nodo in nodosNoVisitados) 
        {
            distancias[nodo] = nodo === gato ? 0 : Infinity;
        }
         
        while((!band||this.terminado)&&this._gato._mov)
        {   
        
            for (let vecino of this._grafo.nodos[nodoActual]) 
            {
                const distancia = distancias[nodoActual] + 1;
                if (distancia < distancias[vecino]) 
                {
                    distancias[vecino] = distancia;
                    camino[vecino] = nodoActual;
                }
            }
            delete nodosNoVisitados[nodoActual];
            nodoActual = obtenerNodoMinimaDistancia(nodosNoVisitados, distancias);
            if(nodoActual!=null)
            {  
                for (let nodo in this._grafo.nodos) 
                {
                    if((nodo[0]==0||nodo[0]==tam_fila-1||nodo[2]==0||nodo[2]==tam_col-1)&&nodoActual==nodo)
                    {
                        band=true;
                        finEncontrado=nodo;
                        break;
                    }
                }
            }
        }
        if(distancias[nodoActual]===Infinity||!this._gato._mov)
        {
            escogerMovimiento(camino,gato,finEncontrado,false)
            this._gato.mov = false;
        }else
        {
            escogerMovimiento(camino,gato,finEncontrado,true)
        }        
        function obtenerNodoMinimaDistancia(nodos, distancias) 
        {
            let nodoMin = null;
            for (let nodo in nodos) 
            {
                if (nodoMin === null || distancias[nodo] < distancias[nodoMin])
                {
                    nodoMin = nodo;
                }
            }
            if(nodoMin==null)
            {
                return null;
            }
            else
            {
                return nodoMin;
            }
        }
        function escogerMovimiento(camino, inicio, fin, band) 
        {  
            if(band)
            {
                const resultado = [];
                let nodo = fin;
                while (nodo !== inicio)
                {
                    resultado.unshift(nodo);
                    nodo = camino[nodo];
                }
                resultado.unshift(inicio);

                juego._casilla[juego._gato._fila][juego._gato.col].gato = false;
                juego._casilla[juego._gato._fila][juego._gato.col].estado = false;
                juego._gato._fila = resultado[1][0];
                juego._gato.col = resultado[1][2];
                juego._casilla[resultado[1][0]][resultado[1][2]].gato = true;
                juego._casilla[resultado[1][0]][resultado[1][2]].estado = true;

            }else
            {
                if(juego._grafo.nodos[inicio].length>0)
                {
                    let nro = Math.floor(Math.random()*juego._grafo.nodos[inicio].length);
                    let nroMov = juego._grafo.nodos[inicio][nro]
                    let nroFila = nroMov[0]
                    let nroCol = nroMov[2]
                    juego._casilla[juego._gato._fila][juego._gato.col].gato = false;
                    juego._casilla[juego._gato._fila][juego._gato.col].estado = false;
                    juego._gato._fila = nroFila;
                    juego._gato.col = nroCol;
                    juego._casilla[nroFila][nroCol].gato = true;
                    juego._casilla[nroFila][nroCol].estado = true;
                }else
                {
                    juego.terminado = true;
                    juego.ganar = true;
                }
            }      
        }
    }
    fin()
    {
        if(this._gato.fila==0||this._gato.fila==tam_fila-1||this._gato.col==0||this._gato.col==tam_col-1)
        {
            this._terminado = true;
            this._ganar = false;
        }
        if(this._terminado)
        {
            if(this.ganar)
            {
                this.postJuego("Ganaste");
            }else
            {
                this.postJuego("Perdiste");
            }
        }
    }
    imagenGato(band) //band true agregar gato y band false quitar gato
    {
        var gato = document.getElementById("cas-"+this._gato.fila+"-"+this._gato.col);
        if(band)
        {
            var imagen = document.createElement("img");
            imagen.id = "gato-img"
            imagen.src = "gato.png";
            gato.appendChild(imagen);        
        }else
        {
            var imagen = document.getElementById("gato-img");
            gato.removeChild(imagen);        
        }
    }
    postJuego(texto)
    {
        var contenedor = document.getElementById("juego")
        var divContenedor = crearElemento("div","div-contenedor","post-contenedor",null,null)
        var div = crearElemento("div","cuadrado","post-juego",null,null) 
        var h2 = crearElemento("h2","titulo","post-texto",texto,null)
        var boton = crearElemento("button","boton","post-boton","Reiniciar",true)
        div.appendChild(h2);
        div.appendChild(boton)
        divContenedor.appendChild(div)
        contenedor.appendChild(divContenedor)

        function crearElemento(etiqueta,clase,id,texto,accion)
        {
            var elemento = document.createElement(etiqueta)
            elemento.className = clase
            elemento.id = id
            if(texto!==null)
            {
                elemento.textContent = texto
            }
            if(accion!==null)
            {
                elemento.addEventListener("click",juego.reiniciar.bind())
            }
            return elemento;
        }
    }
    reiniciar()
    {
        juego=null;
        var divJuego = document.getElementById("juego");
        var divHijo = document.getElementById("juego-hijo");
        var postJuego = document.getElementById("post-contenedor");
        divJuego.removeChild(divHijo);
        if(postJuego!==null)
        {
            divJuego.removeChild(postJuego);
        }
        juego = new Juego();
    }
}
class Casilla{
    constructor(fila,col){
        this._fila= fila;
        this._col= col;
        if(fila%2==0)
        {
            this._par = true;
        }else
        {
            this._par = false;
        }
        if(fila==4&&col==5)
        {
            this._estado = true;
            this._gato = true; 
        }else
        {
            this._estado = false;
            this._gato = false;
        } 
    }
    get fila()
    {
        return this._fila
    }
    get col()
    {
        return this._col
    }
    get estado()
    {
        return this._estado
    }
    get gato()
    {
        return this._gato
    }
    get par()
    {
        return this._par
    }

    bloquear()
    {
        this.estado = true;
    }

    set estado(band)
    {
        this._estado = band;
    }
    set gato(band)
    {
        this._gato = band;
    }
}
class Gato{
    constructor()
    {
        this._fila = 4;
        this._col = 5;
        this._mov=true;
    }
    get fila()
    {
        return this._fila;
    }
    set fila(fila)
    {
        this._fila = fila;
    }
    get col()
    {
        return this._col;
    }
    set col(col)
    {
        this._col = col;
    }
    get mov()
    {
        return this._mov;
    }
    set mov(mov)
    {
        this._mov = mov;
    }
}
class Grafo // Definir una clase Grafo que tiene un arreglo de nodos y un objeto de aristas para el mapa
{
    constructor()
    {
        this.nodos = {};
    }
    // Añadir un nodo al grafo
    agregarNodo(nodo)
    {
        this.nodos[nodo]=[];
    }

  // Añadir una arista entre dos nodos
    agregarArista(nodo1, nodo2)
    {
        this.nodos[nodo1].push(nodo2);
    }
    eliminarNodoyAristas(nodo)
    {
        this.nodos[nodo].forEach(nodoFin => 
        {
            let indiceSelec = this.nodos[nodoFin].indexOf(nodo);
            this.nodos[nodoFin].splice(indiceSelec,1);
        });
        this.nodos[nodo]= [];
        delete(this.nodos[nodo]);
    }
    buscarNodo(valor)
    {
         return this.nodos.hasOwnProperty(valor);
    }
}
    let juego = new Juego();