$Id: README.txt 57 2008-02-18 10:22:33Z mstillwell $

Create symlinks in the directory to the real access and error logs. e.g.

  $ ln -s /usr/local/apache2/logs/skissl.testdc.com-access.log access.log
  $ ln -s /usr/local/apache2/logs/skissl.testdc.com-error.log error.log

(To make the logfiles easier to find, basically.)

Anything with an extension of ".log" will be ignored by subversion.
