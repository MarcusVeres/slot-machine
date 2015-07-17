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
            url: 'data/recipes.json'
        })
        .success( function( data )
        {
            console.log( "the data is:" , data );
            recipes = data;

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
        // $('#recipe-container').html( JSON.stringify( recipe ));
        $('#recipe-title').html( recipe.recipe );
        $('#recipe-sku').html( recipe.sku );
        $('#recipe-ingredient-1').html( recipe.ingredient_1 );
        $('#recipe-ingredient-2').html( recipe.ingredient_2 );
    };


    // append an element to the inside of a slot
    var append_to_slot = function()
    {
        var interval_id = window.setInterval( function(){
            $('#recipe-sku').append( "<p>hello</p>" );
        }, 1000);
    };
    // append_to_slot();

    
    // show / hide the blur covers
    var show_blur_covers = function()
    {
        $('#recipe-title').css({'opacity':0});
        $('.blur-cover').show();

        // move the items up (will be useful for the bounce at the end)
        // $('.item').css({'margin-top': '-50px'});
        $('.item').animate({
            'marginTop': '-100px'
        });

    };

    var hide_blur_covers = function()
    {
        // stagger the end of the blur
        var covers = $('.blur-cover');
        var items = $('.item');
        var anim_duration = 400;

        window.setTimeout( function(){ 
            $(covers[0]).hide(); 
            $(items[0]).animate({
                'marginTop': '0px'
            }, anim_duration);
        } , 400 );

        window.setTimeout( function(){ 
            $(covers[1]).hide(); 
            $(items[1]).animate({
                'marginTop': '0px'
            }, anim_duration);
        } , 800 );

        window.setTimeout( function(){ 
            $(covers[2]).hide(); 
            $(items[2]).animate({
                'marginTop': '0px'
            }, anim_duration);
        } , 1600 );

        // don't forget the title
        window.setTimeout( function(){
            $('#recipe-title').css({'opacity':100});
        }, 2000 );
    };


    // "spin" the slot machine and display the random recipe
    var spin = function()
    {
        // overlay the blurring to hide what's going on
        // need some sort of spinning animation
        show_blur_covers();

        // prepare our results
        var recipe = get_random_recipe();
        render_recipe( recipe );

        // hide the blur
        window.setTimeout( hide_blur_covers , 1000 );
    };


    // initialize everything before page load
    (function init()
    {
        // set the easing type
        // jQuery.easing.def = "easeOutBounce";
        jQuery.easing.def = "easeOutElastic";

        // populate the recipes variable
        get_recipes();

    })();


    // page is ready
    $(document).ready( function(){

        console.log("all systems go");

        // bind the spin button
        $('#spin').on('tap click', function(){
            spin();
        });

    });

})($); // import jQuery

