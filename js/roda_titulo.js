(function(){
    let title = document.getElementsByTagName('title')[0];
    //adicionando espaço como ultimo caractere
    //para evitar que a primeira letra fique colado na ultima
    //quand mudar a posição da primeira letra para ultima
    function adicionaEspacoComoUltimoChar(){
        title.innerHTML = title.outerText + " " + "- "    }


    function colocaPrimeiroCharComoUltimoChar(str){
      
        let primeiroChar = str.charAt(0);
        
        //remove primeiro char
        str = str.slice(1,str.length);

        //coloca primeiro char como ultimo e retorna a string
        return str + primeiroChar;
    }

    adicionaEspacoComoUltimoChar();

    setInterval(function(){
        title.innerHTML = colocaPrimeiroCharComoUltimoChar(title.outerText);
    },500);
})();