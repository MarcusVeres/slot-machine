// everything happens within an anonymous function
(function(){

    console.log("loaded scripts");

    // vars
    var recipes = 'unset';


    // get our recipe data
    var get_recipes = function()
    {
        $.ajax({
            method: 'GET',
            url: '/data/recipes.json'
        })
        .success( function( data )
        {
            console.log( "the data is:" , data );
            recipes = data;
        });

    };


    // initialize everything before page load
    function init()
    {
        // populate the recipes variable
        get_recipes();
    }


    // page is ready
    $(document).ready( function(){

        console.log("all systems go");

    });

})($); // import jQuery

