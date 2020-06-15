# Yahtzee Score Keeper

This is a website that allows between 2 and 6 people to play a game of Yahtzee (the Swedish version) online, providing them with the ability to roll 5 dice and save their scores.

This was created as an assignment for the Code Institute Full Stack Web Developer course following their modules on Javascript Fundamentals and Interactive Front-End Development.


## Demo

A live demo can be found here: [petter0619.github.io/yahtzeeScoreKeeper_repo/](https://petter0619.github.io/yahtzeeScoreKeeper_repo/)


## UX

### User Stories

As a user who knows the rules of Yahtzee I want to be able to quickly and easily start a game, plus have access to information on how the site works, even whilst the game is going on.

As a user who does not know the rules to Yahtzee I want to, in addition to the above, have access to content that explains what the rules are. 

### Strategy

My goal with the design was to create a professional yet minimalistic design that was easy for users to understand and use, whilst also providing some basic information on the rules of Yahtzee (the swedish version) and instructions on how the site works. 

### Structure

A one-page layout was chosen because that way I did not have to store information in Local Storage for use over different pages; specifically the players added in the Add Player list. 

The one-page layout also had the advantage that I did not have to duplicate the modals over multiple pages (since access to the “Yahtzee rules” and “How this site works” information can be useful even whilst someone is in the game). Also, having the modal content displayed on their own separate pages would have meant leaving the Game Screen (thereby ending the game) to access them.

Originally (as shown in the wireframes) I had planned to have the scores presented in a multiple tab format, with the tab of the current player showing. During the course of development I first changed this to a HTML table, because it gave a more comprehensive overview of the scores.

The HTML table was then replaced by a collection of DIV score columns; one per player. The final decision to use columns of DIVs styled like an HTML table was made because HTML tables are created by nesting column cells (<td>) under their respective table rows (<tr>). This meant that in order to hide/display the score cells for any particular player I would have to alter 15 different lines of code per player, as opposed to simply altering one line of code with the DIV solution (the player column DIV wrapper).

### Skeleton

[Start screen wireframe](wireframes/wireframe-startScreen.png)

[Game screen wireframe](wireframes/wireframe-gameScreen.png)


## Technologies

Main:
1. HTML
2. CSS (incl. CSS Grid and CSS Flexbox for positioning)
3. Javascript (vanilla, no frameworks were used)

Code editor: VS Code


## Features

### Existing features

General features:
* Responsive design
* Fixed top navigation that collapses into a so called “burger menu” on smaller devices
* Ability to add between 2 to 6 players using the “Add Player” feature in the “Start Playing” modal

Game features:
* Ability to “roll” 5 dice
* Ability to lock in any individual dice so it is not “rolled” during following turns
* Automatic gameflow. Each player has 3 rolls per round, for 15 rounds. After each round has been saved, the current player is automatically changed.
* Scores (and bonuses) are automatically calculated and added to the score table. On smaller devices only the score column of the current player is shown.
* Score categories that have been used once cannot be used (aka overridden) again, but are automatically removed as options for each respective player.
* The website has checks built in to prevent games from being started with less than 2 players, or more than 6, as well as users trying to place results from rolling the dice into non-categories. Users are notified of this with alerts.


### Features left to implement

If the website was to be developed further some features I would like to add would be:
* Ability to start a new game with all the current players, without having to re-enter their names in the Add Player modal.
* Ability to view score sheets for players other than the current player on smaller devices.
* Replace the current dropdown feature on the ‘Save Result’ form with a custom dropdown menu, since the 'SELECT' element cannot be styled.
* Ability to use the sites scorekeeping functionality separately from the roll dice functionality; allowing players to use the site to keep score whilst rolling real life dice in person.
* Automatically saving game results in Local Storage to create a “high score” table.
* Ability to save the progress of ongoing games in Local Storage in case the site needs to be reloaded in the middle of a game, or the game needs to be abandoned before it is completed.
* Currently if you change screen widths; switching between views with the mobile hamburger menu and the non-hamburger menu during the same session, the non-hamburger menu may not show any buttons if the toggleMobileMenu() function has added display:none; to those links whilst in the mobile view. I did not alter this since I found it unlikely that users would be constantly switching between different screen widths during the same session. This could be fixed by having an interval run in the background constantly checking the screen width.



## Testing

### During Development
During the development of the site functions were tested using console.log and manual checks on the site during each step to ensure that they worked as intended. 

### Manual testing
This site was tested across multiple browsers (Chrome, Safari, FireFox) and on multiple mobile devices (iPhone 5: Chrome and Safari, iPad 1: Safari) to ensure compatibility and responsiveness. Most responsiveness testing was done using the Developer Tools in Google Chrome during the design phase. During the testing phase, I realized the following:
* Originally the site functionality would not work on Safari. The reason for this was discovered to be that ‘const’/’let’ was used to create global variables used by multiple functions; the functions referencing the global variables could not locate their respective variables if they were defined outside said function using ‘const’ or ‘let’. Search engine research confirmed that this was the case. Global variable declarations were changed to ‘var’, but variable declarations inside functions were kept as ‘const’ or ‘let’ (these still worked). 

A beta test of the game was also performed by myself and 3 other people, where we used the site to play 2 rounds of yahtzee. During this beta test the site performed as intended, but the following potential human/user errors were discovered:
* Placing the results of the dice turn in the wrong category by mistake. Considered adding a confirmation step before actually saving the result, but decided not to because in my opinion it would have made the user experience more annoying.
* If you double click the roll dice button it would perform 2 rolls of the dice at once, thereby effectively eliminating 1 (or more) roll turns. To prevent this from happening the eventListener for the ‘Roll Dice’ button is removed onclick and then reapplied after a second using a setTimeout. 

### Testing tools used
For HTML validation: [https://www.freeformatter.com/html-validator.html](https://www.freeformatter.com/html-validator.html)
* 137 issues were found. All related to my using the ‘role’ attribute as an identifier within my HTML to enable JS functionality. I learned that the ‘role’ attribute should only contain pre-approved values that describe element functionality to screen readers. All instances of the ‘role’ attribute were subsequently changed to the custom attribute ‘data-roleClass’.

For CSS validation: [http://jigsaw.w3.org/css-validator/validator](http://jigsaw.w3.org/css-validator/validator) and [http://csslint.net](http://csslint.net)
* One instance of an ‘overqualified element’ was found by CSS Lint and subsequently fixed.
* Both tools had issues with me originally using CSS variables for certain colors. To make the color palette accessible on older browsers all uses of my custom CSS color variables were changed to their hex values.
* CSS Lint said to not use ID’s as selectors. This was ignored.
* CSS Lint had issues with my using ‘!important’ at certain points. This was ignored.
* CSS Lint had issues with me defining different styles for heading tags for different content. This was ignored.
* CSS Lint showed errors in regard to my use of CSS Grid for positioning. This was ignored since CSS Grid is the main way used to position certain sections of the site, meaning that site elements may not be positioned correctly in older browsers that do not support CSS Grid. 

For responsiveness design: [http://www.responsinator.com/](http://www.responsinator.com/) + [http://browsershots.org](http://browsershots.org)
* No new issues found on Responsinator.com
* Browsershots.org failed to generate any results in the free version


For Javascript validation: [JSHint.com](https://jshint.com/) and [JSLint.com](http://jslint.com/)
* JSHint.com threw errors because I did not use semicolons (‘;’) after my function definitions. Semicolons were added.
* Both tools threw errors/warnings about my use of ES6 features such as Arrow functions, use of ‘const’ in variable declarations and my use of backticks and the ‘template literal syntax’. These were not fixed; meaning that the site will (likely) not work in some older browsers that do not support ES6.
* Both also threw warnings about my inclusion of the ‘break’ keyword after my ‘case’ definitions in the Player.prototype.calculateScore() ‘switch’ statement. This was ignored.
* JSLint claimed ‘unexpected uses of else’. Could not find any issue with my implementation and the ‘else if’ statements I used worked when manually tested on the site. Therefore this was ignored.

Jasmine (files included in the ‘testing’ folder) was used to test the following prototype methods:
* Player.prototype.calculateScore()
* Player.prototype.upperScore()
* Player.prototype.totalScore()


## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new 
commits to the master branch. Link to deployed site: [petter0619.github.io/yahtzeeScoreKeeper_repo/](https://petter0619.github.io/yahtzeeScoreKeeper_repo/)

To run locally, you can clone this repository directly into the editor of your choice by pasting git clone https://github.com/petter0619/yahtzeeScoreKeeper_repo.git into your terminal. To cut ties with this GitHub repository, type git remote rm origin into the terminal.

## Credit

### Content & Media
* The text for the Yahtzee Rules modal came mainly from this Wikipedia article: [https://en.wikipedia.org/wiki/Yahtzee#Rules](https://en.wikipedia.org/wiki/Yahtzee#Rules), with alterations made to change the rules to the Swedish version of Yatzhee. The table images used in the modal also came from this article, although they were altered using the Chrome Developer Tools first so they matched the Swedish ruleset. 
* The remaining content was created by me.


### Code
Wes Bos’s course ‘Beginner Javascript’: [https://wesbos.com/beginner-javascript](https://wesbos.com/beginner-javascript), for:
* The code for the ‘Add Player’ list in the ‘Start Playing’ modal
* The code for creating click-outside modals (this code was heavily altered in order to make it work; the original setup for closing the modals by clicking outside of them did not work). The functionality having all modals be the same modal and showing content based on which button was clicked wes developed by me.
* The code for the ‘tab’ functionality initially intended to be used for the Score Result table but later abandoned. 

Other:
* The code to create the responsive top navigation using vanilla Javascript and CSS came primarily from W3Schools: [https://www.w3schools.com/howto/howto_js_topnav_responsive.asp](https://www.w3schools.com/howto/howto_js_topnav_responsive.asp)
* W3Schools for the code needed to hide the scrollbar in the modals: [https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp](https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp)
* This Stackoverflow question for how to check if all items in an array are the same: [https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal](https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal)
* This Stackoverflow question for how to make the page reload using Javascript: [https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript](https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript)
* This ASPSnippets page for how to reset a dropdown menu ('SELECT') after ‘submit’: [https://www.aspsnippets.com/Articles/Reset-Clear-DropDownList-selection-selected-value-using-JavaScript-and-jQuery.aspx](https://www.aspsnippets.com/Articles/Reset-Clear-DropDownList-selection-selected-value-using-JavaScript-and-jQuery.aspx)
* This Stackoverflow question for how to identify the max value in an array/object: [https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects](https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects)


### Acknowledgements: 
* Wes Bos and his courses for teaching me Javascript ([https://wesbos.com/beginner-javascript](https://wesbos.com/beginner-javascript)) and CSS Grid ([https://cssgrid.io/](https://cssgrid.io/)). Wes Bos also gets credit for the color palette used on the site. 
* MDN Web Docs ([https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)) were often used as property reference throughout the project.
* W3Schools ([w3schools.com](w3schools.com)) was often used as property reference throughout the project.


## Thank You

Thank you for checking out my website!

//Petter Carlsson