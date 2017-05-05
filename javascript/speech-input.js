(function(global, $){
    var default_opts = {
        lang: 'cmn-Hant-TW',
        continuous: true,
        interimResults: true,
        placeholder_text: '請說話',
        active_title: '請輸入語音訊息',
        beforeStart: function(){
        },
        callback: function(text){
            console.log(text);
            return true;
        }
    };
    var _previous_title = null;
    var Polifill = function(){
        this.start = this.stop = function(){};
    }
    var SpeechInput = function(target, placeholder, opts){
        var that = this;
        that.opts = $.extend({}, default_opts, opts);
        that.prev_launch_time = null;
        that.is_recognizing = null;
        that.$target = $(target);
        that.$placeholder = $(placeholder);

        var recognition = that.recognition = global.webkitSpeechRecognition?(new webkitSpeechRecognition()):(new Polifill());
        recognition.lang = opts.lang;
        recognition.continuous = opts.continuous;
        recognition.interimResults = opts.interimResults;
        that.initEvent();
    }
    SpeechInput.prototype = {
        constructor: SpeechInput,
        initEvent: function() {
            var that = this, $target = that.$target, $placeholder = that.$placeholder, recognition = that.recognition, opts = that.opts;
            recognition.onresult = function(e) {
                var final_transcript = '';
                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        final_transcript += e.results[i][0].transcript;
                    }
                }
                final_transcript = final_transcript.replace(/\s/g, '');
                $placeholder.find('.speech-input-title').text(final_transcript);
                if(opts.callback(final_transcript)){
                    that.close(true);
                }
            };
            recognition.onend = function(){
                that.is_recognizing = false;
                that.prev_launch_time = null;
                $placeholder.removeClass('speech-input-recognizing');
            };
            History.Adapter.bind(window,'statechange',function(){
                var State = History.getState();
                if(State.data.is_speech_input) {
                    if(State.data.time == that.prev_launch_time) {
                        $placeholder.addClass('speech-input-active');
                        return;
                    } else {
                        console.log('none');
                    }
                }
                that.close();
            });
            $placeholder.find('.speech-input-icon').click(function(){
                that.start();
            });
            $target.click(function(){
                that.start();
            });
            $placeholder.bind('click', function(e){
                if(e.target == $placeholder[0]) {
                    that.close();
                }
            });
        },
        start: function(){
            var that = this, $placeholder = that.$placeholder, recognition = that.recognition, opts = that.opts;
            if(that.is_recognizing) {
                that.stop();
            } else {
                that.is_recognizing = true;
                $placeholder.addClass('speech-input-recognizing');
                (typeof opts.beforeStart == 'function') && opts.beforeStart();
                $placeholder.find('.speech-input-title').text(opts.placeholder_text);
                recognition.start();
                that.prev_launch_time = (new Date()).getTime();
                if(!$placeholder.is('.speech-input-active')){
                    _previous_title = document.title;
                    History.pushState({is_speech_input: true, time: that.prev_launch_time}, [opts.active_title].join(''), null);
                }
            }
        },
        stop: function(){
            var that = this;
            var recognition = that.recognition;
            recognition.onend();
            recognition.stop();
            that.prev_launch_time = null;
        },
        close: function(skip_stop){
            var that = this, $placeholder = that.$placeholder;
            if(!skip_stop) that.stop();
            $placeholder.removeClass('speech-input-active');
            if(_previous_title !== null) {
                document.title = _previous_title;
                _previous_title = null;
            }
        }
    }
    global.SpeechInput = SpeechInput;
})(window, jQuery);

