SpeechInput
====

a wrapped webkitSpeechRecognition object

see the demo page: http://grassboy.github.io/SpeechInput/

The .css file was auto created through compass.app: https://github.com/KKBOX/compassapp/releases   
You can maintain .scss files directly

### Dependency:

jQuery: https://jquery.com/download/   
jQuery.History.js: https://github.com/browserstate/history.js

Usage:
====

## Dependency

````html
    <script src="javascript/jquery.js"></script>
    <script src="javascript/jquery.history.js"></script>
    <script src="javascript/speech-input.js"></script>
    <link href="stylesheets/speech-input.css" media="screen, projection" rel="stylesheet" type="text/css" />
````

## Markup

````html
    <button class="trigger-button">開始語音輸入</button>
    <aside class="speech-input-placeholder">
        <div class="speech-input-inner-box">
            <h3 class="speech-input-title">請說話</h3>
            <div class="speech-input-icon">
                <svg class="speech-input-mic-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="tiny" x="0px" y="0px" viewBox="0 0 480 480" xml:space="preserve">
                <g>
                    <path d="M290.991,240.991c0,26.392-21.602,47.999-48.002,47.999h-11.529c-26.4,0-48.002-21.607-48.002-47.999V104.002   c0-26.4,21.602-48.004,48.002-48.004h11.529c26.4,0,48.002,21.604,48.002,48.004V240.991z"/>
                    <path d="M342.381,209.85h-8.961c-4.932,0-8.961,4.034-8.961,8.961v8.008c0,50.26-37.109,91.001-87.361,91.001   c-50.26,0-87.109-40.741-87.109-91.001v-8.008c0-4.927-4.029-8.961-8.961-8.961h-8.961c-4.924,0-8.961,4.034-8.961,8.961v8.008   c0,58.862,40.229,107.625,96.07,116.362v36.966h-34.412c-4.932,0-8.961,4.039-8.961,8.971v17.922c0,4.923,4.029,8.961,8.961,8.961   h104.688c4.926,0,8.961-4.038,8.961-8.961v-17.922c0-4.932-4.035-8.971-8.961-8.971h-34.43v-36.966   c55.889-8.729,96.32-57.5,96.32-116.362v-8.008C351.342,213.884,347.303,209.85,342.381,209.85z"/>
                </g>
                </svg>
            </div>
            <ul class="speech-input-example-list" data-alt="例句：">
                <li class="speech-input-example-item"><em>台北車站</em>到<em>南港展覽館</em></li>
                <li class="speech-input-example-item"><em>忠孝新生</em></li>
            </ul>
        </div>
    </aside>
````

## JavaScript

````javascript
    var speechInput = new SpeechInput($('.trigger-button')[0], $('.speech-input-placeholder')[0],{
        callback: function(result){
            if(result == '再見') {
                return true; //return true will close the speech-input-placeholder box
            } else {
                $('<div></div>').text(result).prependTo('body');
                return false;
            }
        },
        beforeStart: function(){
        }
    });
    speechInput.start();
````

