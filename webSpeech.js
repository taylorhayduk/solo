// Let’s take a look under the hood. First we check to see if the browser supports the Web Speech API by checking if the webkitSpeechRecognition object exists. If not, we suggest the user upgrades his browser. (Since the API is still experimental, it's currently vendor prefixed.) Lastly, we create the webkitSpeechRecognition object which provides the speech interface, and set some of its attributes and event handlers.
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() { ... }
  recognition.onresult = function(event) { ... }
  recognition.onerror = function(event) { ... }
  recognition.onend = function() { ... }
  
//   ...
// The default value for continuous is false, meaning that when the user stops talking, speech recognition will end. This mode is great for simple text like short input fields. In this demo, we set it to true, so that recognition will continue even if the user pauses while speaking.
// The default value for interimResults is false, meaning that the only results returned by the recognizer are final and will not change. The demo sets it to true so we get early, interim results that may change. Watch the demo carefully, the grey text is the text that is interim and does sometimes change, whereas the black text are responses from the recognizer that are marked final and will not change.
// To get started, the user clicks on the microphone button, which triggers this code:
function startButton(event) {
  // ...
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
// We set the spoken language for the speech recognizer "lang" to the BCP-47 value that the user has selected via the selection drop-down list, for example “en-US” for English-United States. If this is not set, it defaults to the lang of the HTML document root element and hierarchy. Chrome speech recognition supports numerous languages (see the “langs” table in the demo source), as well as some right-to-left languages that are not included in this demo, such as he-IL and ar-EG.
// After setting the language, we call recognition.start() to activate the speech recognizer. Once it begins capturing audio, it calls the onstart event handler, and then for each new set of results, it calls the onresult event handler.
recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i &lt; event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
  };
}