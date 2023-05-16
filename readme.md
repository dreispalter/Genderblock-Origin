# Genderblock Origin
Makes an honest effort to ungender german websites
that have been mangled into being overly politically correct.

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
- Berlin -> Berl

Also usernames are an issue.

`content.js` does feature a blacklist of words to
not process.

## Install
Pack all this shit in a .zip,
go to firefox, extensions, click on the little cogwheel,
debug, "install temporary addon from file".
That is because I did not yet upload this to the mozilla store,
nor am I sure whether they would keep it, since it's
anti-woke. Installing it this way is how a developer
would install his extension during development.
Since it's not signed by anyone you can easily modify it.

## Privacy and data collection
No data will be collected whatsoever.

## TODO
(Feel free to submit PRs or wait for me to do it)
- Blacklist configurable from the ext popup window
- Option to disable ungendering from the ext popup window
- Option to click on ungendered words in DOM to restore them (in case a regular word got malformed and you're not sure what it means)

## FAQ
(Feel free to submit a question via issue to extend this)
- Will there be chrome support?
    Not by me. F google. Feel free to do it yourself.

## LICENSE
GPL 3.0

