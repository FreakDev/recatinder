Translation module
==================

This module is intented to translate static labels in a react readux app.

it is really quick to implement, and easy to use.

it perfectly fits simple app : demo, poc, prototype (not really scalable)


usage
-----

in your root redux reducer add the key translation and add the reducer provided in this module like 

```javascript
//...
import { translation } from 'path/to/module/translation'
const rootReducer {
//...
    translation
}
//...
```

...and when the app start, load tranlations...

```javascript 
//...
ìmport { addTranslation } from 'path/to/module/translation'
ìmport fr_FR from 'fr_FR.json'
ìmport { en_EN, en_US } from 'en.json'
 
store.dispatch( addTranslation(en_EN) )
store.dispatch( addTranslation(en_US) )
store.dispatch( addTranslation(en_FR) )
//...
```

...translate your components...

```javascript
//...
import { getTranslate } from 'path/to/module/translation'
 
const cmp = ({ translate }) => (
    {# refers to a 'label' that is tranlsated into the previously loaded language files #}
   <span>{ translate('label') }</span>
)
 
const mapStateToProps = state => ({
   translate: getTranslate(state)
})
///...
```

...anywhere you'd like to change the language displayed in your app.


```javascript
//...
ìmport { setLocale } from 'path/to/module/translation'
 
const mapDispatchToProps = dispatch => ({
   onChangeLocale: (e) => dispatch(setLocale(e.locale))
})
//...
```