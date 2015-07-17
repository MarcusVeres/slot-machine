// everything happens within an anonymous function
(function(){

    console.log("loaded scripts");

    // page is ready
    $(document).ready( function({

        console.log("all systems go");

    });

})($); // import jQuery

