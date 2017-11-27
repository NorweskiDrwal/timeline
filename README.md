Timeline - extended version
<br>
<br>
My idead of making the timeline more interactive was to let the user pick the beggining and ending dates and add and remove events on the fly. The timeline itself does not have to have too much 'bling'. It's what a user can do with it should be the top priority.
<br>
That is why I decided to go with the menu, that appears after clicking the "+" icon in the top-right corner.
<br>
There, the user can add an event, by filling up the form and picking the icon for the event. The event should be added to the timeline and to the side menu below the "+" button. Now, if the user wants to remove all events, there's a clickable button with trash icon. This also allows the user to remove each event individually, by dragging the event within the menu onto the trash button. This should remove both the menu icon and the icon on the timeline.
<br>
<br>
Only drag and drop functionality is added. User can drag and drop icons, however, they are only removed from the menu. The action does not affect the timeline, nor it affects the stored version of the JS table from where the event data is read.
<br>
<br>
Adding events via form has not yet been added. The data is read from JSON file stored on the server. It is not changeable at the moment. Picking dates of the start and end is also not implemented. I run out of time to get all the above in order. I will work on this idea anyway, to make sure the whole solution is finished, as it is an interesting idea.
<br>
<br>
I will definitely rewrite the app using vue or react. Being able to divide the workload on a modules, that each can be separately edited within its own space would be a better idea.
<br>
<br>
I also will use sass/scss to style the project. I did not use it now, because I thought it would not require that much styling, however, during works, I realized that the styling was, in fact, the biggest part of this project.
<br>
<br>
I do not quite like how the form to add events looks at the moment. If I had more time I would change it so that it slides from underneath the "+" button, when the user hovers the coursor over the button. Also, instead of 'DODAJ' button, the "+" button would serve as the form submit button, so that it adds more to the minimalistic look, because sometimes less is more ;)
