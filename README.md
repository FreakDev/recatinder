reCatinder
==========

![see it live here !!!](https://freakdev.github.io/reCatinder) (even better exeperience added to your smartphone's homescreen ;))

![Screenshots of reCatinder](https://raw.githubusercontent.com/FreakDev/freakdev.github.io/master/reCatinder/recatinder.jpg)

Once upon a time, as I was a teatcher, I wrote an exercice for my student. As I wanted it fun and pleasant to code, I gathered the cutest thing on the web and the cutting edge technologies (HTML5 for mobile) to imagine "Cat'inder" - a tinder like for cats !

This repositoty is the second version of me taking the exercise, and this time I use ReactJS

few technical words about this project... (maybe if you read this file you're interested of what I'ma able to code and how)

The index.js file is quite empty and only contains bootstrap of a React.JS single page app. The App.js is the main container, provide store (via a redux Provider), routing via 'react-router' and render the top level UI components à header bar that is always present and a "page" component.

Components (and containers) are divided into modules that you may find in the module folder. Each module has at least an actions.js file and a reducers.js file, and for many, a components folder (only one has no component, it's the 'translation' module for a quite evident reason, it has no UI).

In each module UI components may be stateless or statefull component event if I tried to maintain a small number of statefull components. Each one has been design with the goal to optimze its genericity (could have been done better in some parts...), and is groupped with other components by buisiness logic (and very generic goes to ui module)

Even if there so few text in this demo, as a proof of concept, I have implemented my own quick translation system so my app can be translated via simple ".json" file (see en.json et fr.json) and translation can be applied to any component in the whole app. (see translation module for more details)