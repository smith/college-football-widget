# College Football Widget

College football is a [Dashboard Widget](http://www.apple.com/downloads/dashboard/) for [Mac OS X](http://www.apple.com/macosx/) which provides the current football schedule for I-A and I-AA NCAA teams.

You can choose the team of your choice from the preferences. The data and team
logos are downloaded from [ESPN](http://www.espn.com).

## Download

[Download Now](https://github.com/smith/college-football-widget/blob/master/CollegeFootball.wdgt.zip?raw=true)

This has been tested on Mac OS X 10.6 and 10.7, though other versions may work. Double-click the zip file that's downloaded. That should create a widget file. Double-click that to add the widget to your Dashboard.

## History

Version 2.0.0 - November 1, 2011

* Complete rewrite.
* Updated conferences and teams.

Version 1.5.0 - November 15, 2010

* ESPN Changed up their page layout, so fixed it to work with that.
* The logic was completely rewitten to use JavaScript instead of Ruby.
* New team logos directly from ESPN are used.

Version 1.3.5 - November 14, 2008

* Fixed bug that caused some Big 12 schedules to not display.

Version 1.3.4 - September 22, 2008

* Some display bug fixes.
* Fixed the _stats_ link.

Version 1.3.3 - November 3, 2007

* Sometime in the past year, either Apple or Adobe somehow changed the way Flash movies load in Dashboard Widgets. Since then the team logos have not been loading correctly. They now are loaded in an alternative way. Because of this not all logos are currently displayed.
* The team name is now displayed.

Version 1.3.2 - December 2, 2006

* The problem with showing the logos has been fixed. This has been tested on Mac OS 10.4.8 on PowerPC.
* Cleaned up the Ruby script a little.

Version 1.3.1 - November 19, 2006

* A change on ESPN.com had caused the schedules to display incorrectly. This has been fixed.

Version 1.3 - September 23, 2006

* Follows Apple's new widget submission process.
* The window is now large enough to accommodate twelve game seasons.

Version 1.2 - October 8, 2005

* The background image now has a subtle bit of shading.
* If your clock is set to US Central, Mountain, or Pacific time, the game times will be in local time. All other timezones show US Eastern.
* The Atlantic 10 conference teams now all have logos.
* The schedule table is now center aligned.

Version 1.1 - October 2, 2005

* Now includes I-A and I-AA teams.
* Added a team logo for Mississippi State.
* Added a version.plist file so I know which version I'm using.

Version 1.0 - September 26, 2005

* Initial release.

## Acknowledgements

This widget would not be possible without the help and inspiration of others. Here are a few:

* I decided to write this widget after seeing Justin Williams's [ Purdue Football](http://www.carpeaqua.com/archives/2005/09/10/purdue_football_dashboard_widget.php) widget. It's nice, but why not work for _every_ team?
* [ESPN](http://www.espn.com) for making schedules and logos available and for not shutting this site down (yet).
* [Alex Edelman](http://alexedelman.net/), for providing some excellent hints on making widget graphics.
* Apple, for their excellent [Dashboard development resources](http://developer.apple.com/macosx/dashboard.html) and example widgets.

#### License

Copyright (c) 2004-2011 Nathan Lloyd Smith

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
