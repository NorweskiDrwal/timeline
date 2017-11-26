$(document).ready(function() {
    
    $.fn.timeline = function(data) {                                                    // -> allows callback of 'timeline' module to access 'table' object 

        return this.each(function() {
         
            $to = $(this);                                                              // -> less typing

            $to.addClass('timeline');                                                   // -> add '.timeline' class to '.timeline-target'

            var scale = 100/(table.data_koniec - table.data_start);                     // -> counts the ratio at which to devide the timeline

            var formatDaty = {year: 'numeric', month: 'numeric', day: 'numeric' };      // -> sets the date format to DD.MM.RRRR

            var lineTmpl = $(                                                           // -> variable for an element consisting of two divs
              '<div class="line">' +
                    '<div class="events"></div>' +
                '</div>'
            ).addClass("line").appendTo($to);                                           // -> adds class '.line' as a child of 'timeline-target' to previously defined element
    


        // -> this module changes today's date to a timestamp ---------------------------------------------------
        // ------------------------------------------------------------------------------------------------------
            var myDate = new Date().toLocaleString('pl-PL',formatDaty);                 // -> get today's date

            myDate = myDate.split(".");                                                 // -> create a string

            var todayTimestamp = myDate[1] + "/" + myDate[0] + "/" + myDate[2];         // -> change a date format

            var today = new Date(todayTimestamp).getTime();                             // -> create a timestamp to place 'today' on the timeline

            var todayPlace = ((today - table.data_start) * scale).toFixed(2);           // -> find the place on the timeline based on the counted number (with two decimals) for 'today'
        // ------------------------------------------------------------------------------------------------------



        // -> this module adds HTML elements to a '.timeline' to place 'today' on a timeline --------------------
        // ------------------------------------------------------------------------------------------------------
            var todayOnTimeline = $(                                                    // -> variable for an element consisting of two divs
                '<div class="event">' +
                    '<div class="milestone-circle"></div>' +
                    '<div class="milestone-label">' +
                        '<data>' + (new Date(today).toLocaleString('pl-PL',formatDaty)) + '</data>' +   // -> converts timestamp of 'today' to a regular date in DD.MM.RRRR format
                        '<label>' + ' (dzisiaj)' + '</label>' + 
                    '</div>' +
                    '</div>' +
                '</div>'
            ).appendTo($('.events', lineTmpl)).css('left', todayPlace + '%');           // -> adds HTML elements as children of '.events' to previously defined element
            
            $('.timeline .line').css({
                'background-image':'linear-gradient(to right, yellow, orange ' + (todayPlace - 15) + '%' + ', #c61c3d ' + todayPlace + '%' + ', transparent 1%)'    // -> colors the background of '.line' up till today
            }); 
        // ------------------------------------------------------------------------------------------------------
        


        // -> this module adds HTML elements to a '.timeline' to create space for items from JS table -----------
        // -> then checks if given dates are pre- or post- today and adds HTML elements to a '.timeline'---------
        // ------------------------------------------------------------------------------------------------------
            $.each(data.events, function(index, events) {                               // -> loop through 'events' array in JS object 'table' and assign parameter 'events' to access the array              

                var eventPlace = ((events.data - table.data_start) * scale).toFixed(2); // -> find the place on the timeline based on the counted number (with two decimals) for events' dates

                if (todayPlace >= eventPlace) {                                         // -> if event happened earlier than today 

                    var eventTmpl = $(                      
                        '<div class="past-event">' +
                            '<div class="circle">' +
                                '<div class="circle-inner">' + events.ikona + '</div>' +
                                '<div class="label">' +
                                    '<data>' + (new Date(parseInt(events.data, 10)).toLocaleString('pl-PL',formatDaty)) + '</data>' +     // -> converts timestamp of events' dates to a regular date in DD.MM.RRRR format
                                    '<label>' + events.nazwa + '</label>'+ 
                                '</div>' +
                            '</div>' +
                        '</div>'
                    ).appendTo($('.events', lineTmpl)).css('left', eventPlace + '%');   // positions element '.past-event' some % left from the document's left edge
                    
                } else {                                                                // -> if event happens after today

                    var eventTmpl = $(                      
                        '<div class="event">' +
                            '<div class="circle">' +
                                '<div class="circle-inner">' + events.ikona + '</div>' +
                                '<div class="label">' +
                                    '<data>' + (new Date(parseInt(events.data, 10)).toLocaleString('pl-PL',formatDaty)) + '</data>' +     // -> converts timestamp of events' dates to a regular date in DD.MM.RRRR format
                                    '<label>' + events.nazwa + '</label>'+ 
                                '</div>' +
                            '</div>' +
                        '</div>'
                    ).appendTo($('.events', lineTmpl)).css('left', eventPlace + '%');   // positions element '.past-event' some % left from the document's left edge 

                }

            });
        // ------------------------------------------------------------------------------------------------------

        });
    };

// -> this JS object stores data with events' details ---------------------------------------------------
// ------------------------------------------------------------------------------------------------------    
var table = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "events.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
// ------------------------------------------------------------------------------------------------------

    $('.timeline-target').timeline(table);                                          // -> callback with 'table' object to a module created with jQ prototype $.fn.timeline = function(data) {}
    
    $('.addEvent').click(function() {
        $(this).toggleClass('scaleUp');
        $('.menu').toggleClass('spin1-4');
        $('.modal').toggleClass('darken');
        $('.event-list').toggleClass('slideLeft');
        $('.eventForm').toggleClass('slideDown');
        $('.icons-box').removeClass('show');
    });

    $('.modal').click(function() {
        $('.addEvent').removeClass('scaleUp');
        $('.menu').removeClass('spin1-4');
        $('.modal').removeClass('darken');
        $('.event-list').removeClass('slideLeft');
        $('.eventForm').removeClass('slideDown');
        $('.icons-box').removeClass('show');
    });

    $('#clearLS').click(function() {
        /*
        localStorage.clear();
        location.reload(); //page reload  
        console.log(localStorage);
        */
    });

    $('#ikona').click(function(event) {
        event.preventDefault();
    });

    $(".item").draggable({
        cancel: false,
        scroll: false,
        clone: 'helper',
        revert: true,
        zIndex: 250,
    });

    $('#clearLS').droppable({
        accept: '.item',
        drop: function(event, ui) { //add dragged item as a next element
            $(ui.draggable).hide();
        }
    });

    $('#ikona').click(function() {
        $('.icons-box').toggleClass('show');
    });

});