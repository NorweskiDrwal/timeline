$(document).ready(function() {
    
    $.fn.timeline = function(data) {                                                    // -> allows calling 'timeline' module to access 'table' object 

        return this.each(function() {
         
            $to = $(this);                                                              // -> mniej pisania
            $to.addClass('timeline');                                                   // -> dodaj klasę 'timeline' do 

            var scale = 100/(table.data_koniec - table.data_start);                     // -> przelicza skale podzialki, zeby umiescic eventy we wlasciwej kolejnosci
            var formatDaty = {year: 'numeric', month: 'numeric', day: 'numeric' };      // -> ustala format daty na DD.MM.RRRR

            $.each(data.lines, function(i,line) {

                var lineTmpl = 
                $(  '<div class="line">' +
                        '<div class="events"></div>' +
                    '</div>'
                ).addClass("line " + line.css).appendTo($to);
           
                var myDate = new Date().toLocaleString('pl-PL',formatDaty);             // -> get today's date
                myDate = myDate.split(".");                                             // -> create a string
                var todayTimestamp = myDate[1] + "/" + myDate[0] + "/" + myDate[2];     // -> change a format
                var today = new Date(todayTimestamp).getTime();                         // -> create a timestamp to place 'today' on the timeline
                var todayPlace = ((today - table.data_start) * scale).toFixed(2);       // -> find the place on the timeline
                var todayOnTimeline = 
                /*$(  
                    '<div class="event">' +
                        '<div class="circle">' +
                            '<div class="circle-inner"></div>' +
                            '<div class="label">' +
                                '<data>' + (new Date(today).toLocaleString('pl-PL',formatDaty)) + '</data>' +
                                '<label>' + 'dzisiaj' + '</label>'+ 
                            '</div>' +
                        '</div>' +
                    '</div>'
                ).appendTo($('.events', lineTmpl)).css('left', todayPlace + '%'); // -> adds 'today' event on the timeline
                */
                $('.timeline .line').css({'background-image':'linear-gradient(to right, yellow, orange ' + (todayPlace - 10) + '%' + ', #c61c3d ' + todayPlace + '%' + ', transparent 1%)'}); // -> colors the background up till today

                
                $.each(line.events, function(index,event) {

                    var eventPlace = ((event.data - table.data_start) * scale).toFixed(2);   

                    if (todayPlace >= eventPlace) { // -> if event happened earlier than today

                        var eventTmpl = 
                        $(  
                            '<div class="past-event">' +
                                '<div class="circle">' +
                                    '<div class="circle-inner"></div>' +
                                    '<div class="label">' +
                                        '<data>' + (new Date(event.data).toLocaleString('pl-PL',formatDaty)) + '</data>' +
                                        '<label>' + event.nazwa + '</label>'+ 
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        ).appendTo($('.events', lineTmpl)).css('left', eventPlace + '%');      
                        alert('pokoloruj');
                        
                    } else {    // -> if event will happen after today

                        var eventTmpl = 
                        $(  
                            '<div class="event">' +
                                '<div class="circle">' +
                                    '<div class="circle-inner"></div>' +
                                    '<div class="label">' +
                                        '<data>' + (new Date(event.data).toLocaleString('pl-PL',formatDaty)) + '</data>' +
                                        '<label>' + event.nazwa + '</label>'+ 
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        ).appendTo($('.events', lineTmpl)).css('left', eventPlace + '%');     
                        alert('zignoruj');
                    }


                });

            });
   
            var timeTmpl = $('<div class="time">').appendTo($to);

            var periodTmpl = 
            $(
                '<div class="period">' +
                    '<div class="label last">' + (new Date(table.data_koniec).toLocaleString('pl-PL',formatDaty)) + '</div>' +
                    '<div class="label first">' + (new Date(table.data_start).toLocaleString('pl-PL',formatDaty)) + '</div>' +
                '</div>'
            ).css({left:"0%", width:"100%"}).appendTo(timeTmpl);

        });
    };
   
    var table = {
        data_start: 1510700400000, // 15.11.2017 - 1510700400000
        data_koniec: 1513292400000, // 15.12.2017
        lines: {
            'checklists': {
                css: 'checklist',
                events: [
                    {
                        id: 1,
                        data: 1511391600000, // 23.11.2017
                        nazwa: 'Dostałem zadanie testowe',
                        ikona: 'complete'
                    },
                    {
                        id: 2,
                        data: 1511737200000, // 27.11.2017
                        nazwa: 'Odesłałem zadanie testowe',
                        ikona: 'complete'
                    },
                    {
                        id: 3,
                        data: 1511996400000, // 30.11.2017
                        nazwa: 'Vehicle',
                        ikona: 'resolve'
                    },
                    {
                        id: 4,
                        data: 1512342000000, // 04.12.2017
                        nazwa: 'Trailer Pickup',
                        ikona: 'complete'
                    },
                    {
                        id: 5,
                        data: 1512946800000, // 11.12.2017
                        nazwa: 'Danger situation',
                        ikona: 'alert'
                    }
                ]
            }
        }
    };
    
    $('.tl').timeline(table);

});