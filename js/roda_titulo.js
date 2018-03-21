(function(){
    let title = document.getElementsByTagName('title')[0];

    //adicionando um traço e espaço no final
    //para separar o inicio do fim do titulo
    title.innerHTML = title.outerText + " " + "-" + " ";

   
    function colocaPrimeiroCharComoUltimoChar(str){
      
        let primeiroChar = str.charAt(0);
        
        //remove primeiro char
        str = str.slice(1,str.length);

        //coloca primeiro char como ultimo e retorna a string
        return str + primeiroChar;
    }

    setInterval(function(){
        title.innerHTML = colocaPrimeiroCharComoUltimoChar(title.outerText);
    },500);
})();