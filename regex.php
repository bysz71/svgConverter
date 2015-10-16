<html>
    <head>
        <script src = 'jquery.js'></script>
    </head>
    <body>
        <button id = 'convert'>convert</button>
        <button id = 'restore'>restore</button>
        <?php
            include "alaska.svg";
        ?>
    </body>
    <script>
    var content = $("svg")[0].innerHTML;
    $("#convert").click(function(){
        $("path").each(function(){
            var string = $(this).attr("d");
            console.log(string);
            // string = string.replace(/ ?c ?0,0 ?/g, ' ');
            // string = string.replace(/ ?c 0,0 -?[0-9]+.?[0-9]*,-?[0-9]+.?[0-9]* ?/g,' ');
            string = string.replace(/ ?c ?-?[0-9]+.?[0-9]*,-?[0-9]+.?[0-9]* -?[0-9]+.?[0-9]*,-?[0-9]+.?[0-9]* ?/g, ' ');
            // string = string.replace(/ ?c ?-?[0-9]+.?[0-9]*,-?[0-9]+.?[0-9]* ?/g, ' ');
            console.log(string);
            $(this).attr("d",string);
        });
    });
    $("#restore").click(function(){
        $("svg")[0].innerHTML = content;
    });
    </script>
</html>