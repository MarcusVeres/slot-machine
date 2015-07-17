// everything happens within an anonymous function
(function(){

    console.log("loaded scripts");

    // vars
    var recipes = null;


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
            
            // test the function
            var recipe = get_random_recipe();
            console.log( recipe );

            // render the random recipe
            render_recipe( recipe );

        });

    };


    // randomizer 
    var get_random_recipe = function()
    {
        if( recipes ){
            return recipes[ Math.floor( Math.random() * recipes.length ) ];
        } 
        alert("It appears that there are no recipes available.");
        return {}
    };


    // render a recipe onto the page
    var render_recipe = function( recipe )
    {
        $('#recipe-container').html( recipe.sku );
    };


    // initialize everything before page load
    (function init()
    {
        // populate the recipes variable
        get_recipes();

    })();


    // page is ready
    $(document).ready( function(){

        console.log("all systems go");

    });

})($); // import jQuery

