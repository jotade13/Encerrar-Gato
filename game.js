const tam_fila = 10;
const tam_col = 10;
class Juego{
    constructor()
    {
        const juego = document.getElementById("juego");
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
                this._grafo.agregarNodo(i+""+j)
                if(divfila.id)
                var div = document.createElement("div");
                div.textContent= i+""+j;
                div.className = "casillas";
                div.id = "cas-"+i+"-"+j;
                div.addEventListener("click",this.bloquear.bind(this,div.id,i,j))
                divfila.appendChild(div);
            }
            juego.appendChild(divfila)
        }
        this._gato = new Gato();
        this._terminado = false;
        this._ganar = false;
        this.recorrerLasCasillas(1);
    }
    get terminado()
    {
        return this._terminado;
    }
    set terminado(band)
    {
        this._terminado = band
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
    bloquear(id,fila,col)
    {
        if(!this._casilla[fila][col].gato&&!this._casilla[fila][col].estado)
        {
            this._casilla[fila][col].bloquear();
            this._grafo.eliminarNodoyAristas(fila+""+col);
            document.getElementById(id).style.backgroundColor = "#014366";
            this._terminado = this.recorrer(1,this._gato.fila,this._gato.col);
            if(!this._terminado)
            {
                this.moverGato();
            }   
        }
        this.fin();
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
                        this._grafo.agregarArista(fila+""+col,i+""+j);
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
                    this._grafo.agregarArista(fila+""+col,fila+""+j)
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
        const nodosNoVisitados = Object.assign({}, this._grafo.nodos);
        const distancias = {};
        const camino = {};
        const gato = this._gato._fila+""+this._gato._col;
        let nodoActual = gato;
        let band = false;
        let finEncontrado;
        let auxNodo;
        for (let nodo in nodosNoVisitados) 
        {
            if(nodo>-1&&nodo<10)
            {
                nodo = "0"+nodo;
            }
            distancias[nodo] = nodo === gato ? 0 : Infinity;
        }
        
        while(!band||this.terminado)
        {
            for (let vecino of this._grafo.aristas[nodoActual]) 
            {
                if(vecino>-1&&vecino<10)
                {
                    vecino = "0"+vecino;
                }
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
                    if(nodo>-1&&nodo<10)
                    {
                        nodo = "0"+nodo;
                    }
                    auxNodo = parseInt(nodo)
                    if((auxNodo%10==0||auxNodo%10==tam_col-1||(auxNodo/10>=0&&auxNodo/10<1)||(auxNodo/10>=9&&auxNodo/10<10))&&nodoActual===nodo)
                    {
                        band=true;
                        finEncontrado=nodo;
                        break;
                    }
                }
            }
        }
        if(distancias[nodoActual]===Infinity)
        {
            escogerMovimiento(camino,gato,finEncontrado,false)
        }else
        {
            escogerMovimiento(camino,gato,finEncontrado,true)
        }
        this.fin();
        
        function obtenerNodoMinimaDistancia(nodos, distancias) 
        {
            let nodoMin = null;
            for (let nodo in nodos) 
            {
                if(nodo>-1&&nodo<10)
                {
                    nodo = "0"+nodo;
                }
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
            if(Object.keys(camino).length)
            {
                const resultado = [];
                let nodo = fin;
                if(nodo>-1&&nodo<10)
                {
                    nodo = "0"+nodo;
                }
               

                if(band)
                {
                    while (nodo !== inicio)
                    {
                        resultado.unshift(nodo);
                        nodo = camino[nodo];
                    }
                    resultado.unshift(inicio);

                    juego._casilla[juego._gato._fila][juego._gato.col].gato = false;
                    juego._casilla[juego._gato._fila][juego._gato.col].estado = false;
                    juego._gato._fila = resultado[1][0];
                    juego._gato.col = resultado[1][1];
                    juego._casilla[resultado[1][0]][resultado[1][1]].gato = true;
                    juego._casilla[resultado[1][0]][resultado[1][1]].estado = true;

                    console.log(juego._gato._fila+""+juego._gato.col)
                }else
                {
                    let nro = Math.floor(Math.random()*juego._grafo.aristas[inicio].length);
                    let nroMov = juego._grafo.aristas[inicio][nro]
                    let nroFila = Math.floor(nroMov/10)
                    let nroCol = nroMov%10
                    console.log(nroFila);
                    console.log(nroCol);
                    juego._casilla[juego._gato._fila][juego._gato.col].gato = false;
                    juego._casilla[juego._gato._fila][juego._gato.col].estado = false;
                    juego._gato._fila = nroFila;
                    juego._gato.col = nroCol;
                    juego._casilla[nroFila][nroCol].gato = true;
                    juego._casilla[nroFila][nroCol].estado = true;

                    console.log(juego._gato._fila+""+juego._gato.col)
                }      
            }else
            {
                juego.terminado=true;
            }
        }
    }
    fin()
    {
        if(this._gato.fila==0||this._gato.fila==tam_fila-1||this._gato.col==0||this._gato.col==tam_fila-1)
        {
            this._terminado = true;
            this._ganar = false;
        }
        if(this._terminado)
        {
            if(this.ganar)
            {
                alert("ganaste");
            }else
            {
                alert("perdiste");
            }
        }
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
}
class Grafo // Definir una clase Grafo que tiene un arreglo de nodos y un objeto de aristas para el mapa
{
    constructor()
    {
        this.nodos = [];
        this.aristas = [];
    }
    // Añadir un nodo al grafo
    agregarNodo(nodo)
    {
        this.nodos.push(nodo);
        this.aristas[nodo] = [];
    }

  // Añadir una arista entre dos nodos
    agregarArista(nodo1, nodo2)
    {
        this.aristas[nodo1].push(nodo2);
    }
    eliminarNodoyAristas(nodo)
    {
        this.aristas[nodo].forEach(nodoFin => 
        {
            let indiceFin = this.nodos.indexOf(nodoFin);
            if(indiceFin>-1&&indiceFin<10)
            {
                indiceFin = "0"+indiceFin;
            }
            let indiceSelec = this.aristas[indiceFin].indexOf(nodo);
            /*if(indiceSelec>-1&&indiceSelec<10)
            {
                indiceSelec = "0"+indiceSelec;
            }*/
            this.aristas[indiceFin].splice(indiceSelec,1);
        });

        this.aristas[nodo]= [];
        delete(this.nodos[nodo]);
    }
}
    let juego = new Juego();