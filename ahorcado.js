
        // Declaro variables para usar en distintas funciones
        let sel_palabra; // Posición de la palabra obtenido por random
        let palabra_selec; // Array con todas las letras de la palabra
        let intentos = 11;


        // Función para iniciar y reiniciar el juego.
        function iniciar() { 
            genera_palabra();
            reinicar_botones(false);
        }

        // Función para escoger la palabra (y la pista) y generar los _ en las letras a adivinar
        function genera_palabra() { 
            // Reinicio intentos y la imagen
            intentos = 11;
            document.getElementById("intentos").innerHTML = "Intentos restantes: " + intentos;
            document.getElementById("intentos").className = "palabra"; // Asigno clase para cambiar el formato del texto (style)
            document.getElementById("imagen").src = "img/ahorcado_"+ intentos +".png";

            // Saco la posición aleatoria para extraer la palabra (desde 0 hasta el tamaño del array palabra -1)
            sel_palabra = Math.floor(Math.random() *(palabras.length));

            // Separo la palabra obtenida (con la posición aleatoria) en un array por letras
            palabra_selec = palabras[sel_palabra].palabra.split("");

            // Muestro en pantalla la cantidad de letras que tiene la palabra y la pista obtenido del array pista
            document.getElementById("acierto").innerHTML="La palabra tiene: " + palabra_selec.length + " letras."
            document.getElementById("pista").innerHTML= "Pista:<br>" + palabras[sel_palabra].pista;

            // Genero los espacios de cada letra con gión bajo y espacio
            document.getElementById("palabra").innerHTML="";
            for (i in palabra_selec){
                document.getElementById("palabra").innerHTML+= " _ ";
            }
        }

        // Función para habilitar los botones
        function reinicar_botones(habilitar) { 
            // Asigno a btn un array con todos los botones, recorro btn y los habilito
            let btn = document.querySelectorAll("button");

            for (i in btn){
                if (btn[i].id != 'iniciar' ) {
                    btn[i].disabled = habilitar;
                }
            }
        }

        // Recibe como variable el elemento del botón pulsado ("A","B", "C"....) para sacar su ID
        function comprobar(letra_pulsada) { 
            let letra ="";
            const posicion = [];

            // Desabilito el botón pulsado
            document.getElementById(letra_pulsada.id).disabled = true;

            // A la variable letra asigno la letra pulsada en botón, si es la Ñ tiene el id=N2
            if (letra_pulsada.id == "N2") {
                letra = "Ñ";
            }else{
                letra = letra_pulsada.id;
            }

            // Guardo en un array las posiciones de las letras, si están en la palabra a adivinar.
            for (i in palabra_selec){
                if (palabra_selec[i] == letra.toLowerCase()){
                    posicion.push(i);
                }
            }

            // Compruebo si la letra pulsada está en la palabra a adivinar; si no está quito un intento, lo resto en pantalla y cambio la imagen.
            if (posicion.length<1) {
                intentos-=1;
                document.getElementById("intentos").innerHTML = "Intentos restantes: " + intentos;
                document.getElementById("imagen").src = "img/ahorcado_"+intentos+".png";
            } else{ // Si la letra está, sustituyo el _ por la letra en la posición que corresponde
                let guiones = document.getElementById("palabra").innerHTML.split(""); // Guardo las letras y guiones que muestra en pantalla en un array
                let guiones2 = []; // Genero un array vacío

                // recorro el array donde he guardado las letras y guiones para guardar solo letras y guiones, sin espacios ni huecos
                for (i in guiones){ 
                    if (guiones[i]!= " " && guiones[i]!=""){
                        guiones2.push(guiones[i]);
                    }
                }

                // Recorro el array de la palabra a adivinar para comprobar si hubiera alguna letra acertada
                for (i in palabra_selec){
                    if (palabra_selec[i] == letra.toLowerCase()){
                        guiones2[i] = letra.toLowerCase(); // Si acierta una letra, la ubico en la posición donde la ha encontrado
                    }
                    else if(guiones2[i]=="_"){
                        guiones2[i] = " _ " // Si no va encontrando, añade a la posición espacio, guión y espacio a la posición donde no coincide la letra
                    }
                }
                document.getElementById("palabra").innerHTML = ""; // Vacío el texto mostrado en pantalla
                for (x in guiones2){ // muestro en pantalla las letras y guiones guardados en el array anteriormente
                    document.getElementById("palabra").innerHTML += guiones2[x];
                }
            }

            // Compruebo si has adivinado todas las letras, saco el mensaje de Felicidades y desabilito los botones de letra.
            if (document.getElementById("palabra").innerHTML == palabras[sel_palabra].palabra){
                document.getElementById("intentos").innerHTML = "Felicidades, la palabra era: <br>" + palabras[sel_palabra].palabra;
                document.getElementById("intentos").className = "acierto";
                reinicar_botones(true);
            }


            // Si los intentos llegan a 0, muestro en pantalla que has fallado y la palabra que era, desabilito todos los botones con letra.
            if (intentos==0) {
                document.getElementById("intentos").innerHTML = "Fallo, la palabra era: <br>" + palabras[sel_palabra].palabra;
                document.getElementById("intentos").className = "acierto";
                reinicar_botones(true);
            }

        }
