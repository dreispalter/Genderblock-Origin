# Genderblock Origin
Makes an honest effort to ungender german websites
that have been mangled into being overly politically correct.

**This is a Firefox extension**

## Motivation
Improve readability, thereby
the inclusion of those who still
who have difficulty reading German,
and to fight against
paternalistic governance and wokewashing.

## Reliability
This has been shoehorned together with chatgpt during lunch break.
I would not trust it to be realiable at all, though
it has not failed catastrophically yet.

It will remove most gendering, but will also
mangle some regular words.  
Examples:
- Constantin -> Constant
- Kolleginnen -> Kolleg

Also usernames are an issue.

`content.js` does feature a blacklist of words to
not process.

## Installation
Take the .zip file in the repositories root,
go to firefox, extensions, click on the little cogwheel,
debug, "install temporary extension".
That is because I did not yet upload this to the mozilla store,
nor am I sure whether they  would keep it, since it's
"anti-woke". Installing it this way is how a developer
would install an extension during development.
Since it's not signed by anyone you can easily modify it.

## Privacy and data collection
No data will be collected whatsoever.

## Features
- Ungenders
- Little ext popup showing changes to the DOM
- The extension icon shows the number of ungendered items

## Example:
This DOM is displayed as follows:
```html
<p>
Ärzte und Ärztinnen
<br>Arzt oder Ärztin
<br>Ärztin oder Arzt
<br>Arzt und Ärztin
<br>Ärztin und Arzt
<br>Ärzt:innen
<br>Ärzt*innen
<br>Kolleg*innen
<br>Kolleg*in
<br>Bauarbeiterinnen
<br>Bauarbeiter:innen
<br>Bauarbeiter*innen
<br>Bauarbeiter:in
<br>Bauarbeiter*in
<br>Bauarbeiter und Bauarbeiterinnen
<br>Bauarbeiterinnen und Bauarbeiter
<br>Bauarbeiter und -Bauarbeiterinnen
<br>Bauarbeiterinnen und -Bauarbeiter
<br>Bauarbeiter und -innen
<br>Bauarbeiter und -innen
<br>Bauarbeiter oder Bauarbeiterinnen
<br>Bauarbeiterinnen oder Bauarbeiter
<br>Bauarbeiter oder -Bauarbeiterinnen
<br>Bauarbeiterinnen oder -Bauarbeiter
<br>Bauarbeiter oder -innen
<br>Bundesinnenministerin
</p>
```
```
// After being processed
Ärzte
Arzt
Arzt
Arzt
Arzt
Ärzt
Ärzt
Kolleg // Notice this little fluke
Kolleg
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bauarbeiter
Bundesinnenminister
```

## TODO
(Feel free to submit PRs or wait for me to do it)
- Blacklist configurable from the ext popup window
- Option to disable ungendering from the ext popup window
- Option to click on ungendered words in DOM to restore them (in case a regular word gets malformed and you're unsure what it means)

## FAQ
(Feel free to submit a question via issue to extend this)
- Will there be chrome support?  
    Not by me. F google. Feel free to do it yourself.

## LICENSE
GPL 3.0

